import React, { useState, useEffect } from 'react';
import { BlockType } from '../../types/blockType';
import { useSelector, useDispatch } from '../../redux/store';
import * as utils from '../../utils/utils';
// import { ReactSortable } from 'react-sortablejs';
// import { BodyType, ColumnType, ContentType } from '../../types/blockType';
// import ModalColumnEditor from '../utility/modal-column-editor';
// import BlockInside from './block-inside';
// import { Menu, Dropdown } from 'antd';
// import { connect } from 'react-redux';
// import { toggleMenu } from '../../redux/actions/menuAction';
// import {
//     setBlock,
//     removeBlock,
//     duplicateBlock,
//     updateListBlockInside,
//     addClassToBlock,
//     moveBlock
// } from '../../redux/actions/blockAction';
// import Modal from '../utility/modal-style';
// import { PageBuilder } from 'PageBuilder';


// const mapStateToProps = (state: any) => ({
//     blocks: state.blocks,
//     cssViewShow: state.cssViewShow,
//     iframeDocument: state.iframeDocument,
//     pageBuilder: state.pageBuilder
// });
  
// const mapDispatchToProps = (dispatch: any) => ({
//     setBlock: (blocks: Array<BodyType>) => dispatch(setBlock(blocks)),
//     removeBlock: (blockId: string) => dispatch(removeBlock(blockId)),
//     duplicateBlock: (blockId: string) => dispatch(duplicateBlock(blockId)),
//     updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => dispatch(updateListBlockInside(blocksInside, blockId, colId)),
//     addClassToBlock: (blockId: string, className: string) => dispatch(addClassToBlock(blockId, className)),
//     handleToggleMenu: (type: boolean) => dispatch(toggleMenu(type)),
//     moveBlock: (blockId: string, position: BlockPosition) => dispatch(moveBlock(blockId, position))
// });

// //Dropdown menu class

// type PropsDropdownMenuClass = {
//     item: BodyType;
//     pageBuilder: PageBuilder;
//     addClassToBlock: (blockId: string, className: string) => void;
// }

// const DropdownMenuClass = (props: PropsDropdownMenuClass) => (
//     <Menu>
//         <Menu.Item className={props.item.class == 'props.item.class' || !props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
//             <a onClick={() => props.addClassToBlock(props.item.id, '')} >No class</a>
//         </Menu.Item>
//         {
//             props.pageBuilder.__options!.blockClassList && props.pageBuilder.__options!.blockClassList.map((classItem, index)=> classItem.type != 'block-inside' && (
//                 <Menu.Item key={index} className={classItem.class == props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
//                     <a onClick={() => props.addClassToBlock(props.item.id, classItem.class)}>{classItem.label}</a>
//                 </Menu.Item>
//             ))
//         }
//     </Menu>
// );

// //Block toolbar

// type PropsBlockToolbar = {
//     blocks: Array<BodyType>;
//     item: BodyType;
//     blockRef?: HTMLDivElement | null;
//     pageBuilder: PageBuilder;
//     duplicateBlock: (blockId: string) => void;
//     removeBlock: (blockId: string) => void;
//     addClassToBlock: (blockId: string, className: string) => void;
//     _showModalStyle: () => void;
//     _setVisibilityOfModalColumnEditor: (type: boolean) => void;
//     moveBlock: (blockId: string, position: BlockPosition) => void;
// }

// const getBlockIndex = (blocks: Array<BodyType>, blockId: string): number => {
//     return blocks.findIndex((item: BodyType) => item.id == blockId);
// };

// const BlockToolbar = (props: PropsBlockToolbar) => {

//     return  <div className="pg-build__block-tool">
                
                
//                 {typeof props.item.design == "undefined" || props.item.design.moveable != false && <a className="pg-build__block-tool-move"><i className="mi mi-SIPMove"></i></a>}
//                 {typeof props.item.design == "undefined" || props.item.design.cssCustomizable != false && <a onClick={() => props._showModalStyle()}><i className="mi mi-Edit"></i></a>}
//                 {typeof props.item.design == "undefined" || props.item.design.editable != false &&  <a onClick={()=>props._setVisibilityOfModalColumnEditor(true)}><i className="mi mi-AspectRatio"></i></a>}

