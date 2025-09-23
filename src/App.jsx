import { useReducer } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

const initialState = {
  selectedProjectId: undefined,
  projects: [],
};

function projectsReducer(state, action) {
  switch (action.type) {
    case 'ADD_PROJECT':
      const projectId = Math.random();
      const newProject = {
        ...action.payload,
        id: projectId,
        tasks: [],
      };
      return {
        ...state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject],
      };
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    case 'START_ADD_PROJECT':
      return {
        ...state,
        selectedProjectId: null,
      };
    case 'CANCEL_ADD_PROJECT':
      return {
        ...state,
        selectedProjectId: undefined,
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(
          (project) => project.id !== state.selectedProjectId
        ),
      };
    case 'ADD_TASK':
      const taskId = Math.random();
      const newTask = {
        text: action.payload,
        id: taskId,
      };
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === state.selectedProjectId
            ? { ...project, tasks: [newTask, ...(project.tasks || [])] }
            : project
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === state.selectedProjectId
            ? { ...project, tasks: project.tasks.filter((task) => task.id !== action.payload) }
            : project
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [projectsState, dispatch] = useReducer(projectsReducer, initialState);

  function handleAddTask(text) {
    dispatch({ type: 'ADD_TASK', payload: text });
  }

  function handleDeleteTask(id) {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }

  function handleSelectProject(id) {
    dispatch({ type: 'SELECT_PROJECT', payload: id });
  }

  function handleStartAddProject() {
    dispatch({ type: 'START_ADD_PROJECT' });
  }

  function handleCancelAddProject() {
    dispatch({ type: 'CANCEL_ADD_PROJECT' });
  }

  function handleAddProject(projectData) {
    dispatch({ type: 'ADD_PROJECT', payload: projectData });
  }

  function handleDeleteProject() {
    dispatch({ type: 'DELETE_PROJECT' });
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );

    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={selectedProject.tasks}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
