import React from 'react';
import { ContentType, BlockType } from '../../types/blockType';
import { useSelector, useDispatch } from '../../redux/store';
import { Menu, Dropdown } from 'antd';
import { TinyMCEditor } from '../TinyMCEditor/tinymce-editor';
import getTemplate from '../TinyMCEditor/templates';
import * as utils from '../../utils/utils';
//import { ModalStyle } from '../utility/modal-style';
// import { ContentType } from '../../types/blockType';
// import BlockInsideContent from './block-inside-content';
// import BlockInsideToolbar from './block-inside-toolbar';
// import { connect } from 'react-redux';

// type Props = {
//     cssViewShow: boolean;
//     blockId: string;
//     colId: string;
//     item: ContentType;
//     iframeDocument: Document;
// };

// type State = {
//     blockClickedOutside: boolean;
//     mousedown: boolean;
// };

// const mapStateToProps = (state: any) => ({
//     cssViewShow: state.cssViewShow,
//     iframeDocument: state.iframeDocument
// });

// class BlockInside extends Component<Props,State> {

//     modalStyle?: any;
//     blockInsideRef?: HTMLDivElement | null;

//     constructor(props: Props) {
//         super(props);

//         this.state = {
//             blockClickedOutside: true,
//             mousedown: false
//         };

//     }

//     componentDidMount() {
//         this.props.iframeDocument.addEventListener('mousedown', this._handleClickOutside);
//     }

//     componentWillUnmount() {
//         this.props.iframeDocument.removeEventListener('mousedown', this._handleClickOutside);
//     }
    
//     _handleClickOutside = (e: any) =>  {
//         const blockElement = this.props.iframeDocument.querySelector(`[data-draggable-id='${this.props.item.id}']`);

//         if(blockElement != null && !blockElement.contains(e.target)){
//             this.setState({ blockClickedOutside: true });
//         }

//     }

//     _handleInside = () => {
//         this.setState({ blockClickedOutside: false });
//     }

//     _handleFocusOut = () => {
//         if(this.state.mousedown)
//             this.setState({ mousedown: false });
//         else
//             this.setState({ blockClickedOutside: true });
//     }

//     _handleMouseDown = () => {
//         this.setState({ mousedown: true });
//     }

//     _showModalStyle = () => {
//         this.modalStyle._toggleModal(true);
//     }


//     render() {
//         return (
//             <div ref={elem => this.blockInsideRef = elem} data-sticky-container className={'pg-build__block-inside ' + (!this.state.blockClickedOutside ? 'pg-build__block-inside-active' : '')} onFocus={this._handleInside} onBlur={this._handleFocusOut} onClick={this._handleInside} data-draggable-id={this.props.item.id}>
//                 <div className={this.props.cssViewShow ? this.props.item.class : ''}  style={this.props.cssViewShow ? this.props.item.style || {} : {}}>
//                     <div className="pg-build__block-inside-tool">
                        
//                         <BlockInsideToolbar blockInsideRef={this.blockInsideRef} _showModalStyle={this._showModalStyle} blockId={this.props.blockId} colId={this.props.colId} item={this.props.item} _handleMouseDown={this._handleMouseDown}/>
                        
//                     </div>
//                     <Modal onRef={ref => (this.modalStyle = ref)} blockId={this.props.blockId} colId={this.props.colId} blockInsideId={this.props.item.id}/>
//                     <BlockInsideContent blockId={this.props.blockId} colId={this.props.colId} item={this.props.item}/>
//                 </div>
//             </div>
//         );
//     }
// }
// export default connect(mapStateToProps)(BlockInside);

// ------------------------------ BLOCK INSIDE TOOLBAR

type BlockInsideToolbarProps = {
    blockId: string;
    colId: string;
    blockContentId: string;
    blockContent: ContentType;
};

