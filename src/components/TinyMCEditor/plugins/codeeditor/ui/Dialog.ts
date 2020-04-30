import EditorTinymce from 'tinymce';
import { Options } from '../../../../../PageBuilder';
import js_beautify from 'js-beautify';
import monacoEditorHTML from 'monaco-editor.html'
// import * as ace from 'brace';
// import 'brace/mode/javascript';
// import 'brace/theme/monokai';

// //Change
// const onChange = (editor: EditorTinymce, options: Options) => (dialogApi : any, details: any) => {
//     if(details.name == 'component')
//         dialogApi.block('Loading...'),
//         updateDialog(dialogApi, dialogApi.getData().component, editor, options);
//     else if(details.name == 'number')
//         dialogApi.setData({ preview: componentData(dialogApi.getData().component, options, dialogApi.getData())!.content});
// };

// Get iframe

const getIframe = () => {
    let iframe: any = document.querySelector('.tox-dialog__body iframe');
    var iframeDocument = iframe!.contentDocument || iframe!.contentWindow.document;

    return { iframe, iframeDocument };
};

// Submit

const onSubmit = (editor: EditorTinymce, _options: Options) => (api: any) => {


    editor.setContent(getIframe().iframeDocument.monacoEditor.getValue());
    // editor.execCommand('mceInsertContent', false, componentData(api.getData().component, options, api.getData())!.content);
    api.close();
};


// Build dialog spec
const dialogSpec = (_bodyItems: any, initialData: any, editor: EditorTinymce, options: Options) => ({
    title: 'Insert component',
    size: 'large',
    body: {
        type: 'panel',
        items: [
            {
                type: 'iframe',
                name: 'preview',
                label: 'Preview',
                sandboxed: true
            }
        ]
    },
    initialData,
    buttons: [
        {
            type: 'cancel',
            text: 'Close'
        },
        {
            type: 'submit',
            text: 'Save',
            primary: true
        }
    ],
    onSubmit: onSubmit(editor, options)
    // onChange: onChange(editor, options)
});

// //Update dialog spec
// const updateDialog = (dialogApi: any, type: string, editor: EditorTinymce, options: Options) => {
//     let selectComponentItems: any = [];
//     let componentDataValue: any = componentData(type, options);


//     options.componentsList.forEach((item: ComponentsList) => {
//         selectComponentItems.push({
//             value: item.type,
//             text: item.name
//         });
//     })

//     const bodyItems = [
//         {
//             label: 'Components',
//             type: 'selectbox',
//             name: 'component',
//             items: selectComponentItems
//         },
//         {
//             type: 'htmlpanel',
//             name: 'description',
//             html: `<p>${componentDataValue.description}</p>`
//         },
//         ...componentDataValue.items,
//         {
//             type: 'iframe',
//             name: 'preview',
//             label: 'Preview',
//             sandboxed: true
//         }
//     ];

//     const initialData = {
//         component: type,
//         preview: componentDataValue.content,
//         ...componentDataValue.defaultValue
//     };

//     dialogApi.unblock();
//     dialogApi.redial(dialogSpec(bodyItems, initialData, editor, options));
//     dialogApi.focus('component');
// };

// // Component Data

// const componentData = (type: string, options: Options, values: any = {}) => {
            
//     let component = options.componentsList.find(item => item.type == type);
//     let template = getTemplate(type, values);

//     let content = `<!DOCTYPE html>
//                             <html>
//                                 <head>
//                                     <link rel="stylesheet" type="text/css" href="src/styles/pagebuilder.css">
//                                 </head>
//                                 <body>${template ? template.html : component!.html}</body>
//                             </html>`;
//     return {
//         content,
//         description: component?.description || '',
//         items: (template?.items ? template.items : []),
//         defaultValue: (template?.defaultValue ? template.defaultValue : {})
//     };

// };

const getInitialData = (_editor: EditorTinymce) => {

    let initialData: any = {};

    //console.log(html)

    initialData.preview = monacoEditorHTML;

    return initialData;
}


const open = function (editor: EditorTinymce, options: Options) {

    const dialogApi: any = editor.windowManager.open(dialogSpec([], getInitialData(editor), editor, options));
    dialogApi.block('Loading...');

    getIframe().iframe.onload = function() {
        dialogApi.unblock();
        getIframe().iframeDocument.monacoEditor.setValue(js_beautify.html(editor.getContent()));
    };
    
};
  
export {
    open
};