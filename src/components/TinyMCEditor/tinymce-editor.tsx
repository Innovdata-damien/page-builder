import React, {Component} from 'react';
import loadCustomPlugins from './plugins/loadCustomPlugins';
import { ContentType, BlockType, ColumnType } from '../../types/blockType';
import { useSelector, useDispatch } from '../../redux/store';
//import tinymce from '@innovdata-damien/tinymce/js/tinymce/tinymce';
import { Editor } from '@innovdata-damien/tinymce-react';
//import 'tinymce/themes/silver';
//import '!style-loader!css-loader!tinymce/skins/ui/oxide/skin.min.css';
import { PageBuilder } from '../../PageBuilder';
import * as utils from '../../utils/utils';

// Redux
import { connect } from 'react-redux';
import { updateListBlockInside } from '../../redux/actions/blockAction';
import { toggleMenu } from '../../redux/actions/menuAction';
import getTemplate from './templates';

// const mapStateToProps = (state: any) => ({
//     blocks: state.blocks,
//     pageBuilder: state.pageBuilder,
//     iframeWindow: state.iframeWindow
// });
  
// const mapDispatchToProps = (dispatch: any) => ({
//     updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => dispatch(updateListBlockInside(blocksInside, blockId, colId)),
//     handleToggleMenu: (type: boolean) => dispatch(toggleMenu(type))
// });

// type Props = {
//     blockId: string;
//     colId: string;
//     item: ContentType;
//     blocks: Array<BlockType>;
//     pageBuilder: PageBuilder;
//     iframeWindow: Window;
//     updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string) => void;
//     handleToggleMenu: (type: boolean) => void;
// }

// class TinyMCEditor  extends Component<Props> {

//     options: any;
//     editor: any;
//     textEditor?: any;

//     constructor(props: Props) {
//         super(props);

//         this.options = {
//             themes: 'silver',
//             language: this.props.pageBuilder.__options?.language,
//             setup: this._setupTinyMCEditor,
//             init_instance_callback: this._initTinyMCEditor,
//             plugins: 'codeeditor imageplus translationvars linkplus multilanguage componenthtml videoembed importcss searchreplace directionality visualblocks visualchars fullscreen image media codesample table charmap hr nonbreaking toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
//             menubar: '',
//             toolbar: (this.props.item.design.value?.toolbar || this.props.item.design.value?.toolbar == '' ? this.props.item.design.value?.toolbar : ' codeeditor translationvars imageplus linkplus multilanguage componenthtml videoembed undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify |  numlist bullist checklist | forecolor backcolor permanentpen | charmap emoticons'),
//             importcss_append: true,
//             height: 400,
//             autosave_ask_before_unload: false,
//             template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
//             template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
//             quickbars_selection_toolbar: 'bold italic | forecolor backcolor fontsizeselect | multilanguage',
//             quickbars_insert_toolbar: 'imageplus videoembed quicktable',
//             toolbar_mode: 'sliding',
//             spellchecker_dialog: true,
//             spellchecker_whitelist: ['Ephox', 'Moxiecode'],
//             contextmenu: '',
//             a11y_advanced_options: true,
//             inline: true,
//             fixed_toolbar_container: `[data-draggable-id='${this.props.item.id}']`,
//             forced_root_block : 'p',
//             extended_valid_elements: 'button[class|target|href|dir<ltr?rtl|disabled<disabled|id|lang|name|onclick|style|title|type|value],script[src]'
//         };

//     }

//     _setupTinyMCEditor = (editor: any) => {
//         editor.on('OpenWindow', () => {
//             this.props.handleToggleMenu(false);
//         });

//         if(this.props.pageBuilder.__options)
//             loadCustomPlugins(editor, this.props.pageBuilder.__options);

//     }

//     _initTinyMCEditor = (_editor: any) => {
//     };

//     _handleEditorChange = (content: any) => {

//         const blockIndex = utils.getIndex(this.props.blocks, this.props.blockId);
//         const colIndex = utils.getIndex(this.props.blocks[blockIndex].columns, this.props.colId);
//         const blockInsideIndex = utils.getIndex(this.props.blocks[blockIndex].columns[colIndex].contents, this.props.item.id);

//         const newState = [...this.props.blocks[blockIndex].columns[colIndex].contents]
//         newState[blockInsideIndex].content = content;
        
//         this.props.updateListBlockInside(
//             newState,
//             this.props.blockId,
//             this.props.colId
//         );

//     }

//     render() {
//         return (
//             <Editor
//                 initialValue={(this.props.item.content ? this.props.item.content : (this.props.item.design.type == 'html' ? this.props.item.design.value?.htmlContent : getTemplate(this.props.item.design.type, this.props.item.design.value || {})!.html))}
//                 init={this.options}
//                 onEditorChange={this._handleEditorChange}
//                 win={this.props.iframeWindow}
//                 tinymceScriptSrc="https://www.unpkg.com/@innovdata-damien/tinymce@5.2.2/tinymce.min.js"
//             />
//         );
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(TinyMCEditor);

type TinyMCEditorProps = {
    blockId: string;
    colId: string;
    blockContentId: string;
    blockContent: ContentType;
};

const TinyMCEditor = (props: TinyMCEditorProps) => {

    const { blockId, colId, blockContentId } = props;
    const dispatch = useDispatch();
    
    // Get state
    const {
        pageBuilderInstance
    } = useSelector(( state ) => ({
        pageBuilderInstance: state.pageBuilder.instance
    }));

    // Methods
    const setupTinyMCEditor = (editor: any) => {

        editor.on('OpenWindow', () => {
            dispatch({
                type: 'Menu/ToggleVisibility',
                toggleVisibility: false
            })
        });

        if(pageBuilderInstance!.__options)
            loadCustomPlugins(editor, pageBuilderInstance!.__options);
    };

    const options = {
        themes: 'silver',
        language: pageBuilderInstance!.__options?.language,
        setup: setupTinyMCEditor,
        plugins: 'codeeditor imageplus translationvars linkplus multilanguage componenthtml videoembed importcss searchreplace directionality visualblocks visualchars fullscreen image media codesample table charmap hr nonbreaking toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
        menubar: '',
        toolbar: (props.blockContent.design.value?.toolbar || props.blockContent.design.value?.toolbar == '' ? props.blockContent.design.value?.toolbar : ' codeeditor translationvars imageplus linkplus multilanguage componenthtml videoembed undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify |  numlist bullist checklist | forecolor backcolor permanentpen | charmap emoticons'),
        importcss_append: true,
        height: 400,
        autosave_ask_before_unload: false,
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        quickbars_selection_toolbar: 'bold italic | forecolor backcolor fontsizeselect | multilanguage',
        quickbars_insert_toolbar: 'imageplus videoembed quicktable',
        toolbar_mode: 'sliding',
        spellchecker_dialog: true,
        spellchecker_whitelist: ['Ephox', 'Moxiecode'],
        contextmenu: '',
        a11y_advanced_options: true,
        inline: true,
        fixed_toolbar_container: `[data-draggable-id='${props.blockContentId}']`,
        forced_root_block : 'p',
        extended_valid_elements: 'button[class|target|href|dir<ltr?rtl|disabled<disabled|id|lang|name|onclick|style|title|type|value],script[src]'
    };

    return (
        <Editor
            initialValue={(props.blockContent.content ? props.blockContent.content : (props.blockContent.design.type == 'html' ? props.blockContent.design.value?.htmlContent : getTemplate(props.blockContent.design.type, props.blockContent.design.value || {})!.html))}
            init={options}
            onEditorChange={(content)=> dispatch({
                type: 'Block/SetContentOfBlockContent',
                blockId,
                colId,
                blockContentId,
                content
            })}
            tinymceScriptSrc="https://www.unpkg.com/@innovdata-damien/tinymce@5.2.2/tinymce.min.js"
        />
    );
}

export { TinyMCEditor };