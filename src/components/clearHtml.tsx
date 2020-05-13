import React, { Component } from 'react';
import { BodyType, ColumnType, ContentType } from 'types/blockType';
import ReactDOMServer from 'react-dom/server';
import uuid from 'uuid/v4';

// Type for blocks
type Props = {
    blocks: Array<BodyType>
};

class ClearHtml extends Component <Props>{
    constructor (props: Props) {
        super(props);
    }

    render(){
        return (
            <>
                {this.props.blocks.map((block: BodyType) => {

                    return (
                        <div id={uuid()} key={uuid()} className={`pg-build__row ${block.class || ''}`} style={block.style || {}}>
                            {
                                block.columns.map((column: ColumnType) => {
                                    
                                    return (
                                        <div key={uuid()} className={`pg-build__col pg-build__col-${column.size}`}>
                                            {
                                                column.contents.map((blockInside: ContentType) => {
                                                    return <div key={uuid()} style={blockInside.style || {}} className={blockInside.class || ''} dangerouslySetInnerHTML={{ __html: blockInside.content || '' }} ></div>;
                                                })
                                            }
                                        </div>
                                    );
            
                                })
                            }
                        </div>
                    );
                    

                })}

            </>
        );
    }
}

const htmlPage = (blocks: Array<BodyType>) => ReactDOMServer.renderToStaticMarkup(<ClearHtml blocks={blocks}/>);

export default htmlPage;