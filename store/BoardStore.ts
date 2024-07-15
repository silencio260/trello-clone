import {create} from "zustand"
import {getTodosGroupedByColumn} from '@/lib/getTodosGroupedByColumn'
import { databases, ID, storage } from "@/appwrite";
import { title } from "process";
import uploadImage from "@/lib/uploadImage";

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void

    searchString: string,
    setSearchString: (searchString: string) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypeColumn) => void

    newTaskInput: string,
    setNewTaskInput: (input: string) => void;

    newTaskType: TypeColumn,
    setNewTaskType: (columnId: TypeColumn) => void;

    image: File | null;
    setImage: (image: File | null) => void;

    addTask: (todo: string, columnId: TypeColumn, image?: File | null) => void;
}


export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypeColumn, Column>()
    },
    searchString: "",
    setSearchString: (searchString) => set({searchString}),

    getBoard: async() => {
        const board = await getTodosGroupedByColumn();

        set({board});
    },
    deleteTask: async (taskIndex: number, todo: Todo, id: TypeColumn) => {

        const newColumns = new Map(get().board.columns)

        newColumns.get(id)?.todos.splice(taskIndex, 1)

        set({board: {columns: newColumns}})

        if(todo.image){
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        )
    },
    newTaskInput: '',
    setNewTaskInput: (input: string) => set({newTaskInput: input}),

    newTaskType: 'todo',
    setNewTaskType: (columnId: TypeColumn) => set({newTaskType: columnId}),

    image: null,
    setImage: (image: File | null) => set({image: image}),

    // updateTodoInDB: async (todo, columnId) => {
    //     await databases.updateDocument(
    //         process.env.NEXT_PUBLIC_DATABASE_ID!,
    //         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    //         todo.$id,
    //         {
    //             title: todo.title,
    //             status: columnId
    //         }
    //     )
    // },

    addTask: async (todo: string, columnId: TypeColumn, image?: File | null) => {

        let file: Image | undefined;

        if(image) {
            const fileUploaded = await uploadImage(image);
            if(fileUploaded){
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id
                }
            }
        }

        const {$id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && {image: JSON.stringify(file) }),
            }

        )

        set({newTaskInput: ""})

        set((state) => {
            const newColumns = new Map(state.board.columns)

            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && {image: JSON.stringify(file) }),
            }
       
            const column = newColumns.get(columnId)

            if(!column){
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo]
                })
            } else {
                newColumns.get(columnId)?.todos.push(newTodo)
            }

            return {
                board:  {
                    columns: newColumns
                }
            }

         })

        
    },


    setBoardState: (board) => set({board})
    
}))


