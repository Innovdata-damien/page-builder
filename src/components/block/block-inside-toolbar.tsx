import React, {Component} from 'react';
import { ContentType } from '../../types/blockType';

// Redux

import { connect } from 'react-redux';
import {
    removeBlockInside,
    duplicateBlockInside,
} from '../../redux/actions/blockAction';

  
const mapDispatchToProps = (dispatch: any) => ({
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string) => dispatch(removeBlockInside(blockId, colId, blockInsideId)),
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string) => dispatch(duplicateBlockInside(blockId, colId, blockInsideId))
});


// Block Inside Toolbar

type Props = {
    colId: string;
    blockId: string;
    item: ContentType;
    _showModalStyle: () => void;
    removeBlockInside: (blockId: string, colId: string, blockInsideId: string) => void;
    duplicateBlockInside: (blockId: string, colId: string, blockInsideId: string) => void;
    _handleMouseDown: any;
};

type State = {

};

class BlockInsideToolbar extends Component<Props, State> {

    buttonsByBlockType: any;

    constructor(props: Props) {
        super(props);

        this.buttonsByBlockType = null;

    }

    // All block

    _handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    _handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render () {

        switch (this.props.item.design.type) {
            case 'html':

                //VIDEO

                //this.buttonsByBlockType = <a onClick={this._handleOpenModal}><i className="mi mi-Play"></i></a>;

                break;
        
            default:
                break;
        }


        return (
            <>

                <a onMouseDown={this.props._handleMouseDown} className="pg-build__block-inside-tool-move"><i className="mi mi-SIPMove"></i></a>
                <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props._showModalStyle()}><i className="mi mi-Edit"></i></a>
                {this.buttonsByBlockType}
                <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.duplicateBlockInside(this.props.blockId, this.props.colId, this.props.item.id)}><i className="mi mi-Copy"></i></a>
                <a onMouseDown={this.props._handleMouseDown} onClick={()=>this.props.removeBlockInside(this.props.blockId, this.props.colId, this.props.item.id)}><i className="mi mi-Delete"></i></a>

            </>
        );
    }
}
export default connect(null, mapDispatchToProps)(BlockInsideToolbar);