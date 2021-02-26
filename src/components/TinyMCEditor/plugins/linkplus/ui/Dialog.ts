import EditorTinymce from 'tinymce';
import { Options } from '../../../../../PageBuilder';

//Change
const onChange = (options: Options) => (api: any, details: any) => {
    const data = api.getData();

    if(details.name == 'url' && options.linkUrlList.length > 0){

        var checkUrlExistInSelector = options.linkUrlList.filter((link) => link.value == data.url);
        
        if(checkUrlExistInSelector?.length == 0){
            data.url_select = '';
        }else{
            data.url_select = data.url;
        }

        api.setData(data);
    }

    if(details.name == 'url' && (data.text == '' || data.url.includes(data.text))){

        data.text = data.url;

        api.setData(data);

    }else if(details.name == 'url_select'){

        data.url = data.url_select;
        if(data.text == '' || data.url_select.includes(data.text)){
            data.text = data.url_select;
        }
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

    let oldClass = node.classList.toString().replace('pg-build__link', '');
    oldClass = oldClass.replace('pg-build__button', '');

    let insertDom = (data: data) => {

        if(data.elem_type == 'link')

            return `<a class="pg-build__link ${oldClass}" title="${data.title}" href="${data.url}" target="${data.target}">${data.text}</a>`;

        else if(data.elem_type == 'button')

            return `<button class="pg-build__button ${oldClass}" title="${data.title}" href="${data.url}" target="${data.target}" onclick="

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

const dialogSpec = (editor: EditorTinymce, initialData = {}, options: Options) => ({
    title: 'Insert/Edit Link',
    initialData: initialData,
    body: {
        type: 'panel',
        items: [
            {
                type: 'input',
                name: 'url',
                label: 'Enter url'
            },
            ...(options.linkUrlList!.length > 0 ? [
                {
                    type: 'selectbox',
                    name: 'url_select',
                    label: 'Or select url',
                    items: options.linkUrlList
                }
            ] : []),
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
            }
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
    onChange: onChange(options),
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
        initialData.url_select = node.getAttribute('href') || '';
        initialData.text = node.textContent;
        initialData.elem_type = node.tagName.toLowerCase();

    }else{
        initialData.text = node.textContent;
    }

    return initialData;
};

const open = function (editor: EditorTinymce, options: Options) {
    editor.windowManager.open(
        dialogSpec(editor, getInitialData(editor), options)
    );
    console.log('linkplus')
};
  
export {
    open
};