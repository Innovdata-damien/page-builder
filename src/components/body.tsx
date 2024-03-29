import React, { Component } from 'react';
import Block from './block/block';
import { ReactSortable } from 'react-sortablejs';
import { BodyType } from '../types/blockType';


// Redux
import { connect } from 'react-redux';
import {
    updateListBody,
} from '../redux/actions/blockAction';


const mapStateToProps = (state: any) => ({
    blocks: state.blocks,
    cssViewShow: state.cssViewShow
});

const mapDispatchToProps = (dispatch: any) => ({
    updateListBody: (blocks: Array<BodyType>) => dispatch(updateListBody(blocks))
});
  
// BODY

type Props = {
    cssViewShow: boolean;
    blocks: Array<BodyType>;
    updateListBody: (blocks: Array<BodyType>) => void;
};

class Body extends Component <Props>{

    constructor(props: Props){
        super(props);
    }
    render(){
        return (
            <div className={`pg-build__body ${this.props.cssViewShow ? 'pg-build__cssView' : ''}`}>

                <ReactSortable className="pg-build__body-child" list={this.props.blocks} handle=".pg-build__block-tool-move" setList={(newState: Array<BodyType>) => this.props.updateListBody(newState)} group="BODY" animation={150}>
                {this.props.blocks.map((item: BodyType) => {
                    
                    return (
                        <Block blockId={item.id} item={item} key={item.id}/>
                    );
                })}
                </ReactSortable>

            </div>
        );
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);