//                 {typeof props.item.design == "undefined" || props.item.design.canAddClass != false &&
//                     <Dropdown getPopupContainer={()=> props.blockRef as HTMLElement} overlay={<DropdownMenuClass addClassToBlock={props.addClassToBlock} item={props.item} pageBuilder={props.pageBuilder}/>} placement="bottomCenter">
//                         <a><i className="mi mi-AsteriskBadge12"></i></a>
//                     </Dropdown>
//                 }

//                 {typeof props.item.design == "undefined" || props.item.design.duplicable != false && <a onClick={() => props.duplicateBlock(props.item.id)}><i className="mi mi-Copy"></i></a>}
//                 {typeof props.item.design == "undefined" || props.item.design.removeable != false && <a onClick={() => props.removeBlock(props.item.id)}><i className="mi mi-Delete"></i></a>}

//                 {(typeof props.item.design == "undefined" || props.item.design.moveable != false && getBlockIndex(props.blocks, props.item.id) != 0) && <a onClick={() => props.moveBlock(props.item.id, 'up')}><i className="mi mi-Up"></i></a>}
//                 {(typeof props.item.design == "undefined" || props.item.design.moveable != false && getBlockIndex(props.blocks, props.item.id) != (props.blocks.length - 1)) && <a onClick={() => props.moveBlock(props.item.id, 'down')}><i className="mi mi-Down"></i></a>}

//             </div>;
// };

// // Block

// type Props = {
//     blocks: Array<BodyType>;
//     cssViewShow: boolean;
//     blockId: string;
//     iframeDocument: Document;
//     pageBuilder: PageBuilder;
//     item: BodyType;
//     duplicateBlock: (blockId: string) => void;
//     removeBlock: (blockId: string) => void;
//     updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => void;
//     addClassToBlock: (blockId: string, className: string) => void;
//     handleToggleMenu: (type: boolean) => void;
//     moveBlock: (blockId: string, position: BlockPosition) => void;
// };

// type State = {
//     blockClickedOutside: boolean;
//     modalColumnEditorVisible: boolean;
// };

// class Block extends Component<Props, State> {

//     openStyleModal: boolean;
//     modalStyle?: any;
//     blockRef?: HTMLDivElement | null;

//     constructor(props: Props) {
//         super(props);

//         this.state = {
//             blockClickedOutside: true,
//             modalColumnEditorVisible: false
//         };

//         this.openStyleModal = false;

//     }

//     componentDidMount() {
//         this.props.iframeDocument.addEventListener('mousedown', this._handleClickOutside);
//     }

//     componentWillUnmount() {
//         this.props.iframeDocument.removeEventListener('mousedown', this._handleClickOutside);
//     }
    
//     _handleClickOutside = (e: any) => {
//         const blockElement = this.props.iframeDocument.querySelector(`[data-draggable-id='${this.props.item.id}']`);

//         if(blockElement != null && !blockElement.contains(e.target)){
//             this.setState({ blockClickedOutside: true });
//         }

//     }

//     _handleInside = () => {
//         this.setState({ blockClickedOutside: false });
//     }

//     _showModalStyle = () => {
//         this.modalStyle._toggleModal(true);
//     }

//     _setVisibilityOfModalColumnEditor = (type: boolean) => {
//         this.props.handleToggleMenu(false);
//         this.setState({
//             modalColumnEditorVisible: type,
//         });
//     }

//     render() {
        
//         return (
//             <div ref={elem => this.blockRef = elem} onFocus={this._handleInside} onBlur={()=>this.setState({ blockClickedOutside: true })} onClick={this._handleInside} data-draggable-id={this.props.item.id} className={'pg-build__block ' + (!this.state.blockClickedOutside ? 'pg-build__block-active' : '') }>
//                 <div className={this.props.cssViewShow ? this.props.item.class : ''} style={this.props.cssViewShow ? this.props.item.style || {} : {}}>
//                     <BlockToolbar blocks={this.props.blocks} pageBuilder={this.props.pageBuilder} blockRef={this.blockRef} _setVisibilityOfModalColumnEditor={this._setVisibilityOfModalColumnEditor} _showModalStyle={this._showModalStyle} item={this.props.item} removeBlock={this.props.removeBlock} duplicateBlock={this.props.duplicateBlock} addClassToBlock={this.props.addClassToBlock} moveBlock={this.props.moveBlock}/>
                    
//                     <Modal onRef={ref => (this.modalStyle = ref)} blockId={this.props.item.id} />
//                     <ModalColumnEditor blockId={this.props.item.id} block={this.props.item} _setVisibilityOfModalColumnEditor={this._setVisibilityOfModalColumnEditor} visible={this.state.modalColumnEditorVisible} blockRef={this.blockRef}/>

