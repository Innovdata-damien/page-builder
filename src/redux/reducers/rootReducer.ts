import { combineReducers } from 'redux';
import blocks from './blockReducer';
import { toggleMenu, menuItems } from './menuReducer';
import { pageBuilder, cssViewShow, iframeDocument } from './pageBuilderReducer';

export default combineReducers({
    blocks,
    toggleMenu,
    menuItems,
    pageBuilder,
    cssViewShow,
    iframeDocument
});