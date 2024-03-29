import React, {Component} from 'react';
import { ContentType, BodyType, ColumnType } from '../../types/blockType';
import { Menu, Dropdown } from 'antd';
import { PageBuilder } from 'PageBuilder';

// Redux

import { connect } from 'react-redux';
import {
    removeBlockInside,
    duplicateBlockInside,
    addClassToBlockInside,
    moveBlockInside
} from '../../redux/actions/blockAction';
import { BlockPosition } from 'utils/utils';

const mapStateToProps = (state: any) => ({
    pageBuilder: state.pageBuilder,
    blocks: state.blocks
});
  
const mapDispatchToProps = (dispatch: any) => ({
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string) => dispatch(removeBlockInside(blockId, colId, blockInsideId)),
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string) => dispatch(duplicateBlockInside(blockId, colId, blockInsideId)),
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string) => dispatch(addClassToBlockInside(blockId, colId, blockInsideId, className)),
    moveBlockInside: (blockId: string, colId: string, blockInsideId: string, position: BlockPosition) => dispatch(moveBlockInside(blockId, colId, blockInsideId, position)),
});


//Dropdown menu class

type PropsDropdownMenuClass = {
    item: ContentType;
    pageBuilder: PageBuilder;
    colId: string;
    blockId: string;
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string) => void;
    _handleMouseDown: any;
}

const DropdownMenuClass = (props: PropsDropdownMenuClass) => (
    <Menu>
        <Menu.Item className={props.item.class == 'props.item.class' || !props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
            <a onClick={() => props.addClassToBlockInside(props.blockId, props.colId, props.item.id, '')} >No class</a>
        </Menu.Item>
        {
            props.pageBuilder.__options!.blockClassList && props.pageBuilder.__options!.blockClassList.map((classItem, index)=> classItem.type != 'block' && (
                <Menu.Item key={index} className={classItem.class == props.item.class ? 'pg-build__ant-menu-item-selected' : ''}>
                    <a onMouseDown={props._handleMouseDown} onClick={() => props.addClassToBlockInside(props.blockId, props.colId, props.item.id, classItem.class)}>{classItem.label}</a>
                </Menu.Item>
            ))
        }
    </Menu>
);

// Block Inside Toolbar

type Props = {
    colId: string;
    blockId: string;
    blocks: Array<BodyType>;
    blockInsideRef?: HTMLDivElement | null;
    item: ContentType;
    pageBuilder: PageBuilder;
    _showModalStyle: () => void;
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string) => void;
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string) => void;
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string) => void;
    moveBlockInside: (blockId: string, colId: string, blockInsideId: string, position: BlockPosition) => void;
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
        const btnMoveableUp = checkBlockInsidePosition(this.props.blocks, this.props.blockId, this.props.colId, this.props.item.id, 'up');
        const btnMoveableDown = checkBlockInsidePosition(this.props.blocks, this.props.blockId, this.props.colId, this.props.item.id, 'down');

        return (
            <>

                {typeof this.props.item.design == "undefined" || this.props.item.design.moveable != false && <a onMouseDown={this.props._handleMouseDown} className="pg-build__block-inside-tool-move"><i className="mi mi-SIPMove"></i></a>}
                {typeof this.props.item.design == "undefined" || this.props.item.design.cssCustomizable != false && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props._showModalStyle()}><i className="mi mi-Edit"></i></a>}
                {typeof this.props.item.design == "undefined" || this.props.item.design.canAddClass != false &&
                    <Dropdown getPopupContainer={()=> this.props.blockInsideRef as HTMLElement} overlay={

                        <DropdownMenuClass _handleMouseDown={this.props._handleMouseDown} addClassToBlockInside={this.props.addClassToBlockInside} item={this.props.item} pageBuilder={this.props.pageBuilder} blockId={this.props.blockId}  colId={this.props.colId}/>

                    } placement="bottomCenter">
                        <a onMouseDown={this.props._handleMouseDown}><i className="mi mi-AsteriskBadge12"></i></a>
                    </Dropdown>
                }
                {typeof this.props.item.design == "undefined" || this.props.item.design.duplicable != false && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.duplicateBlockInside(this.props.blockId, this.props.colId, this.props.item.id)}><i className="mi mi-Copy"></i></a>}
                {typeof this.props.item.design == "undefined" || this.props.item.design.removeable != false && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.removeBlockInside(this.props.blockId, this.props.colId, this.props.item.id)}><i className="mi mi-Delete"></i></a>}

                {(typeof this.props.item.design == "undefined" || this.props.item.design.moveable != false && btnMoveableUp) && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.moveBlockInside(this.props.blockId, this.props.colId, this.props.item.id, 'up')}><i className="mi mi-Up"></i></a>}
                {(typeof this.props.item.design == "undefined" || this.props.item.design.moveable != false && btnMoveableDown) && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.moveBlockInside(this.props.blockId, this.props.colId, this.props.item.id, 'down')}><i className="mi mi-Down"></i></a>}
            </>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlockInsideToolbar);