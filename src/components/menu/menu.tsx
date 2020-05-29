import React, { Component } from 'react';
import MenuItem from './menu-item';
import { ReactSortable } from 'react-sortablejs';
import { PageBuilder } from '../../PageBuilder';
import Collapse from '@kunukn/react-collapse';
import uuid from 'uuid/v4';


// Redux
import { connect } from 'react-redux';
import {
    toggleMenu,
    updateListMenu
} from '../../redux/actions/menuAction';
import { MenuType, BlockMenuType } from 'types/blockType';


const mapStateToProps = (state: any) => ({
    toggleMenu: state.toggleMenu,
    menuItems: state.menuItems,
    pageBuilder: state.pageBuilder
});

const mapDispatchToProps = (dispatch: any) => ({
    handleToggleMenu: (type: boolean) => dispatch(toggleMenu(type)),
    updateListMenu: (menuItemsBlock: Array<BlockMenuType>, headId: string) => dispatch(updateListMenu(menuItemsBlock, headId)),
});

// MENU TITLE

type PropsMenuTitle = {
    label: string;
    _handleToggleCollapse: (index: string | null) => void;
    collapseIndex: string | null;
    collapse: boolean;
    open: boolean;
};

const MenuTitle = (props: PropsMenuTitle) => {
    return <div className={'pg-build__menu-title ' + (props.collapse ? 'pg-build__menu-title-collapse': '') + ' ' + (props.collapse && props.open ? 'pg-build__menu-title-collapse__open' : '')} onClick={() => props.collapse && props._handleToggleCollapse(props.collapseIndex)}>{props.label}</div>;
}

// MENU

type Props = {
    toggleMenu: boolean;
    handleToggleMenu: (type: boolean) => void;
    updateListMenu: (menuItemsBlock: Array<BlockMenuType>, headId: string) => void;
    menuItems: Array<MenuType>,
    pageBuilder: PageBuilder
};

type State = {
    toggleCollapseIndex: string | null
};

class Menu extends Component<Props, State>{

    constructor(props: Props){
        super(props);

        this.state = {
            toggleCollapseIndex: null
        }

    }

    _handleToggleCollapse = (index: string | null) => {
        this.setState({ toggleCollapseIndex: this.state.toggleCollapseIndex === index ? null : index });
    }

    render () {
        
        return (
            <div className={'pg-build__menu ' + (this.props.toggleMenu ? 'pg-build__menu-active' : '')}>

                <a onClick={()=> this.props.handleToggleMenu(!this.props.toggleMenu)} className="pg-build__menu-toggle"><i className={'mi mi-Chevron' + (this.props.pageBuilder.__options?.menuPosition == 'right' ? (this.props.toggleMenu ? 'Right' : 'Left') : (this.props.toggleMenu ? 'Left' : 'Right'))}></i></a>

                {this.props.menuItems.map((itemHead: MenuType) => {

                    return(
                        <div className="pg-build__menu-group-container" key={itemHead.id}>
                            <MenuTitle key={itemHead.id} label={itemHead.title} open={this.state.toggleCollapseIndex === itemHead.id} collapse={itemHead.collapse || false} _handleToggleCollapse={this._handleToggleCollapse} collapseIndex={itemHead.id}/>

                            <Collapse className="pg-build__menu-group" isOpen={itemHead.collapse ? (this.state.toggleCollapseIndex === itemHead.id) : true}>

                                <ReactSortable onEnd={
                                    (e) => {
                                        
                                    e.preventDefault();
                                    e.stopPropagation();
                                    }
                                } className="pg-build__menu-list" list={itemHead.blocks} setList={(newState: Array<BlockMenuType>) =>
                                    this.props.updateListMenu(
                                        newState,
                                        itemHead.id
                                    )} sort={false} clone={item => {
                                        const newItem = { ...item, id: uuid() };
                                        return newItem;
                                    }} group={{name: (itemHead.type == 'content' ? 'COLUMN' : 'BODY'), pull: 'clone', put: false }} animation={150}>
                                    {itemHead.blocks.map((item: any, index: number) => {
                                        return <MenuItem key={item.id} item={item} index={index}/>;
                                    })}
                                </ReactSortable>

                            </Collapse>

                        </div>
                    );
                })}

            </div>
        );
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);