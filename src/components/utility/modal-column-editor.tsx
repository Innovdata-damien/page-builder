import React, {Component} from 'react';
import { Modal } from 'antd';

type Props = {
    blockRef?: HTMLDivElement | null;
    visible: boolean;
}

type State = {
    
}

class ModalColumnEditor extends Component<Props, State> {

    constructor(props: Props){
        super(props)
    }

    render(){
        console.log(this.props.visible)
        return (
            <Modal
                title="Column editor"
                visible={this.props.visible}
                getContainer={()=>(this.props.blockRef as HTMLElement)}
                width={692}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}

export default ModalColumnEditor;