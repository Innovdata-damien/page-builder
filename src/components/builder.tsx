import React, { Component } from 'react';
import Menu from './menu/menu';
import Body from './body';
import {PageBuilder, LanguagesList} from '../PageBuilder';
import { BodyType, MenuType } from '../types/blockType';
import uuid from 'uuid/v4';
import i18n from '../translations/i18n';

// Redux
import { connect } from 'react-redux';
import { setBlock } from '../redux/actions/blockAction';
import { setMenuItem } from '../redux/actions/menuAction';
import { setPageBuilder, setIframeDocument, setIframeWindow, setLocale } from '../redux/actions/pageBuilderAction';
  
const mapDispatchToProps = (dispatch: any) => ({
    setBlock: (blocks: Array<BodyType>, languageList: LanguagesList[]) => dispatch(setBlock(blocks, languageList)),
    setMenuItem: (menuItems: Array<MenuType>) => dispatch(setMenuItem(menuItems)),
    setPageBuilder: (pageBuilder: PageBuilder) => dispatch(setPageBuilder(pageBuilder)),
    setIframeDocument: (iframeDocument: Document) => dispatch(setIframeDocument(iframeDocument)),
    setIframeWindow: (iframeWindow: Window) => dispatch(setIframeWindow(iframeWindow)),
    setLocale: (locale: string) => dispatch(setLocale(locale)),
});

// Type for blocks

type Props = {
    pageBuilder: PageBuilder;
    iframeDocument: Document;
    iframeWindow: Window;
    setBlock: (blocks: Array<BodyType>, languageList: LanguagesList[]) => void;
    setMenuItem: (menuItems: Array<MenuType>) => void;
    setPageBuilder: (pageBuilder: PageBuilder) => void;
    setIframeDocument: (iframeDocument: Document) => void;
    setIframeWindow: (iframeWindow: Window) => void;
    setLocale: (locale: string) => void;
};

// BUILDER

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

        this.props.setLocale(this.props.pageBuilder.__options!.languagesList[0]!.code);
        this.props.setBlock(this.props.pageBuilder.__options!.blocks, this.props.pageBuilder.__options!.languagesList);
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