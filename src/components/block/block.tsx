import React, {Component} from 'react';
import { ReactSortable } from 'react-sortablejs';
import { BodyType, ColumnType, ContentType } from '../../types/blockType';
import BlockInside from './block-inside';
import { Menu, Dropdown } from 'antd';

// Redux
import { connect } from 'react-redux';
import {
    setBlock,
    removeBlock,
    duplicateBlock,
    updateListBlockInside,
    addClassToBlock
} from '../../redux/actions/blockAction';
import Modal from '../utility/modal-style';
import { PageBuilder } from 'PageBuilder';


const mapStateToProps = (state: any) => ({
    blocks: state.blocks,
    cssViewShow: state.cssViewShow,
    iframeDocument: state.iframeDocument,
    pageBuilder: state.pageBuilder
});
  
const mapDispatchToProps = (dispatch: any) => ({
    setBlock: (blocks: Array<BodyType>) => dispatch(setBlock(blocks)),
    removeBlock: (blockId: string) => dispatch(removeBlock(blockId)),
    duplicateBlock: (blockId: string) => dispatch(duplicateBlock(blockId)),
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => dispatch(updateListBlockInside(blocksInside, blockId, colId)),
    addClassToBlock: (blockId: string, className: string) => dispatch(addClassToBlock(blockId, className))
});

//Dropdown menu class

type PropsDropdownMenuClass = {
    item: BodyType;
    pageBuilder: PageBuilder;
    addClassToBlock: (blockId: string, className: string) => void;
}

const DropdownMenuClass = (props: PropsDropdownMenuClass) => (
    <Menu>
        <Menu.Item className={props.item.class == 'props.item.class' || !props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
            <a onClick={() => props.addClassToBlock(props.item.id, '')} >No class</a>
        </Menu.Item>
        {
            props.pageBuilder.__options!.blockClassList && props.pageBuilder.__options!.blockClassList.map((classItem, index)=> classItem.type != 'block-inside' && (
                <Menu.Item key={index} className={classItem.class == props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
                    <a onClick={() => props.addClassToBlock(props.item.id, classItem.class)}>{classItem.label}</a>
                </Menu.Item>
            ))
        }
    </Menu>
);

//Block toolbar

type PropsBlockToolbar = {
    item: BodyType;
    blockRef?: HTMLDivElement | null;
    pageBuilder: PageBuilder;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    addClassToBlock: (blockId: string, className: string) => void;
    _showModalStyle: () => void;
}


const BlockToolbar = (props: PropsBlockToolbar) => {

    return  <div className="pg-build__block-tool">

                <a className="pg-build__block-tool-move"><i className="mi mi-SIPMove"></i></a>
                <a onClick={() => props._showModalStyle()}><i className="mi mi-Edit"></i></a>
                <Dropdown getPopupContainer={()=> props.blockRef as HTMLElement} overlay={<DropdownMenuClass addClassToBlock={props.addClassToBlock} item={props.item} pageBuilder={props.pageBuilder}/>} placement="bottomCenter">
                    <a><i className="mi mi-AsteriskBadge12"></i></a>
                </Dropdown>
                <a onClick={() => props.duplicateBlock(props.item.id)}><i className="mi mi-Copy"></i></a>
                <a onClick={() => props.removeBlock(props.item.id)}><i className="mi mi-Delete"></i></a>

            </div>;
};

// Block

type Props = {
    cssViewShow: boolean;
    blockId: string;
    iframeDocument: Document;
    pageBuilder: PageBuilder;
    item: BodyType;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => void;
    addClassToBlock: (blockId: string, className: string) => void;
};

type State = {
    blockClickedOutside: boolean;
};

class Block extends Component<Props, State> {

    openStyleModal: boolean;
    modalStyle?: any;
    blockRef?: HTMLDivElement | null;

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
            <div ref={elem => this.blockRef = elem} onFocus={this._handleInside} onBlur={()=>this.setState({ blockClickedOutside: true })} onClick={this._handleInside} data-draggable-id={this.props.item.id} className={'pg-build__block ' + (!this.state.blockClickedOutside ? 'pg-build__block-active' : '') }>
                <div className={this.props.cssViewShow ? this.props.item.class : ''} style={this.props.cssViewShow ? this.props.item.style || {} : {}}>
                    <BlockToolbar pageBuilder={this.props.pageBuilder} blockRef={this.blockRef} _showModalStyle={this._showModalStyle} item={this.props.item} removeBlock={this.props.removeBlock} duplicateBlock={this.props.duplicateBlock} addClassToBlock={this.props.addClassToBlock}/>
                    
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
