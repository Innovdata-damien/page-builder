import EditorTinymce from 'tinymce';
import { Options, ComponentsList } from '../../../../../PageBuilder';
import getTemplate from '../../../templates';

//Change
const onChange = (editor: EditorTinymce, options: Options) => (dialogApi : any, details: any) => {
    if(details.name == 'component')
        dialogApi.block('Loading...'),
        updateDialog(dialogApi, dialogApi.getData().component, editor, options);
    else if(details.name == 'number')
        dialogApi.setData({ preview: componentData(dialogApi.getData().component, options, dialogApi.getData())!.content});
};

// Submit

const onSubmit = (editor: EditorTinymce, options: Options) => (api: any) => {
    editor.execCommand('mceInsertContent', false, componentData(api.getData().component, options, api.getData())!.content);
    api.close();
};


// Build dialog spec
const dialogSpec = (bodyItems: any, initialData: any, editor: EditorTinymce, options: Options) => ({
    title: 'Insert component',
    size: 'large',
    body: {
        type: 'panel',
        items: bodyItems
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
    onSubmit: onSubmit(editor, options),
    onChange: onChange(editor, options)
});

//Update dialog spec
const updateDialog = (dialogApi: any, type: string, editor: EditorTinymce, options: Options) => {
    let selectComponentItems: any = [];
    let componentDataValue: any = componentData(type, options);


    options.componentsList.forEach((item: ComponentsList) => {
        selectComponentItems.push({
            value: item.type,
            text: item.name
        });
    })

    const bodyItems = [
        {
            label: 'Components',
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
            label: 'Preview',
            sandboxed: true
        }
    ];

    const initialData = {
        component: type,
        preview: componentDataValue.content,
        ...componentDataValue.defaultValue
    };

    dialogApi.unblock();
    dialogApi.redial(dialogSpec(bodyItems, initialData, editor, options));
    dialogApi.focus('component');
};

// Component Data

const componentData = (type: string, options: Options, values: any = {}) => {
            
    let component = options.componentsList.find(item => item.type == type);
    let template = getTemplate(type, values);

    let content = `<!DOCTYPE html>
                            <html>
                                <head>
                                    <link rel="stylesheet" type="text/css" href="src/styles/pagebuilder.css">
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
    dialogApi.block('Loading...');
    updateDialog(dialogApi, options.componentsList[0].type, editor, options);

};
  
export {
    open
};