import { BodyType, ContentType, ColumnType, ColumnDetail } from '../../types/blockType';
import { addAfter, BlockPosition, moveToPosition } from '../../utils/utils';
import uuid from 'uuid/v4';

// ---------- Block ---------- 


//Set block

export const setBlock = (blocks: Array<BodyType>) => ({
    type: 'SET_BLOCK',
    blocks
});

//Duplicate block

export const duplicateBlock = (blockId: string) => ({
    type: 'DUPLICATE_BLOCK',
    payload: (state: any, action: any) => {

        let blockIndex = state.findIndex((item: BodyType) => item.id === action.blockId);

        // Clone block
        const data = {...state[blockIndex]};
        var newState: Array<any> = addAfter(state, blockIndex, data);
        
        // Update id
        
        var newBlockState: any = {};
        newBlockState.id = uuid();
        newBlockState.style = {...newState[(blockIndex + 1)].style || {}};
        newBlockState.design = {...newState[(blockIndex + 1)].design || {}};
        newBlockState.columns = [];

        console.log(newState)

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
    },
    blockId
});

//Add class to block 

export const addClassToBlock = (blockId: string, className: string) => ({
    type: 'ADD_CLASS_BLOCK',
    blockId,
    className,
    payload: (state: any, action: any) => {

        let blockIndex = state.findIndex((item: BodyType) => item.id === action.blockId);
        const data = state[blockIndex];

        data.class = action.className;

        return state;
    }
});

//Remove block

export const removeBlock = (blockId: string) => ({
    type: 'REMOVE_BLOCK',
    blockId
});

//Update list body
type UpdateListBodyAction = {
    blocks: Array<BodyType>;
}

export const updateListBody = (blocks: Array<BodyType>) => ({
    type: 'UPDATE_LIST_BODY',
    payload: (_state: any, action: UpdateListBodyAction) => {

        const blockAdded = action.blocks.findIndex((item: BodyType) => item.columns === undefined);

        if(blockAdded != -1){

            let block = {...action.blocks[blockAdded]};
            let columns: any = [12];

            block.columns = [];
            
            if(block.design!.value)
                if(block.design!.value!.columnDetails)
                    columns = block.design.value.columnDetails;


            // let calcColSize = columns.reduce((x, y) => x + y);

            // if(calcColSize < 12)
            //     columns.push(12 - calcColSize);
            
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

            action.blocks[blockAdded] = block;
        }

        return [...action.blocks];
    },
    blocks
});

//Move block to position up / down

export const moveBlock = (blockId: string, position: BlockPosition) => ({
    type: 'MOVE_BLOCK',
    payload: (state: any, action: any) => {

        const blockIndex = state.findIndex((item: BodyType) => item.id == action.blockId);
        const newBlocksState = moveToPosition(state, blockIndex, position);
        console.log(newBlocksState)

        return [...newBlocksState];
    },
    blockId,
    position
});


// ---------- Block Inside ---------- 

//Update list block inside

export const updateListBlockInside = (blocksInside: Array<ContentType>, blockId: string, colId: string) => ({
    type: 'UPDATE_LIST_BLOCK_INSIDE',
    payload: (state: any, action: any) => {
        
        let blockIndex = state.findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[blockIndex].columns.findIndex((item: BodyType) => item.id === action.colId);

        state[blockIndex].columns[colIndex].contents = action.blocksInside;

        return [...state];
    },
    blocksInside,
    blockId,
    colId
});

//Duplicate block inside

export const duplicateBlockInside = (blockId: string, colId: string, blockInsideId: string) => ({
    type: 'DUPLICATE_BLOCK_INSIDE',
    payload: (state: any, action: any) => {

        let blockIndex = state.findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);

        const data = {...state[blockIndex].columns[colIndex].contents[blockInsideIndex]};
        data.id = uuid();

        var newState: Array<any> = state;
        newState[blockIndex].columns[colIndex].contents = addAfter(state[blockIndex].columns[colIndex].contents, blockInsideIndex, data);

        return newState;

    },
    blockId,
    colId,
    blockInsideId
});


//Add class to block inside 

export const addClassToBlockInside = (blockId: string, colId: string, blockInsideId: string, className: string) => ({
    type: 'ADD_CLASS_BLOCK_INSIDE',
    blockId,
    colId,
    blockInsideId,
    className,
    payload: (state: any, action: any) => {

        let blockIndex = state.findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);

        const data = state[blockIndex].columns[colIndex].contents[blockInsideIndex];
        data.class = action.className;

        return state;
    }
});

//Remove block inside

export const removeBlockInside = (blockId: string, colId: string, blockInsideId: string) => ({
    type: 'REMOVE_BLOCK_INSIDE',
    payload : (state: any, action: any) => {

        let blockIndex = state.findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);

        const data = [...state];
        data[blockIndex].columns[colIndex].contents = data[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

        return data;
    },
    blockId,
    colId,
    blockInsideId
});

//Move block inside to position up / down

export const moveBlockInside = (blockId: string, colId: string, blockInsideId: string, position: BlockPosition) => ({
    type: 'MOVE_BLOCK_INSIDE',
    payload: (state: Array<BodyType>, action: any) => {

        let blockIndex = state.findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);


        // Get content length by block and col
        const contentLengthByBlockAndCol: any = {};
        const newState = [...state]

        state.forEach((block, indexBlock)=>{

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
            moveToPosition(newState[blockIndex].columns[colIndex].contents, blockInsideIndex, position);
        }else if(blockInsideNewIndex <= -1){

            if((colIndex - 1) >= 0){
                // In prev col

                let nbrContent = contentLengthByBlockAndCol[blockIndex][colIndex - 1];

                newState[blockIndex].columns[colIndex - 1].contents[nbrContent] = newState[blockIndex].columns[colIndex].contents[blockInsideIndex];
                newState[blockIndex].columns[colIndex].contents = newState[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }else if((blockIndex - 1) >= 0){
                // In prev block

                let nbrCol = newState[blockIndex - 1].columns.length;
                let nbrContent = contentLengthByBlockAndCol[blockIndex - 1][nbrCol - 1];

                newState[blockIndex - 1].columns[nbrCol - 1].contents[nbrContent] = newState[blockIndex].columns[colIndex].contents[blockInsideIndex];
                newState[blockIndex].columns[colIndex].contents = newState[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }

        }else if(blockInsideNewIndex >= contentLengthByBlockAndCol[blockIndex][colIndex]){

            if((colIndex + 1) <= (newState[blockIndex].columns.length - 1)){
                // In next col

                newState[blockIndex].columns[colIndex + 1].contents.unshift(newState[blockIndex].columns[colIndex].contents[blockInsideIndex]);
                newState[blockIndex].columns[colIndex].contents = newState[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }else if((blockIndex + 1) <= (newState.length - 1)){
                // In next block


                newState[blockIndex + 1].columns[0].contents.unshift(newState[blockIndex].columns[colIndex].contents[blockInsideIndex]);
                newState[blockIndex].columns[colIndex].contents = newState[blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }

        }

        return newState;
    },
    blockId,
    colId,
    blockInsideId,
    position
});
