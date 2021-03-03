import EditorTinymce from 'tinymce';
import { Options } from '../../../../../PageBuilder';
import js_beautify from 'js-beautify';
import monacoEditorHTML from 'monaco-editor.html';
import i18n from '../../../../../translations/i18n';


const getIframe = (editor: EditorTinymce) => {
    let iframe: any = editor.contentWindow.document.querySelector('.tox-dialog__body iframe');
    var iframeDocument = iframe!.contentDocument || iframe!.contentWindow.document;

    return { iframe, iframeDocument };
};

// Submit

const onSubmit = (editor: EditorTinymce, _options: Options) => (api: any) => {

    editor.setContent(getIframe(editor).iframeDocument.monacoEditor.getValue());
    api.close();
};


// Build dialog spec
const dialogSpec = (_bodyItems: any, initialData: any, editor: EditorTinymce, options: Options) => ({
    title: i18n.trans('html_editor'),
    size: 'large',
    body: {
        type: 'panel',
        items: [
            {
                type: 'iframe',
                name: 'preview',
                label: i18n.trans('preview','capitalize'),
                sandboxed: true
            }
        ]
    },
    initialData,
    buttons: [
        {
            type: 'cancel',
            text: i18n.trans('close','capitalize')
        },
        {
            type: 'submit',
            text: i18n.trans('save','capitalize'),
            primary: true
        }
    ],
    onSubmit: onSubmit(editor, options)
});


const getInitialData = (_editor: EditorTinymce) => {

    let initialData: any = {};

    //console.log(html)

    initialData.preview = monacoEditorHTML;

    return initialData;
}


const open = function (editor: EditorTinymce, options: Options) {
    window.truc = editor;
    
    const dialogApi: any = editor.windowManager.open(dialogSpec([], getInitialData(editor), editor, options));
    dialogApi.block(`${i18n.trans('loading')}...`);

    getIframe(editor).iframe.onload = function() {
        dialogApi.unblock();
        getIframe(editor).iframeDocument.monacoEditor.setValue(js_beautify.html(editor.getContent()));
    };
    
};
  
export {
    open
};