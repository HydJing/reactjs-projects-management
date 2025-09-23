import { useRef, useState } from "react";

import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const [validationError, setValidationError] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    const errors = {};
    if (enteredTitle.trim() === '') {
      errors.title = 'Title cannot be empty.';
    }
    if (enteredDescription.trim() === '') {
      errors.description = 'Description cannot be empty.';
    }
    if (enteredDueDate.trim() === '') {
      errors.dueDate = 'Due Date cannot be empty.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  const errorMessage = Object.values(validationError).filter(Boolean).join(' ');

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay" title="Invalid Input" message={errorMessage || "Please make sure you provide a valid value for every input field."}>
        
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
