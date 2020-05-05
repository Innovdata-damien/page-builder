import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('linkplus', {
        icon: 'template',
        text: 'Component',
        tooltip: 'Component',
        onAction: () => {
            Dialog.open(editor, options);
        }
    });

};

export {
    register
};