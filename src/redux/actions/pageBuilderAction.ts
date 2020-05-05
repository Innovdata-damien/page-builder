import { PageBuilder } from '../../PageBuilder';

// Set Page builder 

export const setPageBuilder = (pageBuilder: PageBuilder) => ({
    type: 'SET_PAGE_BUILDER',
    pageBuilder
});

// toggleCssView
export const toggleCssView = (cssViewShow: boolean) => ({
    type: 'TOGGLE_CSS_VIEW',
    cssViewShow
});