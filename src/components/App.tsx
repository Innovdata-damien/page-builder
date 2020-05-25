import { Provider } from 'react-redux';
import React from 'react';
import { Builder } from '../components/builder';
import { Store } from 'redux';
import { Action, State } from '../redux/store';
import { PageBuilder } from '../PageBuilder';

type AppProps = {
    store: Store<State, Action>;
    pageBuilder: PageBuilder
}

export const App = ( props: AppProps ): JSX.Element => <>
    <Provider store={ props.store }>
        <Builder pageBuilder={ props.pageBuilder }/>
    </Provider>
</>;