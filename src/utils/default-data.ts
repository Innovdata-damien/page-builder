import uuid from 'uuid/v4';
import { MenuType, LanguageBlocks } from '../types/blockType';

const defaultBlocks: LanguageBlocks = {
    fr: [
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
                            pc: 12,
                            tablet: 12,
                            mobile: 12
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
    ]
};


const defaultMenuItems: Array<MenuType> = [
    {
        id: uuid(),
        title: 'Afficher les blocs colonnes',
        collapse: true,
        type: 'container',
        blocks:[
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="border:1px solid #ccc;width:100%;height:25px;"></div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">1x Colonne</div>
                        </div>
                    `
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="border:1px solid #ccc;width:70%;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:30%;border-left:0;height:25px;"></div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">2x Colonnes</div>
                        </div>
                    `,
                    value: {
                        columnDetails: [8, 4]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="border:1px solid #ccc;width:30%;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:70%;border-left:0;height:25px;"></div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">2x Colonnes</div>
                        </div>
                    `,
                    value: {
                        columnDetails: [4, 8]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="border:1px solid #ccc;width:50%;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:50%;border-left:0;height:25px;"></div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">2x Colonnes</div>
                        </div>
                    `,
                    value: {
                        columnDetails: [6, 6]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="border:1px solid #ccc;width:33.333333333333333%;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:33.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:33.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">3x Colonnes</div>
                        </div>
                    `,
                    value: {
                        columnDetails: [4,4,4]
                    }
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'column',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="border:1px solid #ccc;width:8.333333333333333%;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="border:1px solid #ccc;width:8.333333333333333%;border-left:0;height:25px;"></div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">12x Colonnes</div>
                        </div>
                    `,
                    value: {
                        columnDetails: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                    }
                }
            },
        ]
    },
    {
        id: uuid(),
        title: 'Afficher les blocs contenus',
        collapse: true,
        type: 'content',
        blocks:[
            {
                id: uuid(),
                design: {
                    type: 'html',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="border:1px solid #ccc;width:100%;height:25px;color:#ccc;">Exemple d...|</div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">Texte</div>
                        </div>
                    `,
                    value: {
                        htmlContent: '<p>(Exemple de texte...)</p>'
                    },
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'card',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px; text-align:left;">
                            <div style="width:80%;box-shadow: 0 5px 15px rgba(0,0,0,0.08);margin:auto;">
                                <div style="border-bottom: 1px solid #ccc;width:100%;height:15px;color:#ccc;font-size:8px;">Title</div>
                                <div style="width:100%;height:15px;color:#ccc;font-size:8px;">Content</div>
                                <div style="border-top: 1px solid #ccc;width:100%;height:15px;color:#ccc;font-size:8px;">Foot</div>
                            </div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">Card</div>
                        </div>
                    `
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'breadcrumb',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="background-color: #e5e5e5;border-radius: 3px;font-size:12px;padding:2px 10px;margin:auto;color:#bbb;">Item 1 / Item 2</div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">Breadcrumb</div>
                        </div>
                    `
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'tab',
                    preview:  `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="width:100%;">
                                <div style="width:100%;display:flex;">
                                    <div style="width:50%;height:20px;font-size:12px;border:1px solid #ccc;color:#ccc;">Tab 1</div>
                                    <div style="width:50%;height:20px;font-size:12px;border:1px solid #ccc;color:#fff;border-left:0;background-color:#bbb;">Tab 2</div>
                                </div>
                                <div style="width:100%;height:30px;border:1px solid #ccc;border-top:0;text-align:left;padding:5px;color:#ccc;font-size:12px;">Content...</div>
                            </div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">Tab</div>
                        </div>
                    `
                }
            },
            {
                id: uuid(),
                design: {
                    type: 'html',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="width:100%;padding:5px;background-color:#1F6CB5;color:#fff;text-transform:uppercase;font-size:12px;">Titre</div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">Header</div>
                        </div>
                    `,
                    value: {
                        htmlContent: `
                            <header class="bg-primary" style="margin: 0 -15px;">
                                <div class="container text-center py-5">
                                    <h1 class="text-white text-uppercase">Titre</h1>
                                </div>
                            </header>
                        `
                    }
                }
            },
            { 
                id: uuid(),
                design: {
                    type: 'html',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="width:100%;padding:3px;background-color:#1F6CB5;color:#fff;font-size:12px;">
                                <div style="text-transform:uppercase;">Titre</div>
                                <div style="font-size:10px;">Description...</div>
                            </div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">Header 2</div>
                        </div>
                    `,
                    value: {
                        htmlContent:`
                        <div style="position: relative;">
                            <header style="position: relative; background-color: #1f6cb5; overflow: hidden; margin-left: -15px; margin-right: -15px; width: calc(100% + 30px);">
                            <img class="element-droite" style="right: 0; position: absolute;" src="https://virtus-expertise.innov-data.com/upload/virtus-elements-droite.png" alt="virtus &eacute;l&eacute;ments de travail" />
                            <img class="element-gauche " style="bottom: 0; position: absolute;" src="https://virtus-expertise.innov-data.com/upload/virtus-elements-gauche.png" alt="virtus &eacute;l&eacute;ments de travail" />
                                <div class="container" style="padding: 48px 15px;">
                                    <h1 class=" text-uppercase" style="margin: 0px; text-align: center;"><span style="color: #ffffff;">Titre</span></h1>
                                    <p style="color: #ffffff; text-align: center;">Description...</p>
                                </div>
                            </header>
                        </div>
                        `
                    }
                }
            },
            { 
                id: uuid(),
                design: {
                    type: 'html',
                    preview: `
                        <div class="pg-build__row" style="width:100%;padding:5px;">
                            <div style="width:100%;padding:3px;font-size:12px;display:flex;border:1px solid #ccc;">
                                <div style="width: 30%;color:#9DAFBD;">1<br/><span style="color:#1F6CB5;">Titre</span></div>
                                <div style="font-size:10px;width: 70%;color:#9DAFBD;">Texte d'exemple...</div>
                            </div>
                            <div style="width:100%; text-align:center;padding-top:5px;color:#ccc;">Section</div>
                        </div>
                    `,
                    value: {
                        htmlContent:`
                            <section class="container py-5">
                                <div class="row">
                                    <h2 class="text-primary col-lg-4"><span class="text-grey font-weight-bold nombre-h2">1</span>Titre</h2>
                                    <p class="text-grey col-lg-8">Texte d'exemple...</p>
                                </div>
                            </section>
                        `
                    }
                }
            }
        ]
    }
];
//console.log(JSON.stringify(defaultMenuItems))


export {defaultBlocks, defaultMenuItems};