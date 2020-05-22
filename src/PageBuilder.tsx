import './styles/app.global.css';
import './styles/pagebuilder.css';
import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import allowedDomains from './utils/allowedDomains.json';
import { receiveMessage, ReceiveMessage, postMessageToWindow, PostMessage } from './Messaging';
import { App } from './components/App';
import { createStore } from './redux/store';
import { Store } from 'redux';
import { getHtmlFromBlockState, getPageBuilderInstance, PageBuilderInstance } from './utils/utils';
import js_beautify from 'js-beautify';

// import Root from './components/root';
// import { BodyType, MenuType } from './types/blockType';
// import { defaultBlocks, defaultMenuItems } from './utils/default-data';
// //import store from './redux/store';

// //redux

// import { bindActionCreators } from 'redux';
// import {
//     toggleCssView
// } from './redux/actions/pageBuilderAction';

// Get window message

// window.addEventListener('message', function(event) {
//     console.log(event.data)
//     if (!allowedDomains.includes(event.origin)) return;
//         const pageBuilderInstance = new PageBuilder(event.data.pageBuilderOptions);
//         event!.source!.postMessage({ pageBuilderInstance }, event.origin);

// }, false);

// Receive message
receiveMessage(function(e: MessageEvent, message: ReceiveMessage) {

    if (!message || !message.method || !message.method || !allowedDomains.includes(e.origin) || !message.instanceId)
        return;

    if(message.method == 'newInstance'){
        window.pageBuilderInstance = new PageBuilder(message.instanceId, message.options || {});
    }else{
        if(window.pageBuilderInstance){
            if(e.source && e.origin){
                postMessageToWindow((e.source as Window), e.origin, window.pageBuilderInstance[message.method](message));
            }
        }
    }

    // const instance = pageBuilder.getInstance(message.intanceId);
    // if (instance && instance.__eventsAction[message.method]) {
    //     (instance.__eventsAction[message.method] as any)(message);
    // }

});

// Options types
export interface Options {
    
}

// export interface Options {
//     /**
//      * Language of PageBuilder
//     */
//     language: string;

//     /**
//      * Container of PageBuilder
//     */
//     container: HTMLElement | null;

//     /**
//      * Position of sidenav
//     */
//     menuPosition: 'right' | 'left';

//     /**
//      * Items and title inside menu
//     */
//     menuItems: Array<MenuType>;

//     /**
//      * Blocks inside body
//     */
//     blocks: Array<BodyType>;

//     /**
//      * Url of website style
//     */
//     stylesUrl: string;

//     /**
//      * List of languages availables
//     */
//     languagesList: Array<LanguagesList>;

//     /**
//      * HTML component
//     */
//     componentsList: Array<ComponentsList>;

//     /**
//      * Img url loader for document manager
//     */
//     imageUrlLoader: (resolve: (value: string) => void, reject: (value: string | null ) => void) => void;


//     /**
//      * Callback of adding translation var
//     */
//     addTranslationVarCallback: (data: any) => void;

//     /**
//      * List of classes for blocks
//     */
//     blockClassList?: Array <BlockClassList>;
    
//     /**
//      * Templator for translation vars
//     */
//     translateTemplator?: TranslateTemplator;

//     /**
//      * Translation vars list
//     */
//     translationVars?: Array<string>;
// }

// export interface ComponentsList {
//     type: string;
//     name: string;
//     description?: string;
//     html?: string;
//     values?: {};
// }

// export interface LanguagesList {
//     code: string;
//     name: string;
// }

// export interface BlockClassList {
//     label: string;
//     class: string;
//     type?: 'block' | 'block-inside';
// }

// export interface TranslateTemplator {
//     start: string;
//     end: string;
// }

export class PageBuilder{

    __initialized: boolean;
    __id: string;
    __options?: Options;
    __store?: Store

    constructor (id: string, options: Options){

        this.__initialized = false;
        this.__id = id;
        this.setOptions(options);
        this.init();

    }

    //Change options
    public setOptions(options: Options){
        this.__options = options;
    }

    // public getHtml(): string {
    //     const pagebuilderInstance: PageBuilderInstance | null = getPageBuilderInstance(this.__id);

    //     if(pagebuilderInstance)
    //         if(this.__options?.container && this.__initialized)
    //             return js_beautify.html(getHtmlFromBlockState(pagebuilderInstance.store.getState().blocks));

        
    //     return '';
    // }


    public getJson(): PostMessage{

        // const pagebuilderInstance: PageBuilderInstance | null = getPageBuilderInstance(this.__id);
        // if(pagebuilderInstance)
        //     if(this.__options?.container && this.__initialized)
        //         return pagebuilderInstance.store.getState().blocks;

        if(this.__store)
            return {
                method: 'sendJson',
                instanceId: this.__id,
                value: this.__store.getState().blocks
            };
    }

    //Build PageBuilder

    public getHtml() {
        if(this.__store)
            return {
                method: 'sendHtml',
                instanceId: this.__id,
                value: js_beautify.html(getHtmlFromBlockState(this.__store.getState().blocks))
            };
    }

    public init(){

        this.__store = createStore();

        ReactDOM.render(
            <App store={ this.__store }/>
            , document.getElementById('root')
        );

        // if(this.__options?.container && !this.__initialized){

        //     this.__initialized = true;
        //     // ReactDOM.render(
        //     //     <Root pageBuilder={this}/>
        //     //     ,this.__options.container
        //     // );
        //     ReactDOM.render(
        //         <div>test iframe</div>
        //         ,this.__options.container
        //     );

        // }else if(this.__initialized){
        //     console.error('Page builder is already initialized');
        // }else{
        //     console.error('Undefined Page builder container');
        // }

    }

    //Destroy PageBuilder
    // public destroy(){
    //     // if(this.__initialized){

    //     //     ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    //     //     this.__initialized = false;

    //     // }
    // }

    // public update(){
    //     if(this.__initialized){
    //         this.destroy();
    //         this.init();
    //     }else{
    //         console.error('Page builder cannot be initialized, because it was not yet initialized');
    //     }
    // }

    // public toggleCssView(type: boolean = false){

    //     const pagebuilderInstance: PageBuilderInstance | null = getPageBuilderInstance(this.__id);
    //     const actions = bindActionCreators({toggleCssView}, pagebuilderInstance!.store.dispatch);
    //     actions.toggleCssView(type);
        
    // }

}

