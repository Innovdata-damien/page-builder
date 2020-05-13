import { BodyType, ContentType, ColumnType } from '../../types/blockType';
import { addAfter } from '../../utils/utils';
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
        
        console.log(newState)
        // Update id
        
        var newBlockState: any = {};
        newBlockState.id = uuid();
        newBlockState.style = {...newState[(blockIndex + 1)].style || {}};
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

            let block = action.blocks[blockAdded];
            let columns = [12];

            block.columns = [];

            if(block.design!.value)
                if(block.design!.value!.columnSize)
                    columns = block.design.value.columnSize;

            let calcColSize = columns.reduce((x, y) => x + y);

            if(calcColSize < 12)
                columns.push(12 - calcColSize);
            
            
            for (var i = 0; i < columns.length; i++) {

                block.columns.push({
                    id: uuid(),
                    size: columns[i],
                    contents: []
                });
                console.log(block)
            }


        }

        return [...action.blocks];
    },
    blocks
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