import { AriaAttributes, DOMAttributes } from 'react';
import { PageBuilderInstance } from 'utils/utils';

declare module '*.png' {
    const value: any;
    export = value;
}


declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        defaultcolor?: string;
    }
}
declare global {
    interface Window {
        _PageBuilderInstances: Array<PageBuilderInstance>;
        [key:string]: any;
    }
}

declare module '*.html' {
    const value: string;
    export default value
}