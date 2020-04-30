
// import PluginManager from 'tinymce/core/api/PluginManager';
// import * as Commands from './api/Commands';
// import * as FilterContent from './core/FilterContent';
// import * as Buttons from './ui/Buttons';

// export default function () {
//   PluginManager.add('image', (editor) => {
//     FilterContent.setup(editor);
//     Buttons.register(editor);
//     Commands.register(editor);
//   });
// }

import EditorTinymce, { AddOnManager } from 'tinymce';
import * as Buttons from './ui/Buttons';
import { Options } from '../../../../PageBuilder';


export default function (editor: EditorTinymce, pluginManager: AddOnManager, options: Options) {
    
    pluginManager.add('imageplus', () => {
        Buttons.register(editor, options);
    });

}