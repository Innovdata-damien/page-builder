import { Options } from '../../../../../PageBuilder';
import EditorTinymce from 'tinymce';
import * as Dialog from './Dialog';

const register = function (editor: EditorTinymce, options: Options) {
    
    editor.ui.registry.addToggleButton('linkplus', {
        icon: 'link',
        tooltip: 'Link',
        onAction: () => {
            Dialog.open(editor, options);
        },
        onSetup: (buttonApi: any) => {
            
            editor.on('NodeChange', () => {

                let node = editor.selection.getNode();
                let isLinkPlus = node.tagName.toLowerCase() == 'a' || node.tagName.toLowerCase() == 'button';

                // Active button if button or link
                buttonApi.setActive(isLinkPlus);

            });

        }
    });

};

export {
    register
};