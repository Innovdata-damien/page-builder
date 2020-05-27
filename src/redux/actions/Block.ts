import { Reducer } from 'redux';
import { produce } from 'immer';
import { BlockType, ContentType, BlockMenuType } from '../../types/blockType';
import uuid from 'uuid/v4';
import * as utils from '../../utils/utils';

// ----------------------- TYPE STATE

type BlockSelected = BlockType | ContentType | null;

export type State = {
    blocks: Array<BlockType>;
    selectedBlock: BlockSelected;
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
} |
{
    type: 'Block/RemoveBlock';
    blockId: string;
} |
{
    type: 'Block/Clear';
} |
{
    type: 'Block/SortableListBodyContent';
    blockId: string;
    colId: string;
    blocksContent: Array<ContentType>;
} |
{
    type: 'Block/AddClassBlockContent';
    blockId: string;
    colId: string;
    blockContentId: string;
    className: string;
} |
{
    type: 'Block/DuplicateBlockContent';
    blockId: string;
    colId: string;
    blockContentId: string;
} |
{
    type: 'Block/RemoveBlockContent';
    blockId: string;
    colId: string;
    blockContentId: string;
} |
{
    type: 'Block/MoveBlockContent';
    blockId: string;
    colId: string;
    blockContentId: string;
    position: utils.BlockPosition;
} |
{
    type: 'Block/SetContentOfBlockContent';
    blockId: string;
    colId: string;
    blockContentId: string;
    content: string;
} |
{
    type: 'Block/DoubleClickAddBlock';
    menuItem: BlockMenuType;
} |
{
    type: 'Block/DuplicateBlock';
    blockId: string;
} |
{
    type: 'Block/AddClassBlock';
    blockId: string;
    className: string;
} |
{
    type: 'Block/EditBlock';
    blockId: string;
    block: BlockType;
} |
{
    type: 'Block/SetSelection';
    selectedBlock: BlockSelected;
}


// ----------------------- INITIAL STATE

export const initialState: State = {
    blocks: [],
    selectedBlock: null
}

// ----------------------- REDUCER

export const reducer: Reducer<State, Action> = ( state = initialState, action ) => {

    return produce( state, ( newState: State ) => {
        
        if ( action.type === 'Block/Set' ) {
            newState.blocks = action.blocks;
        } else if ( action.type === 'Block/SortableListBody' ) {
            newState.blocks = sortableListBody(action.blocks, newState.blocks);
        } else if ( action.type === 'Block/MoveBlock' ) {
            newState.blocks = moveBlock(action.blockId, action.position, state.blocks, newState.blocks);
        } else if ( action.type === 'Block/RemoveBlock' ) {
            newState.blocks = state.blocks.filter((el: any) => el.id != action.blockId);
        } else if ( action.type === 'Block/Clear' ) {
            newState.blocks = [];
        } else if ( action.type === 'Block/SortableListBodyContent' ) {
            newState.blocks = sortableListBodyContent(state.blocks, newState.blocks, action.blocksContent, action.blockId, action.colId);
        } else if ( action.type === 'Block/AddClassBlockContent' ) {
            newState.blocks = addClassToBlockContent(state.blocks, newState.blocks, action.blockId, action.colId, action.blockContentId, action.className);
        } else if ( action.type === 'Block/DuplicateBlockContent' ) {
            newState.blocks = duplicateBlockContent(state.blocks, newState.blocks, action.blockId, action.colId, action.blockContentId);
        } else if ( action.type === 'Block/RemoveBlockContent' ) {
            newState.blocks = removeBlockContent(state.blocks, newState.blocks, action.blockId, action.colId, action.blockContentId);
        } else if ( action.type === 'Block/MoveBlockContent' ) {
            newState.blocks = moveBlockContent(state.blocks, newState.blocks, action.blockId, action.colId, action.blockContentId, action.position);
        } else if ( action.type === 'Block/SetContentOfBlockContent' ) {
            newState.blocks = setContentOfBlockContent(state.blocks, newState.blocks, action.blockId, action.colId, action.blockContentId, action.content);
        } else if ( action.type === 'Block/DoubleClickAddBlock' ) {
            newState.blocks = doubleClickMenuBlock(state.blocks, newState.blocks, action.menuItem);
        } else if ( action.type === 'Block/DuplicateBlock' ) {
            newState.blocks = duplicateBlock(state.blocks, newState.blocks, action.blockId);
        } else if ( action.type === 'Block/AddClassBlock' ) {
            newState.blocks = addClassToBlock(state.blocks, newState.blocks, action.blockId, action.className);
        } else if ( action.type === 'Block/EditBlock' ) {
            newState.blocks = editBlock(state.blocks, newState.blocks, action.blockId, action.block);
        } else if ( action.type === 'Block/SetSelection' ) {
            newState.selectedBlock = action.selectedBlock;
        }
        
    });
    
};



