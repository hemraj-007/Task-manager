# Task Manager Application

This is a simple Task Manager application built with Next.js and TypeScript. It allows users to create, display, edit, delete, and filter tasks using local storage for persistence.

## Features

- **Home Page**: The landing page with a "Get Started" button that redirects to the main task management table.
- **Task Management**: On the task page, you can:
  - **Create** new tasks via a modal form.
  - **Edit** tasks inline using the "Edit" button.
  - **Delete** tasks from the table.
  - **Mark tasks** as completed or pending.
  - **Sort** tasks by priority using a button.
  - **Reset** tasks back to the original order after sorting.
  - **Filter** tasks by clicking on any table row to view task details.

## Approach for Sorting by Priority

In the task table, tasks are sorted by priority using the following approach:

1. A **"Sort by Priority"** button triggers the sorting functionality.
2. Tasks have three priority levels: `high`, `medium`, and `low`.
3. When sorting is triggered, tasks are rearranged in the following order:
   - High priority tasks appear first.
   - Medium priority tasks appear next.
   - Low priority tasks appear last.
4. This is achieved by assigning numeric values to each priority (e.g., `high = 3`, `medium = 2`, and `low = 1`) and using JavaScript’s `sort()` function to rearrange the tasks.

### Sorting Example in Code

       ```tsx
       const handleSortTasks = () => {
       const sortedTasks = [...tasks].sort((a, b) => {
           
           const priorityOrder: { [key: string]: number } = { high: 3, medium: 2, low: 1 };
           return priorityOrder[b.priority] - priorityOrder[a.priority]; 
       });
       setTasks(sortedTasks); 
   };


## Technologies Used

- **Next.js**: Framework for server-side rendering and static site generation.
- **TypeScript**: Strongly-typed language for better code quality and development experience.
- **TailwindCSS**: Utility-first CSS framework for styling the application.
- **Local Storage**: Used to store and retrieve tasks so they persist across page reloads.

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- **Node.js**: v14 or later
- **npm** or **yarn**

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   cd task-manager-app

2. Install the dependencies:

    ```bash
    npm install

3. Start the deployment server

   ```bash
   npm run dev

## Usage

### Home Page:
On the home page, click the **Get Started** button to navigate to the task management table.

### Task Table:
- You can create new tasks by clicking the **Create Task** button.
- Each task can be **edited** or **deleted**.
- You can mark tasks as **completed** or **pending**.
- The table allows you to **sort tasks by priority**.
- You can **reset the task order** after sorting using the reset button.
- Clicking on a task row will take you to a detailed view of the task.

## Known Issues

- The task data is stored in **local storage**, so it is limited to your browser. Once you clear the cache or switch browsers, the tasks will be lost.

## Future Enhancements

- Implement a backend with a database for persistent task storage.
- Add user authentication to manage personal task lists.
