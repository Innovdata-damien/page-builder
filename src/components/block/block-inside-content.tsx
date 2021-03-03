import React, {Component} from 'react';
import { ContentType } from '../../types/blockType';
import TinyMCEditor from '../TinyMCEditor/tinymce-editor';
import getTemplate from '../TinyMCEditor/templates'
import { PageBuilder } from 'PageBuilder';
import i18n from '../../translations/i18n';

type Props = {
    item: ContentType;
    colId: string;
    blockId: string;
    pageBuilder: PageBuilder;
};

type State = {
    
};

export default class BlockInsideContent extends Component<Props, State> {

    content: any | null;

    constructor(props: Props) {
        super(props);

        this.content = null;
    }

    render () {

        // let typeUsingTinyMCEditor = ['column','html','card','breadcrumb','tab'];
        
        // if(typeUsingTinyMCEditor.includes(this.props.item.design.type))
        if(this.props.item.design.editable != false)
            this.content = <TinyMCEditor blockId={this.props.blockId} colId={this.props.colId} item={this.props.item}/>;
        else {

            let html: any = null;
            if(this.props.item.design.type == 'html' && this.props.item.content){
                html = this.props.item.design.value?.htmlContent;
            }else if(this.props.item.design.type == 'include'){

                // Recup le nouveau html du menu
                html = `<div class="pg-build__bloc-not-found"><span>${i18n.trans('bloc_not_found','capitalize')}</span></div>`;
                const getMenuItemDesign = this.props.pageBuilder.__options?.menuItems.filter((item) => item.type == 'content');
                getMenuItemDesign?.forEach((item) => {
                    item.blocks.forEach((childItem) => {
                        if(childItem.design.customName == this.props.item.design.customName){
                            html = childItem.design.value?.htmlContent;
                        }
                    });
                });


            }else if(!['html', 'include'].includes(this.props.item.design.type)){
                html = getTemplate(this.props.item.design.type, this.props.item.design.value || {})!.html || ''
            }

            this.content = <div dangerouslySetInnerHTML={{ __html: html}}></div>;
        };    
        return this.content;
    }
}