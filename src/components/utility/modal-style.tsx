import React, {Component} from 'react';
import { PageBuilder } from '../../PageBuilder';
import Collapse from '@kunukn/react-collapse';
import { FormInstance } from 'antd/lib/form';
import Pickr from '@innovdata-damien/pickr';
import { BodyType, LanguageBlocks } from '../../types/blockType';
import * as CSS from 'csstype';
import uuid from 'uuid/v4';
import { InputNumber, Input, Select, Radio, Form } from 'antd';
import i18n from '../../translations/i18n';
const { Option } = Select;

const marginPaddingGrid: Array<string>= [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft'
];

const borderRadiusGrid: Array<string>= [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius'
];

const sizeUnite: Array<string>= [
    'px',
    '%'
];


// Redux
import { connect } from 'react-redux';
import {
    updateListBody
} from '../../redux/actions/blockAction';

const mapStateToProps = (state: any) => ({
    blocks: state.blocks,
    pageBuilder: state.pageBuilder,
    iframeDocument: state.iframeDocument,
    iframeWindow: state.iframeWindow,
    locale: state.locale
});

const mapDispatchToProps = (dispatch: any) => ({
    updateListBody: (blocks: Array<BodyType>, locale: string) => dispatch(updateListBody(blocks, locale))
});

type Props = {
    blocks: LanguageBlocks;
    blockId: string;
    colId?: string;
    blockInsideId?: string;
    locale: string;
    onRef: (ref: any) => void;
    updateListBody: (blocks: Array<BodyType>, locale: string) => void;
    pageBuilder: PageBuilder;
    iframeDocument: Document;
    iframeWindow: Window;
};

type State = {
    isOpen: boolean;
    toggleCollapseIndex: string | null;
}

// Pickr options
const pickrOptions: Pickr.Options = {
    el: '.pg-build__modal-style-row .color-picker',
    theme: 'nano',
    comparison: false,
    default: 'transparent',
    container: '.pg-build__modal-style',
    
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: false,
            save: false
        }
    }
};

interface FormValues extends CSS.Properties{

    borderBottomLeftRadius_value?: string;
    borderBottomLeftRadius_unite?: string;
    borderBottomRightRadius_value?: string;
    borderBottomRightRadius_unite?: string;
    borderTopLeftRadius_value?: string;
    borderTopLeftRadius_unite?: string;
    borderTopRightRadius_value?: string;
    borderTopRightRadius_unite?: string;

    marginTop_value?: string;
    marginTop_unite?: string;
    marginRight_value?: string;
    marginRight_unite?: string;
    marginLeft_value?: string;
    marginLeft_unite?: string;
    marginBottom_value?: string;
    marginBottom_unite?: string;
    
    paddingTop_value?: string;
    paddingTop_unite?: string;
    paddingRight_value?: string;
    paddingRight_unite?: string;
    paddingLeft_value?: string;
    paddingLeft_unite?: string;
    paddingBottom_value?: string;
    paddingBottom_unite?: string;

    width_value?: string;
    width_unite?: string;
    width_type?: string;
    minWidth_value?: string;
    minWidth_unite?: string;
    minWidth_type?: string;
    maxWidth_unite?: string;
    maxWidth_value?: string;
    maxWidth_type?: string;
    
    height_value?: string;
    height_unite?: string;
    height_type?: string;
    minHeight_value?: string;
    minHeight_unite?: string;
    minHeight_type?: string;
    maxHeight_value?: string;
    maxHeight_unite?: string;
    maxHeight_type?: string;
    
}

class Modal extends Component<Props, State> {

    formDefaultValue?: FormValues;
    id: string;
    modalRef?: HTMLDivElement | null;
    formRef = React.createRef<FormInstance>();
    

