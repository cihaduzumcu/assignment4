import { Task, TaskManager } from './taskManager.js';
import { fetchTasks } from './api.js';

const loadTasksBtn = document.getElementById('loadTasksBtn');
const statusMessage = document.getElementById('statusMessage');

const taskManager = new TaskManager();

async function loadTasks() {
    statusMessage.textContent = 'Loading tasks...';

    const rawTasks = await fetchTasks();

    const json = JSON.stringify(rawTasks);
    const parsedTasks = JSON.parse(json);

    const tasks = parsedTasks.map(t => new Task(t.id, t.title, t.completed));
    taskManager.setTasks(tasks);

    statusMessage.textContent = '';
}

loadTasksBtn.addEventListener('click', loadTasks);