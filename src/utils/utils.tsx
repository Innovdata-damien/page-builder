import htmlPage from '../components/clearHtml';
import { BodyType } from 'types/blockType';
import PageBuilder from 'index';

// Add a value in array after another value by index

const addAfter = function(array: Array<any>, index: number, newItem: any) {
    return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index)
    ];
}

const parseHtml = (html: string) => {
    const element = new DOMParser().parseFromString(html, 'text/html');
    const child = element!.documentElement!.querySelector('body')!.firstChild;
    return child;
};

const wrapElem = (wrapper: any, child: any) => {
    child!.parentNode!.insertBefore(wrapper, child);
    wrapper!.appendChild(child);
};

const unwrapElem = (wrapper: any) => {
	var docFrag = document.createDocumentFragment();
	while (wrapper.firstChild) {
		var child = wrapper.removeChild(wrapper.firstChild);
		docFrag.appendChild(child);
	}

	// replace wrapper with document fragment
	wrapper.parentNode.replaceChild(docFrag, wrapper);
};

const getHtmlFromBlockState = (blocks: Array<BodyType>) => {
    return htmlPage(blocks);
};

// PAGE BUILDER INSTANCE

export interface PageBuilderInstance {
    store: any;
    pageBuilder: PageBuilder;
};


const setPageBuilderInstance = (pageBuilderInstance: PageBuilderInstance) => {

    if(!window._PageBuilderInstances)
        window._PageBuilderInstances = [];
        
    let indexOfInstance: number;
    if((indexOfInstance = window._PageBuilderInstances.findIndex((item)=> item.pageBuilder.__id == pageBuilderInstance.pageBuilder.__id)) != -1)
        window._PageBuilderInstances[indexOfInstance] = pageBuilderInstance;
    else
        window._PageBuilderInstances.push(pageBuilderInstance);

};

const getPageBuilderInstance = (id: string | number) => {
    return window._PageBuilderInstances.find((pageBuilderInstance)=> pageBuilderInstance.pageBuilder.__id == id) || null;
};

const decodeHTML = (htmlEncoded: string) => {
    var elem = document.createElement('textarea');
    elem.innerHTML = htmlEncoded;
    return elem.value;
}

export { addAfter, parseHtml, wrapElem, unwrapElem, getHtmlFromBlockState, setPageBuilderInstance, getPageBuilderInstance, decodeHTML };