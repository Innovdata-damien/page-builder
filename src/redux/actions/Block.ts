import { Reducer } from 'redux';
import { produce } from 'immer';
import { BlockType } from '../../types/blockType';
import uuid from 'uuid/v4';
import * as utils from '../../utils/utils';

// ----------------------- TYPE STATE

export type State = {
    blocks: Array<BlockType>;
};

// ----------------------- TYPE ACTION

export type Action =
{
    type: 'Block/Set';
    blocks: Array<BlockType>;
} |
{
    type: 'Block/SortableListBody';
    blocks: Array<BlockType>;
} |
{
    type: 'Block/MoveBlock';
    blockId: string;
    position: utils.BlockPosition;
}

// ----------------------- INITIAL STATE

export const initialState: State = {
    blocks: []
}

// ----------------------- REDUCER

export const reducer: Reducer<State, Action> = ( state = initialState, action ) => {

    return produce( state, ( newState: State ) => {
        
        if ( action.type === 'Block/Set' ) {
            newState.blocks = action.blocks;
        } else if ( action.type === 'Block/SortableListBody' ) {
            newState.blocks = sortableListBody(action.blocks, newState.blocks);
        }  else if ( action.type === 'Block/MoveBlock' ) {
            newState.blocks = moveBlock(action.blockId, action.position, state.blocks, newState.blocks);
        } 

    });
    
};



// ----------------------- REDUCER METHODS

// Method for sortbale list
const sortableListBody = (blocks: Array<BlockType>, draftState: Array<BlockType>) => {
    const blockAdded = blocks.findIndex((item: BlockType) => item.columns === undefined);

    if(blockAdded != -1){

        let block = formateBlockContainer({...blocks[blockAdded]});
        draftState[blockAdded] = block;

    }

    return draftState;
}

// Format block added
const formateBlockContainer = (block: BlockType): BlockType => {
    let columns: any = [12];
    
    block.columns = [];
    
    if(block.design!.value)
        if(block.design!.value!.columnDetails)
            columns = block.design.value.columnDetails;
    
    for (var i = 0; i < columns.length; i++) {

        let columnDetails = null;

        if(columns[i].size){
            columnDetails = columns[i];
        }else{
            columnDetails = {
                size: {
                    pc: columns[i],
                    tablet: 12,
                    mobile: 12
                },
                hide: {
                    pc: false,
                    tablet: false,
                    mobile: false
                }
            }
        }

        block.columns.push({
            id: uuid(),
            //size: columns[i],
            detail: columnDetails,
            contents: []
        });

    }

    return block;
}

const moveBlock = (blockId: string, position: utils.BlockPosition, state: Array<BlockType>, draftState: Array<BlockType>) => {
    // type: 'MOVE_BLOCK',
    // payload: (state: any, action: any) => {

    //     const blockIndex = state.findIndex((item: BodyType) => item.id == action.blockId);
    //     const newBlocksState = moveToPosition(state, blockIndex, position);

    //     return [...newBlocksState];
    // },
    // blockId,
    // position
    const blockIndex = utils.getIndex(state, blockId);
    const newBlocksState = utils.moveToPosition([...state], blockIndex, position);

    return [...newBlocksState];
};