    constructor(props: Props) {
        super(props)

        this.state = {
            isOpen: false,
            toggleCollapseIndex: null
        };

        this.id = `pg-build__modal-style-${uuid()}`;

        this.formDefaultValue = {

            borderRadius: '0',
            borderWidth: '0',
            borderStyle: 'none',

            borderBottomLeftRadius_value: '0',
            borderBottomLeftRadius_unite: 'px',
            borderBottomRightRadius_value: '0',
            borderBottomRightRadius_unite: 'px',
            borderTopLeftRadius_value: '0',
            borderTopLeftRadius_unite: 'px',
            borderTopRightRadius_value: '0',
            borderTopRightRadius_unite: 'px',

            margin: 'null',
            
            marginTop_value: '0',
            marginTop_unite: 'px',
            marginRight_value: '0',
            marginRight_unite: 'px',
            marginLeft_value: '0',
            marginLeft_unite: 'px',
            marginBottom_value: '0',
            marginBottom_unite: 'px',
            
            paddingTop_value: '0',
            paddingTop_unite: 'px',
            paddingRight_value: '0',
            paddingRight_unite: 'px',
            paddingLeft_value: '0',
            paddingLeft_unite: 'px',
            paddingBottom_value: '0',
            paddingBottom_unite: 'px',

            borderColor: 'transparent',
            backgroundColor: 'transparent',


            width_value: '0',
            width_unite: 'px',
            width_type: 'unset',
            minWidth_value: '0',
            minWidth_unite: 'px',
            minWidth_type: 'unset',
            maxWidth_value: '0',
            maxWidth_unite: 'px',
            maxWidth_type: 'unset',
            
            height_value: '0',
            height_unite: 'px',
            height_type: 'unset',
            minHeight_value: '0',
            minHeight_unite: 'px',
            minHeight_type: 'unset',
            maxHeight_value: '0',
            maxHeight_unite: 'px',
            maxHeight_type: 'unset',
        }
        
    }

    _getBlockStyleForForm = () => {

        let blockStyle: any = {};
        
        if(this.props.colId && this.props.blockInsideId){
            blockStyle = {...this.props.blocks[this.props.locale].filter((item)=> item.id == this.props.blockId)[0].columns.filter((item)=> item.id == this.props.colId)[0].contents.filter((item)=> item.id == this.props.blockInsideId)[0].style} || {};
        }else{
            blockStyle = {...this.props.blocks[this.props.locale].filter((item)=> item.id == this.props.blockId)[0].style} || {};
        }

        const styleWithType = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'];

        Object.keys(blockStyle).forEach((styleName: string)=>{
            if(blockStyle[styleName].toString().match(/(px|%)/g)){

                let valueAndUnite = blockStyle[styleName].split(/(px|%)/).filter(String);
                blockStyle[`${styleName}_value`] = valueAndUnite[0];
                blockStyle[`${styleName}_unite`] = valueAndUnite[1];

                if(styleWithType.includes(styleName)){
                    blockStyle[`${styleName}_type`] = 'size';
                }

                delete blockStyle[styleName];

            }else{

                if(styleWithType.includes(styleName)){
                    blockStyle[`${styleName}_type`] = blockStyle[styleName];
                    delete blockStyle[styleName];
                }

            }
        })
        
        return blockStyle;
    }

    _toggleModal = (toggle: boolean) => {
        this.setState({ isOpen: toggle });
        this.props.pageBuilder.toggleCssView(toggle);
    }

    _handleToggleCollapse = (index: string | null) => {
        this.setState({ toggleCollapseIndex: this.state.toggleCollapseIndex === index ? null : index });
    }

    _handleChangeStyle = () => {
        
        const formData = this.formRef.current?.getFieldsValue() || {};

        const formDataStyleName = Object.keys(formData).filter((value: string) => !value.match(/(_type|_unite)/g));
        const newStyle: any = {};

        // Loop style value
        formDataStyleName.forEach((styleName: string)=>{


           if(styleName.includes('_value')){

                const newStyleName = styleName.replace(/(_value)/g, '');
                let newStyleValue = formData[styleName];

                if(newStyleValue != null){
                    if(formData[`${newStyleName}_unite`])
                        newStyleValue += formData[`${newStyleName}_unite`];
                        
                    newStyle[newStyleName] = newStyleValue;
                }

            }else if(formData[styleName] == 'null'){}else{
                newStyle[styleName] = formData[styleName];
            }

        })

        // Loop style type
        const formDataStyleNameByType = Object.keys(formData).filter((value: string) => value.match(/(_type)/g));

        formDataStyleNameByType.forEach((styleName: string) => {

            const newStyleName = styleName.replace(/(_type)/g, '');
            if(formData[styleName] != 'size')
                newStyle[newStyleName] = formData[styleName];

        });
        
        const newState: LanguageBlocks = {...this.props.blocks};
        if(this.props.colId && this.props.blockInsideId){

            newState[this.props.locale].find((item)=>{
                if(item.id == this.props.blockId){
                    item.columns.find((col) =>{

                        if(col.id == this.props.colId){

                            col.contents.find((content) =>{

                                if(content.id == this.props.blockInsideId){
                                    content.style = newStyle;
                                }
        
                            })

                        }

                    })
                }
            });
            
        }else{
            newState[this.props.locale].find((item)=>{
                if(item.id == this.props.blockId){
                    item.style = newStyle;
                }
            });
        }
        
    }

