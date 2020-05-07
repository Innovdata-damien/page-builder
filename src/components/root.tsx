import { Provider } from 'react-redux';
import React, { Component } from 'react';
import Builder from './builder';
import { PageBuilder } from '../PageBuilder';
import configureStore from '../redux/store';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { setPageBuilderInstance } from '../utils/utils';
import uuid from 'uuid/v4';

//const store = configureStore();

// Type for blocks
type Props = {
    pageBuilder: PageBuilder;
};

export default class Root extends Component <Props>{

    store: any;

    constructor (props: Props) {
        super(props);

        this.store = configureStore();

        setPageBuilderInstance({
            store: this.store,
            pageBuilder: this.props.pageBuilder
        });

    }

    render(){
        let styles = '';
        window.pageBuilderCss.forEach((style) => styles +=`<style>${style.innerText}</style>`);
        //console.log(document.getElementsByTagName("iframe")[0].contentWindow.tinymce)
//console.log(styles)
        const initialContent = `<!DOCTYPE html><html><head>${styles}</head><body class="pg-build ${this.props.pageBuilder!.__options!.menuPosition == 'right' ? 'pg-build__right' : 'pg-build__left'}"><div id="mountHere"></div></body></html>`;

        return (
            <Frame initialContent={initialContent} width="1200" height="1200">
                <FrameContextConsumer>
                {
                    // Callback is invoked with iframe's window and document instances
                    ({document, window}) => {
                        return (
                            <Provider store={this.store}>
                                <Builder iframeDocument={document} pageBuilder={this.props.pageBuilder}/>
                            </Provider>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        );
    }
}