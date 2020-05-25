import React, { useState } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import Collapse from '@kunukn/react-collapse';
import { BlockMenuType } from '../../types/blockType';
import { ReactSortable } from 'react-sortablejs';
import uuid from 'uuid/v4';


// ------------------------------ MENU TITLE

type MenuTitleProps = {
    label: string;
    setToggleCollapseIndex: (index: string | null) => void;
    collapseIndex: string | null;
    collapse: boolean;
    open: boolean;
};

const MenuTitle = (props: MenuTitleProps) => {
    return <div
        className={`pg-build__menu-title ${(props.collapse ? 'pg-build__menu-title-collapse': '')} ${(props.collapse && props.open ? 'pg-build__menu-title-collapse__open' : '')}`}
        onClick={() => props.collapse && props.setToggleCollapseIndex(props.collapseIndex)}
    >{props.label}</div>;
}


// ------------------------------ MENU ITEM

type MenuItemProps = {
    item: BlockMenuType;
    index: number;
}

const MenuItem = (props: MenuItemProps) => {
    return <div
        className="pg-build__menu-item"
        //onDoubleClick={()=> props.doubleClickMenuBlock(props.item)}
        dangerouslySetInnerHTML={{ __html: props.item.design.preview || '' }}
    ></div>;
}


// ------------------------------ MENU

const Menu = () => {

    // Get state
    const {
        toggleVisibility,
        pageBuilderInstance,
        menuItems
    } = useSelector(( state ) => ({
        toggleVisibility: state.menu.toggleVisibility,
        pageBuilderInstance: state.pageBuilder.instance,
        menuItems: state.menu.menuItems
    }));

    const dispatch = useDispatch();


    const [toggleCollapseIndex, setToggleCollapseIndex] = useState<string | null>(null);
    
    return (
        <div className={`pg-build__menu ${(toggleVisibility ? 'pg-build__menu-active' : '')} pg-build__menu-${pageBuilderInstance!.__options?.menuPosition}`}>

            <a onClick={
                ()=> dispatch({
                    type: 'Menu/ToggleVisibility',
                    toggleVisibility: !toggleVisibility
                })
            } className="pg-build__menu-toggle">
                <i className={'mi mi-Chevron' + (pageBuilderInstance!.__options?.menuPosition == 'right' ? (toggleVisibility ? 'Right' : 'Left') : (toggleVisibility ? 'Left' : 'Right'))}></i>
            </a>

            {menuItems.map((itemHead) => {

                return(
                    <div className="pg-build__menu-group-container" key={itemHead.id}>
                        <MenuTitle key={itemHead.id} label={itemHead.title} open={toggleCollapseIndex === itemHead.id} collapse={itemHead.collapse || false} setToggleCollapseIndex={setToggleCollapseIndex} collapseIndex={itemHead.id}/>

                        <Collapse className="pg-build__menu-group" isOpen={itemHead.collapse ? (toggleCollapseIndex === itemHead.id) : true}>

                            <ReactSortable
                                className="pg-build__menu-list"
                                list={itemHead.blocks}
                                setList={(newState: Array<BlockMenuType>) => dispatch({
                                    type: 'Menu/SortableListMenu',
                                    menuItemsBlock: newState,
                                    headId: itemHead.id
                                })}
                                sort={false}
                                clone={item => {
                                        const newItem = { ...item, id: uuid() };
                                        return newItem;
                                }}
                                group={{name: (itemHead.type == 'content' ? 'COLUMN' : 'BODY'), pull: 'clone', put: false }} animation={150}>
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

export { Menu };