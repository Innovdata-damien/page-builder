import { Provider } from 'react-redux';
import React, { Component } from 'react';
import Builder from './builder';
import { PageBuilder } from '../PageBuilder';
import configureStore from '../redux/store';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { setPageBuilderInstance } from '../utils/utils';
//import tinymce from '@innovdata-damien/tinymce';

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
        window.pageBuilderCss.forEach((style: any) => styles +=`<style>${style.innerText}</style>`);
        
        const initialContent = `
        <!DOCTYPE html>
            <html>
                <head>
                    ${styles}
                </head>
                <body style="margin: 0;" class="pg-build ${this.props.pageBuilder!.__options!.menuPosition == 'right' ? 'pg-build__right' : 'pg-build__left'}">
                    <div id="mountHere"></div>
                </body>
            </html>`;

        return (
            <Frame contentDidMount={() => this.props.pageBuilder!.__options!.onReady(this.props.pageBuilder) } initialContent={initialContent} width="1200" height="1200">
                <FrameContextConsumer>
                {
                    // Callback is invoked with iframe's window and document instances
                    (item) => {

                        item.document.body.ondrop = function (event: any) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        
                        //item.window.tinymce = tinymce;

                        return (
                            <Provider store={this.store}>
                                {/* <script src="https://unpkg.com/@glidejs/glide@3.4.1/dist/glide.js"></script> */}
                                <Builder iframeDocument={item.document} iframeWindow={item.window} pageBuilder={this.props.pageBuilder}/>
                            </Provider>
                        )

                    }
                }
                </FrameContextConsumer>
            </Frame>
        );
    }
}