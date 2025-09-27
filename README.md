# React Project Manager

## Description

This is a React-based project management application that allows users to create, manage, and track projects and their associated tasks. It provides a clean and intuitive interface for organizing your work.

## Features

- **Project Creation:** Easily add new projects with a title, description, and due date.
- **Project Selection:** Select existing projects from a sidebar to view their details.
- **Task Management:** Add and delete tasks within each project.
- **Data Persistence:** Project and task data is persisted using local storage, ensuring your data is saved across sessions.
- **Responsive Design:** Built with Tailwind CSS for a mobile-first and responsive user experience.
- **Input Validation:** Basic validation for project and task inputs.

## Technologies Used

- **React 19:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool that provides an extremely fast development experience for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **JavaScript (ESM):** Modern JavaScript syntax and module system.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd reactjs-projects-management
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    This will open the application in your browser, usually at `http://localhost:5173`.

4.  **Build for production:**

    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```

    This command bundles the application into static files for production deployment.

## Usage

-   **Create a New Project:** Click on the "+ Add Project" button in the sidebar. Fill in the project details (Title, Description, Due Date) and click "Save".
-   **Select a Project:** Click on a project title in the sidebar to view its details and tasks.
-   **Add Tasks:** Within a selected project, use the "Add Task" input field to add new tasks.
-   **Delete Tasks:** Click the "Clear" button next to a task to remove it.
-   **Delete Project:** Click the "Delete" button on the selected project's detail view to remove the project and all its tasks.

## Project Structure

```
reactjs-projects-management/
├── public/
│   └── logo.png
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   └── no-projects.png
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── NewProject.jsx
│   │   ├── newTask.jsx
│   │   ├── NoProjectSelected.jsx
│   │   ├── ProjectsSidebar.jsx
│   │   ├── selectedProject.jsx
│   │   └── tasks.jsx
│   └── store/
│       └── projects-context.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find a bug or have a feature request.

## License

This project is licensed under the MIT License. See the `LICENSE` file (if available) for more details. (Note: A `LICENSE` file is not included in this repository, but it's good practice to add one.)
