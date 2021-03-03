import React, {Component} from 'react';
import { ContentType, BodyType, ColumnType, LanguageBlocks } from '../../types/blockType';
import { Menu, Dropdown, Tooltip } from 'antd';
import { PageBuilder, LanguagesList } from 'PageBuilder';

// Redux

import { connect } from 'react-redux';
import {
    removeBlockInside,
    duplicateBlockInside,
    addClassToBlockInside,
    moveBlockInside
} from '../../redux/actions/blockAction';
import { BlockPosition } from 'utils/utils';
import i18n from '../../translations/i18n';

const mapStateToProps = (state: any) => ({
    pageBuilder: state.pageBuilder,
    blocks: state.blocks,
    locale: state.locale
});
  
const mapDispatchToProps = (dispatch: any) => ({
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string, locale: string) => dispatch(removeBlockInside(blockId, colId, blockInsideId, locale)),
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string, locale: string) => dispatch(duplicateBlockInside(blockId, colId, blockInsideId, locale)),
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string, locale: string) => dispatch(addClassToBlockInside(blockId, colId, blockInsideId, className, locale)),
    moveBlockInside: (blockId: string, colId: string, blockInsideId: string, position: BlockPosition, locale: string) => dispatch(moveBlockInside(blockId, colId, blockInsideId, position, locale)),
});


//Dropdown menu class

type PropsDropdownMenuClass = {
    item: ContentType;
    pageBuilder: PageBuilder;
    colId: string;
    blockId: string;
    locale: string;
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string, locale: string) => void;
    _handleMouseDown: any;
}

const DropdownMenuClass = (props: PropsDropdownMenuClass) => (
    <Menu>
        <Menu.Item className={props.item.class == 'props.item.class' || !props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
            <a onClick={() => props.addClassToBlockInside(props.blockId, props.colId, props.item.id, '', props.locale)} >{i18n.trans('no_class','capitalize')}</a>
        </Menu.Item>
        {
            props.pageBuilder.__options!.blockClassList && props.pageBuilder.__options!.blockClassList.map((classItem, index)=> classItem.type != 'block' && (
                <Menu.Item key={index} className={classItem.class == props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
                    <a onMouseDown={props._handleMouseDown} onClick={() => props.addClassToBlockInside(props.blockId, props.colId, props.item.id, classItem.class, props.locale)}>{classItem.label}</a>
                </Menu.Item>
            ))
        }
    </Menu>
);

// Block Inside Toolbar

type Props = {
    colId: string;
    blockId: string;
    blocks: LanguageBlocks;
    locale: string;
    blockInsideRef?: HTMLDivElement | null;
    item: ContentType;
    pageBuilder: PageBuilder;
    _showModalStyle: () => void;
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string, locale: string) => void;
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string, locale: string) => void;
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string) => void;
    moveBlockInside: (blockId: string, colId: string, blockInsideId: string, position: BlockPosition, locale: string) => void;
    _handleMouseDown: any;
};

type State = {

};

