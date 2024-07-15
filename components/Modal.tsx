'use client'

import { FormEvent, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { stat } from "fs";

function Modal() {

  const imagePickerRef = useRef<HTMLInputElement>(null)
  
  let [isOpen, closeModel] = useModalStore((state) => [
    state.isOpen,
    state.closeModal
  ])

  const [addTask, image, setImage, newTaskInput, newTaskType, setNewTaskInput] = useBoardStore((state) => [
    state.addTask,
    state.image,
    state.setImage,
    state.newTaskInput,
    state.newTaskInput,
    state.setNewTaskInput
  ])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image)
    setImage(null)
    closeModel();
  }



  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10"
        // initialFocus={cancelButtonRef}
        onSubmit={handleSubmit}
        onClose={closeModel}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">

    
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
          
            <Dialog.Panel className='w-full max-m-md transform overflow-hidden rounded-2xl bg-white p-5 text-left
              align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as="h3"
                  className='text-lg font-medium leading-6 text-gray-900 pb-2'
                >
                  Add a Task
                </Dialog.Title>

                <div className="mt-2">
                  <input 
                  type="text" 
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder="Enter a task here"
                  className="w-full border border-gray-300 rounded-md outline-none p-5" 
                  
                  />
                </div>

                <TaskTypeRadioGroup />

                <div>
                  <button 
                  type="button"
                  onClick={() => {
                    imagePickerRef.current?.click()
                  }}
                  className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    <PhotoIcon 
                      className="h-6 w-6 mr-2 inline-block"
                    />
                    Upload Image
                  </button>
                  {image && (

                    <Image 
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt=2 filter hover:grayscale
                      transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(image)}

                      onClick={() => {
                        setImage(null)
                      }}
                    />
                  )}
                  <input type="file"
                  hidden
                  ref={imagePickerRef}
                  onChange={(e) => {
                    if(!e.target.files![0].type.startsWith("image")) return;
                    setImage(e.target.files![0])
                  }}
                  />
                </div>

                <div className="mt-2">
                  <button 
                  type='submit'
                  disabled={!newTaskInput}
                  className="inline-flex justify-center rounded-md border border-transparent b-blue-100 px-4
                  py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                  disabled:cursor-not-allowed">
                    Add Task
                  </button>
                </div>

            </Dialog.Panel>
          </Transition.Child>
       </div>
      </div>

    
      </Dialog>
    </Transition>
  );
};
export default Modal;








