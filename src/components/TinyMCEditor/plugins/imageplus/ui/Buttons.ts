import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('imageplus', {
        icon: 'image',
        tooltip: 'Insert/edit image',
        text: 'Insert/edit image',
        onAction: () => {
           Dialog.open(editor, options);
        },
        onSetup: (buttonApi: any) => editor.selection.selectorChangedWithUnbind('img:not([data-mce-object],[data-mce-placeholder]),figure.image', buttonApi.setActive).unbind
    });

};

export {
    register
};