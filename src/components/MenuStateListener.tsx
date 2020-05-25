import React, { useEffect } from 'react';
import { MenuType } from '../types/blockType';
import { useDispatch } from '../redux/store';

export interface MenuStateListenerProps {
    menuItems: Array<MenuType>;
}

const MenuStateListener = ( props: MenuStateListenerProps ): JSX.Element => {
    const dispatch = useDispatch();
    const menuItems = props.menuItems;
    
    useEffect(() => {

        //Set PageBuilder instance in store
        dispatch( {
            type: 'Menu/Set',
            menuItems
        });
        
    },
    [ menuItems ]);
    return (
        <></>
    );
}

export { MenuStateListener };