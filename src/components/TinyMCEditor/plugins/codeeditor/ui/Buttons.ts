import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';
import i18n from '../../../../../translations/i18n';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('codeeditor', {
        icon: 'sourcecode',
        text: i18n.trans('html_editor'),
        tooltip: i18n.trans('html_editor'),
        onAction: () => {
            Dialog.open(editor, options);
        }
    });

};

export {
    register
};