// ----------------------- REDUCER METHODS

// Method for sortable list
const sortableListBody = (blocks: Array<BlockType>, draftState: Array<BlockType>) => {
    const blockAdded = blocks.findIndex((item: BlockType) => item.columns === undefined);
    draftState = blocks;
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

// Move block to position
const moveBlock = (blockId: string, position: utils.BlockPosition, state: Array<BlockType>, draftState: Array<BlockType>) => {
    const blockIndex = utils.getIndex(state, blockId);
    const newBlocksState = utils.moveToPosition([...state], blockIndex, position);

    return [...newBlocksState];
};


// Method for sortable list contents
const sortableListBodyContent = (blocks: Array<BlockType>, draftState: Array<BlockType>, blocksContent: Array<ContentType>, blockId: string, colId: string) => {
    //draftState = blocks;

    const blockIndex = utils.getIndex(blocks, blockId);
    const colIndex = utils.getIndex(blocks[blockIndex].columns, colId);

    draftState[blockIndex].columns[colIndex].contents = blocksContent;

    return draftState;
};

// Method add class to block content
const addClassToBlockContent = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string, colId: string, blockContentId: string, className: string) => {
    
    const blockIndex = utils.getIndex(blocks, blockId);
    const colIndex = utils.getIndex(blocks[blockIndex].columns, colId);
    const blockInsideIndex = utils.getIndex(blocks[blockIndex].columns[colIndex].contents, blockContentId);

    draftState[blockIndex].columns[colIndex].contents[blockInsideIndex].class = className;

    return draftState;
};

// Duplicate block content
const duplicateBlockContent = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string, colId: string, blockContentId: string) => {

    const blockIndex = utils.getIndex(blocks, blockId);
    const colIndex = utils.getIndex(blocks[blockIndex].columns, colId);
    const blockInsideIndex = utils.getIndex(blocks[blockIndex].columns[colIndex].contents, blockContentId);

    const data = {...blocks[blockIndex].columns[colIndex].contents[blockInsideIndex]};
    data.id = uuid();

    draftState[blockIndex].columns[colIndex].contents = utils.addAfter(blocks[blockIndex].columns[colIndex].contents, blockInsideIndex, data);

    return draftState;

};

