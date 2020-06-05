import React, {Component} from 'react';
import { ReactSortable } from 'react-sortablejs';
import { BodyType, ColumnType, ContentType, LanguageBlocks } from '../../types/blockType';
import ModalColumnEditor from '../utility/modal-column-editor';
import BlockInside from './block-inside';
import { Menu, Dropdown, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { toggleMenu } from '../../redux/actions/menuAction';
import {
    removeBlock,
    duplicateBlock,
    updateListBlockInside,
    addClassToBlock,
    moveBlock
} from '../../redux/actions/blockAction';
import Modal from '../utility/modal-style';
import { PageBuilder } from 'PageBuilder';
import { BlockPosition } from '../../utils/utils';
import i18n from '../../translations/i18n';


const mapStateToProps = (state: any) => ({
    blocks: state.blocks,
    cssViewShow: state.cssViewShow,
    iframeDocument: state.iframeDocument,
    pageBuilder: state.pageBuilder,
    locale: state.locale
});
  
const mapDispatchToProps = (dispatch: any) => ({
    removeBlock: (blockId: string, locale: string) => dispatch(removeBlock(blockId, locale)),
    duplicateBlock: (blockId: string, locale: string) => dispatch(duplicateBlock(blockId, locale)),
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string, locale: string) => dispatch(updateListBlockInside(blocksInside, blockId, colId, locale)),
    addClassToBlock: (blockId: string, className: string, locale: string) => dispatch(addClassToBlock(blockId, className, locale)),
    handleToggleMenu: (type: boolean) => dispatch(toggleMenu(type)),
    moveBlock: (blockId: string, position: BlockPosition, locale: string) => dispatch(moveBlock(blockId, position, locale))
});

//Dropdown menu class

type PropsDropdownMenuClass = {
    item: BodyType;
    pageBuilder: PageBuilder;
    locale: string;
    addClassToBlock: (blockId: string, className: string,locale: string) => void;
}

