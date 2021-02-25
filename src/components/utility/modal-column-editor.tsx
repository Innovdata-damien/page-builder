import React, {Component} from 'react';
import { Modal, InputNumber, Card } from 'antd';
import { BodyType, LanguageBlocks } from 'types/blockType';
import swal from 'sweetalert';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { BlockPosition, moveToPosition } from '../../utils/utils';
import i18n from '../../translations/i18n';

const mapStateToProps = (state: any) => ({
    blocks: state.blocks,
    locale: state.locale
});
  
const mapDispatchToProps = () => ({
});


type Props = {
    blocks: LanguageBlocks;
    block: BodyType;
    blockId: string;
    blockRef?: HTMLDivElement | null;
    visible: boolean;
    locale: string;
    _setVisibilityOfModalColumnEditor: (type: boolean) => void;
}


type Device = 'pc' | 'tablet' | 'mobile';


type State = {
    block: BodyType;
}

class ModalColumnEditor extends Component<Props, State> {
    columnEditor: Array<{ iconClass: string; title: string; device: Device; }>;

    constructor(props: Props){
        super(props)

        this.state = {
            block: JSON.parse(JSON.stringify(props.block))
        }

        this.columnEditor = [
            {
                iconClass: 'mi mi-TVMonitor',
                title: i18n.trans('computer'),
                device: 'pc',
            },
            {
                iconClass: 'mi mi-Tablet',
                title: i18n.trans('tablet'),
                device: 'tablet',
            },
            {
                iconClass: 'mi mi-CellPhone',
                title: i18n.trans('mobile'),
                device: 'mobile',
            }
        ];
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
                swal(i18n.trans('msg_delete_column_with_contents'), {
                    icon: 'error',
                    closeOnClickOutside: false,
                    buttons: [i18n.trans('cancel','capitalize'), i18n.trans('yes','capitalize')]
                }).then((value) => {
                    if(value) this.handleRemoveColumn(colIndex);
                });
            else
                this.handleRemoveColumn(colIndex);

        }else
            swal(i18n.trans('msg_cannot_delete_column_where_only_one'), {
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
        const newState: LanguageBlocks = {...this.props.blocks};

        newState[this.props.locale].find((item)=>{
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
                title={i18n.trans('column_editor','capitalize')}
                visible={this.props.visible}
                getContainer={()=>(this.props.blockRef as HTMLElement)}
                onCancel={()=>this.props._setVisibilityOfModalColumnEditor(false)}
                onOk={this.handleModalSubmit}
                okText="Save change"
                width={1000}
            >
                <div className="pg-build__columnEditor-description"><i className="mi mi-Info"></i>{i18n.trans('msg_column_editor')}</div>
                {this.columnEditor.map((item, index)=>(

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