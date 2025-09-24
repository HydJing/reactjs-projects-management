import { createContext, useReducer } from 'react';

const ProjectsContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  addTask: (text) => {},
  deleteTask: (id) => {},
  selectProject: (id) => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  addProject: (projectData) => {},
  deleteProject: () => {},
});

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

export function ProjectsContextProvider({ children }) {
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

  const ctxValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    selectProject: handleSelectProject,
    startAddProject: handleStartAddProject,
    cancelAddProject: handleCancelAddProject,
    addProject: handleAddProject,
    deleteProject: handleDeleteProject,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsContext;
