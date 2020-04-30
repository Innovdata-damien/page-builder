import React from 'react';
import ReactDOMServer from 'react-dom/server';
import uuid from 'uuid/v4';


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
    
}

const Carousel = (_props: CarouselProps) => {

    return (
        <div>
           
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

    else if(type == 'carousel')
        return {
            html: ReactDOMServer.renderToStaticMarkup(<Carousel/>),
            items: [
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
                            label: 'Autoplay time',
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
                                    value: 'left'
                                },
                                {
                                    text: 'Right',
                                    value: 'right'
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
                }
            ]
        }

    else
        return null;
        
};

export default getTemplate;