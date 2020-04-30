import { PageBuilder } from '../../PageBuilder';

const pageBuilder = (state: PageBuilder | null = null, action: any) => {
        switch (action.type) {

            case 'SET_PAGE_BUILDER':
                return action.pageBuilder;
            default:
                return state
        }
}

const cssViewShow = (state: boolean | null = false, action: any) => {
    switch (action.type) {

        case 'TOGGLE_CSS_VIEW':
            return action.cssViewShow;
        default:
            return state;
    }
}
  
export { pageBuilder, cssViewShow };
  