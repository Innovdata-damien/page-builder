import React, { useEffect } from 'react';
import { PageBuilder } from '../PageBuilder';
import { useDispatch } from '../redux/store';

export interface PageBuilderStateListenerProps {
    pageBuilder: PageBuilder;
}

const PageBuilderStateListener = ( props: PageBuilderStateListenerProps ): JSX.Element => {
    const dispatch = useDispatch();
    const pageBuilder = props.pageBuilder;
    
    useEffect(() => {

        //Set PageBuilder instance in store
        dispatch( {
            type: 'PageBuilder/SetInstance',
            pageBuilder
        });
        
    },
    [ pageBuilder ]);
    return (
        <></>
    );
}

export { PageBuilderStateListener };