// Remove block content
const removeBlockContent = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string, colId: string, blockContentId: string) => {

    const blockIndex = utils.getIndex(blocks, blockId);
    const colIndex = utils.getIndex(blocks[blockIndex].columns, colId);
    const blockInsideIndex = utils.getIndex(blocks[blockIndex].columns[colIndex].contents, blockContentId);

    draftState[blockIndex].columns[colIndex].contents = blocks[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

    return draftState;

};

// Move block content to position
const moveBlockContent = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string, colId: string, blockContentId: string, position: utils.BlockPosition) => {

    const blockIndex = utils.getIndex(blocks, blockId);
    const colIndex = utils.getIndex(blocks[blockIndex].columns, colId);
    const blockInsideIndex = utils.getIndex(blocks[blockIndex].columns[colIndex].contents, blockContentId);


    // Get content length by block and col
    const contentLengthByBlockAndCol: any = {};

    blocks.forEach((block, indexBlock)=>{

        if(!contentLengthByBlockAndCol[indexBlock]){
            contentLengthByBlockAndCol[indexBlock] = {}
        }

        block.columns.forEach((column, indexCol)=>{

            contentLengthByBlockAndCol[indexBlock][indexCol] = column.contents.length;
        
        });
    });

    let blockInsideNewIndex = blockInsideIndex;

    if(position == 'up'){
        blockInsideNewIndex -= 1;
    }else if(position == 'down'){
        blockInsideNewIndex += 1;
    }

    if(blockInsideNewIndex > -1 && blockInsideNewIndex < contentLengthByBlockAndCol[blockIndex][colIndex]){
        // In same col
        blocks[blockIndex].columns[colIndex].contents = utils.moveToPosition(blocks[blockIndex].columns[colIndex].contents, blockInsideIndex, position);
    }else if(blockInsideNewIndex <= -1){

        if((colIndex - 1) >= 0){
            // In prev col

            let nbrContent = contentLengthByBlockAndCol[blockIndex][colIndex - 1];

            draftState[blockIndex].columns[colIndex - 1].contents[nbrContent] = blocks[blockIndex].columns[colIndex].contents[blockInsideIndex];
            draftState[blockIndex].columns[colIndex].contents = blocks[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

        }else if((blockIndex - 1) >= 0){
            // In prev block

            let nbrCol = blocks[blockIndex - 1].columns.length;
            let nbrContent = contentLengthByBlockAndCol[blockIndex - 1][nbrCol - 1];

            draftState[blockIndex - 1].columns[nbrCol - 1].contents[nbrContent] = blocks[blockIndex].columns[colIndex].contents[blockInsideIndex];
            draftState[blockIndex].columns[colIndex].contents = blocks[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

        }

    }else if(blockInsideNewIndex >= contentLengthByBlockAndCol[blockIndex][colIndex]){

        if((colIndex + 1) <= (blocks[blockIndex].columns.length - 1)){
            // In next col

            draftState[blockIndex].columns[colIndex + 1].contents.unshift(blocks[blockIndex].columns[colIndex].contents[blockInsideIndex]);
            draftState[blockIndex].columns[colIndex].contents = blocks[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

        }else if((blockIndex + 1) <= (blocks.length - 1)){
            // In next block


            draftState[blockIndex + 1].columns[0].contents.unshift(blocks[blockIndex].columns[colIndex].contents[blockInsideIndex]);
            draftState[blockIndex].columns[colIndex].contents = blocks[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

        }

    }

    return draftState;

};

// Set content of block content
const setContentOfBlockContent = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string, colId: string, blockContentId: string, content: string) => {

    const blockIndex = utils.getIndex(blocks, blockId);
    const colIndex = utils.getIndex(blocks[blockIndex].columns, colId);
    const blockInsideIndex = utils.getIndex(blocks[blockIndex].columns[colIndex].contents, blockContentId);

    draftState[blockIndex].columns[colIndex].contents[blockInsideIndex].content = content;

    return draftState;

};

const doubleClickMenuBlock = (blocks: Array<BlockType>, draftState: Array<BlockType>, menuItem: BlockMenuType) => {
    
    const itemClone: any = {...menuItem};

    itemClone.id = uuid();

    if(itemClone.design.type == 'column'){
        let block = formateBlockContainer(itemClone);
        draftState.push(block);
    }else{
        let lastBlock = draftState[(blocks.length - 1)];
        if(lastBlock) {
            let lastCol = lastBlock.columns[(lastBlock.columns.length - 1)];
            if(lastCol) {
                lastCol.contents.push(itemClone);
            }
        }
    }

    return draftState;

};

// Duplicate block
const duplicateBlock = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string) => {

    const blockIndex = utils.getIndex(blocks, blockId);

    // Clone block
    const data = {...blocks[blockIndex]};
    var newState: Array<any> = utils.addAfter(blocks, blockIndex, data);
    
    // Update id
    
    var newBlockState: any = {};
    newBlockState.id = uuid();
    newBlockState.style = {...newState[(blockIndex + 1)].style || {}};
    newBlockState.design = {...newState[(blockIndex + 1)].design || {}};
    newBlockState.columns = [];

    newState[(blockIndex + 1)].columns.forEach((column: any) => {

        var newColumn = {...column};
        newColumn.id = uuid();
        newColumn.contents = [];

        column.contents.forEach((content: any) => {
            var newContent = {...content};
            newContent.id = uuid();
            newColumn.contents.push(newContent);
        });

        newBlockState.columns.push(newColumn);

    });

    newState[(blockIndex + 1)] = newBlockState;

    return newState;

};

// Method add class to block
const addClassToBlock = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string, className: string) => {
    
    const blockIndex = utils.getIndex(blocks, blockId);
    draftState[blockIndex].class = className;

    return draftState;
};

// Edit block
const editBlock = (blocks: Array<BlockType>, draftState: Array<BlockType>, blockId: string, block: BlockType) => {
    
    const blockIndex = utils.getIndex(blocks, blockId);
    draftState[blockIndex] = block;

    return draftState;
};