    _handleClickOutside = (e: any) => {
        const blockElement = this.props.iframeDocument.querySelector(`#${this.id}`);
        
        if(blockElement != null && !blockElement.contains(e.target)){
            this.setState({ isOpen: false });
            this.props.pageBuilder.toggleCssView(false);
        }

    }

    componentDidMount() {
        this.props.iframeDocument.addEventListener('mousedown', this._handleClickOutside);
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.iframeDocument.removeEventListener('mousedown', this._handleClickOutside);
        this.props.onRef(undefined);
    }

    render() {
        let formInitialValues = {};
        if(this.state.isOpen)
            formInitialValues = Object.assign(this.formDefaultValue, this._getBlockStyleForForm());

        return (
            <>
            {this.state.isOpen &&
                <div ref={elem => this.modalRef = elem} id={this.id} className={`pg-build__modal-style ${(this.props.pageBuilder.__options?.menuPosition == 'right' ? 'pg-build__modal-style-left' : 'pg-build__modal-style-right')}`}>
                    <div className="pg-build__modal-style-head">
                        <h5>{i18n.trans('modal_style','capitalize')}</h5>
                        <button onClick={()=>this._toggleModal(false)}><i className="mi mi-Clear"></i></button>
                    </div>
                    <div className="pg-build__modal-style-body">

                        <Form ref={this.formRef} name="formModalStyle" initialValues={formInitialValues} onValuesChange={this._handleChangeStyle}>

                            {/* Position */}
                            <div className="pg-build__modal-style-collapse">

                                <div className={`pg-build__modal-style-collapseTitle ${this.state.toggleCollapseIndex === 'position' ? 'pg-build__modal-style-collapseTitle-open' : ''}`} onClick={()=>this._handleToggleCollapse('position')}>{i18n.trans('position','capitalize')}</div>
                                
                                <Collapse className="pg-build__modal-style-collapseGroup" isOpen={this.state.toggleCollapseIndex === 'position'}>
                                    <PositionCollapse modalRef={this.modalRef}/>
                                </Collapse>

                            </div>

                            {/* Dimension */}
                            <div className="pg-build__modal-style-collapse">

                                <div className={`pg-build__modal-style-collapseTitle ${this.state.toggleCollapseIndex === 'dimension' ? 'pg-build__modal-style-collapseTitle-open' : ''}`} onClick={()=>this._handleToggleCollapse('dimension')}>{i18n.trans('dimension','capitalize')}</div>

                                <Collapse className="pg-build__modal-style-collapseGroup" isOpen={this.state.toggleCollapseIndex === 'dimension'}>
                                    <DimensionCollapse modalRef={this.modalRef} blockStyle={formInitialValues}/>
                                </Collapse>

                            </div>

                            {/* Style */}
                            <div className="pg-build__modal-style-collapse">

                                <div className={`pg-build__modal-style-collapseTitle ${this.state.toggleCollapseIndex === 'style' ? 'pg-build__modal-style-collapseTitle-open' : ''}`} onClick={()=>this._handleToggleCollapse('style')}>{i18n.trans('style','capitalize')}</div>

                                <Collapse className="pg-build__modal-style-collapseGroup" isOpen={this.state.toggleCollapseIndex === 'style'}>
                                    <StyleCollapse modalRef={this.modalRef} iframeDocument={this.props.iframeDocument} iframeWindow={this.props.iframeWindow} _handleChangeStyle={this._handleChangeStyle} formRef={this.formRef.current} blockStyle={formInitialValues}/>
                                </Collapse>

                            </div>
                        
                        </Form>
                        <div className="pg-build__modal-style-description"><i className="mi mi-Info"></i>{i18n.trans('msg_modal_style')}</div>

                    </div>
                </div>
            }
            </>
        );
    }
}


