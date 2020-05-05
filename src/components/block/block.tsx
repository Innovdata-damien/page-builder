import React, {Component} from 'react';
import { ReactSortable } from 'react-sortablejs';
import { BodyType, ColumnType, ContentType } from '../../types/blockType';
import BlockInside from './block-inside';

// Redux
import { connect } from 'react-redux';
import {
    setBlock,
    removeBlock,
    duplicateBlock,
    updateListBlockInside
} from '../../redux/actions/blockAction';
import Modal from '../utility/modal-style';


const mapStateToProps = (state: any) => ({
    iframeDocument: state.iframeDocument,
    blocks: state.blocks,
    cssViewShow: state.cssViewShow
});
  
const mapDispatchToProps = (dispatch: any) => ({
    setBlock: (blocks: Array<BodyType>) => dispatch(setBlock(blocks)),
    removeBlock: (blockId: string) => dispatch(removeBlock(blockId)),
    duplicateBlock: (blockId: string) => dispatch(duplicateBlock(blockId)),
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => dispatch(updateListBlockInside(blocksInside, blockId, colId))
});


//Block toolbar

type PropsBlockToolbar = {
    item: BodyType;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    _showModalStyle: () => void;
}

const BlockToolbar = (props: PropsBlockToolbar) => {

    return  <div className="pg-build__block-tool">
                <a className="pg-build__block-tool-move"><i className="mi mi-SIPMove"></i></a>
                <a onClick={() => props._showModalStyle()}><i className="mi mi-Edit"></i></a>
                <a onClick={() => props.duplicateBlock(props.item.id)}><i className="mi mi-Copy"></i></a>
                <a onClick={() => props.removeBlock(props.item.id)}><i className="mi mi-Delete"></i></a>
            </div>;
};

// Block

type Props = {
    iframeDocument: Document;
    cssViewShow: boolean;
    blockId: string;
    item: BodyType;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => void;
};

type State = {
    blockClickedOutside: boolean;
};

class Block extends Component<Props, State> {

    openStyleModal: boolean;
    modalStyle?: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            blockClickedOutside: true
        };

        this.openStyleModal = false;

    }

    componentDidMount() {
        this.props.iframeDocument.addEventListener('mousedown', this._handleClickOutside);
    }

    componentWillUnmount() {
        this.props.iframeDocument.removeEventListener('mousedown', this._handleClickOutside);
    }
    
    _handleClickOutside = (e: any) => {
        const blockElement = this.props.iframeDocument.querySelector(`[data-draggable-id='${this.props.item.id}']`);

        if(blockElement != null && !blockElement.contains(e.target)){
            this.setState({ blockClickedOutside: true });
        }

    }

    _handleInside = () => {
        this.setState({ blockClickedOutside: false });
    }

    _showModalStyle = () => {
        this.modalStyle._toggleModal(true);
    }

    render() {
        
        return (
            <div onFocus={this._handleInside} onBlur={()=>this.setState({ blockClickedOutside: true })} onClick={this._handleInside} data-draggable-id={this.props.item.id} className={'pg-build__block ' + (!this.state.blockClickedOutside ? 'pg-build__block-active' : '') }>
                <div style={this.props.cssViewShow ? this.props.item.style || {} : {}}>
                    <BlockToolbar _showModalStyle={this._showModalStyle} item={this.props.item} removeBlock={this.props.removeBlock} duplicateBlock={this.props.duplicateBlock}/>
                    
                    <Modal onRef={ref => (this.modalStyle = ref)} blockId={this.props.item.id} />

                    <div className="pg-build__row">
                        {this.props.item.columns.map((column: ColumnType) => {

                            return(
                                <ReactSortable handle=".pg-build__block-inside-tool-move" key={column.id} className={'pg-build__col pg-build__col-' + column.size} list={column.contents} setList={newState =>
                                    this.props.updateListBlockInside(
                                        newState,
                                        this.props.item.id,
                                        column.id,
                                    )} group="COLUMN" animation={150}>
                                    {column.contents.map((content: any) => {
                                        
                                        return <BlockInside blockId={this.props.blockId} colId={column.id} item={content} key={content.id}/>;
                                        //return <div key={content.id}>fsfeesfs</div>;
                                    })}
                                </ReactSortable>
                            );

                        })}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);
