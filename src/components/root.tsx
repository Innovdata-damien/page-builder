import { Provider } from 'react-redux';
import React, { Component } from 'react';
import Builder from './builder';
import { PageBuilder } from '../PageBuilder';
import store from '../redux/store';
import Frame, { FrameContextConsumer } from 'react-frame-component';

// Type for blocks
type Props = {
    pageBuilder: PageBuilder;
};

export default class Root extends Component <Props>{
    constructor (props: Props) {
        super(props);
    }

    render(){
        const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body><div class="pg-build pg-build__right"></div></body></html>`;
        return (
            <Frame width="1000" height="1000" initialContent={initialContent}>
                <FrameContextConsumer>
                    {
                        // Callback is invoked with iframe's window and document instances
                        ({document, window}) => {
                            window.doc = document;
                            window.win = window;
                            console.log(window)
                            //  Element = window.Element;
                            return (
                                <Provider store={store}>
                                    <Builder iframeDocument={document} pageBuilder={this.props.pageBuilder}/>
                                </Provider>)
                            }
                    }
                </FrameContextConsumer>
            </Frame>
        );
    }
}