
import { Options } from '../../../../PageBuilder';
import Plugin from './Plugin';
import EditorTinymce from 'tinymce';

export default function (editor: EditorTinymce, options: Options) {
    Plugin(editor, editor.editorManager.PluginManager, options);
}