const BlockInsideToolbar = (props: BlockInsideToolbarProps) => {

    const { blockContentId, blockContent, blockId, colId } = props;
    const blockDOM = document.querySelector(`[data-draggable-id='${blockContentId}']`);

    // Get state
    const {
        blocks,
        pageBuilderInstance
    } = useSelector(( state ) => ({
        blocks: state.block.blocks,
        pageBuilderInstance: state.pageBuilder.instance
    }));

    const dispatch = useDispatch();

    const checkBlockInsidePosition = (blocks: Array<BlockType>, blockId: string, colId: string, blockInsideId: string, type: utils.BlockPosition): boolean => {

        let tab: any = {};
    
        blocks.forEach((block, indexBlock)=>{
    
            if(indexBlock == 0) tab['first_block'] = block.id;
            if(indexBlock == (blocks.length - 1)) tab['last_block'] = block.id;
            
            block.columns.forEach((column, indexCol)=>{
    
                if(indexCol == 0 && indexBlock == 0) tab['first_col'] = column.id;
                if(indexCol == (block.columns.length - 1)) tab['last_col'] = column.id;
    
                column.contents.forEach((content, indexContent)=>{
    
                    if(indexContent == 0 && indexCol == 0 && indexBlock == 0) tab['first_content'] = content.id;
                    if(indexContent == (column.contents.length - 1)) tab['last_content'] = content.id;

                })
            })
        });
    
    
        if(type == 'up' && tab['first_block'] == blockId && tab['first_col'] == colId && tab['first_content'] == blockInsideId )
            return false;
        else if(type == 'down' && tab['last_block'] == blockId && tab['last_col'] == colId && tab['last_content'] == blockInsideId )
            return false;
        else
            return true;
    
    }
    

    const btnMoveableUp = checkBlockInsidePosition(blocks, blockId, colId, blockContentId, 'up');
    const btnMoveableDown = checkBlockInsidePosition(blocks, blockId, colId, blockContentId, 'down');

    return (
        <>

            {typeof blockContent.design == "undefined" || blockContent.design.moveable != false &&
                <a className="pg-build__block-inside-tool-move"><i className="mi mi-SIPMove"></i></a>
            }

            {/* {typeof blockContent.design == "undefined" || blockContent.design.cssCustomizable != false &&
                <a onClick={()=>props._showModalStyle()}><i className="mi mi-Edit"></i></a>
            } */}

            {typeof blockContent.design == "undefined" || blockContent.design.canAddClass != false &&
                <Dropdown getPopupContainer={()=> blockDOM as HTMLElement} overlay={

                    <Menu>
                        <Menu.Item className={blockContent.class == '' || !blockContent.class ? 'pg-build__ant-menu-item-selected' : ''}>
                            <a
                                onClick={()=> dispatch({
                                    type: 'Block/AddClassBlockContent',
                                    blockId,
                                    colId,
                                    blockContentId,
                                    className: ''
                                })}
                            >No class</a>
                        </Menu.Item>
                        {
                            pageBuilderInstance!.__options!.blockClassList && pageBuilderInstance!.__options!.blockClassList.map((classItem, index)=> classItem.type != 'block' && (
                                <Menu.Item key={index} className={classItem.class == blockContent.class ? 'pg-build__ant-menu-item-selected' : ''}>
                                    <a
                                        onClick={()=> dispatch({
                                            type: 'Block/AddClassBlockContent',
                                            blockId,
                                            colId,
                                            blockContentId,
                                            className: classItem.class
                                        })}
                                    >{classItem.label}</a>
                                </Menu.Item>
                            ))
                        }
                    </Menu>

                } placement="bottomCenter">
                    <a><i className="mi mi-AsteriskBadge12"></i></a>
                </Dropdown>
            }

             {typeof blockContent.design == "undefined" || blockContent.design.duplicable != false &&
                <a
                   onClick={()=> dispatch({
                        type: 'Block/DuplicateBlockContent',
                        blockContentId,
                        blockId,
                        colId
                    })}
                ><i className="mi mi-Copy"></i></a>
            }
            {typeof blockContent.design == "undefined" || blockContent.design.removeable != false &&
                <a
                    onClick={()=> dispatch({
                        type: 'Block/RemoveBlockContent',
                        blockContentId,
                        blockId,
                        colId
                    })}
                ><i className="mi mi-Delete"></i></a>
            }

            {(typeof blockContent.design == "undefined" || blockContent.design.moveable != false && btnMoveableUp) &&
                <a 
                    onClick={()=> dispatch({
                        type: 'Block/MoveBlockContent',
                        blockContentId,
                        blockId,
                        colId,
                        position: 'up'
                    })}><i className="mi mi-Up"></i></a>
            }

            {(typeof blockContent.design == "undefined" || blockContent.design.moveable != false && btnMoveableDown) &&
                <a 
                    onClick={()=> dispatch({
                        type: 'Block/MoveBlockContent',
                        blockContentId,
                        blockId,
                        colId,
                        position: 'down'
                    })}><i className="mi mi-Down"></i></a>
            }

        </>
    );
    
}

// ------------------------------ BLOCK INSIDE

type BlockInsideProps = {
    blockId: string;
    colId: string;
    blockContentId: string;
    blockContent: ContentType;
};

const BlockInside = (props: BlockInsideProps) => {

    const { blockContentId, blockContent, colId, blockId } = props;
    const blockDOM = document.querySelector(`[data-draggable-id='${blockContentId}']`);
    //let modalStyle;

    // Get state
    const {
        cssViewShow,
        selectedBlock
    } = useSelector(( state ) => ({
        cssViewShow: state.pageBuilder.cssViewShow,
        selectedBlock: state.block.selectedBlock
    }));

    // State
    
    const dispatch = useDispatch();

    return (
        <div
            data-sticky-container
            className={'pg-build__block-inside ' + (selectedBlock == blockContent  ? 'pg-build__block-inside-active' : '')}
            onClick={() => dispatch({
                type: 'Block/SetSelection',
                selectedBlock: blockContent
            })}
            data-draggable-id={blockContentId}
        >
            <div className={cssViewShow ? blockContent.class : ''}  style={cssViewShow ? blockContent.style || {} : {}}>
                <div className="pg-build__block-inside-tool">
                    
                    <BlockInsideToolbar blockId={blockId} colId={colId} blockContentId={blockContentId} blockContent={blockContent}/>
                    
                </div>
                {(
                    blockContent.design.editable != false ?
                    <TinyMCEditor blockId={blockId} colId={colId} blockContentId={blockContentId} blockContent={blockContent}/>
                     : 
                    <div
                        dangerouslySetInnerHTML={{__html:(blockContent.content ? blockContent.content : ( blockContent.design.type == 'html' ? blockContent.design.value?.htmlContent : getTemplate(blockContent.design.type, blockContent.design.value || {})!.html || '') ) || ''}}
                    ></div>
                )}
                {/* <ModalStyle onRef={ref => (modalStyle = ref)} blockId={blockId} colId={colId} blockContentId={blockContentId}/> */}
            </div>
        </div>
    );

}

export { BlockInside };