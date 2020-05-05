import { Editor, EditorManager, AddOnManager } from 'tinymce';


declare module 'tinymce' {

    type RegistryMethod = (name: string, settings: {}) => void;

    // export interface PluginManager extends AddOnManager{
    //     add(editor: string, addOn: (editor: EditorTinymce, url: string) => void): Theme | Plugin;
    // }
    export interface WindowManager {
        alert(message: string, callback: () => void, scope?: {}): void;

        close(): void;

        confirm(message: string, callback: () => void, scope?: {}): void;

        getParams(): {};

        getWindows(): Window[];

        open(args: {}): void;

        setParams(params: {}): void;
    }

    export interface Selection {
        collapse(toStart?: boolean): void;
        
        getBookmark(type?: number, normalized?: boolean): {};
        
        getContent(args?: {}): string;
        
        getEnd(real?: boolean): Element;
        
        getNode(): Element;
        
        getRng(w3c: boolean): Range;
        
        getSel(): Selection;
        
        getStart(real?: boolean): Element;
        
        isCollapsed(): boolean;
        
        moveToBookmark(bookmark: {}): boolean;
        
        select(node: Element, content?: boolean): Element;
        
        selectorChanged(selector: string, callback: () => void): void;
        
        setContent(content: string, args?: {}): void;
        
        setCursorLocation(node?: Node, offset?: number): void;
        
        setNode(elm: Element): Element;
        
        setRng(rng: Range, forward?: boolean): void;
        
        selectorChangedWithUnbind(message: string, callback: () => void): any;
    }

    export default class EditorTinymce extends Editor{
        editorManager: {
            PluginManager: AddOnManager;
            
        };
        selection: Selection;
        windowManager: WindowManager;
        ui: {
            registry: {
                addButton: RegistryMethod;
                addMenuButton: RegistryMethod;
                addToggleButton: RegistryMethod;
            }
        }
    }

}
