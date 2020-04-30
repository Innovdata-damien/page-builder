import './styles/app.global.css';
import './styles/pagebuilder.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { BodyType, MenuType } from './types/blockType';
import { defaultBlocks, defaultMenuItems } from './utils/default-data';
import { getHtmlFromBlockState } from './utils/utils';
import uuid from 'uuid/v4';
import store from './redux/store';
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
    styleUrl: string;

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

        this.__options = {
            language: options.language || 'en',
            container: options.container || null,
            menuPosition: options.menuPosition || 'right',
            styleUrl: options.styleUrl || '',
            blocks: options.blocks || defaultBlocks,
            menuItems: options.menuItems || defaultMenuItems,
            languagesList: options.languagesList || [
                {
                    code: 'en',
                    name: 'English'
                }
            ],
            componentsList: options.componentsList || [
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
                },
            ],
            imageUrlLoader: options.imageUrlLoader || function(_resolve, reject) {
                reject(null);
            }
        };
        
    }

    

    public getHtml(): string {
        if(this.__options?.container && this.__initialized)
            return js_beautify.html(getHtmlFromBlockState(store.getState().blocks));
        else
            return '';
    }


    public getJson(): Array<BodyType> {
        if(this.__options?.container && this.__initialized)
            return store.getState().blocks;
        else
            return [];
    }

    //Build PageBuilder
    public init(){

        if(this.__options?.container){

            this.__initialized = true;
            ReactDOM.render(
                <Root pageBuilder={this}/>
                ,this.__options.container
            );
            this.__options.container.classList.add('pg-build');

            if(this.__options.menuPosition == 'right'){
                this.__options.container.classList.add('pg-build__right');
            }else{
                this.__options.container.classList.add('pg-build__left');
            }

        }else{
            console.error('Undefined Page builder container');
        }

    }

    //Destroy PageBuilder
    public destroy(){
        if(this.__options?.container){

            
            if(this.__options?.styleUrl)
                document.querySelector(`#pg-build__style-${this.__id}`)!.remove();

            ReactDOM.unmountComponentAtNode(this.__options.container);
            this.__initialized = false;
            this.__options.container.classList.remove('pg-build');
            this.__options.container.classList.remove('pg-build__right');
            this.__options.container.classList.remove('pg-build__left');

        }
    }

    public toggleCssView(type: boolean = false){

        const { dispatch } = store
        const actions = bindActionCreators({toggleCssView}, dispatch);
        actions.toggleCssView(type);
        
    }

}