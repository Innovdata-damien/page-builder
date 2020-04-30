import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('codeeditor', {
        icon: 'sourcecode',
        text: 'Editor',
        tooltip: 'Editor',
        onAction: () => {
            Dialog.open(editor, options);
        }
    });

};

export {
    register
};