const DropdownMenuClass = (props: PropsDropdownMenuClass) => (
    <Menu>
        <Menu.Item className={props.item.class == 'props.item.class' || !props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
            <a onClick={() => props.addClassToBlock(props.item.id, '', props.locale)} >{i18n.trans('no_class','capitalize')}</a>
        </Menu.Item>
        {
            props.pageBuilder.__options!.blockClassList && props.pageBuilder.__options!.blockClassList.map((classItem, index)=> classItem.type != 'block-inside' && (
                <Menu.Item key={index} className={classItem.class == props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
                    <a onClick={() => props.addClassToBlock(props.item.id, classItem.class, props.locale)}>{classItem.label}</a>
                </Menu.Item>
            ))
        }
    </Menu>
);

//Block toolbar

type PropsBlockToolbar = {
    blocks: LanguageBlocks;
    locale: string;
    item: BodyType;
    blockRef?: HTMLDivElement | null;
    pageBuilder: PageBuilder;
    duplicateBlock: (blockId: string, locale: string) => void;
    removeBlock: (blockId: string, locale: string) => void;
    addClassToBlock: (blockId: string, className: string) => void;
    _showModalStyle: () => void;
    _setVisibilityOfModalColumnEditor: (type: boolean) => void;
    moveBlock: (blockId: string, position: BlockPosition, locale: string) => void;
}

const getBlockIndex = (blocks: Array<BodyType>, blockId: string): number => {
    return blocks.findIndex((item: BodyType) => item.id == blockId);
};

const BlockToolbar = (props: PropsBlockToolbar) => {
    
    return  <div className="pg-build__block-tool">
                
                
                {typeof props.item.design == "undefined" || props.item.design.moveable != false && (
                    <Tooltip placement="top" title={i18n.trans('tooltip_move','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <a className="pg-build__block-tool-move"><i className="mi mi-SIPMove"></i></a>
                    </Tooltip>
                )}

                {typeof props.item.design == "undefined" || props.item.design.cssCustomizable != false && (
                    <Tooltip placement="top" title={i18n.trans('tooltip_style','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <a onClick={() => props._showModalStyle()}><i className="mi mi-Edit"></i></a>
                    </Tooltip>
                )}

                {typeof props.item.design == "undefined" || props.item.design.editable != false &&  (
                    <Tooltip placement="top" title={i18n.trans('tooltip_column','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <a onClick={()=>props._setVisibilityOfModalColumnEditor(true)}><i className="mi mi-AspectRatio"></i></a>
                    </Tooltip>
                )}

                {typeof props.item.design == "undefined" || props.item.design.canAddClass != false && (
                    <Tooltip placement="top" title={i18n.trans('tooltip_class','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <Dropdown getPopupContainer={()=> props.blockRef as HTMLElement} overlay={<DropdownMenuClass locale={props.locale} addClassToBlock={props.addClassToBlock} item={props.item} pageBuilder={props.pageBuilder}/>} placement="bottomCenter">
                            <a><i className="mi mi-AsteriskBadge12"></i></a>
                        </Dropdown>
                    </Tooltip>
                )}

                {typeof props.item.design == "undefined" || props.item.design.duplicable != false && (
                    <Tooltip placement="top" title={i18n.trans('tooltip_duplicate','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <a onClick={() => props.duplicateBlock(props.item.id, props.locale)}><i className="mi mi-Copy"></i></a>
                    </Tooltip>
                )}

                {typeof props.item.design == "undefined" || props.item.design.removeable != false && (
                    <Tooltip placement="top" title={i18n.trans('tooltip_remove','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <a onClick={() => props.removeBlock(props.item.id, props.locale)}><i className="mi mi-Delete"></i></a>
                    </Tooltip>
                )}

                {(typeof props.item.design == "undefined" || props.item.design.moveable != false && getBlockIndex(props.blocks[props.locale], props.item.id) != 0) && (
                    <Tooltip placement="top" title={i18n.trans('tooltip_top','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <a onClick={() => props.moveBlock(props.item.id, 'up', props.locale)}><i className="mi mi-Up"></i></a>
                    </Tooltip>
                )}

                {(typeof props.item.design == "undefined" || props.item.design.moveable != false && getBlockIndex(props.blocks[props.locale], props.item.id) != (props.blocks[props.locale].length - 1)) && (
                    <Tooltip placement="top" title={i18n.trans('tooltip_bottom','capitalize')} getPopupContainer={()=> props.blockRef as HTMLElement}>
                        <a onClick={() => props.moveBlock(props.item.id, 'down', props.locale)}><i className="mi mi-Down"></i></a>
                    </Tooltip>
                )}

            </div>;
};

// Block

type Props = {
    locale: string;
    blocks: LanguageBlocks;
    cssViewShow: boolean;
    blockId: string;
    iframeDocument: Document;
    pageBuilder: PageBuilder;
    item: BodyType;
    duplicateBlock: (blockId: string) => void;
    removeBlock: (blockId: string) => void;
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string, locale: string) => void;
    addClassToBlock: (blockId: string, className: string) => void;
    handleToggleMenu: (type: boolean) => void;
    moveBlock: (blockId: string, position: BlockPosition) => void;
};

type State = {
    blockClickedOutside: boolean;
    modalColumnEditorVisible: boolean;
};

class Block extends Component<Props, State> {

    openStyleModal: boolean;
    modalStyle?: any;
    blockRef?: HTMLDivElement | null;

    constructor(props: Props) {
        super(props);

        this.state = {
            blockClickedOutside: true,
            modalColumnEditorVisible: false
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

    _setVisibilityOfModalColumnEditor = (type: boolean) => {
        this.props.handleToggleMenu(false);
        this.setState({
            modalColumnEditorVisible: type,
        });
    }

    render() {
        
        return (
            <div ref={elem => this.blockRef = elem} onFocus={this._handleInside} onBlur={()=>this.setState({ blockClickedOutside: true })} onClick={this._handleInside} data-draggable-id={this.props.item.id} className={'pg-build__block ' + (!this.state.blockClickedOutside ? 'pg-build__block-active' : '') }>
                <div className={this.props.cssViewShow ? this.props.item.class : ''} style={this.props.cssViewShow ? this.props.item.style || {} : {}}>
                    <BlockToolbar locale={this.props.locale} blocks={this.props.blocks} pageBuilder={this.props.pageBuilder} blockRef={this.blockRef} _setVisibilityOfModalColumnEditor={this._setVisibilityOfModalColumnEditor} _showModalStyle={this._showModalStyle} item={this.props.item} removeBlock={this.props.removeBlock} duplicateBlock={this.props.duplicateBlock} addClassToBlock={this.props.addClassToBlock} moveBlock={this.props.moveBlock}/>
                    
                    <Modal onRef={ref => (this.modalStyle = ref)} blockId={this.props.item.id} />
                    <ModalColumnEditor blockId={this.props.item.id} block={this.props.item} _setVisibilityOfModalColumnEditor={this._setVisibilityOfModalColumnEditor} visible={this.state.modalColumnEditorVisible} blockRef={this.blockRef}/>

                    <div className="pg-build__row">
                        {this.props.item.columns.map((column: ColumnType) => {

                            return(
                                <ReactSortable handle=".pg-build__block-inside-tool-move" key={column.id} className={'pg-build__col pg-build__col-' + column.detail.size.pc} list={column.contents} setList={newState =>
                                    this.props.updateListBlockInside(
                                        newState,
                                        this.props.item.id,
                                        column.id,
                                        this.props.locale
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
