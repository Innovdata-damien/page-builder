import { Reducer } from 'redux';
import { produce } from 'immer';

export type State = [
    
]

export type Action =
{
    type: 'Block/Set';
    blocks: [];
}
// |
// {
//     type: 'Block/Close';
// };

export const initialState: State = [
    
]

export const reducer: Reducer<State, Action> = ( state = initialState, action ) => {

    return produce( state, ( newState: State ) => {
        
        if ( action.type === 'Block/Set' ) {
            newState = action.blocks;
        }

    });
    
};