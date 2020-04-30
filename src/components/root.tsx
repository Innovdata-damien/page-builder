import { Provider } from 'react-redux';
import React, { Component } from 'react';
import Builder from './builder';
import { PageBuilder } from '../PageBuilder';
import store from '../redux/store';

// Type for blocks
type Props = {
    pageBuilder: PageBuilder;
};

export default class Root extends Component <Props>{
    constructor (props: Props) {
        super(props);
    }

    render(){
        return (
            <Provider store={store}>
                <Builder pageBuilder={this.props.pageBuilder}/>
            </Provider>
        );
    }
}