import EditorTinymce from 'tinymce';
import { Options, ComponentsList } from '../../../../../PageBuilder';
import getTemplate from '../../../templates';
import i18n from '../../../../../translations/i18n';

const getIframe = (editor: EditorTinymce) => {
    let iframe: any = editor.contentWindow.document.querySelector('.tox-dialog__body iframe');
    var iframeDocument = iframe!.contentDocument || iframe!.contentWindow.document;

    return { iframe, iframeDocument };
};


//Change
const onChange = (editor: EditorTinymce, options: Options) => (dialogApi : any, details: any) => {

    if(details.name == 'component')
        dialogApi.block(`${i18n.trans('loading')}...`),
        updateDialog(dialogApi, dialogApi.getData().component, editor, options);

    else if(details.name == 'number')
        dialogApi.setData({ preview: componentData(dialogApi.getData().component, options, dialogApi.getData())!.content});

    else if(details.name == 'nbrframe')
        dialogApi.block(`${i18n.trans('loading')}...`),
        updateDialog(dialogApi, dialogApi.getData().component, editor, options, dialogApi.getData());
};

//Action

const onSubmit = (editor: EditorTinymce, options: Options) => (api: any) => {
    editor.execCommand('mceInsertContent', false, componentData(api.getData().component, options, api.getData())!.content);
    api.close();
};

// Submit
const onAction = (editor: EditorTinymce, options: Options) => (api: any, details: any) => {
    
    if(details.name.includes('buttondocmanager')){

        const nameOfInput =  details.name.slice(details.name.split('_')[0].length + 1);

        new Promise<string>(options.imageUrlLoader).then((value: string) => {
            api.setData({
                [`carousel_img_${nameOfInput}`]: value
            });
        });
       
    }
    else if (details.name == 'refresh')
        api.block(`${i18n.trans('loading')}...`),
        updateDialog(api, api.getData().component, editor, options, api.getData());
}

// Build dialog spec
const dialogSpec = (bodyItems: any, initialData: any, editor: EditorTinymce, options: Options) => ({
    title: i18n.trans('insert_component','capitalize'),
    size: 'large',
    body: {
        type: 'panel',
        items: bodyItems
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
    onAction: onAction(editor, options),
    onSubmit: onSubmit(editor, options),
    onChange: onChange(editor, options)
});

//Update dialog spec
const updateDialog = (dialogApi: any, type: string, editor: EditorTinymce, options: Options, oldData: any = {}) => {
    let selectComponentItems: any = [];
    let componentDataValue: any = componentData(type, options, oldData);


    options.componentsList.forEach((item: ComponentsList) => {
        selectComponentItems.push({
            value: item.type,
            text: item.name
        });
    })

    const bodyItems = [
        {
            label: i18n.trans('component','capitalize'),
            type: 'selectbox',
            name: 'component',
            items: selectComponentItems
        },
        {
            type: 'htmlpanel',
            name: 'description',
            html: `<p>${componentDataValue.description}</p>`
        },
        ...componentDataValue.items,
        {
            type: 'iframe',
            name: 'preview',
            label: i18n.trans('preview','capitalize'),
            sandboxed: true
        }
    ];
    
    const initialData = {
        component: type,
        ...componentDataValue.defaultValue,
        ...oldData,
        preview: componentDataValue.content
    };

    dialogApi.unblock();
    dialogApi.redial(dialogSpec(bodyItems, initialData, editor, options));
    dialogApi.focus('component');

    // getIframe(editor).iframe.onload = function() {

    //     console.log(getIframe(editor).iframeDocument.querySelectorAll('.glide')[0])
    //    //getIframe(editor).iframeDocument.monacoEditor.setValue(js_beautify.html(editor.getContent()));

    //    //new Glide(getIframe(editor).iframeDocument.querySelectorAll('.glide')[0]).mount();
    //    // new Glide();
    // };

};

// Component Data

const componentData = (type: string, options: Options, values: any = {}) => {
            
    let component = options.componentsList.find(item => item.type == type);
    let template = getTemplate(type, values);
    const stylesUrl = options.stylesUrl.split(' | ');
    let linkStyles = '';

    stylesUrl.forEach((styleUrl)=> {
        linkStyles += `<link rel="stylesheet" type="text/css" href="${styleUrl}">`
    })

console.log()
    let content = `<!DOCTYPE html>
                            <html>
                                <head>
                                    ${linkStyles}
                                    <link rel="stylesheet" type="text/css" href="">
                                    <script src="https://unpkg.com/@glidejs/glide"></script>
                                </head>
                                <body>${template ? template.html : component!.html}</body>
                            </html>`;
    return {
        content,
        description: component?.description || '',
        items: (template?.items ? template.items : []),
        defaultValue: (template?.defaultValue ? template.defaultValue : {})
    };

};


const open = function (editor: EditorTinymce, options: Options) {

    const dialogApi: any = editor.windowManager.open(dialogSpec([], { template: '', preview: '' }, editor, options));
    dialogApi.block(`${i18n.trans('loading')}...`);
    updateDialog(dialogApi, options.componentsList[0].type, editor, options);

};
  
export {
    open
};