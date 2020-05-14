import './styles/app.global.css';
import './styles/pagebuilder.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { BodyType, MenuType } from './types/blockType';
import { defaultBlocks, defaultMenuItems } from './utils/default-data';
import { getHtmlFromBlockState, getPageBuilderInstance, PageBuilderInstance } from './utils/utils';
import uuid from 'uuid/v4';
//import store from './redux/store';
import js_beautify from 'js-beautify';

//redux

import { bindActionCreators } from 'redux';
import {
    toggleCssView
} from './redux/actions/pageBuilderAction';

export interface Options {
    /**
     * Language of PageBuilder
    */
    language: string;

    /**
     * Container of PageBuilder
    */
    container: HTMLElement | null;

    /**
     * Position of sidenav
    */
    menuPosition: 'right' | 'left';

    /**
     * Items and title inside menu
    */
    menuItems: Array<MenuType>;

    /**
     * Blocks inside body
    */
    blocks: Array<BodyType>;

    /**
     * Url of website style
    */
    stylesUrl: string;

    /**
     * List of languages availables
    */
    languagesList: Array<LanguagesList>;

    /**
     * HTML component
    */
    componentsList: Array<ComponentsList>;

    /**
     * Img url loader for document manager
    */
    imageUrlLoader: (resolve: (value: string) => void, reject: (value: string | null ) => void) => void;


    /**
     * Callback of adding translation var
    */
    addTranslationVarCallback: (data: any) => void;

    /**
     * List of classes for blocks
    */
    blockClassList?: Array <BlockClassList>;
    
    /**
     * Templator for translation vars
    */
    translateTemplator?: TranslateTemplator;

    /**
     * Translation vars list
    */
    translationVars?: Array<string>;
}

export interface ComponentsList {
    type: string;
    name: string;
    description?: string;
    html?: string;
    values?: {};
}

export interface LanguagesList {
    code: string;
    name: string;
}

export interface BlockClassList {
    label: string;
    class: string;
    type?: 'block' | 'block-inside';
}

export interface TranslateTemplator {
    start: string;
    end: string;
}

export class PageBuilder{

    __initialized: boolean;
    __id: string;
    __options?: Options;

    constructor (options: Options){

        this.__initialized = false;
        this.__id = uuid();
        this.setOptions(options);
        this.init();

    }

    //Change options
    public setOptions(options: Options){

        this.__options = Object.assign({
            language: 'en',
            container: null,
            menuPosition: 'right',
            stylesUrl: '',
            blocks: defaultBlocks,
            menuItems: defaultMenuItems,
            languagesList:[{ code: 'en', name: 'English' }],
            componentsList: [
                {
                    type: 'card',
                    name: 'Card',
                    description: 'description card',
                    values : {
                        hello: 'fes'
                    }
                },
                {
                    type: 'tab',
                    name: 'Tab',
                    description: 'description tab',
                    values : {
                        hello: 'fes'
                    }
                },
                {
                    type: 'breadcrumb',
                    name: 'Breadcrumb',
                    description: 'description breadcrumb',
                    values : {
                        hello: 'fes'
                    }
                },
                {
                    type: 'test_p',
                    name: 'Red tag P',
                    html: '<p style="color:red;">Red tag P</p>',
                    values : {
                        hello: 'fes'
                    }
                },
                {
                    type: 'carousel',
                    name: 'Carousel',
                    description: 'Carousel'
                }
            ],
            blockClassList: [
                {
                    label: 'Container',
                    class: 'pg-build__container',
                    type: 'block'
                },
                {
                    label: 'Content',
                    class: 'pg-build__content',
                    type: 'block-inside'
                }
            ],
            translateTemplator: { start: "{{'", end: "'|trans}}" },
            imageUrlLoader: function(_resolve: any, reject: any) {
                reject(null);
            },
            addTranslationVarCallback: function(_data: any) {
            },
        }, options);

        
    }

    public getHtml(): string {
        const pagebuilderInstance: PageBuilderInstance | null = getPageBuilderInstance(this.__id);

        if(pagebuilderInstance)
            if(this.__options?.container && this.__initialized)
                return js_beautify.html(getHtmlFromBlockState(pagebuilderInstance.store.getState().blocks));

        
        return '';
    }


    public getJson(): Array<BodyType> {

        const pagebuilderInstance: PageBuilderInstance | null = getPageBuilderInstance(this.__id);
        if(pagebuilderInstance)
            if(this.__options?.container && this.__initialized)
                return pagebuilderInstance.store.getState().blocks;

        return [];
    }

    //Build PageBuilder
    public init(){

        if(this.__options?.container && !this.__initialized){

            this.__initialized = true;
            ReactDOM.render(
                <Root pageBuilder={this}/>
                ,this.__options.container
            );

        }else if(this.__initialized){
            console.error('Page builder is already initialized');
        }else{
            console.error('Undefined Page builder container');
        }

    }

    //Destroy PageBuilder
    public destroy(){
        if(this.__options?.container){

            ReactDOM.unmountComponentAtNode(this.__options.container);
            this.__initialized = false;

        }
    }

    public update(){
        if(this.__initialized){
            this.destroy();
            this.init();
        }else{
            console.error('Page builder cannot be initialized, because it was not yet initialized');
        }
    }

    public toggleCssView(type: boolean = false){

        const pagebuilderInstance: PageBuilderInstance | null = getPageBuilderInstance(this.__id);
        const actions = bindActionCreators({toggleCssView}, pagebuilderInstance!.store.dispatch);
        actions.toggleCssView(type);
        
    }

}