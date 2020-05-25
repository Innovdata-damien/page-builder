import React, { useEffect } from 'react';
import { useDispatch } from '../redux/store';
import { BlockType } from '../types/blockType';

export interface BlockStateListenerProps {
    blocks: Array<BlockType>;
}

const BlockStateListener = ( props: BlockStateListenerProps ): JSX.Element => {
    const dispatch = useDispatch();
    const blocks = props.blocks;
    
    useEffect(() => {

        //Set blocks in store
        dispatch({
            type: 'Block/Set',
            blocks
        });
        
    },
    [ blocks ]);
    return (
        <></>
    );
}

export { BlockStateListener };