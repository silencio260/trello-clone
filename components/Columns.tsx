import { PlusCircleIcon } from "@heroicons/react/16/solid"
import { Draggable, Droppable } from "react-beautiful-dnd"//"@hello-pangea/dnd"
import TodoCard from "./TodoCard"
import { useBoardStore } from "@/store/BoardStore"
import { useModalStore } from "@/store/ModalStore"

type Props = {
    id: TypeColumn,
    todos: Todo[],
    index: number
}

const idToColumnText: {
    [key in TypeColumn]: string;
} = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done"
}

// const logColumnDetails = (x: any) => {
//     console.log('Logging column details:', x);

//     return '';
//   };


function Columns({id, todos, index}: Props) {


    const [searchString, setNewTaskType] = useBoardStore((state) => [
        state.searchString,
        state.setNewTaskType,
    ])

    let [openModal] = useModalStore((state) => [
        state.openModal
      ])

      const handleAddTodo = () => {

        setNewTaskType(id)
        openModal()
      }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (

        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >

                <Droppable droppableId={index.toString()} type="card">
                    {(provided, snapshot) => (

                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`p-2 rounded-2xl shadow-stone-50
                            ${snapshot.isDraggingOver ? "bg-green-200" :
                        "bg-white/50"}`}
                        >
                            <h2 className="flex justify-between font-bold text-xl">
                                {idToColumnText[id]}
                                 
                                <span className="text-gray-500 bg-gray-200 
                                rounded-full px-2 text-sm">
                                    {!searchString ? todos.length 
                                    : 
                                    todos.filter( todo => todo.title.toLocaleLowerCase().includes(searchString.toLowerCase())).length
                                    }
                                    
                                </span>
                            </h2>

                            
                            

                            <div className="space-y-2">
                                {todos.map((todo, index) => {
                                if(searchString && !todo.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()))
                                    return null;

                                    
                                return (<Draggable key={todo.$id}
                                    draggableId={todo.$id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <TodoCard
                                            todo={todo}
                                            index={index}
                                            id={id}
                                            innerRef={provided.innerRef}
                                            draggableProps={provided.draggableProps}
                                            dragHandleProps={provided.dragHandleProps}
                                        />
                                    )}

                                </Draggable>
                                )

                                })}
                                 {provided.placeholder} 

                                <div className="flex items-end justify-end p-2">
                                    <button 
                                    onClick={handleAddTodo}
                                    className="text-green-500 hover:text-green-600">
                                        <PlusCircleIcon  className="h-10 w-10"/>
                                    </button>
                                </div> 
                            </div>
                            {provided.placeholder}
                        </div>
                    ) }
                </Droppable>
                {/* {provided.placeholder} */}
        </div>
      )}
    </Draggable>
  )
}

export default Columns
