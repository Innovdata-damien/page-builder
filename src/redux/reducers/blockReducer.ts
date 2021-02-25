import { BodyType, LanguageBlocks } from '../../types/blockType';
import { LanguagesList } from 'PageBuilder';

const blocks = (state: LanguageBlocks = {}, action: any) => {
        switch (action.type) {

            case 'SET_BLOCK':
                action.languageList.forEach((langue: LanguagesList)=>{
                    if(typeof action.blocks[langue.code] == 'undefined') action.blocks[langue.code] = [];
                })
                return action.blocks;

            case 'SET_BLOCK_BY_LANGUAGE':
                const newState = {...state};
                newState[action.locale] = action.blocks;
                return newState;

            case 'REMOVE_BLOCK':
                const newStateData = {...state};
                newStateData[action.locale] = state[action.locale].filter((_el: any, key: number) => key != state[action.locale].findIndex((item: BodyType) => item.id === action.blockId))
                return newStateData;

            case 'DUPLICATE_BLOCK':
                return action.payload(state, action);

            case 'UPDATE_LIST_BODY':
                return action.payload(state, action);

            case 'ADD_CLASS_BLOCK':
                return action.payload(state, action);

            case 'MOVE_BLOCK':
                return action.payload(state, action);

            case 'REMOVE_BLOCK_INSIDE':
                return action.payload(state, action);

            case 'DUPLICATE_BLOCK_INSIDE':
                return action.payload(state, action);

            case 'ADD_CLASS_BLOCK_INSIDE':
                return action.payload(state, action);

            case 'MOVE_BLOCK_INSIDE':
                return action.payload(state, action);
    
            case 'UPDATE_LIST_BLOCK_INSIDE':
                return action.payload(state, action);
    
            case 'DOUBLE_CLICK_ADD_CONTAINER_CONTENT_BLOCKS':
                return action.payload(state, action);

            default:
                return state
        }
}
  
export default blocks