//                     <div className="pg-build__row">
//                         {this.props.item.columns.map((column: ColumnType) => {

//                             return(
//                                 <ReactSortable handle=".pg-build__block-inside-tool-move" key={column.id} className={'pg-build__col pg-build__col-' + column.detail.size.pc} list={column.contents} setList={newState =>
//                                     this.props.updateListBlockInside(
//                                         newState,
//                                         this.props.item.id,
//                                         column.id,
//                                     )} group="COLUMN" animation={150}>
//                                     {column.contents.map((content: any) => {
                                        
//                                         return <BlockInside blockId={this.props.blockId} colId={column.id} item={content} key={content.id}/>;
//                                         //return <div key={content.id}>fsfeesfs</div>;
//                                     })}
//                                 </ReactSortable>
//                             );

//                         })}
//                     </div>
//                 </div>
                
//             </div>
//         );
//     }
// }

// ------------------------------ BLOCK TOOLBAR

type BlockToolbarProps = {
    blockId: string;
    block: BlockType;
};

const BlockToolbar = (props: BlockToolbarProps) => {

    const { blockId, block } = props;
    const blockDOM = document.querySelector(`[data-draggable-id='${blockId}']`);

    // Get state
    const {
        blocks
    } = useSelector(( state ) => ({
        blocks: state.block.blocks
    }));
    
    const dispatch = useDispatch();

    return  (
        <div className="pg-build__block-tool">
                    
            {typeof block.design == "undefined" || block.design.moveable != false && 
                <a className="pg-build__block-tool-move"><i className="mi mi-SIPMove"></i></a>
            }
            {/* {typeof block.design == "undefined" || block.design.cssCustomizable != false &&
                <a onClick={() => props._showModalStyle()}><i className="mi mi-Edit"></i></a>
            }
            {typeof block.design == "undefined" || block.design.editable != false &&
                <a onClick={()=>props._setVisibilityOfModalColumnEditor(true)}><i className="mi mi-AspectRatio"></i></a>
            }

            {typeof block.design == "undefined" || block.design.canAddClass != false &&
                <Dropdown getPopupContainer={()=> props.blockRef as HTMLElement} overlay={<DropdownMenuClass addClassToBlock={props.addClassToBlock} block={props.block} pageBuilder={props.pageBuilder}/>} placement="bottomCenter">
                    <a><i className="mi mi-AsteriskBadge12"></i></a>
                </Dropdown>
            }

            {typeof block.design == "undefined" || block.design.duplicable != false &&
                <a onClick={() => props.duplicateBlock(blockId)}><i className="mi mi-Copy"></i></a>
            }
            {typeof block.design == "undefined" || block.design.removeable != false &&
                <a onClick={() => props.removeBlock(blockId)}><i className="mi mi-Delete"></i></a>
            } */}

            {(typeof block.design == "undefined" || block.design.moveable != false && utils.getIndex(blocks, blockId) != 0) &&
                <a onClick={
                    ()=> dispatch({
                        type: 'Block/MoveBlock',
                        blockId,
                        position: 'up'
                    })
                } ><i className="mi mi-Up"></i></a>
            }
            {(typeof block.design == "undefined" || block.design.moveable != false && utils.getIndex(blocks, blockId) != (blocks.length - 1)) &&
                <a onClick={
                    ()=> dispatch({
                        type: 'Block/MoveBlock',
                        blockId,
                        position: 'down'
                    })
                } ><i className="mi mi-Down"></i></a>
            }
            {/* {(typeof block.design == "undefined" || block.design.moveable != false && getBlockIndex(props.blocks, blockId) != (props.blocks.length - 1)) &&
                <a onClick={() => props.moveBlock(blockId, 'down')}><i className="mi mi-Down"></i></a>
            } */}

        </div>
    );
}

// ------------------------------ BLOCK

type BlockProps = {
    blockId: string;
    block: BlockType;
};

