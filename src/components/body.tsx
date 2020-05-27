import React from 'react';
import { Block } from './block/block';
import { useSelector, useDispatch } from '../redux/store';
import { ReactSortable } from 'react-sortablejs';
import { BlockType } from '../types/blockType';

// // Redux
// import { connect } from 'react-redux';
// import {
//     updateListBody,
// } from '../redux/actions/blockAction';


// const mapStateToProps = (state: any) => ({
//     blocks: state.blocks,
//     cssViewShow: state.cssViewShow
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     updateListBody: (blocks: Array<BodyType>) => dispatch(updateListBody(blocks))
// });
  
// // BODY

// type Props = {
//     cssViewShow: boolean;
//     blocks: Array<BodyType>;
//     updateListBody: (blocks: Array<BodyType>) => void;
// };

const Body = () => {
    // Get state
    const {
        blocks,
        cssViewShow
    } = useSelector(( state ) => ({
        blocks: state.block.blocks,
        cssViewShow: state.pageBuilder.cssViewShow
    }));
    const dispatch = useDispatch();

    // return (
    //     <DragDropContext onDragEnd={()=>{}}>
    //         <Droppable droppableId="droppable">
    //             {(provided, snapshot) => (
    //                 <div
    //                     ref={provided.innerRef}
    //                 >
    //                     {blocks.map((block, index) => (
    //                         <Draggable
    //                             key={block.id}
    //                             draggableId={block.id}
    //                             index={index}>
    //                             {(provided, snapshot) => (
    //                                 <div ref={provided.innerRef} 
    //                                 {...provided.draggableProps}>
    //                                 <Block blockId={block.id} block={block} key={block.id} handle={provided.dragHandleProps}/></div>
    //                             )}
    //                         </Draggable>
    //                     ))}
    //                     {provided.placeholder}
    //                 </div>
    //             )}
    //         </Droppable>
    //     </DragDropContext>
    // );

    return (
        <div className={`pg-build__body ${cssViewShow ? 'pg-build__cssView' : ''}`}>

            <ReactSortable
                className="pg-build__body-child"
                list={blocks}
                handle=".pg-build__block-tool-move"
                setList={(newState) => dispatch({
                    type: 'Block/SortableListBody',
                    blocks: newState
                })}
                group="BODY"
                animation={150}
            > 
            {blocks.map((block) => (<Block blockId={block.id} block={block} key={block.id}/>))}
            </ReactSortable>

        </div>
    );

};

export { Body };

// class Body extends Component <Props>{

//     constructor(props: Props){
//         super(props);
//     }
//     render(){
//         return (
//             <div className={`pg-build__body ${this.props.cssViewShow ? 'pg-build__cssView' : ''}`}>

//                 <ReactSortable className="pg-build__body-child" list={this.props.blocks} handle=".pg-build__block-tool-move" setList={(newState: Array<BodyType>) => this.props.updateListBody(newState)} group="BODY" animation={150}>
//                 {this.props.blocks.map((item: BodyType) => {
                    
//                     return (
//                         <Block blockId={item.id} item={item} key={item.id}/>
//                     );
//                 })}
//                 </ReactSortable>

//             </div>
//         );
        
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Body);