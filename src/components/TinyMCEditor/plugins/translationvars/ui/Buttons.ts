import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('translationvars', {
        icon: 'translate',
        text: 'Translation vars',
        tooltip: 'Component',
        onAction: () => {
            Dialog.open(editor, options);
        }
    });

};

export {
    register
};