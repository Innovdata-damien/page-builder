import React, { Component } from 'react';
import MenuItem from './menu-item';
import { ReactSortable } from 'react-sortablejs';
import { PageBuilder } from '../../PageBuilder';
import Collapse from '@kunukn/react-collapse';
import uuid from 'uuid/v4';
import swal from 'sweetalert';


// Redux
import { connect } from 'react-redux';
import {
    toggleMenu,
    updateListMenu
} from '../../redux/actions/menuAction';
import { MenuType, BlockMenuType, LanguageBlocks, BodyType, ColumnType, ContentType } from 'types/blockType';
import { Select } from 'antd';
import { setLocale } from '../../redux/actions/pageBuilderAction';
import { setBlockByLanguage } from '../../redux/actions/blockAction';
import i18n from '../../translations/i18n';


const mapStateToProps = (state: any) => ({
    toggleMenu: state.toggleMenu,
    menuItems: state.menuItems,
    pageBuilder: state.pageBuilder,
    locale: state.locale,
    blocks: state.blocks
});

const mapDispatchToProps = (dispatch: any) => ({
    handleToggleMenu: (type: boolean) => dispatch(toggleMenu(type)),
    updateListMenu: (menuItemsBlock: Array<BlockMenuType>, headId: string) => dispatch(updateListMenu(menuItemsBlock, headId)),
    setLocale: (locale: string) => dispatch(setLocale(locale)),
    setBlockByLanguage: (blocks: Array<BodyType>,locale: string) => dispatch(setBlockByLanguage(blocks,locale)),
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
    locale: string;
    blocks: LanguageBlocks;
    handleToggleMenu: (type: boolean) => void;
    updateListMenu: (menuItemsBlock: Array<BlockMenuType>, headId: string) => void;
    setBlockByLanguage: (blocks: Array<BodyType>,locale: string) => void;
    setLocale: (locale: string) => void;
    menuItems: Array<MenuType>,
    pageBuilder: PageBuilder
};

type State = {
    toggleCollapseIndex: string | null
};

class Menu extends Component<Props, State>{

    menuRef: HTMLDivElement| null;

    constructor(props: Props){
        super(props);

        this.menuRef = null;
        this.state = {
            toggleCollapseIndex: null
        }

    }

    _handleToggleCollapse = (index: string | null) => {
        this.setState({ toggleCollapseIndex: this.state.toggleCollapseIndex === index ? null : index });
    }

    _changeLanguage = (newLocale: string) => {
        const blocks = this.props.blocks[newLocale];
        const currentBlocks = JSON.parse(JSON.stringify(this.props.blocks[this.props.locale]));
        const newPageLabel = this.props.pageBuilder.__options?.languagesList.find((langue)=>langue.code == newLocale)?.name;
        const currentPageLabel = this.props.pageBuilder.__options?.languagesList.find((langue)=>langue.code == this.props.locale)?.name;

        // Change IDs
        currentBlocks.forEach((block: BodyType)=>{
            block.id = uuid();
            block.columns.forEach((column: ColumnType)=>{
                column.id = uuid();
                column.contents.forEach((content: ContentType)=>{
                    content.id = uuid();
                })
            })
        })

        if(blocks.length == 0){
            
            swal(`${i18n.trans('msg_cannot_copy_page1','capitalize')} "${currentPageLabel}" ${i18n.trans('msg_cannot_copy_page2')} "${newPageLabel}"?`, {
                icon: 'warning',
                closeOnClickOutside: false,
                buttons: [i18n.trans('no','capitalize'), i18n.trans('yes','capitalize')]
            }).then((value) => {
                if(value) 
                    this.props.setBlockByLanguage(currentBlocks, newLocale),
                    this.props.setLocale(newLocale);
                else
                    this.props.setLocale(newLocale);
            });
        }else{
            this.props.setLocale(newLocale);
        }

    }

    render () {
        
        return (
            <div ref={(elem)=> this.menuRef = elem} className={'pg-build__menu ' + (this.props.toggleMenu ? 'pg-build__menu-active' : '')}>

                <a onClick={()=> this.props.handleToggleMenu(!this.props.toggleMenu)} className="pg-build__menu-toggle"><i className={'mi mi-Chevron' + (this.props.pageBuilder.__options?.menuPosition == 'right' ? (this.props.toggleMenu ? 'Right' : 'Left') : (this.props.toggleMenu ? 'Left' : 'Right'))}></i></a>

                <div className="pg-build__menu-language">
                    <label>{i18n.trans('select_page', 'capitalize')} : </label>
                    <Select defaultValue={this.props.locale} style={{ width: '100%' }} getPopupContainer={()=> this.menuRef as HTMLElement} onChange={this._changeLanguage}>
                        {this.props.pageBuilder.__options?.languagesList.map((langue)=>(
                            <Select.Option key={uuid()} value={langue.code}>{langue.name}</Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="pg-build__menu-info"><i className="mi mi-Info"></i> {i18n.trans('msg_drag_and_drop_a_block','capitalize')}</div>

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