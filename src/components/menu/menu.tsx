import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../redux/store';
import { TabOpen } from '../../redux/actions/Menu';
import Collapse from '@kunukn/react-collapse';
import { BlockMenuType } from '../../types/blockType';
import { Select, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
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

// ------------------------------ MENU

const tab: Array<{ icon:string; name: TabOpen; }> = [
    { icon: 'mi mi-Edit', name: 'style'},
    { icon: 'mi mi-Caption', name: 'blocks'}
];

const Menu = () => {

    // Get state
    const {
        toggleVisibility,
        pageBuilderInstance,
        tabOpen
    } = useSelector(( state ) => ({
        toggleVisibility: state.menu.toggleVisibility,
        pageBuilderInstance: state.pageBuilder.instance,
        tabOpen: state.menu.tabOpen
    }));

    const dispatch = useDispatch();


    
    return (
        <div className={`pg-build__menu ${(toggleVisibility ? 'pg-build__menu-active' : '')} pg-build__menu-${pageBuilderInstance!.__options?.menuPosition}`}>

            <a onClick={()=> dispatch({
                type: 'Menu/ToggleVisibility',
                toggleVisibility: !toggleVisibility
            })} className="pg-build__menu-toggle">
                <i className={'mi mi-Chevron' + (pageBuilderInstance!.__options?.menuPosition == 'right' ? (toggleVisibility ? 'Right' : 'Left') : (toggleVisibility ? 'Left' : 'Right'))}></i>
            </a>
            

            <div className="pg-build__menu-tools">
                {tab.map((item, index) => (
                    <div key={index} onClick={()=> dispatch({
                        type: 'Menu/ToggleTab',
                        tabOpen: item.name
                    })} className={`pg-build__menu-tool ${(tabOpen == item.name ? 'pg-build__menu-tool-active' : '')}`}>
                        <i className={item.icon}></i>
                    </div>
                ))}
            </div>

            { tabOpen == 'blocks' && <MenuTabBlocks/>}
            { tabOpen == 'style' && <MenuTabStyle/>}
            

        </div>
    );
}

// ------------------------------ MENU TAB BLOCKS

const MenuTabBlocks = () => {

    // Get state
    const {
        menuItems,
    } = useSelector(( state ) => ({
        menuItems: state.menu.menuItems
    }));

    const [toggleCollapseIndex, setToggleCollapseIndex] = useState<string | null>(null);

    const dispatch = useDispatch();

    return (
        <>
            {menuItems.map((itemHead) => {

                return(
                    <div className="pg-build__menu-group-container" key={itemHead.id}>
                        <MenuTitle key={itemHead.id} label={itemHead.title} open={toggleCollapseIndex === itemHead.id} collapse={itemHead.collapse || false} setToggleCollapseIndex={setToggleCollapseIndex} collapseIndex={itemHead.id}/>

                        <Collapse className="pg-build__menu-group" isOpen={itemHead.collapse ? (toggleCollapseIndex === itemHead.id) : true}>

                            <ReactSortable
                                className="pg-build__menu-list"
                                list={itemHead.blocks}
                                setList={(newState) => dispatch({
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
                                    {itemHead.blocks.map((menuItem, index: number) => (
                                        <div key={menuItem.id} className="pg-build__menu-item"
                                        onDoubleClick={
                                            ()=> dispatch({
                                                type: 'Block/DoubleClickAddBlock',
                                                menuItem
                                            })
                                        }
                                        dangerouslySetInnerHTML={{ __html: menuItem.design.preview || '' }}></div>
                                    ))}
                            </ReactSortable>

                        </Collapse>

                    </div>
                );
            })}

        </>
    )

};

// ------------------------------ MENU TAB STYLE

const MenuTabStyle = () => {

    const blockDOM = document.querySelector('.pg-build__menu');
    const formRef = React.createRef<FormInstance>();
    
    // Get state
    const {
        pageBuilderInstance,
        selectedBlock,
    } = useSelector(( state ) => ({
        pageBuilderInstance: state.pageBuilder.instance,
        selectedBlock: state.block.selectedBlock
    }));

    useEffect(() => {

    });

    // Form data
    let formInitialValues = {};

    if(selectedBlock)
        formInitialValues = {
            class: (selectedBlock.class ? selectedBlock.class.split(' ') : undefined)
        };

    

    // Methods
    const handleChangeStyle = () => {

    };
    
    return (
        <>
            {selectedBlock == null && <div className="pg-build__menu-style-msg">Select a block to change style</div>}
            {selectedBlock && 
                <div className="pg-build__menu-style">
                    <Form ref={formRef} name="formStyle" initialValues={formInitialValues} onValuesChange={handleChangeStyle}>

                        <Form.Item label="Classes" name="class">
                            <Select getPopupContainer={()=> blockDOM as HTMLElement} mode="tags" style={{ width: '100%' }} placeholder="class">
                                {pageBuilderInstance!.__options!.blockClassList && pageBuilderInstance!.__options!.blockClassList.map((classItem, index)=>
                                    ((selectedBlock.design.type == 'column' && classItem.type == 'block') || (selectedBlock.design.type != 'column' && classItem.type == 'block-inside') || typeof classItem.type === 'undefined') && (
                                        <Select.Option key={index} value={classItem.class}>{classItem.class}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Form>
                </div>
            }
        </>
    );
};

export { Menu };