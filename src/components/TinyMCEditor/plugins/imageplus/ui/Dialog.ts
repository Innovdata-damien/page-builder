
import EditorTinymce from 'tinymce';
import { Options } from '../../../../../PageBuilder';
import i18n from '../../../../../translations/i18n';

//Action

const onAction = (_editor: EditorTinymce, options: Options) => (api: any, details: any) => {

    if(details.name == 'button_docmanager'){

        new Promise<string>(options.imageUrlLoader).then((value: string) => {
            api.setData({
                src: value
            });
        });
       
    };
}


//Change
const onChange = (_api: any, _details: any) => {
}

//Submit

const onSubmit = (editor: EditorTinymce) => (api: any) => {
   // editor.execCommand('mceImage', false, toImageData(api.getData()));

    editor.execCommand('mceInsertContent', false, toImageDom(api.getData()));
    api.close();
};

// Data to img dom

const toImageDom = (data: any) => (
    `<img alt="${data.alt}" class="${data.classes}" src="${data.src}" width="${data.dimensions.width}" height="${data.dimensions.height}"/>`
);

// Dialog spec

const dialogSpec = (editor: EditorTinymce, initialData = {}, options: Options) => ({
    title: i18n.trans('insert_edit_img','capitalize'),
    initialData: initialData,
    body: {

        type: 'panel',
        items: [
            {
                type: 'grid',
                columns: 2,
                items: [
                    {
                        name: 'src',
                        type: 'input',
                        placeholder: 'https://image.png',
                    },
                    {
                        type: 'button',
                        name: 'button_docmanager',
                        text: i18n.trans('doc_manager','capitalize'),
                        icon: 'gallery',
                        primary: true
                    }
                ]
            },
            {
                name: 'alt',
                type: 'input',
                label: i18n.trans('alt_description','capitalize'),
            },
            {
                name: 'dimensions',
                type: 'sizeinput'
            },
            {
                name: 'classes',
                type: 'selectbox',
                label: 'Class',
                items: [
                    {
                        text: 'Image',
                        value: 'pg-build__img'
                    },
                    {
                        text: i18n.trans('full_width','capitalize'),
                        value: 'pg-build__img-full-width'
                    },
                    {
                        text: i18n.trans('rounded','capitalize'),
                        value: 'pg-build__img-rounded'
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
    onAction: onAction(editor, options),
    onChange: onChange,
    onSubmit: onSubmit(editor)

});

const getInitialData = (editor: EditorTinymce) => {

    let initialData: any = {};
    let node = editor.selection.getNode()
    
    if(node.tagName.toLowerCase() == 'img'){

        initialData.src = node.getAttribute('src');
        initialData.dimensions = {
            width: node.getAttribute('width') || '',
            height: node.getAttribute('height') || ''
        };

        initialData.classes = node.classList.toString() || '';

    }else{

    }

    
    return initialData;
};

const open = function (editor: EditorTinymce, options: Options) {
    editor.windowManager.open(
        dialogSpec(editor, getInitialData(editor), options)
    );
};
  
export {
    open
};