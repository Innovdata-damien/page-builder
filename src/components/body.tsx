import React, { Component } from 'react';
import Block from './block/block';
import { ReactSortable } from 'react-sortablejs';
import { BodyType, LanguageBlocks } from '../types/blockType';

// Redux
import { connect } from 'react-redux';
import {
    updateListBody,
} from '../redux/actions/blockAction';
import i18n from '../translations/i18n';


const mapStateToProps = (state: any) => ({
    blocks: state.blocks,
    cssViewShow: state.cssViewShow,
    locale: state.locale
});

const mapDispatchToProps = (dispatch: any) => ({
    updateListBody: (blocks: Array<BodyType>, locale: string) => dispatch(updateListBody(blocks, locale))
});
  
// BODY

type Props = {
    cssViewShow: boolean;
    blocks: LanguageBlocks;
    locale: string;
    updateListBody: (blocks: Array<BodyType>, locale: string) => void;
};

class Body extends Component <Props>{

    constructor(props: Props){
        super(props);
    }
    render(){
        return (
            <div className={`pg-build__body ${this.props.cssViewShow ? 'pg-build__cssView' : ''}`}>


                {(this.props.blocks[this.props.locale]).length == 0 && <div className="pg-build__body-placeholder">{i18n.trans('msg_empty_body','capitalize')}</div>}
                <ReactSortable className="pg-build__body-child" list={this.props.blocks[this.props.locale]} handle=".pg-build__block-tool-move" setList={(newState: BodyType[]) => this.props.updateListBody(newState, this.props.locale)} group="BODY" animation={150}>
                {(this.props.blocks[this.props.locale]).map((item: BodyType) => {
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