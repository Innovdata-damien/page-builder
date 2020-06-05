import { BodyType, ContentType, ColumnType, BlockMenuType, LanguageBlocks } from '../../types/blockType';
import { addAfter, BlockPosition, moveToPosition } from '../../utils/utils';
import uuid from 'uuid/v4';
import { LanguagesList } from 'PageBuilder';

// ---------- Block ---------- 


//Set block

export const setBlock = (blocks: Array<BodyType>, languageList: LanguagesList[]) => ({
    type: 'SET_BLOCK',
    blocks,
    languageList
});

//Set block by language

export const setBlockByLanguage = (blocks: Array<BodyType>, locale: string) => ({
    type: 'SET_BLOCK_BY_LANGUAGE',
    blocks,
    locale
});

//Duplicate block

export const duplicateBlock = (blockId: string, locale: string) => ({
    type: 'DUPLICATE_BLOCK',
    payload: (state: any, action: any) => {
        
        let blockIndex = state[action.locale].findIndex((item: BodyType) => item.id === action.blockId);

        // Clone block
        const data = {...state[action.locale][blockIndex]};
        var newState: Array<any> = state;
        newState[action.locale] = addAfter(state[action.locale], blockIndex, data);
        // Update id
        
        var newBlockState: any = {};
        newBlockState.id = uuid();
        newBlockState.style = {...newState[action.locale][(blockIndex + 1)].style || {}};
        newBlockState.design = {...newState[action.locale][(blockIndex + 1)].design || {}};
        newBlockState.columns = [];

        newState[action.locale][(blockIndex + 1)].columns.forEach((column: any) => {

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

        newState[action.locale][(blockIndex + 1)] = newBlockState;
        

        return {...newState};
    },
    blockId,
    locale
});

//Add class to block 

export const addClassToBlock = (blockId: string, className: string, locale: string) => ({
    type: 'ADD_CLASS_BLOCK',
    blockId,
    className,
    locale,
    payload: (state: any, action: any) => {

        let blockIndex = state[action.locale].findIndex((item: BodyType) => item.id === action.blockId);
        const data = state[action.locale][blockIndex];

        data.class = action.className;

        return state;
    }
});

//Remove block

export const removeBlock = (blockId: string, locale: string) => ({
    type: 'REMOVE_BLOCK',
    blockId,
    locale
});


const formateBlockContainer = (block: BodyType):BodyType => {
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

    return block;
}

export const updateListBody = (blocks: Array<BodyType>, locale: string) => ({
    type: 'UPDATE_LIST_BODY',
    payload: (state: any, action: any) => {

        const blockAdded = action.blocks.findIndex((item: BodyType) => item.columns === undefined);
        const newState = {...state};

        if(blockAdded != -1){

            let block = formateBlockContainer({...action.blocks[blockAdded]});

            action.blocks[blockAdded] = block;
        }

        newState[action.locale] = action.blocks;

        return newState;
    },
    blocks,
    locale
});

//Move block to position up / down

export const moveBlock = (blockId: string, position: BlockPosition, locale: string) => ({
    type: 'MOVE_BLOCK',
    payload: (state: any, action: any) => {

        const blockIndex = state[action.locale].findIndex((item: BodyType) => item.id == action.blockId);
        const newState = {...state};
        newState[action.locale] = moveToPosition(state[action.locale], blockIndex, position);

        return {...newState};
    },
    blockId,
    position,
    locale
});


// ---------- Block Inside ---------- 

//Update list block inside

export const updateListBlockInside = (blocksInside: Array<ContentType>, blockId: string, colId: string, locale: string) => ({
    type: 'UPDATE_LIST_BLOCK_INSIDE',
    payload: (state: any, action: any) => {

        const newState = {...state}
        
        let blockIndex = newState[action.locale].findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = newState[action.locale][blockIndex].columns.findIndex((item: BodyType) => item.id === action.colId);

        newState[action.locale][blockIndex].columns[colIndex].contents = action.blocksInside;

        return newState;
    },
    blocksInside,
    blockId,
    colId,
    locale
});

//Duplicate block inside

export const duplicateBlockInside = (blockId: string, colId: string, blockInsideId: string, locale: string) => ({
    type: 'DUPLICATE_BLOCK_INSIDE',
    payload: (state: any, action: any) => {

        let blockIndex = state[action.locale].findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[action.locale][blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[action.locale][blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);

        const data = {...state[action.locale][blockIndex].columns[colIndex].contents[blockInsideIndex]};
        data.id = uuid();

        var newState: Array<any> = state;
        newState[action.locale][blockIndex].columns[colIndex].contents = addAfter(state[action.locale][blockIndex].columns[colIndex].contents, blockInsideIndex, data);

        return newState;

    },
    blockId,
    colId,
    blockInsideId,
    locale
});


//Add class to block inside 

export const addClassToBlockInside = (blockId: string, colId: string, blockInsideId: string, className: string, locale: string) => ({
    type: 'ADD_CLASS_BLOCK_INSIDE',
    blockId,
    colId,
    blockInsideId,
    className,
    locale,
    payload: (state: any, action: any) => {

        let blockIndex = state[action.locale].findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[action.locale][blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[action.locale][blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);

        const data = state[action.locale][blockIndex].columns[colIndex].contents[blockInsideIndex];
        data.class = action.className;

        return state;
    }
});

//Remove block inside

export const removeBlockInside = (blockId: string, colId: string, blockInsideId: string, locale: string) => ({
    type: 'REMOVE_BLOCK_INSIDE',
    payload : (state: any, action: any) => {

        let blockIndex = state[action.locale].findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[action.locale][blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[action.locale][blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);

        const data = {...state};
        data[action.locale][blockIndex].columns[colIndex].contents = data[action.locale][blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

        return data;
    },
    blockId,
    colId,
    blockInsideId,
    locale
});

//Move block inside to position up / down

export const moveBlockInside = (blockId: string, colId: string, blockInsideId: string, position: BlockPosition, locale: string) => ({
    type: 'MOVE_BLOCK_INSIDE',
    payload: (state: LanguageBlocks, action: any) => {

        let blockIndex = state[action.locale].findIndex((item: BodyType) => item.id === action.blockId);
        let colIndex = state[action.locale][blockIndex].columns.findIndex((item: ColumnType) => item.id === action.colId);
        let blockInsideIndex = state[action.locale][blockIndex].columns[colIndex].contents.findIndex((item: ContentType) => item.id === action.blockInsideId);


        // Get content length by block and col
        const contentLengthByBlockAndCol: any = {};
        const newState = {...state}

        state[action.locale].forEach((block, indexBlock)=>{

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
            moveToPosition(newState[action.locale][blockIndex].columns[colIndex].contents, blockInsideIndex, position);
        }else if(blockInsideNewIndex <= -1){

            if((colIndex - 1) >= 0){
                // In prev col

                let nbrContent = contentLengthByBlockAndCol[blockIndex][colIndex - 1];

                newState[action.locale][blockIndex].columns[colIndex - 1].contents[nbrContent] = newState[action.locale][blockIndex].columns[colIndex].contents[blockInsideIndex];
                newState[action.locale][blockIndex].columns[colIndex].contents = newState[action.locale][blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }else if((blockIndex - 1) >= 0){
                // In prev block

                let nbrCol = newState[action.locale][blockIndex - 1].columns.length;
                let nbrContent = contentLengthByBlockAndCol[blockIndex - 1][nbrCol - 1];

                newState[action.locale][blockIndex - 1].columns[nbrCol - 1].contents[nbrContent] = newState[action.locale][blockIndex].columns[colIndex].contents[blockInsideIndex];
                newState[action.locale][blockIndex].columns[colIndex].contents = newState[action.locale][blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }

        }else if(blockInsideNewIndex >= contentLengthByBlockAndCol[blockIndex][colIndex]){

            if((colIndex + 1) <= (newState[action.locale][blockIndex].columns.length - 1)){
                // In next col

                newState[action.locale][blockIndex].columns[colIndex + 1].contents.unshift(newState[action.locale][blockIndex].columns[colIndex].contents[blockInsideIndex]);
                newState[action.locale][blockIndex].columns[colIndex].contents = newState[action.locale][blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }else if((blockIndex + 1) <= (newState[action.locale].length - 1)){
                // In next block


                newState[action.locale][blockIndex + 1].columns[0].contents.unshift(newState[action.locale][blockIndex].columns[colIndex].contents[blockInsideIndex]);
                newState[action.locale][blockIndex].columns[colIndex].contents = newState[action.locale][blockIndex].columns[colIndex].contents.filter((_el: any, key: number) => key != blockInsideIndex);

            }

        }

        return newState;
    },
    blockId,
    colId,
    blockInsideId,
    position,
    locale
});

// ---------- Block + Block inside ---------- 

// Add new block & block inside by double clicking

export const doubleClickMenuBlock = (item: BlockMenuType, locale: string) => ({
    type: 'DOUBLE_CLICK_ADD_CONTAINER_CONTENT_BLOCKS',
    payload: (state: LanguageBlocks, action: any) => {

        const itemClone: any = {...action.item};
        const newState = {...state};

        itemClone.id = uuid();

        if(itemClone.design.type == 'column'){
            let block = formateBlockContainer({...itemClone});
            newState[action.locale].push(block);
        }else{
            let lastBlock = newState[action.locale][(newState[action.locale].length - 1)];
            if(lastBlock) {
                let lastCol = lastBlock.columns[(lastBlock.columns.length - 1)];
                if(lastCol) {
                    lastCol.contents.push(itemClone);
                }
            }
        }

        return newState;
    },
    item,
    locale
});

