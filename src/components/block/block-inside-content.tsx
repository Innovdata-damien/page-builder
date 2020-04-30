import React, {Component} from 'react';
import { ContentType } from '../../types/blockType';
import TinyMCEditor from '../TinyMCEditor/tinymce-editor';

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

        let typeUsingTinyMCEditor = ['column','html','card','breadcrumb','tab'];
        
        if(typeUsingTinyMCEditor.includes(this.props.item.design.type))
            this.content = <TinyMCEditor blockId={this.props.blockId} colId={this.props.colId} item={this.props.item}/>;

        return (
            <>{this.content}</>
        );
    }
}