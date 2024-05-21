import {create} from "zustand"
import {getTodosGroupedByColumn} from '@/lib/getTodosGroupedByColumn'

interface BoardState {
    board: Board;
    getBoard: () => void;
}


const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypeColumn, Column>()
    },
    getBoard: async() => {
        const board = await getTodosGroupedByColumn();

        // set({board});
    }
    
}))