const Block = (props: BlockProps) => {

    const { blockId, block } = props;
    const blockDOM = document.querySelector(`[data-draggable-id='${blockId}']`);

    // Methods
    const handleClickOutside = (e: any) => {

        if(blockDOM != null && !blockDOM.contains(e.target))
            toggleClickOutside(true);
            
    };

    // DidMount
    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        // UnMount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    });

    // State
    const [blockClickedOutside, toggleClickOutside] = useState<boolean>(true);

    // Get state
    const {
        cssViewShow
    } = useSelector(( state ) => ({
        cssViewShow: state.pageBuilder.cssViewShow
    }));

    // Render
    return (
        <div
            data-draggable-id={props.block.id}
            onFocus={() => toggleClickOutside(false)}
            onBlur={() => toggleClickOutside(true)}
            onClick={() => toggleClickOutside(false)}
            className={`pg-build__block ${(!blockClickedOutside ? 'pg-build__block-active' : '')}`}
        >
            <div
                className={cssViewShow ? props.block.class : ''}
                style={cssViewShow ? props.block.style || {} : {}}
            >
                <BlockToolbar
                    blockId={blockId}
                    block={block}
                    // blocks={this.props.blocks}
                    // pageBuilder={this.props.pageBuilder}
                    // blockRef={this.blockRef}
                    // _setVisibilityOfModalColumnEditor={this._setVisibilityOfModalColumnEditor}
                    // _showModalStyle={this._showModalStyle}
                    // item={this.props.item}
                    // removeBlock={this.props.removeBlock}
                    // duplicateBlock={this.props.duplicateBlock}
                    // addClassToBlock={this.props.addClassToBlock}
                    // moveBlock={this.props.moveBlock}
                />

                <div className="pg-build__row">
                    {block.columns.map((column) => {

                        return <div key={column.id}>{column.id}</div>;
                        // return(
                        //     <ReactSortable handle=".pg-build__block-inside-tool-move" key={column.id} className={'pg-build__col pg-build__col-' + column.detail.size.pc} list={column.contents} setList={newState =>
                        //         this.props.updateListBlockInside(
                        //             newState,
                        //             this.props.item.id,
                        //             column.id,
                        //         )} group="COLUMN" animation={150}>
                        //         {column.contents.map((content: any) => {
                                    
                        //             return <BlockInside blockId={this.blockId} colId={column.id} item={content} key={content.id}/>;
                        //             //return <div key={content.id}>fsfeesfs</div>;
                        //         })}
                        //     </ReactSortable>
                        // );
                    })}
                </div>

            </div>
        </div>
    );

    // return (
    //     <div ref={elem => this.blockRef = elem} onFocus={this._handleInside} onBlur={()=>this.setState({ blockClickedOutside: true })} onClick={this._handleInside} data-draggable-id={this.props.item.id} className={'pg-build__block ' + (!this.state.blockClickedOutside ? 'pg-build__block-active' : '') }>
    //         <div className={this.props.cssViewShow ? this.props.item.class : ''} style={this.props.cssViewShow ? this.props.item.style || {} : {}}>
    //             <BlockToolbar blocks={this.props.blocks} pageBuilder={this.props.pageBuilder} blockRef={this.blockRef} _setVisibilityOfModalColumnEditor={this._setVisibilityOfModalColumnEditor} _showModalStyle={this._showModalStyle} item={this.props.item} removeBlock={this.props.removeBlock} duplicateBlock={this.props.duplicateBlock} addClassToBlock={this.props.addClassToBlock} moveBlock={this.props.moveBlock}/>
                
    //             <Modal onRef={ref => (this.modalStyle = ref)} blockId={this.props.item.id} />
    //             <ModalColumnEditor blockId={this.props.item.id} block={this.props.item} _setVisibilityOfModalColumnEditor={this._setVisibilityOfModalColumnEditor} visible={this.state.modalColumnEditorVisible} blockRef={this.blockRef}/>

    //             <div className="pg-build__row">
    //                 {this.props.item.columns.map((column: ColumnType) => {

    //                     return(
    //                         <ReactSortable handle=".pg-build__block-inside-tool-move" key={column.id} className={'pg-build__col pg-build__col-' + column.detail.size.pc} list={column.contents} setList={newState =>
    //                             this.props.updateListBlockInside(
    //                                 newState,
    //                                 this.props.item.id,
    //                                 column.id,
    //                             )} group="COLUMN" animation={150}>
    //                             {column.contents.map((content: any) => {
                                    
    //                                 return <BlockInside blockId={this.blockId} colId={column.id} item={content} key={content.id}/>;
    //                                 //return <div key={content.id}>fsfeesfs</div>;
    //                             })}
    //                         </ReactSortable>
    //                     );

    //                 })}
    //             </div>
    //         </div>
            
    //     </div>
    // );
    
};

export { Block };

// export default connect(mapStateToProps, mapDispatchToProps)(Block);
