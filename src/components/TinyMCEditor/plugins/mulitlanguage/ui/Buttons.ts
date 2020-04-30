import { unwrapElem } from '../../../../../utils/utils';
import { Options, LanguagesList } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';


const isTranslateVar = (node: any) => {
            
    if (node.closest('[data-trans-var]'))
        return true;

    return false;

};


const multiLanguageAction = (editor: EditorTinymce, locale: string) => {

    let node = editor.selection.getNode();
    
    if(isTranslateVar(node)){
        if(node.closest('[data-trans-var]')!.getAttribute('data-trans-var') == locale)
            unwrapElem(node.closest('[data-trans-var]'));
        else
            node.closest('[data-trans-var]')!.setAttribute('data-trans-var', locale);
    }else{
        node.setAttribute('data-trans-var', locale);
    }

};


const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addMenuButton('multiLanguage', {
        icon: 'translate',
        text: 'Translate',
        tooltip: 'Translate',
        fetch: function (callback: any) {
            
            let items: Array<any> = [];
            options.languagesList.forEach((item: LanguagesList) =>{
                items.push(
                    {
                        type: 'menuitem',
                        text: item.name,
                        onAction: () => multiLanguageAction(editor, item.code)
                    }
                )
            })
            
            callback(items);
        },
        onSetup: (buttonApi: any) => {
            editor.on('NodeChange', () => {

                let node = editor.selection.getNode();
                buttonApi.setActive(isTranslateVar(node));

            });
        }
    });

};

export {
    register
};