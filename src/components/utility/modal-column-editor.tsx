import React, { useState } from 'react';
import { Modal, InputNumber, Card } from 'antd';
import { BlockType } from '../../types/blockType';
import * as utils from '../../utils/utils';
import { useDispatch } from '../../redux/store';
import uuid from 'uuid/v4';
import swal from 'sweetalert';


// ------------------------------ MODAL COLUMN EDITOR DATA

type Device = 'pc' | 'tablet' | 'mobile';

const columnEditor: Array<{ iconClass: string; title: string; device: Device; }> = [
    {
        iconClass: 'mi mi-TVMonitor',
        title: 'PC',
        device: 'pc',
    },
    {
        iconClass: 'mi mi-Tablet',
        title: 'Tablet',
        device: 'tablet',
    },
    {
        iconClass: 'mi mi-CellPhone',
        title: 'Mobile',
        device: 'mobile',
    }
];

// ------------------------------ MODAL COLUMN EDITOR

type ModalColumnEditorProps = {
    blockRef: Element | null;
    modalShow: boolean;
    blockId: string;
    setVisibilityOfModalColumnEditor: (type: boolean) => void;
    block: BlockType;
};

const ModalColumnEditor = (props: ModalColumnEditorProps) => {

    const { blockRef, modalShow, block, blockId, setVisibilityOfModalColumnEditor } = props;
    
    // Methods

    const handleModalSubmit = () =>{

        dispatch({
            type: 'Block/EditBlock',
            blockId: blockId,
            block: blockEdit
        })

        setVisibilityOfModalColumnEditor(false);
    };

    const handleChangeColSize = (size: number | undefined, device: Device, colIndex: number) =>{
        blockEdit.columns[colIndex].detail.size[device] = (size as any);
        setBlockEdit({...blockEdit});
    };

    const changeColumnPlace = (position: utils.BlockPosition, colIndex: number) => {
        const newBlockState = {...blockEdit};
        newBlockState.columns = utils.moveToPosition(blockEdit.columns, colIndex, position);
        setBlockEdit(newBlockState);
    };

    const handleAddColumn = () => {

        const newBlockState = {...blockEdit};
        newBlockState.columns.push({
            id: uuid(),
            detail: {
                size: {
                    pc: 12,
                    tablet: 12,
                    mobile: 12
                },
                hide : {
                    pc: false,
                    tablet: false,
                    mobile: false
                }
            },
            contents: []
        });

        setBlockEdit(newBlockState);

    }



    const handleAlertRemoveColumn = (colIndex: number) => {

        if(blockEdit.columns.length > 1){

            if(blockEdit.columns[colIndex].contents.length > 0)
                swal('Are you sure to delete a column with contents ?', {
                    icon: 'error',
                    closeOnClickOutside: false,
                    buttons: ['Cancel', 'Yes']
                }).then((value) => {
                    if(value) handleRemoveColumn(colIndex);
                });
            else
                handleRemoveColumn(colIndex);

        }else
            swal('You cannot delete a column in a container with only one column.', {
                icon: 'error',
                closeOnClickOutside: false
            });
    }

    const handleRemoveColumn = (colIndex: number) => {

        const newBlockState = {...blockEdit};
        newBlockState.columns = newBlockState.columns.filter((_el: any, key: number) => key != colIndex);
        setBlockEdit(newBlockState);
    }


    const handleChangeColumnVisibility = (device: Device, colIndex: number) => {

        const newBlockState = {...blockEdit};
        newBlockState.columns[colIndex].detail.hide[device] = !newBlockState.columns[colIndex].detail.hide[device];
        setBlockEdit(newBlockState);
    }

    // State
    const [blockEdit, setBlockEdit] = useState<BlockType>(JSON.parse(JSON.stringify(block)));

    const dispatch = useDispatch();
    
    return (
        <Modal
            wrapClassName="pg-build__columnEditor"
            title="Column editor"
            visible={modalShow}
            getContainer={()=>(blockRef as HTMLElement)}
            onCancel={()=>setVisibilityOfModalColumnEditor(false)}
            onOk={handleModalSubmit}
            okText="Save change"
            width={1000}
        >

            {columnEditor.map((item, index)=>(

                <Card key={index} headStyle={{background: '#f2f2f2'}} title={
                    <div className="pg-build__columnEditor-title">
                        <i className={item.iconClass}></i>
                        <span>{item.title}</span>
                    </div>
                }>
                    <div className="pg-build__row">

                        {blockEdit.columns.map((column, indexCol)=> (

                            <div
                                key={uuid()}
                                className={`pg-build__col pg-build__colEditor pg-build__col-${column.detail.size[item.device]}`}
                            >
                                <div className={`pg-build__col-content ${column.contents.length > 0 ? 'pg-build__col-contentFilled' : ''}`}>

                                    <InputNumber
                                        onChange={(value)=> handleChangeColSize(value, item.device, indexCol)}
                                        defaultValue={column.detail.size[item.device]}
                                        className="pg-build__colSizer"
                                        min={1}max={12}
                                    />

                                </div>

                                <div className="pg-build__colEditorToolbar">
                                    {(item.device == 'pc' && indexCol != 0) &&
                                        <a onClick={()=>changeColumnPlace('up', indexCol)}><i className="mi mi-Up"></i></a>
                                    }
                                    {(item.device == 'pc' && indexCol != (blockEdit.columns.length - 1)) &&
                                        <a onClick={()=>changeColumnPlace('down', indexCol)}><i className="mi mi-Down"></i></a>
                                    }
                                    {item.device == 'pc' &&
                                        <a onClick={handleAddColumn}><i className="mi mi-Add"></i></a>
                                    }
                                    {(blockEdit.columns.length > 1 && item.device == 'pc') &&
                                        <a onClick={()=>handleAlertRemoveColumn(indexCol)}><i className="mi mi-Delete"></i></a>
                                    }
                                    <a onClick={()=>handleChangeColumnVisibility(item.device, indexCol)} className={`pg-build__colVisibilityTool ${column.detail.hide[item.device] ? 'pg-build__colVisibilityTool-hide' : ''}`}><i className="mi mi-RedEye"></i></a>
                                </div>
                            </div>

                        ))}

                        </div>
                </Card>

                    
            ))}

        </Modal>
    );
};

export { ModalColumnEditor };