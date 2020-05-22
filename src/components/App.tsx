import { Provider } from 'react-redux';
import React, { useCallback } from 'react';
import { Builder } from '../components/builder';
import { Store } from 'redux';

type AppProps = {
    store: Store
}

export const App = ( props: AppProps ): JSX.Element => <>
    <Provider store={ props.store }>
        <Builder/>
    </Provider>
</>;