type PositionCollapseProps = {
    modalRef?: HTMLDivElement | null;
}

const PositionCollapse = (props: PositionCollapseProps) => {
    const radioStyle = {
        display: 'block'
    };

    const radioInput: Array<{ name:string, value: string }> = [
        { name: i18n.trans('unset','capitalize'), value: 'null' },
        { name: i18n.trans('left_auto','capitalize'), value: '0 0 0 auto' },
        { name: i18n.trans('center_auto','capitalize'), value: 'auto' },
        { name: i18n.trans('right_auto','capitalize'), value: '0 auto 0 0' },
    ]
    
    return (
        <>
            <PaddingMarginGrid modalRef={props.modalRef}/>
            <Form.Item style={{padding: '15px'}} label={i18n.trans('margin_position','capitalize')} name="margin">
                <Radio.Group>
                    {
                        radioInput.map((item, index)=>{
                            return (<Radio style={radioStyle} key={index} value={item.value}>{item.name}</Radio>);
                        })
                    }
                </Radio.Group>
            </Form.Item>
        </>
    )
};

type DimensionCollapseProps = {
    modalRef?: HTMLDivElement | null;
    blockStyle: FormValues;
}

type DimensionCollapseState = {
    width_type: string;
    minWidth_type: string;
    maxWidth_type: string;
    height_type: string;
    minHeight_type: string;
    maxHeight_type: string;
    [index: string]: string;
}

class DimensionCollapse  extends Component<DimensionCollapseProps, DimensionCollapseState> {
    
    constructor(props: DimensionCollapseProps){
        super(props);
        this.state = {
            width_type: (props.blockStyle.width_type ? props.blockStyle.width_type : 'unset') || 'unset',
            minWidth_type: (props.blockStyle.minWidth_type ? props.blockStyle.minWidth_type : 'unset') || 'unset',
            maxWidth_type: (props.blockStyle.maxWidth_type ? props.blockStyle.maxWidth_type : 'unset') || 'unset',
            height_type: (props.blockStyle.height_type ? props.blockStyle.height_type : 'unset') || 'unset',
            minHeight_type: (props.blockStyle.minHeight_type ? props.blockStyle.minHeight_type : 'unset') || 'unset',
            maxHeight_type: (props.blockStyle.maxHeight_type ? props.blockStyle.maxHeight_type : 'unset') || 'unset'
        }
    }

