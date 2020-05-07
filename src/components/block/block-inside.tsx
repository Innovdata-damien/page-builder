import React, {Component} from 'react';
import { ContentType } from '../../types/blockType';
import BlockInsideContent from './block-inside-content';
import BlockInsideToolbar from './block-inside-toolbar';
import Modal from '../utility/modal-style';
import { connect } from 'react-redux';

type Props = {
    cssViewShow: boolean;
    blockId: string;
    colId: string;
    item: ContentType;
    iframeDocument: Document;
};

type State = {
    blockClickedOutside: boolean;
    mousedown: boolean;
};

const mapStateToProps = (state: any) => ({
    cssViewShow: state.cssViewShow,
    iframeDocument: state.iframeDocument
});

class BlockInside extends Component<Props,State> {

    modalStyle?: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            blockClickedOutside: true,
            mousedown: false
        };

    }

    componentDidMount() {
        this.props.iframeDocument.addEventListener('mousedown', this._handleClickOutside);
    }

    componentWillUnmount() {
        this.props.iframeDocument.removeEventListener('mousedown', this._handleClickOutside);
    }
    
    _handleClickOutside = (e: any) =>  {
        const blockElement = this.props.iframeDocument.querySelector(`[data-draggable-id='${this.props.item.id}']`);

        if(blockElement != null && !blockElement.contains(e.target)){
            this.setState({ blockClickedOutside: true });
        }

    }

    _handleInside = () => {
        this.setState({ blockClickedOutside: false });
    }

    _handleFocusOut = () => {
        if(this.state.mousedown)
            this.setState({ mousedown: false });
        else
            this.setState({ blockClickedOutside: true });
    }

    _handleMouseDown = () => {
        this.setState({ mousedown: true });
    }

    _showModalStyle = () => {
        this.modalStyle._toggleModal(true);
    }


    render() {
        return (
            <div data-sticky-container className={'pg-build__block-inside ' + (!this.state.blockClickedOutside ? 'pg-build__block-inside-active' : '')} onFocus={this._handleInside} onBlur={this._handleFocusOut} onClick={this._handleInside} data-draggable-id={this.props.item.id}>
                <div style={this.props.cssViewShow ? this.props.item.style || {} : {}}>
                    <div className="pg-build__block-inside-tool">
                        
                        <BlockInsideToolbar _showModalStyle={this._showModalStyle} blockId={this.props.blockId} colId={this.props.colId} item={this.props.item} _handleMouseDown={this._handleMouseDown}/>
                        
                    </div>
                    <Modal onRef={ref => (this.modalStyle = ref)} blockId={this.props.blockId} colId={this.props.colId} blockInsideId={this.props.item.id}/>
                    <BlockInsideContent blockId={this.props.blockId} colId={this.props.colId} item={this.props.item}/>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(BlockInside);