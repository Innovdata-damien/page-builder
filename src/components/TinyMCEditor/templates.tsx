import React from 'react';
import ReactDOMServer from 'react-dom/server';
import uuid from 'uuid/v4';
import { decodeHTML } from '../../utils/utils';


// Card
const Card = () => {
    return  (
        <>
            <p><br/></p>
            <div className="pg-build__card">
                <div className="pg-build__card-head"><p>Title</p></div>
                <div className="pg-build__card-body"><p>Content</p></div>
                <div className="pg-build__card-foot"><p>Foot</p></div>
            </div>
            <p><br/></p>
        </>
    );
};

// Breadcrumb
type BreadcrumbProps = {
    number: string;
}

const Breadcrumb = (props: BreadcrumbProps) => {

    const breadcrumbItemNumber: number = parseInt(props.number || '2');

    return (
        <>
            <p><br/></p>
            
            <ol className="pg-build__breadcrumb">
                {[...Array(breadcrumbItemNumber).keys()].map(i =>(<li key={i + 1} className="pg-build__breadcrumb-item">Item {i + 1}</li>))}
            </ol>
            <p><b/></p>
        </>
    )
}

// Tab
type TabProps = {
    number: string;
}

const Tab = (props: TabProps) => {

    const tabId: string = uuid();
    const tabNumber: number = parseInt(props.number || '2');

    return (
        <>
            <p><br/></p>
            <div className="pg-build__tab">

                {[...Array(tabNumber).keys()].map(tabIndex =>(
                    <>
                        <input className="pg-build__tab-item" type="radio" id={`tab${tabId + (tabIndex + 1)}`} name={`tabGroup-${tabId}`} defaultChecked={(tabIndex == 0 ? true : false)}/>
                        <label htmlFor={`tab${tabId + (tabIndex + 1)}`}>Tab {(tabIndex + 1)}</label>
                    </>
                ))}

                {[...Array(tabNumber).keys()].map(tabIndex =>(
                    <div key={(tabIndex + 1)} className="pg-build__tab-content">
                        <p>Tab {(tabIndex + 1)} ...</p>
                    </div>
                ))}
                
            </div>
            <p><br/></p>
        </>
    )
}

// Carousel
type CarouselProps = {
    values: any;
}

const Carousel = (props: CarouselProps) => {

    //Get carousel properties
    let Slides: Array<{ img_url: string; description: string; link: string; }> = [];
    const autoplay: boolean | number = props.values.autoplay || false;
    const direction: 'ltr' | 'rtl' = props.values.direction || 'ltr';
    const arrow: boolean = props.values.arrow || false;

    (Object.keys(props.values) as any).forEach((indexName: string)=>{
        if(indexName.includes('carousel_description')){

            const indexNameNumber = indexName.replace('carousel_description','');
            Slides.push({
                img_url: props.values[`carousel_img${indexNameNumber}`],
                description: props.values[indexName],
                link: props.values[`carousel_link${indexNameNumber}`]
            });
            
        }
            
    });

    //Set defualt carousel slide if not defined
    if(Slides.length == 0)
        Slides = [...Array(2).keys()].map( index =>({
            img_url: '',
            description: `Slide ${index + 1}`,
            link: ''
        }));

    const carouselId = uuid().replace(/[0-9]|-/g, '');
    
    return (
        <div contentEditable={false}>
            <div className="pg-build__carousel glide" id={carouselId}>
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {
                            Slides.map((value, i)=>(
                                value.link != '' ?
                                <li key={i} className="glide__slide"><a href={value.link}>{value.description}</a></li>
                                :
                                <li key={i} className="glide__slide">{value.description}</li>
                            ))
                        }
                    </ul>
                </div>
                {props.values.arrow && 
                    (<div data-glide-el="controls">
                        <button className="carousel__arrow carousel__arrow--prev glide__arrow glide__arrow--prev" data-glide-dir="<">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <path d="M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z"></path>
                            </svg>
                        </button>
                        <button className="carousel__arrow carousel__arrow--next glide__arrow glide__arrow--next" data-glide-dir=">">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>
                            </svg>
                        </button>
                    </div>)
                }
                {props.values.indicators && 
                    <div className="carousel__bullets glide__bullets" data-glide-el="controls[nav]">
                    {
                        Slides.map((value, i)=>(<button className="carousel__bullet glide__bullet" data-glide-dir={`=${i}`}></button>))
                    }
                    </div>
                }
            </div>
            <script>
                {`
                    if(document.getElementById('${carouselId}'))
                        console.log('test'),
                        new Glide('#${carouselId}', {
                            type: 'carousel',
                            perView: 1,
                            animationDuration: 600,
                            animationTimingFunc: 'linear',
                            peek: 300,
                            focusAt: 0,
                            autoplay: ${(autoplay ? props.values.time : autoplay)},
                            direction: '${direction}'
                        }).mount();
                `}
            </script>
        </div>
    )

}

