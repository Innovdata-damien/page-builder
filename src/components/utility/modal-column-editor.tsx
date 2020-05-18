import React, {Component} from 'react';
import { Modal, InputNumber, Card } from 'antd';
import { BodyType } from 'types/blockType';
import swal from 'sweetalert';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { updateListBody } from '../../redux/actions/blockAction';
import { BlockPosition, moveToPosition } from '../../utils/utils';

const mapStateToProps = (state: any) => ({
    blocks: state.blocks
});
  
const mapDispatchToProps = (dispatch: any) => ({
    updateListBody: (blocks: Array<BodyType>) => dispatch(updateListBody(blocks))
});


type Props = {
    blocks: Array<BodyType>;
    block: BodyType;
    blockId: string;
    blockRef?: HTMLDivElement | null;
    visible: boolean;
    _setVisibilityOfModalColumnEditor: (type: boolean) => void;
    updateListBody: (blocks: Array<BodyType>) => void;
}


type Device = 'pc' | 'tablet' | 'mobile';


type State = {
    block: BodyType;
}

const columnEditor: Array<{ iconClass: string; title: string; device: Device; }> = [
    {
        iconClass: 'mi mi-TVMonitor',
        title: 'PC',
        device: 'pc',
    },
    {
        iconClass: 'mi mi-Tablet',
        title: 'Tablet',
        device: 'tablet',
    },
    {
        iconClass: 'mi mi-CellPhone',
        title: 'Mobile',
        device: 'mobile',
    }
];

class ModalColumnEditor extends Component<Props, State> {

    constructor(props: Props){
        super(props)

        this.state = {
            block: JSON.parse(JSON.stringify(props.block))
        }
    }

    handleAddColumn = () => {

        const newBlockState = this.state.block;
        newBlockState.columns.push({
            id: uuid(),
            detail: {
                size: {
                    pc: 12,
                    tablet: 12,
                    mobile: 12
                },
                hide : {
                    pc: false,
                    tablet: false,
                    mobile: false
                }
            },
            contents: []
        });

        this.setState({ block: newBlockState });

    }

    changeColumnPlace = (position: BlockPosition, colIndex: number) => {
        
        const newBlockState = this.state.block;
        newBlockState.columns = moveToPosition(this.state.block.columns, colIndex, position);

        this.setState({ block: newBlockState });
    };

    componentDidUpdate(prevProps: Props){
        if(prevProps.visible != this.props.visible)
            this.setState({ block: JSON.parse(JSON.stringify(this.props.block)) });
    }
    
    handleAlertRemoveColumn = (colIndex: number) => {

        if(this.state.block.columns.length > 1){

            if(this.state.block.columns[colIndex].contents.length > 0)
                swal('Are you sure to delete a column with contents ?', {
                    icon: 'error',
                    closeOnClickOutside: false,
                    buttons: ['Cancel', 'Yes']
                }).then((value) => {
                    if(value) this.handleRemoveColumn(colIndex);
                });
            else
                this.handleRemoveColumn(colIndex);

        }else
            swal('You cannot delete a column in a container with only one column.', {
                icon: 'error',
                closeOnClickOutside: false
            });
                

    }

    handleRemoveColumn = (colIndex: number) => {

        const newBlockState = this.state.block;

        newBlockState.columns = newBlockState.columns.filter((_el: any, key: number) => key != colIndex);

        this.setState({
            block: newBlockState
        });
    }

    handleChangeColumnVisibility = (device: Device, colIndex: number) => {

        const newBlockState = this.state.block;

        newBlockState.columns[colIndex].detail.hide[device] = !newBlockState.columns[colIndex].detail.hide[device];


        this.setState({ block: newBlockState });
    }

    handleChangeColSize = (size: number | undefined, device: Device, colIndex: number) =>{

        const newBlockState = this.state.block;

        newBlockState.columns[colIndex].detail.size[device] = (size as any);


        this.setState({ block: newBlockState });
    }

    handleModalSubmit = () =>{
        const newState: Array<BodyType> = [...this.props.blocks];

        newState.find((item)=>{
            if(item.id == this.props.blockId){
                item.columns = this.state.block.columns;
            }
        });

        this.props._setVisibilityOfModalColumnEditor(false);
    }

    render(){
        
        return (

            <Modal
                wrapClassName="pg-build__columnEditor"
                title="Column editor"
                visible={this.props.visible}
                getContainer={()=>(this.props.blockRef as HTMLElement)}
                onCancel={()=>this.props._setVisibilityOfModalColumnEditor(false)}
                onOk={this.handleModalSubmit}
                okText="Save change"
                width={1000}
            >

                {columnEditor.map((item, index)=>(

                    <Card key={index} headStyle={{background: '#f2f2f2'}} title={
                        <div className="pg-build__columnEditor-title">
                            <i className={item.iconClass}></i>
                            <span>{item.title}</span>
                        </div>
                    }>
                        <div className="pg-build__row">

                            {this.state.block.columns.map((column, indexCol)=> (

                                <div
                                    key={indexCol}
                                    className={`pg-build__col pg-build__colEditor pg-build__col-${column.detail.size[item.device]}`}
                                >
                                    <div className={`pg-build__col-content ${column.contents.length > 0 ? 'pg-build__col-contentFilled' : ''}`}>

                                        <InputNumber
                                            onChange={(value)=>this.handleChangeColSize(value, item.device, indexCol)}
                                            defaultValue={column.detail.size[item.device]}
                                            className="pg-build__colSizer"
                                            min={1}max={12}
                                        />

                                    </div>

                                    <div className="pg-build__colEditorToolbar">
                                        {(item.device == 'pc' && indexCol != 0) && <a onClick={()=>this.changeColumnPlace('up', indexCol)}><i className="mi mi-Up"></i></a>}
                                        {(item.device == 'pc' && indexCol != (this.state.block.columns.length - 1)) && <a onClick={()=>this.changeColumnPlace('down', indexCol)}><i className="mi mi-Down"></i></a>}
                                        {item.device == 'pc' && <a onClick={this.handleAddColumn}><i className="mi mi-Add"></i></a>}
                                        {(this.state.block.columns.length > 1 && item.device == 'pc') && <a onClick={()=>this.handleAlertRemoveColumn(indexCol)}><i className="mi mi-Delete"></i></a>}
                                        <a onClick={()=>this.handleChangeColumnVisibility(item.device, indexCol)} className={`pg-build__colVisibilityTool ${column.detail.hide[item.device] ? 'pg-build__colVisibilityTool-hide' : ''}`}><i className="mi mi-RedEye"></i></a>
                                    </div>
                                </div>

                            ))}

                            </div>
                    </Card>

                        
                ))}


            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalColumnEditor);