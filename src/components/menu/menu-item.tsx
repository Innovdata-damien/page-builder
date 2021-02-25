import React, {Component} from 'react';
import { BlockMenuType } from 'types/blockType';
import { doubleClickMenuBlock } from '../../redux/actions/blockAction';
import { connect } from 'react-redux';

type Props = {
    index: number;
    item: BlockMenuType;
    doubleClickMenuBlock: (item: BlockMenuType, locale: string) => void;
    locale: string;
};

const mapStateToProps = (state: any) => ({
    locale: state.locale
});

const mapDispatchToProps = (dispatch: any) => ({
    doubleClickMenuBlock: (item: BlockMenuType, locale: string) => dispatch(doubleClickMenuBlock(item, locale)),
});


class MenuItem extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }



    render() {
        return (
            <>
                <div className="pg-build__menu-item" onDoubleClick={()=>this.props.doubleClickMenuBlock(this.props.item, this.props.locale)} dangerouslySetInnerHTML={{ __html: this.props.item.design.preview || '' }}>
                </div>
            </>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);