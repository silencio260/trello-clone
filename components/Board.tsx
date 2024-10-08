'use client'
import { useEffect } from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd"//"@hello-pangea/dnd";
import { useBoardStore } from "@/store/BoardStore";
import Columns from './Columns';
import { ID } from 'appwrite';


function Board (){

    const [board, getBoard, setBoardState] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState
    ])

    useEffect(() =>{
        getBoard();

    }, [getBoard])

    console.log(board)

    const handleOnDragEnd = (result: DropResult) => {
        const{source, destination, type} = result

        if(!destination) return;

        if(type==='column'){
            const entries = Array.from(board.columns.entries())
            const [removed] = entries.splice(source.index, 1)
            entries.splice(destination.index,0, removed);
            const rearrangedColumns = new Map(entries)
            setBoardState({
                ...board,
                columns: rearrangedColumns
            })

        }


        ////////////////////////////////
        const columns = Array.from(board.columns)
        const startColIndex = columns[Number(source.droppableId)]
        const finishColIndex = columns[Number(destination.droppableId)]

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        const finishCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos
        }


        if (!startCol || !finishCol) return;

        if(source.index === destination.index && startCol === finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if(startCol.id == finishCol.id){
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            const newColumns = new Map(board.columns)
            newColumns.set(startCol.id, newCol)

            setBoardState({...board, columns: newColumns})

        } else {

            const finishTodos = Array.from(finishCol.todos);
            finishTodos.splice(destination.index, 0, todoMoved)

            const newColumns = new Map(board.columns)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            newColumns.set(startCol.id, newCol)
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos
            })

            setBoardState({...board, columns: newColumns})

        }


    }

    const handleOnDragEndsss = (result: DropResult) => {}

  return  ( 

  <DragDropContext onDragEnd={handleOnDragEnd}>

    <Droppable droppableId="board" direction="horizontal" type="column">

    {(provided, snapshot) => ( 
    
    <div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 
            max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
    >
        {Array.from(board.columns.entries()).map(([id, column], index) => (
            <Columns key={id} id={id} todos={column.todos} index={index} />
        ))}

        {provided.placeholder}
        
    </div>
    )}
    </Droppable>
  </DragDropContext>
  )
}

export default Board
