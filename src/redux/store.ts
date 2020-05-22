import { Dispatch, Store, combineReducers, createStore as createReduxStore } from 'redux';
import { shallowEqual, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import * as Block from './actions/Block';
//import rootReducer from './reducers/rootReducer';


// Types
export interface State {
    blocks: Block.State;
}

export type Action = (
    Block.Action
);

// Reducer

const reducer = combineReducers<State>({
    blocks: Block.reducer
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