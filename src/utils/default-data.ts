import uuid from 'uuid/v4';
import { BodyType, MenuType } from '../types/blockType';

const defaultBlocks: Array<BodyType> = [
    {
        id: uuid(),
        design: {
            type: 'column',
            preview: 'Column'
        },
        columns: [
            {
                id: uuid(),
                detail: {
                    size: {
                        pc: 6,
                        tablet: 6,
                        mobile: 6
                    },
                    hide : {
                        pc: false,
                        tablet: false,
                        mobile: false
                    }
                },
                contents: [
                ]
            },
            {
                id: uuid(),
                detail: {
                    size: {
                        pc: 6,
                        tablet: 6,
                        mobile: 6
                    },
                    hide : {
                        pc: false,
                        tablet: false,
                        mobile: false
                    }
                },
                contents: [
                ]
            }
        ]
    },
    {
        id: uuid(),
        design: {
            type: 'column',
            preview: 'Column'
        },
        columns: [
            {
                id: uuid(),
                detail: {
                    size: {
                        pc: 6,
                        tablet: 6,
                        mobile: 6
                    },
                    hide : {
                        pc: false,
                        tablet: false,
                        mobile: false
                    }
                },
                contents: [
                ]
            },
            {
                id: uuid(),
                detail: {
                    size: {
                        pc: 6,
                        tablet: 6,
                        mobile: 6
                    },
                    hide : {
                        pc: false,
                        tablet: false,
                        mobile: false
                    }
                },
                contents: [
                    {
                        id: uuid(),
                        content: '<p>truc ...<img src="http://odrazia.localhost:8888/images/bloc-texte.png"></p>',
                        design: {
                            type: 'html',
                            preview: 'Text',
                            value: {
                                htmlContent: '<p>Text example ...</p>'
                            },
                        }
                    },{
                        id: uuid(),
                        content: '<p>truc ...<img src="http://odrazia.localhost:8888/images/bloc-texte.png"></p>',
                        design: {
                            type: 'html',
                            preview: 'Text',
                            value: {
                                htmlContent: '<p>Text example ...</p>'
                            },
                        }
                    }
                ]
            }
        ]
    },
    {
        id: uuid(),
        design: {
            type: 'column',
            preview: 'Column'
        },
        columns: [
            {
                id: uuid(),
                detail: {
                    size: {
                        pc: 6,
                        tablet: 6,
                        mobile: 6
                    },
                    hide : {
                        pc: false,
                        tablet: false,
                        mobile: false
                    }
                },
                contents: [
                ]
            },
            {
                id: uuid(),
                detail: {
                    size: {
                        pc: 6,
                        tablet: 6,
                        mobile: 6
                    },
                    hide : {
                        pc: false,
                        tablet: false,
                        mobile: false
                    }
                },
                contents: [
                ]
            }
        ]
    }
];


const defaultMenuItems: Array<MenuType> = [
    {
        id: uuid(),
        title: 'Colonnes',
        collapse: true,
        type: 'container',
        blocks:[
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: 'Column'
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: 'Column left',
                    value: {
                        columnDetails: [8, 4]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: 'Column x2 and tablet',
                    value: {
                        columnDetails: [{
                            size: {
                                pc: 6,
                                tablet: 6,
                                mobile: 12
                            },
                            hide : {
                                pc: false,
                                tablet: false,
                                mobile: false
                            }
                        },
                        {
                            size: {
                                pc: 6,
                                tablet: 6,
                                mobile: 12
                            },
                            hide : {
                                pc: false,
                                tablet: false,
                                mobile: false
                            }
                        }]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: 'Column right',
                    value: {
                        columnDetails: [4, 8]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: 'Column x2',
                    value: {
                        columnDetails: [6, 6]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: 'Column x12',
                    value: {
                        columnDetails: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                    }
                }
            },
        ]
    },
    {
        id: uuid(),
        title: 'Contenus',
        collapse: true,
        type: 'content',
        blocks:[
            {
                id: uuid(),
                design: {
                    type: 'html',
                    preview: 'Text',
                    value: {
                        htmlContent: '<p>Text example ...</p>'
                    },
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'card',
                    preview: 'Card'
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'breadcrumb',
                    preview: 'Breadcrumb'
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'tab',
                    preview: 'Tab'
                }
            }
        ]
    }
];


export {defaultBlocks, defaultMenuItems};