    _radioChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render(){

        const radioStyle = {
            display: 'block'
        };
    
        const widthHeightType: Array<{ name: string, value:string }> = [
            { name: i18n.trans('unset','capitalize'), value: 'unset'},
            { name: i18n.trans('choose_size','capitalize'), value: 'size'},
            { name: i18n.trans('auto','capitalize'), value: 'auto'},
        ];

        return (
            <>
                {/* Width */}
                <label>{i18n.trans('width','capitalize')}</label>
                {this.state.width_type != null && this.state.width_type == 'size' && 
                <>
                    <Form.Item name="width_value" style={{padding: '15px'}}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="width_unite" style={{padding: '15px'}}>
                        <Select getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                            {
                                sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                            }
                        </Select>
                    </Form.Item>
                </>
                }
                <Form.Item name="width_type" style={{padding: '15px'}}>
                    <Radio.Group name="width_type" onChange={this._radioChange}>
                        {
                            widthHeightType.map((item, index)=>{
                                return (<Radio style={radioStyle} key={index} value={item.value}>{item.name}</Radio>);
                            })
                        }
                    </Radio.Group>
                </Form.Item>
    
                {/* Min Width */}
                <label>{i18n.trans('min_width','capitalize')}</label>
                {this.state.minWidth_type != null && this.state.minWidth_type == 'size' && 
                <>
                    <Form.Item name="minWidth_value" style={{padding: '15px'}}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="minWidth_unite" style={{padding: '15px'}}>
                        <Select getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                            {
                                sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                            }
                        </Select>
                    </Form.Item>
                </>
                }
                
                <Form.Item name="minWidth_type" style={{padding: '15px'}}>
                    <Radio.Group name="minWidth_type" onChange={this._radioChange}>
                        {
                            widthHeightType.map((item, index)=>{
                                return (<Radio style={radioStyle} key={index} value={item.value}>{item.name}</Radio>);
                            })
                        }
                    </Radio.Group>
                </Form.Item>
    
                {/* Max Width */}
                <label>{i18n.trans('max_width','capitalize')}</label>
                {this.state.maxWidth_type != null && this.state.maxWidth_type == 'size' && 
                <>
                    <Form.Item name="maxWidth_value" style={{padding: '15px'}}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="maxWidth_unite" style={{padding: '15px'}}>
                        <Select size="small" getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                            {
                                sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                            }
                        </Select>
                    </Form.Item>
                </>
                }
                
                <Form.Item name="maxWidth_type" style={{padding: '15px'}}>
                    <Radio.Group name="maxWidth_type" onChange={this._radioChange}>
                        {
                            widthHeightType.map((item, index)=>{
                                return (<Radio style={radioStyle} key={index} value={item.value}>{item.name}</Radio>);
                            })
                        }
                    </Radio.Group>
                </Form.Item>
    
                {/* Height */}
                <label>{i18n.trans('height','capitalize')}</label>
                {this.state.height_type != null && this.state.height_type == 'size' && 
                <>
                    <Form.Item name="height_value" style={{padding: '15px'}}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="height_unite" style={{padding: '15px'}}>
                        <Select getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                            {
                                sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                            }
                        </Select>
                    </Form.Item>
                </>
                }
                
                <Form.Item name="height_type" style={{padding: '15px'}}>
                    <Radio.Group name="height_type" onChange={this._radioChange}>
                        {
                            widthHeightType.map((item, index)=>{
                                return (<Radio style={radioStyle} key={index} value={item.value}>{item.name}</Radio>);
                            })
                        }
                    </Radio.Group>
                </Form.Item>
    
                {/* Min Height */}
                <label>{i18n.trans('min_height','capitalize')}</label>
                {this.state.minHeight_type != null && this.state.minHeight_type == 'size' && 
                <>
                    <Form.Item name="minHeight_value" style={{padding: '15px'}}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="minHeight_unite" style={{padding: '15px'}}>
                        <Select getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                            {
                                sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                            }
                        </Select>
                    </Form.Item>
                </>
                }
                
                <Form.Item name="minHeight_type" style={{padding: '15px'}}>
                    <Radio.Group name="minHeight_type" onChange={this._radioChange}>
                        {
                            widthHeightType.map((item, index)=>{
                                return (<Radio style={radioStyle} key={index} value={item.value}>{item.name}</Radio>);
                            })
                        }
                    </Radio.Group>
                </Form.Item>
    
                {/* Max Height */}
                <label>{i18n.trans('max_height','capitalize')}</label>
                {this.state.maxHeight_type != null && this.state.maxHeight_type == 'size' && 
                <>
                    <Form.Item name="maxHeight_value" style={{padding: '15px'}}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="maxHeight_unite" style={{padding: '15px'}}>
                        <Select size="small" getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                            {
                                sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                            }
                        </Select>
                    </Form.Item>
                </>
                }
                
                <Form.Item name="maxHeight_type" style={{padding: '15px'}}>
                    <Radio.Group name="maxHeight_type" onChange={this._radioChange}>
                        {
                            widthHeightType.map((item, index)=>{
                                return (<Radio style={radioStyle} key={index} value={item.value}>{item.name}</Radio>);
                            })
                        }
                    </Radio.Group>
                </Form.Item>
            </>
        )
    }
}


type StyleCollapseProps = {
    iframeDocument: Document;
    iframeWindow: Window;
    blockStyle: FormValues;
    formRef: FormInstance | null;
    _handleChangeStyle: () => void;
    modalRef?: HTMLDivElement | null;
}

type StyleCollapseState = {
    borderColor: string;
}

class StyleCollapse extends Component<StyleCollapseProps, StyleCollapseState> {

    pickrInstances: Array<Pickr>;

    constructor(props: StyleCollapseProps){
        super(props);
        this.pickrInstances = [];
    }

    componentDidMount(){
        this.props.iframeDocument.querySelectorAll('.pg-build__modal-style-row .color-picker').forEach((elm: any)=>{
            
            pickrOptions.el = elm;
            pickrOptions.default = elm.getAttribute('defaultcolor');
            pickrOptions.container = (this.props.iframeDocument.getElementsByClassName('pg-build__modal-style')[0] as any);
            pickrOptions.document = this.props.iframeDocument;
            pickrOptions.elementInstance = this.props.iframeWindow.Element;

            const pickr = Pickr.create(pickrOptions)
            .on('change', (color: Pickr.HSVaColor) => {
                this.props.formRef!.setFieldsValue({[elm.getAttribute('datatype')]: color.toRGBA().toString(3)});
                this.props._handleChangeStyle();
            })

            this.pickrInstances.push(pickr);
        })
    }

