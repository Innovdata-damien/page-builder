import React, {Component} from 'react';
import { BlockMenuType } from 'types/blockType';
import { doubleClickMenuBlock } from '../../redux/actions/blockAction';
import { connect } from 'react-redux';

type Props = {
    index: number;
    item: BlockMenuType;
    doubleClickMenuBlock: (item: BlockMenuType) => void;
};

const mapDispatchToProps = (dispatch: any) => ({
    doubleClickMenuBlock: (item: BlockMenuType) => dispatch(doubleClickMenuBlock(item)),
});


class MenuItem extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <>
                <div className="pg-build__menu-item" onDoubleClick={()=>this.props.doubleClickMenuBlock(this.props.item)} dangerouslySetInnerHTML={{ __html: this.props.item.design.preview || '' }}>
                </div>
            </>
        );
    }
}
export default connect(null, mapDispatchToProps)(MenuItem);