const getTemplate = (type: string, values?: any) => {
    if(type == 'card')
        return {
            html: ReactDOMServer.renderToStaticMarkup(<Card/>)
        };
        
    else if(type == 'breadcrumb')
        return {
            html: ReactDOMServer.renderToStaticMarkup(<Breadcrumb number={values!.number}/>),
            items: [
                {
                    label: 'Number of tabs',
                    name: 'number',
                    type: 'selectbox',
                    items: [...Array(10).keys()].map(i =>({ value: (i + 1).toString(), text: (i + 1).toString() }))
                }
            ],
            defaultValue: {
                number: '2'
            }
        };

    else if(type == 'tab')
        return {
            html: ReactDOMServer.renderToStaticMarkup(<Tab number={values!.number}/>),
            items: [
                {
                    label: 'Number of tabs',
                    name: 'number',
                    type: 'selectbox',
                    items: [...Array(20).keys()].map(i =>({ value: (i + 1).toString(), text: (i + 1).toString() }))
                }
            ],
            defaultValue: {
                number: '2'
            }
        }

    else if(type == 'carousel'){

        const nbrFrame = parseInt(values.nbrframe || '2');
        const nbrGrid = Math.ceil(nbrFrame / 2);
        const nrbFramePair: boolean = (nbrFrame%2 == 0);
        let imageGrid = [];

        // Create grid for slide
        for (let index = 0; index < nbrGrid; index++) {

            let nbrFrameByGrid = 2;

            if((index + 1) == nbrGrid && !nrbFramePair)
                nbrFrameByGrid = 1;   

            imageGrid.push({
                type: 'grid',
                columns: 2,
                items: [...Array(nbrFrameByGrid).keys()].map(i =>({
                    type: 'htmlpanel',
                    html: `<div role="presentation" class="tox-form__group"><p>Image ${(index + 1)}_${(i + 1)}</p></div>`
                }))
            });

            const imgGridFirstRow: any = [];
            
            for (let firstRowIndex = 0; firstRowIndex < nbrFrameByGrid; firstRowIndex++) {
                
                imgGridFirstRow.push({
                    name: `carousel_img_${(index + 1)}_${(firstRowIndex + 1)}`,
                    type: 'input',
                    placeholder: 'https://image.png'
                })

                imgGridFirstRow.push({
                    type: 'button',
                    name: `buttondocmanager_${(index + 1)}_${(firstRowIndex + 1)}`,
                    text: 'Doc manager',
                    icon: 'gallery',
                    primary: true
                })
                
            }

            imageGrid.push({
                type: 'grid',
                columns: 4,
                items: imgGridFirstRow
            });

            imageGrid.push({
                type: 'grid',
                columns: 2,
                items:  [...Array(nbrFrameByGrid).keys()].map(i =>({
                    name: `carousel_link_${(index + 1)}_${(i + 1)}`,
                    type: 'input',
                    placeholder: 'https://carousel.link.fr'
                }))
            });

            imageGrid.push({
                type: 'grid',
                columns: 2,
                items:  [...Array(nbrFrameByGrid).keys()].map(i =>({
                    name: `carousel_description_${(index + 1)}_${(i + 1)}`,
                    type: 'textarea',
                    placeholder: 'My description of carousel item...'
                }))
            });
        }

        return {
            html: decodeHTML(ReactDOMServer.renderToStaticMarkup(<Carousel values={values}/>)),
            items: [
                {
                    type: 'button',
                    name: 'refresh',
                    text: 'Refresh',
                    align: 'end',
                    primary: true
                },

                {
                    type: 'grid',
                    columns: 2,
                    items: [
                        {
                            label: 'autoplay',
                            name: 'autoplay',
                            type: 'checkbox'
                        },
                        {
                            label: 'Autoplay time (milliseconds)',
                            name: 'time',
                            type: 'input'
                        }
                    ]
                },
                {
                    type: 'grid',
                    columns: 2,
                    items: [
                        {
                            label: 'Direction',
                            name: 'direction',
                            type: 'selectbox',
                            items: [
                                {
                                    text: 'Left',
                                    value: 'ltr'
                                },
                                {
                                    text: 'Right',
                                    value: 'rtl'
                                }
                            ]
                        },
                        {
                            label: 'Animation',
                            name: 'animation',
                            type: 'selectbox',
                            items: [
                                {
                                    text: 'Fade',
                                    value: 'left'
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'grid',
                    columns: 2,
                    items: [
                        {
                            label: 'show arrows',
                            name: 'arrow',
                            type: 'checkbox'
                        },
                        {
                            label: 'show indicators',
                            name: 'indicators',
                            type: 'checkbox'
                        }
                    ]
                },
                {
                    label: 'image same size',
                    name: 'img_same_size',
                    type: 'checkbox'
                },
                {
                    label: 'Nbr of frame',
                    name: 'nbrframe',
                    type: 'selectbox',
                    items: [...Array(9).keys()].map(i =>({ value: (i + 2).toString(), text: (i + 2).toString() }))
                },
                {
                    type: 'htmlpanel', 
                    html: '<div role="presentation" class="tox-form__group"><p>Images of carousel</p></div>'
                },
                ...imageGrid,
                
             
            ],
            defaultValue: {
                time: '2000',
                carousel_description_1_1: 'Slide 1',
                carousel_description_1_2: 'Slide 2',
            }
        }
    }

    else
        return null;
        
};

export default getTemplate;