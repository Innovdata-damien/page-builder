import React, { Component } from 'react';
import Menu from './menu/menu';
import Body from './body';
import {PageBuilder} from '../PageBuilder';
import { BodyType, MenuType } from '../types/blockType';
import uuid from 'uuid/v4';
// Redux
import { connect } from 'react-redux';
import { setBlock } from '../redux/actions/blockAction';
import { setMenuItem } from '../redux/actions/menuAction';
import { setPageBuilder, setIframeDocument, setIframeWindow } from '../redux/actions/pageBuilderAction';
  
const mapDispatchToProps = (dispatch: any) => ({
    setBlock: (blocks: Array<BodyType>) => dispatch(setBlock(blocks)),
    setMenuItem: (menuItems: Array<MenuType>) => dispatch(setMenuItem(menuItems)),
    setPageBuilder: (pageBuilder: PageBuilder) => dispatch(setPageBuilder(pageBuilder)),
    setIframeDocument: (iframeDocument: Document) => dispatch(setIframeDocument(iframeDocument)),
    setIframeWindow: (iframeWindow: Window) => dispatch(setIframeWindow(iframeWindow)),
});

// Type for blocks

type Props = {
    pageBuilder: PageBuilder;
    iframeDocument: Document;
    iframeWindow: Window;
    setBlock: (blocks: Array<BodyType>) => void;
    setMenuItem: (menuItems: Array<MenuType>) => void;
    setPageBuilder: (pageBuilder: PageBuilder) => void;
    setIframeDocument: (iframeDocument: Document) => void;
    setIframeWindow: (iframeWindow: Window) => void;
};

class Builder extends Component <Props>{
    constructor (props: Props) {
        super(props);

        

        // Append styles from url
        
        if(this.props.pageBuilder.__options?.stylesUrl){

            const stylesUrls = this.props.pageBuilder.__options?.stylesUrl.split(' | ');

            stylesUrls.forEach((styleUrl) => {
                const link = this.props.iframeDocument.createElement('link');

                link.id = `pg-build__style-${this.props.pageBuilder.__id}`;
                link.rel = 'stylesheet';
                link.href = styleUrl;
        
                this.props.iframeDocument.getElementsByTagName('body')[0].appendChild(link);
            });

            

        }

        this.props.pageBuilder.__options!.menuItems.forEach((headItem) => {

            headItem.id = uuid();
            headItem.blocks.forEach((item) => {
                item.id = uuid();
            });
            
        });

        this.props.setBlock(this.props.pageBuilder.__options!.blocks);
        this.props.setMenuItem(this.props.pageBuilder.__options!.menuItems);
        this.props.setPageBuilder(this.props.pageBuilder);
        this.props.setIframeDocument(this.props.iframeDocument);
        this.props.setIframeWindow(this.props.iframeWindow);
        

    }


    render(){
        return (
            <>
                <Menu/>
                <Body/>
            </>
        );
    }
}
export default connect(null, mapDispatchToProps)(Builder);