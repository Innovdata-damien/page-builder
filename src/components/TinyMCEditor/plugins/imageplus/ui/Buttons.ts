/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

// import Editor from 'tinymce/core/api/Editor';
// import { Dialog } from './Dialog';
// import { isFigure, isImage } from '../core/ImageData';
// import * as Utils from '../core/Utils';

// const register = (editor: Editor) => {
//     editor.ui.registry.addToggleButton('image', {
//         icon: 'image',
//         tooltip: 'Insert/edit image',
//         onAction: Dialog(editor).openLater,
//         onSetup: (buttonApi) => editor.selection.selectorChangedWithUnbind('img:not([data-mce-object],[data-mce-placeholder]),figure.image', buttonApi.setActive).unbind
//     });

//     editor.ui.registry.addMenuItem('image', {
//         icon: 'image',
//         text: 'Image...',
//         onAction: Dialog(editor).openLater
//     });

//     editor.ui.registry.addContextMenu('image', {
//         update: (element): string[] => isFigure(element) || (isImage(element) && !Utils.isPlaceholderImage(element)) ? [ 'image' ] : []
//     });

// };

// export {
//     register
// };

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