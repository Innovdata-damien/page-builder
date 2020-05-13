import React, {Component} from 'react';
import { ContentType } from '../../types/blockType';
import TinyMCEditor from '../TinyMCEditor/tinymce-editor';
import getTemplate from '../TinyMCEditor/templates'

type Props = {
    item: ContentType;
    colId: string;
    blockId: string;
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
        else
            this.content = <div dangerouslySetInnerHTML={{__html:(this.props.item.content ? this.props.item.content : ( this.props.item.design.type == 'html' ? this.props.item.design.value?.htmlContent : getTemplate(this.props.item.design.type, this.props.item.design.value || {})!.html || '') ) || ''}}></div>;

        return this.content;
    }
}