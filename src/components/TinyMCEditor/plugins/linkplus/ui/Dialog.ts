import EditorTinymce from 'tinymce';
import { Options } from '../../../../../PageBuilder';

//Change
const onChange = (api: any, details: any) => {

    const data = api.getData();
    if(details.name == 'url' && (data.text == '' || data.url.includes(data.text))){
        data.text = data.url;
        api.setData(data);
    }
    
}

//Submit

const onSubmit = (editor: EditorTinymce) => (api: any) => {

    let node = editor.selection.getNode();
    const dataForm: data = api.getData();

    type data = {
        elem_type: string;
        text: string;
        url: string;
        target: string;
        title: string;
    }

    let insertDom = (data: data) => {

        if(data.elem_type == 'link')

            return `<a class="pg-build__link" title="${data.title}" href="${data.url}" target="${data.target}">${data.text}</a>`;

        else if(data.elem_type == 'button')

            return `<button class="pg-build__button" title="${data.title}" href="${data.url}" target="${data.target}" onclick="

                    if('${data.target}' == '_blank')
                        window.open('${data.url}', '_blank');
                    else
                        window.location.href = '${data.url}';

                ">${data.text}</button>`;

        else
            return '';
    };

    let isLinkPlus = node.tagName.toLowerCase() == 'a' || node.tagName.toLowerCase() == 'button' || (editor.selection.getStart() == editor.selection.getEnd());

    if(isLinkPlus){
        node.replaceWith(document.createRange().createContextualFragment(insertDom(dataForm)));
    }else{
        editor.selection.setContent(insertDom(dataForm));
    }

    api.close();
};

// Dialog spec

const dialogSpec = (editor: EditorTinymce, initialData = {}) => ({
    title: 'Insert/Edit Link',
    initialData: initialData,
    body: {
        type: 'panel',
        items: [
            {
                type: 'input',
                name: 'url',
                label: 'Url'
            },
            {
                type: 'input',
                name: 'text',
                label: 'Text to display'
            },
            {
                type: 'input',
                name: 'title',
                label: 'Title'
            },
            {
                type: 'selectbox',
                name: 'target',
                label: 'Open link in...',
                items: [
                    {
                        value: '_self',
                        text: 'Current window'
                    },
                    {
                        value: '_blank',
                        text: 'New window'
                    },
                ]
            },
            {
                type: 'selectbox',
                name: 'elem_type',
                label: 'Element',
                items: [
                    {
                        value: 'link',
                        text: 'Link'
                    },
                    {
                        value: 'button',
                        text: 'Button'
                    }
                ]
            },
        ]
    },
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
    onChange: onChange,
    onSubmit: onSubmit(editor)

});

const getInitialData = (editor: EditorTinymce) => {
    let node = editor.selection.getNode();
    let isLinkPlus = node.tagName.toLowerCase() == 'a' || node.tagName.toLowerCase() == 'button';

    let initialData: any = {};
    //Set default value

    if(isLinkPlus){

        initialData.target = node.getAttribute('target') || '';
        initialData.title = node.getAttribute('title') || '';
        initialData.url = node.getAttribute('href') || '';
        initialData.text = node.textContent;
        initialData.elem_type = node.tagName.toLowerCase();

    }else{
        initialData.text = node.textContent;
    }

    return initialData;
};

const open = function (editor: EditorTinymce, _options: Options) {
    editor.windowManager.open(
        dialogSpec(editor, getInitialData(editor))
    );
    console.log('linkplus')
};
  
export {
    open
};