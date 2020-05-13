import React, {Component} from 'react';
import { ContentType } from '../../types/blockType';
import { Menu, Dropdown } from 'antd';
import { PageBuilder } from 'PageBuilder';

// Redux

import { connect } from 'react-redux';
import {
    removeBlockInside,
    duplicateBlockInside,
    addClassToBlockInside
} from '../../redux/actions/blockAction';

const mapStateToProps = (state: any) => ({
    pageBuilder: state.pageBuilder
});
  
const mapDispatchToProps = (dispatch: any) => ({
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string) => dispatch(removeBlockInside(blockId, colId, blockInsideId)),
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string) => dispatch(duplicateBlockInside(blockId, colId, blockInsideId)),
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string) => dispatch(addClassToBlockInside(blockId, colId, blockInsideId, className))
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
    blockInsideRef?: HTMLDivElement | null;
    item: ContentType;
    pageBuilder: PageBuilder;
    _showModalStyle: () => void;
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string) => void;
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string) => void;
    addClassToBlockInside: (blockId: string, colId: string, blockInsideId: string, className: string) => void;
    _handleMouseDown: any;
};

type State = {

};


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

        return (
            <>

                {this.props.item.design.moveable != false && <a onMouseDown={this.props._handleMouseDown} className="pg-build__block-inside-tool-move"><i className="mi mi-SIPMove"></i></a>}
                {this.props.item.design.cssCustomizable != false && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props._showModalStyle()}><i className="mi mi-Edit"></i></a>}
                {this.props.item.design.canAddClass != false &&
                    <Dropdown getPopupContainer={()=> this.props.blockInsideRef as HTMLElement} overlay={

                        <DropdownMenuClass _handleMouseDown={this.props._handleMouseDown} addClassToBlockInside={this.props.addClassToBlockInside} item={this.props.item} pageBuilder={this.props.pageBuilder} blockId={this.props.blockId}  colId={this.props.colId}/>

                    } placement="bottomCenter">
                        <a onMouseDown={this.props._handleMouseDown}><i className="mi mi-AsteriskBadge12"></i></a>
                    </Dropdown>
                }
                {this.props.item.design.duplicable != false && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.duplicateBlockInside(this.props.blockId, this.props.colId, this.props.item.id)}><i className="mi mi-Copy"></i></a>}
                {this.props.item.design.removeable != false && <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.removeBlockInside(this.props.blockId, this.props.colId, this.props.item.id)}><i className="mi mi-Delete"></i></a>}

            </>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlockInsideToolbar);