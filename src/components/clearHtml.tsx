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
                                        <div key={uuid()} className={`pg-build__col pg-build__col-sm-${column.detail.size.mobile} pg-build__col-${column.detail.size.tablet} pg-build__col-lg-${column.detail.size.pc} ${(column.detail.hide.mobile ? 'pg-build__hide-sm' : '')} ${(column.detail.hide.tablet ? 'pg-build__hide' : '')} ${(column.detail.hide.pc ? 'pg-build__hide-lg' : '')}`}>
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