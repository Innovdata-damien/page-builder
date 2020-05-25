import { Dispatch, Store, combineReducers, createStore as createReduxStore } from 'redux';
import { shallowEqual, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import * as Block from './actions/Block';
import * as PageBuilder from './actions/PageBuilder';
import * as Menu from './actions/Menu';
//import rootReducer from './reducers/rootReducer';


// Types
export interface State {
    block: Block.State;
    pageBuilder: PageBuilder.State;
    menu: Menu.State;
}

export type Action = (
    Block.Action |
    PageBuilder.Action |
    Menu.Action
);

// Reducer

const reducer = combineReducers<State>({
    block: Block.reducer,
    pageBuilder: PageBuilder.reducer,
    menu: Menu.reducer
});

// Store

const devtools = ( window as any ).__REDUX_DEVTOOLS_EXTENSION__;
export function createStore(): Store<State, Action> {
    return createReduxStore(
        reducer,
        devtools && devtools()
    );
}

export function useSelector<T>( selector: ( state: State ) => T ): T {
    return useReduxSelector( selector, shallowEqual );
}

export function useDispatch(): Dispatch<Action> {
    return useReduxDispatch<Dispatch<Action>>();
}