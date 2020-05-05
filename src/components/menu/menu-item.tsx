import React, {Component} from 'react';

type Props = {
    index: number,
    item: any
};

export default class MenuItem extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }


    render() {
        return (
            <>
                <div className="pg-build__menu-item" dangerouslySetInnerHTML={{ __html: this.props.item.design.preview || '' }}>
                </div>
            </>
        );
    }
}