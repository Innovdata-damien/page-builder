import { MenuType, BlockMenuType } from '../../types/blockType';

// Set menu item

export const setMenuItem = (menuItems: Array<MenuType>) => ({
    type: 'SET_MENU_ITEM',
    menuItems
});

// Toggle menu 

export const toggleMenu = (toggleMenu: boolean) => ({
    type: 'TOGGLE_MENU',
    toggleMenu
});

//Update list menu

export const updateListMenu = (menuItemsBlock: Array<BlockMenuType>, headId: string) => ({
    type: 'UPDATE_LIST_MENU',
    payload: (state: any, action: any) => {

        let headIndex = state.findIndex((item: BlockMenuType) => item.id === action.headId);
        state[headIndex].blocks = menuItemsBlock;
        
        return [...state];
    },
    menuItemsBlock,
    headId
});