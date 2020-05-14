import EditorTinymce from 'tinymce';
import { Options } from '../../../../../PageBuilder';


// ============================================= Dialog Add Translations

// Build dialog spec
const dialogAddTransSpec = (initialData: any, editor: EditorTinymce, options: Options, parentDialogApi: any) => ({
    title: 'Add new translation var',
    size: 'normal',
    body: {
        type: 'panel',
        items: [
            {
                label: 'Label',
                type: 'input',
                name: 'label'
            },
            ...[...options.languagesList.keys()].map(i =>({
                label: options.languagesList[i].name,
                type: 'input',
                name: `language_${options.languagesList[i].code}`
            }))
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
    onSubmit: onSubmitDialogAddTrans(editor, options, parentDialogApi)
});


const createDialogAddTrans = (editor: EditorTinymce, options: Options, parentDialogApi: any) => {
    editor.windowManager.open(dialogAddTransSpec({}, editor, options, parentDialogApi));
};

// Submit
const onSubmitDialogAddTrans = (_editor: EditorTinymce, options: Options, parentDialogApi: any) => (api: any) => {
    const data = api.getData();

    options.addTranslationVarCallback(data);
    api.close();

    options.translationVars!.push(data.label);

    const newState = {
        transvars_list: options.translationVars ? getTransvarsList(options.translationVars) : []
    };
    parentDialogApi.setData(newState)
}




// ============================================= Dialog First

//Change
const onChange = (_editor: EditorTinymce, options: Options) => (dialogApi : any, details: any) => {
    
    if(details.name == 'search'){
        const newState = {
            transvars_list: options.translationVars ? getTransvarsList(options.translationVars).filter((item: any)=>(item.icon.toLowerCase().includes(dialogApi.getData().search.toLowerCase()))) : []
        };
    
        dialogApi.setData(newState);

    }
};

// Action
const onAction = (editor: EditorTinymce, options: Options) => (api: any, details: any) => {
    
    if(details.name == 'transvars_list'){
        editor.execCommand('mceInsertContent', false, `<span contenteditable="false" data-trad-vars>${options.translateTemplator?.start}${details.value}${options.translateTemplator?.end}</span>`);
        api.close();
    }else if (details.name =='add_translations'){
        createDialogAddTrans(editor, options, api);
    }
}

// Build dialog spec
const dialogSpec = (initialData: any, editor: EditorTinymce, options: Options) => ({
    title: 'Translation vars',
    size: 'normal',
    body: {
        type: 'panel',
        items: [
            {
                type: 'button',
                text: 'Add new trads',
                primary: true,
                name: 'add_translations',
            },
            {
                label: 'Search',
                type: 'input',
                name: 'search'
            },
            {
                type: 'collection',
                name: 'transvars_list'
            }
        ]
    },
    initialData,
    buttons: [
        {
            type: 'cancel',
            text: 'Close'
        }
    ],
    onAction: onAction(editor, options),
    onChange: onChange(editor, options)
});

// Trans vars
const getTransvarsList = (translationVars: any) =>{
    const newTranslationVars: any = [];

    translationVars.forEach((text: any) =>{
        newTranslationVars.push({
            icon: text,
            text: text,
            value: text
        })
    })
    return newTranslationVars;
};

const open = function (editor: EditorTinymce, options: Options) {

    const initialState = {
        transvars_list: options.translationVars ? getTransvarsList(options.translationVars) : []
    };
    editor.windowManager.open(dialogSpec( initialState, editor, options));

};
  
export {
    open
};