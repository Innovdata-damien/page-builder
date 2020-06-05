import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';
import i18n from '../../../../../translations/i18n';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('imageplus', {
        icon: 'image',
        tooltip: i18n.trans('insert_edit_img','capitalize'),
        text: i18n.trans('insert_edit_img','capitalize'),
        onAction: () => {
           Dialog.open(editor, options);
        },
        onSetup: (buttonApi: any) => editor.selection.selectorChangedWithUnbind('img:not([data-mce-object],[data-mce-placeholder]),figure.image', buttonApi.setActive).unbind
    });

};

export {
    register
};