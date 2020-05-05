import { AriaAttributes, DOMAttributes } from 'react';

declare module '*.png' {
    const value: any;
    export = value;
}


declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        defaultcolor?: string;
    }
}

interface Window {
    [key:string]: any;
}

declare module '*.html' {
    const value: string;
    export default value
}