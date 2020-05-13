import linkPlus from './linkplus/Main';
import multiLanguage from './mulitlanguage/Main';
import componentHtml from './componenthtml/Main';
import imagePlus from './imageplus/Main';
import videoEmbed from './videoembed/Main';
import codeEditor from './codeeditor/Main';
import translationVars from './translationvars/Main';
import { Options } from '../../../PageBuilder';
import EditorTinymce from 'tinymce';

const loadCustomPlugins = (editor: EditorTinymce, options: Options) => {
    
    linkPlus(editor, options);
    multiLanguage(editor, options);
    componentHtml(editor, options);
    videoEmbed(editor, options);
    imagePlus(editor, options);
    codeEditor(editor, options);
    translationVars(editor, options);
}

export default loadCustomPlugins;