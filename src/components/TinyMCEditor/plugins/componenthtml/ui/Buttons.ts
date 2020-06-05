import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';
import i18n from '../../../../../translations/i18n';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('componenthtml', {
        icon: 'template',
        text: i18n.trans('component','capitalize'),
        tooltip: i18n.trans('component','capitalize'),
        onAction: () => {
            Dialog.open(editor, options);
        }
    });

};

export {
    register
};