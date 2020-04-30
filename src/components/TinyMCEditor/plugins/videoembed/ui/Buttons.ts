import { Options } from '../../../../../PageBuilder';
import * as Dialog from './Dialog';
import EditorTinymce from 'tinymce';

const stateSelectorAdapter = (editor: EditorTinymce, selector: string[]) => (buttonApi: any) =>
    editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('videoembed', {
        icon: 'embed',
        text: 'Video',
        tooltip: 'Video',
        onAction: () => {
            Dialog.open(editor, options);
        },
        onSetup: stateSelectorAdapter(editor, ['span[data-mce-object]', 'div[data-ephox-embed-iri]' ])
    });

};

export {
    register
};