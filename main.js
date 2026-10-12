import { Task, TaskManager } from './taskManager.js';
import { fetchTasks } from './api.js';

const loadTasksBtn = document.getElementById('loadTasksBtn');
const taskList = document.getElementById('taskList');
const statusMessage = document.getElementById('statusMessage');

const taskManager = new TaskManager();

function renderTasks() {
    taskList.textContent = '';

    taskManager.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle';
        toggleBtn.addEventListener('click', () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        taskDiv.appendChild(titleSpan);
        taskDiv.appendChild(toggleBtn);
        taskDiv.appendChild(deleteBtn);
        taskList.appendChild(taskDiv);
    });
}

async function loadTasks() {
    statusMessage.textContent = 'Loading tasks...';

    try {
        const rawTasks = await fetchTasks();

        const json = JSON.stringify(rawTasks);
        const parsedTasks = JSON.parse(json);

        const tasks = parsedTasks.map(t => new Task(t.id, t.title, t.completed));
        taskManager.setTasks(tasks);
        renderTasks();

        statusMessage.textContent = '';
    } catch (error) {
        statusMessage.textContent = 'Failed to load tasks. Please try again.';
    }
}

loadTasksBtn.addEventListener('click', loadTasks);