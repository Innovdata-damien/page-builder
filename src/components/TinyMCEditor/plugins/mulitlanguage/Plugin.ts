import EditorTinymce, { AddOnManager } from 'tinymce';
import * as Buttons from './ui/Buttons';
import { Options } from '../../../../PageBuilder';


export default function (pluginManager: AddOnManager, options: Options) {
    
    pluginManager.add('multilanguage', (editor) => {
        Buttons.register((editor as EditorTinymce), options);
    });

}