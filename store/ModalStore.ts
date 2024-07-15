import { create } from "zustand";

interface ModelState {
    isOpen: boolean,
    openModal: () => void;
    closeModal: () => void;
}

export const useModalStore = create<ModelState>()((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true}),
    closeModal: () => set({isOpen: false})
    
}))


