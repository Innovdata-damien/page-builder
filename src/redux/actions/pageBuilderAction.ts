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

// Set Iframe document

export const setIframeDocument = (iframeDocument: Document) => ({
    type: 'SET_IFRAME_DOCUMENT',
    iframeDocument
});

// Set Iframe window

export const setIframeWindow = (iframeWindow: Window) => ({
    type: 'SET_IFRAME_WINDOW',
    iframeWindow
});

// Set current locale

export const setLocale = (locale: string) => ({
    type: 'SET_LOCALE',
    locale
});