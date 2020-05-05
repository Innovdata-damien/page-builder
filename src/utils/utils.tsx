import htmlPage from '../components/clearHtml';
import { BodyType } from 'types/blockType';

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

export { addAfter, parseHtml, wrapElem, unwrapElem, getHtmlFromBlockState };