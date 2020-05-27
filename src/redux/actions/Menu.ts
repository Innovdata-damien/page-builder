import { Reducer } from 'redux';
import { produce, setAutoFreeze } from 'immer';
import { MenuType, BlockMenuType, BlockType } from '../../types/blockType';

setAutoFreeze(false);

// ----------------------- TYPE STATE

export type TabOpen = 'style' | 'blocks';

export type State = {
    menuItems: Array<MenuType>;
    toggleVisibility: boolean;
    tabOpen: TabOpen;
}


// ----------------------- TYPE ACTION

export type Action =
{
    type: 'Menu/Set';
    menuItems: Array<MenuType>;
} |
{
    type: 'Menu/ToggleVisibility';
    toggleVisibility: boolean;
} |
{
    type: 'Menu/SortableListMenu';
    headId: string;
    menuItemsBlock: Array<BlockMenuType>;
} |
{
    type: 'Menu/ToggleTab';
    tabOpen: TabOpen;
} ;


// ----------------------- INITIAL STATE

export const initialState: State = {
    menuItems: [],
    toggleVisibility: true,
    tabOpen: 'blocks'
}

// ----------------------- REDUCER

export const reducer: Reducer<State, Action> = ( state = initialState, action ) => {

    return produce( state, ( newState: State ) => {

        if ( action.type === 'Menu/Set' ) {
            newState.menuItems = action.menuItems;
        } else if ( action.type === 'Menu/ToggleVisibility' ) {
            newState.toggleVisibility = action.toggleVisibility;
        } else if ( action.type === 'Menu/SortableListMenu' ) {
            newState.menuItems = sortableListMenu(state.menuItems, newState.menuItems, action.menuItemsBlock, action.headId);
        } else if ( action.type === 'Menu/ToggleTab' ) {
            newState.tabOpen = action.tabOpen;
        }

    });
    
};


// ----------------------- REDUCER METHODS

// Method for sortbale list
const sortableListMenu = (state: Array<MenuType>, draftState: Array<MenuType>, menuItemsBlock: Array<BlockMenuType>, headId: string) => {

    let headIndex = state.findIndex((item) => item.id === headId);
    draftState[headIndex].blocks = menuItemsBlock;
    
    return draftState;
};