import * as CSS from 'csstype';

export interface DesignType  {
    type: 'column' | 'html' | 'card' | 'breadcrumb' | 'tab';
    preview: string;
    number?: number;
    value?: DesignValueType;
    cssCustomizable?: boolean;
    removeable?: boolean;
    moveable?: boolean;
    duplicable?: boolean;
    canAddClass?: boolean;
    editable?: boolean;
}

export interface DesignValueType  {
    columnDetails?: Array<1|2|3|4|5|6|7|8|9|10|11|12> | Array<ColumnDetail>;
    htmlContent?: string;
    toolbar?: string;
}

export interface ColumnDetail  {
    size: ColumnDetailSize;
    hide: ColumnDetailHide;
}

export interface ColumnDetailSize{
    pc: 1|2|3|4|5|6|7|8|9|10|11|12;
    tablet: 1|2|3|4|5|6|7|8|9|10|11|12;
    mobile: 1|2|3|4|5|6|7|8|9|10|11|12;
}

export interface ColumnDetailHide{
    pc: boolean;
    tablet: boolean;
    mobile: boolean;
}


// ------------- BODY

export interface BlockType {
    id: string;
    style?: CSS.Properties;
    design: DesignType;
    columns: Array<ColumnType>;
    class?: string;
}

export interface ColumnType {
    id: string;
    // size: number;
    detail: ColumnDetail;
    contents: Array<ContentType>;
}

export interface ContentType {
    id: string;
    style?: CSS.Properties;
    content?: string;
    design: DesignType;
    class?: string;
}

// ------------- MENU

export interface MenuType {
    id: string;
    title: string;
    collapse?: boolean | false;
    inside?: boolean | false;
    type: 'container' | 'content';
    blocks: Array<BlockMenuType>;
}

export interface BlockMenuType {
    id: string;
    content?: string;
    design: DesignType;
}
