import { BodyType } from '../../types/blockType';

const blocks = (state: Array<BodyType> = [], action: any) => {
        switch (action.type) {

            case 'SET_BLOCK':
                return action.blocks;

            case 'REMOVE_BLOCK':
                return state.filter((_el: any, key: number) => key != state.findIndex((item: BodyType) => item.id === action.blockId));

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