    componentWillUnmount(){
        this.pickrInstances.forEach((pickr) => {
            pickr.destroyAndRemove();
        })
    }

    render(){

        const borderStyle: Array<{ name: string, value: string }> = [
            { name: i18n.trans('none','capitalize'), value: 'none' },
            { name: i18n.trans('solid','capitalize'), value: 'solid' },
            { name: i18n.trans('dotted','capitalize'), value: 'dotted' },
            { name: i18n.trans('dashed','capitalize'), value: 'dashed' },
            { name: i18n.trans('double','capitalize'), value: 'double' },
            { name: i18n.trans('groove','capitalize'), value: 'groove' },
            { name: i18n.trans('ridge','capitalize'), value: 'ridge' },
            { name: i18n.trans('inset','capitalize'), value: 'inset' },
            { name: i18n.trans('outset','capitalize'), value: 'outset' },
        ];
        return (
            <>

                <Form.Item label={i18n.trans('border_width','capitalize')} name="borderWidth" style={{padding: '15px'}}>
                    <InputNumber/>
                </Form.Item>

                <Form.Item label={i18n.trans('border_style','capitalize')} name="borderStyle" style={{padding: '15px'}}>
                    <Select getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                        {
                            borderStyle.map((item, index) => (<Option key={index} value={item.value}>{item.name}</Option>))
                        }
                    </Select>
                </Form.Item>

                <div className="pg-build__modal-style-row">
                    <div><label>{i18n.trans('border_radius','capitalize')}</label></div>
                    <div className="pg-build__border-square">
                        {
                            borderRadiusGrid.map((styleName, index) => {

                                return (
                                    <div key={index} className={`input-container ${styleName}`}>

                                        <Form.Item name={`${styleName}_value`} style={{padding: '15px'}}>
                                            <InputNumber style={{ width: '60px' }}  size="small"/>
                                        </Form.Item>
                                        <Form.Item name={`${styleName}_unite`} style={{padding: '15px'}}>
                                            <Select size="small" getPopupContainer={()=> this.props.modalRef as HTMLElement}>
                                                {
                                                    sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                                                }
                                            </Select>
                                        </Form.Item>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div className="pg-build__modal-style-row" style={{padding: '15px'}}>
                    <div><label>{i18n.trans('border_color','capitalize')}</label></div>
                    <div datatype="borderColor" defaultcolor={this.props.blockStyle!.borderColor || 'transparent'} className="color-picker"></div>
                    <Form.Item name="borderColor" style={{ display: 'none' }}>
                        <Input type="text"/>
                    </Form.Item>
                </div>

                <div className="pg-build__modal-style-row" style={{padding: '15px'}}>
                    <div><label>{i18n.trans('background_color','capitalize')}</label></div>
                    <div datatype="backgroundColor" defaultcolor={this.props.blockStyle!.backgroundColor || 'transparent'} className="color-picker" ></div>
                    <Form.Item name="backgroundColor" style={{ display: 'none' }}>
                        <Input type="text"/>
                    </Form.Item>
                </div>
                
            </>
        )
    }
    
}

type PaddingMarginGridProps = {
    modalRef?: HTMLDivElement | null;
}

const PaddingMarginGrid = (props: PaddingMarginGridProps) => {
    return(
        <div className="pg-build__modal-style-row pg-build__content-size-box">
            <div className="margin-box-content">
                <div className="size-box">
                    <div className="padding-box-content">
                        {
                            marginPaddingGrid.map((styleName, index) => {
                             
                                return (
                                    <div key={index} className={`contenu-size-box content-${styleName}`}>
                                        <Form.Item name={`${styleName}_value`}>
                                            <InputNumber size="small"/>
                                        </Form.Item>
                                        <Form.Item name={`${styleName}_unite`}>
                                            <Select size="small" getPopupContainer={()=> props.modalRef as HTMLElement}>
                                                {
                                                    sizeUnite.map((value, index) => (<Option key={index} value={value}>{value}</Option>))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal);