File organization:

- index.html: page structure with the heading, load button, status message, and task list container
- styles.css: styles for tasks and the completed state
- taskManager.js: Task class (read-only id, toggle()) and TaskManager class (immutable setTasks, addTask, removeTask, toggleTask)
- api.js: fetchTasks() returns a Promise that resolves with the task data after 1500ms
- main.js: loads tasks with async/await, converts the data with JSON, renders tasks to the DOM, and handles Toggle/Delete events

Challenges:

- Updating the tasks array without mutating it, using the spread operator, .filter(), and .map().
- Re-rendering the task list after every Toggle or Delete click.
- Understanding how async/await works with a Promise and try/catch.
- Running main.js as a module, which needed Live Server instead of opening the file directly.