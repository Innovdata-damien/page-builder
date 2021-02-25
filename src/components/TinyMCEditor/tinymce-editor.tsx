import React, {Component} from 'react';
import loadCustomPlugins from './plugins/loadCustomPlugins';
import { ContentType, BodyType, ColumnType, LanguageBlocks } from '../../types/blockType';
import translationFr from '../../translations/fr.json';
//import tinymce from '@innovdata-damien/tinymce/js/tinymce/tinymce';
import { Editor } from '@innovdata-damien/tinymce-react';
//import 'tinymce/themes/silver';
//import '!style-loader!css-loader!tinymce/skins/ui/oxide/skin.min.css';
import { PageBuilder } from '../../PageBuilder';

// Redux
import { connect } from 'react-redux';
import { updateListBlockInside } from '../../redux/actions/blockAction';
import { toggleMenu } from '../../redux/actions/menuAction';
import getTemplate from './templates';

const mapStateToProps = (state: any) => ({
    blocks: state.blocks,
    pageBuilder: state.pageBuilder,
    iframeWindow: state.iframeWindow,
    locale: state.locale
});
  
const mapDispatchToProps = (dispatch: any) => ({
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string, locale: string) => dispatch(updateListBlockInside(blocksInside, blockId, colId, locale)),
    handleToggleMenu: (type: boolean) => dispatch(toggleMenu(type))
});

type Props = {
    blockId: string;
    colId: string;
    locale: string;
    item: ContentType;
    blocks: LanguageBlocks;
    pageBuilder: PageBuilder;
    iframeWindow: Window;
    updateListBlockInside: (blocksInside: Array<ContentType>, blockId: string, colId: string, locale: string) => void;
    handleToggleMenu: (type: boolean) => void;
}

class TinyMCEditor  extends Component<Props> {

    options: any;
    editor: any;
    textEditor?: any;

    constructor(props: Props) {
        super(props);

        this.options = {
            themes: 'silver',
            language: this.props.pageBuilder.__options?.language,
            setup: this._setupTinyMCEditor,
            init_instance_callback: this._initTinyMCEditor,
            plugins: 'codeeditor imageplus linkplus componenthtml videoembed importcss searchreplace directionality visualblocks visualchars fullscreen image media codesample table charmap hr nonbreaking toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
            menubar: '',
            toolbar: (this.props.item.design.value?.toolbar || this.props.item.design.value?.toolbar == '' ? this.props.item.design.value?.toolbar : ' codeeditor imageplus linkplus componenthtml videoembed undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify |  numlist bullist checklist | forecolor backcolor permanentpen | charmap emoticons'),
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
            fixed_toolbar_container: `[data-draggable-id='${this.props.item.id}']`,
            forced_root_block : 'p',
            extended_valid_elements: 'button[class|target|href|dir<ltr?rtl|disabled<disabled|id|lang|name|onclick|style|title|type|value],script[src]',
            verify_html: false
        };

    }

    _setupTinyMCEditor = (editor: any) => {
        editor.on('OpenWindow', () => {
            this.props.handleToggleMenu(false);
        });

        if(this.props.pageBuilder.__options)
            loadCustomPlugins(editor, this.props.pageBuilder.__options);

    }

    _initTinyMCEditor = (editor: any) => {
        this.props.iframeWindow.tinymce.addI18n('fr', translationFr);
    };

    _handleEditorChange = (content: any) => {

        let blockIndex = this.props.blocks[this.props.locale].findIndex((item: BodyType) => item.id === this.props.blockId);
        let colIndex = this.props.blocks[this.props.locale][blockIndex].columns.findIndex((item: ColumnType) => item.id === this.props.colId);
        let blockInsideIndex = this.props.blocks[this.props.locale][blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === this.props.item.id);

        const newState = [...this.props.blocks[this.props.locale][blockIndex].columns[colIndex].contents]
        newState[blockInsideIndex].content = content;

        this.props.updateListBlockInside(
            newState,
            this.props.blockId,
            this.props.colId,
            this.props.locale
        );

    }

    render() {
        return (
            <Editor
                initialValue={(this.props.item.content ? this.props.item.content : (this.props.item.design.type == 'html' ? this.props.item.design.value?.htmlContent : getTemplate(this.props.item.design.type, this.props.item.design.value || {})!.html))}
                init={this.options}
                onEditorChange={this._handleEditorChange}
                win={this.props.iframeWindow}
                tinymceScriptSrc="https://www.unpkg.com/@innovdata-damien/tinymce@5.2.2/tinymce.min.js"
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TinyMCEditor);