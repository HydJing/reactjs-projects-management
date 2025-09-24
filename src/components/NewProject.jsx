import { useRef, useState, useContext } from "react";

import Input from "./Input.jsx";
import Modal from "./Modal.jsx";
import ProjectsContext from "../store/projects-context.jsx";

export default function NewProject() {
  const { addProject, cancelAddProject } = useContext(ProjectsContext);
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

    addProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  let errorMessage = '';
  if (Object.values(validationError).some(Boolean)) {
    errorMessage = 'Invalid input detected. Please check the following fields: ' + Object.keys(validationError).filter(key => validationError[key]).join(', ');
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay" title="Invalid Input" message={errorMessage || "Please make sure you provide a valid value for every input field."} onClose={() => setValidationError({ title: '', description: '', dueDate: '' })}>
        
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={cancelAddProject}
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
