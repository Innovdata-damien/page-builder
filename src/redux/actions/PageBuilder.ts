import { Reducer } from 'redux';
import { produce } from 'immer';
import PageBuilder from '../..';

// ----------------------- TYPE STATE

export type State = {
    instance?: PageBuilder;
    cssViewShow: boolean;
}


// ----------------------- TYPE ACTION

export type Action =
{
    type: 'PageBuilder/SetInstance';
    pageBuilder: PageBuilder;
} |
{
    type: 'PageBuilder/ToggleCssView';
    toggle: boolean;
}

// ----------------------- INITIAL STATE

export const initialState: State = {
    cssViewShow: false
}

// ----------------------- REDUCER

export const reducer: Reducer<State, Action> = ( state = initialState, action ) => {

    return produce( state, ( newState: State ) => {
        
        if ( action.type === 'PageBuilder/SetInstance' ) {
            newState.instance = action.pageBuilder;
        } else if ( action.type === 'PageBuilder/ToggleCssView' ) {
            newState.cssViewShow = action.toggle;
        }

    });
    
};