const checkBlockInsidePosition = (blocks: Array<BodyType>, blockId: string, colId: string, blockInsideId: string, type: BlockPosition): boolean => {

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
                //contentList.push(content);
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

class BlockInsideToolbar extends Component<Props, State> {

    buttonsByBlockType: any;

    constructor(props: Props) {
        super(props);

        this.buttonsByBlockType = null;

    }

    // All block

    _handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    _handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render () {
        const btnMoveableUp = checkBlockInsidePosition(this.props.blocks[this.props.locale], this.props.blockId, this.props.colId, this.props.item.id, 'up');
        const btnMoveableDown = checkBlockInsidePosition(this.props.blocks[this.props.locale], this.props.blockId, this.props.colId, this.props.item.id, 'down');

        const toolTipPlacement = this.props.pageBuilder.__options?.menuPosition == 'right' ? 'left' : 'right';


        let customButtons = null;
        if(this.props.pageBuilder.__options!.customToolActions.length > 0){

            const customName: any = this.props.item.design.customName?.split('.')[0];
            const customNameAll = customName + '.[*]';

            const customButtonsToshow = this.props.pageBuilder.__options!.customToolActions.filter(customAction => customAction.type.includes(customName) || customAction.type.includes(customNameAll));
            customButtons = customButtonsToshow.map((tool, key)=>(
                <Tooltip placement={toolTipPlacement} key={key} title={i18n.trans(tool.name,'capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                    <a onMouseDown={this.props._handleMouseDown} onClick={() => tool.action(this.props.item)}><i className={tool.icon}></i></a>
                </Tooltip>
            ))
        }

        return (
            <>

                {typeof this.props.item.design == "undefined" || this.props.item.design.moveable != false && (
                    <Tooltip placement={toolTipPlacement} title={i18n.trans('tooltip_move','capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                        <a onMouseDown={this.props._handleMouseDown} className="pg-build__block-inside-tool-move"><i className="mi mi-SIPMove"></i></a>
                    </Tooltip>
                )}

                {customButtons}

                {typeof this.props.item.design == "undefined" || this.props.item.design.cssCustomizable != false && (
                    <Tooltip placement={toolTipPlacement} title={i18n.trans('tooltip_style','capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                        <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props._showModalStyle()}><i className="mi mi-PenWorkspace"></i></a>
                    </Tooltip>
                )}
                

                {typeof this.props.item.design == "undefined" || this.props.item.design.canAddClass != false &&
                    <Tooltip placement={toolTipPlacement} title={i18n.trans('tooltip_class','capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                        <Dropdown getPopupContainer={()=> this.props.blockInsideRef as HTMLElement} overlay={

                            <DropdownMenuClass locale={this.props.locale} _handleMouseDown={this.props._handleMouseDown} addClassToBlockInside={this.props.addClassToBlockInside} item={this.props.item} pageBuilder={this.props.pageBuilder} blockId={this.props.blockId}  colId={this.props.colId}/>

                        } placement="bottomCenter">
                            <a onMouseDown={this.props._handleMouseDown}><i className="mi mi-AsteriskBadge12"></i></a>
                        </Dropdown>
                    </Tooltip>
                }
                {typeof this.props.item.design == "undefined" || this.props.item.design.duplicable != false && (
                    <Tooltip placement={toolTipPlacement} title={i18n.trans('tooltip_duplicate','capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                        <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.duplicateBlockInside(this.props.blockId, this.props.colId, this.props.item.id, this.props.locale)}><i className="mi mi-Copy"></i></a>
                    </Tooltip>
                )}
                {typeof this.props.item.design == "undefined" || this.props.item.design.removeable != false && (
                    <Tooltip placement={toolTipPlacement} title={i18n.trans('tooltip_remove','capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                        <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.removeBlockInside(this.props.blockId, this.props.colId, this.props.item.id, this.props.locale)}><i className="mi mi-Delete"></i></a>
                    </Tooltip>
                )}

                {(typeof this.props.item.design == "undefined" || this.props.item.design.moveable != false && btnMoveableUp) && (
                    <Tooltip placement={toolTipPlacement} title={i18n.trans('tooltip_top','capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                        <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.moveBlockInside(this.props.blockId, this.props.colId, this.props.item.id, 'up', this.props.locale)}><i className="mi mi-Up"></i></a>
                    </Tooltip>
                )}

                {(typeof this.props.item.design == "undefined" || this.props.item.design.moveable != false && btnMoveableDown) && (
                    <Tooltip placement={toolTipPlacement} title={i18n.trans('tooltip_bottom','capitalize')} getPopupContainer={()=> this.props.blockInsideRef as HTMLElement}>
                        <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.moveBlockInside(this.props.blockId, this.props.colId, this.props.item.id, 'down', this.props.locale)}><i className="mi mi-Down"></i></a>
                    </Tooltip>
                )}
            </>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlockInsideToolbar);