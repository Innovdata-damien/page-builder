import { MenuType } from '../../types/blockType';

const menuItems = (state: Array<MenuType> = [], action: any) => {
    switch (action.type) {

        case 'SET_MENU_ITEM':
            return action.menuItems;

        case 'UPDATE_LIST_MENU':
            return action.payload(state, action);

        default:
            return state

    }
}


const toggleMenu = (state: boolean = true, action: any) => {
        switch (action.type) {

            case 'TOGGLE_MENU':
                return action.toggleMenu;
            default:
                return state;
                
        }
}
  
export { toggleMenu, menuItems };
  