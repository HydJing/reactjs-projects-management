import { useContext } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
import ProjectsContext from "./store/projects-context.jsx";

function App() {
  const projectsCtx = useContext(ProjectsContext);

  const {
    selectedProjectId,
    projects,
    cancelAddProject,
    addProject,
    startAddProject,
    deleteProject,
    addTask,
    deleteTask,
    selectProject,
  } = projectsCtx;

  let content;

  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  } else {
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );

    content = (
      <SelectedProject
        project={selectedProject}
        tasks={selectedProject.tasks}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

export default App;
