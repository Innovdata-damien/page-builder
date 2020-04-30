import EditorTinymce from 'tinymce';
import { Options } from '../../../../../PageBuilder';

//Change
const onChange = (api: any) => {
    
    const formData = api.getData();
    api.setData({
        preview: iframeComponent(formData.plateform, formData.video_id, formData.autoplay, formData.repeat, formData.size).preview
    });

}

//Submit

const onSubmit = (editor: EditorTinymce) => (api: any) => {

    const formData = api.getData();
    editor.insertContent(iframeComponent(formData.plateform, formData.video_id, formData.autoplay, formData.repeat, formData.size).embedVideo);

    api.close();
};

// plateform url
const urlPlateform: any = {
    youtube: 'https://www.youtube.com/embed/',
    vimeo: 'https://player.vimeo.com/video/',
    dailymotion: 'https://www.dailymotion.com/embed/video',
};

// iframe content
const iframeComponent = (plateformName: string, videoId: string, autoplay: boolean, repeat: boolean, size: any = {}) => {

    
    let urlVideo = urlPlateform[plateformName] + videoId + '?' + (autoplay ? '&autoplay=1' : '')  + (repeat ? '&loop=1' : '');
    let embedVideo = `<iframe plateform-name="${plateformName}" videoId="${videoId}" repeat="${repeat}" autoplay="${autoplay}" height="${size.height}" width="${size.width}" src="${urlVideo}"></iframe>`;
    
    let preview =   `<!DOCTYPE html>
                    <html>
                        <head>
                            <link rel="stylesheet" type="text/css" href="src/styles/pagebuilder.css">
                        </head>
                        <body style="text-align: center;">${embedVideo}</body>
                    </html>`;
    return {
        preview,
        embedVideo
    };
};

// Dialog spec

const dialogSpec = (editor: EditorTinymce, initialData = {}) => ({
    title: 'Insert/Edit Video',
    initialData: initialData,
    size: 'large',
    body: {
        type: 'panel',
        items: [
            {
                type: 'grid', // component type
                columns: 2, // number of columns
                items: [
                    {
                        type: 'input',
                        name: 'video_id',
                        label: 'Id of video'
                    },
                    {
                        type: 'selectbox',
                        name: 'plateform',
                        label: 'Plateform of video',
                        items: [
                            {
                                value: 'youtube',
                                text: 'Youtube'
                            },
                            {
                                value: 'dailymotion',
                                text: 'Dailymotion'
                            },
                            {
                                value: 'vimeo',
                                text: 'Viméo'
                            },
                        ]
                    },
                    {
                        type: 'sizeinput', // component type
                        name: 'size', // identifier
                        label: 'Dimensions',
                        constrain: true
                    }
                ]
            },
            {
                type: 'grid', // component type
                columns: 2, // number of columns
                items: [
                    {
                        type: 'checkbox',
                        name: 'autoplay',
                        label: 'Autoplay active'
                    },
                    {
                        type: 'checkbox',
                        name: 'repeat',
                        label: 'Repeat active'
                    }
                ]
            },
            {
                type: 'iframe',
                name: 'preview',
                label: 'Preview',
                sandboxed: true
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
    onChange: onChange,
    onSubmit: onSubmit(editor)

});

const getInitialData = (editor: EditorTinymce) => {
    let node = editor.selection.getNode();

    let initialData: any = {};

    if(node.classList.contains('mce-object-iframe')){

        let iframe = node.getElementsByTagName('iframe')[0];
        let size = {
            width: iframe.getAttribute('width'),
            height: iframe.getAttribute('height'),
        };
        let videoId = iframe.getAttribute('src');

        initialData.size = size;

        Object.keys(urlPlateform).forEach((key: string) => {
            if(iframe.getAttribute('src')!.includes(urlPlateform[key]))
                initialData.plateform = key;
            
            videoId = videoId?.replace(urlPlateform[key], '') || '';
        });

        if(iframe.getAttribute('src')!.includes('autoplay=1'))
            initialData.autoplay = true;

        if(iframe.getAttribute('src')!.includes('loop=1'))
            initialData.repeat = true;

        
        videoId = videoId?.replace('?', '') || '';
        videoId = videoId?.replace('&autoplay=1', '') || '';
        videoId = videoId?.replace('&loop=1', '') || '';

        initialData.video_id = videoId;
        
        initialData.preview = iframeComponent(
            initialData.plateform || 'youtube',
            initialData.video_id || '',
            initialData.autoplay || false,
            initialData.repeat || false,
            size
        ).preview;

    }else{
        let size = {
            width: '560',
            height: '250'
        };
        initialData.size = size;
        initialData.preview = iframeComponent('youtube', '', false, false, size).preview;
    }

    return initialData;
};

const open = function (editor: EditorTinymce, _options: Options) {
    editor.windowManager.open(
        dialogSpec(editor, getInitialData(editor))
    );
};
  
export {
    open
};