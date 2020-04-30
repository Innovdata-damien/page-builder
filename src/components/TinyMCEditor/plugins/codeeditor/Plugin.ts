import EditorTinymce, { AddOnManager } from 'tinymce';
import * as Buttons from './ui/Buttons';
import { Options } from '../../../../PageBuilder';


export default function (editor: EditorTinymce, pluginManager: AddOnManager, options: Options) {
    
    pluginManager.add('codeeditor', () => {
        Buttons.register(editor, options);
    });

}