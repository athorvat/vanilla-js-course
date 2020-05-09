

const form = document.querySelector('#form');
const taskInput = document.querySelector('#newTask');
const addTaskBtn = document.querySelector('#addTask');
const deleteAllBtn = document.querySelector('#deleteTasks');
const filterInput = document.querySelector('#filter');
const ul = document.querySelector('.collection');


form.addEventListener('submit', addTask);
taskInput.addEventListener('input', enableAddBtn);
deleteAllBtn.addEventListener('click', deleteAll);
filterInput.addEventListener('input', filterTasks);
ul.addEventListener('click', deleteTask);
ul.addEventListener('click', completeTask);

loadFromLocalStorage();

function addTask(e) {
    let title = taskInput.value;
    let status = 'none';
    let priority = 'none';

    //let taskToSave = new Task(title, status, priority);
    let taskToSave = {title, status, priority};
    
    if (title.trim() !== '') {
        addTaskLi(taskToSave);
        saveToLocalStorage(taskToSave);
        taskInputReset();
    }
    e.preventDefault();
}

function addTaskLi(task) {
    let check = document.createElement('a');
    let del = document.createElement('a');
    let li = document.createElement('li');
    check.className = 'secondary-content';
    check.innerHTML = '<i class="material-icons">done</i>';
    check.href = "#!";
    check.style = 'margin-right: 12px;';
    del.className = 'secondary-content';
    del.innerHTML = '<i class="material-icons">clear</i>';
    del.href = "#!";
    li.className = 'collection-item grey lighten-3';
    li.appendChild(document.createTextNode(task.title));
    li.appendChild(del);
    li.appendChild(check);
    li.style = 'margin: 2px; box-shadow: 1px 1px #ccc;';
    ul.appendChild(li);
}

function completeTask(e) {
    let target = e.target;
    if (target.textContent === 'done') {
        if (target.parentElement.parentElement.classList.contains('green')) {
            target.parentElement.parentElement.classList.replace('green', 'grey');
            target.parentElement.parentElement.classList.remove('grey-text');
        }
        else {
            target.parentElement.parentElement.classList.replace('grey', 'green');
            target.parentElement.parentElement.classList.add('grey-text');
        }
    }
}

function deleteTask(e) {
    let target = e.target;
    if (target.textContent === 'clear') {
        target.parentElement.parentElement.remove();
        deleteFromLocalStorage(target.parentElement.parentElement.childNodes[0].textContent);
    }
    
    if (ul.querySelector('li') === null)
        deleteAllBtn.classList.replace('red', 'grey');
}

function deleteAll() {
    if (confirm('Delete ALL VISIBLE tasks?')) {
        const list = document.querySelectorAll('li');
        list.forEach(li => {
            if (li.style.display !== 'none') {
                li.remove();
                deleteFromLocalStorage(li.firstChild.textContent);
            }
        });
        
		deleteAllBtn.classList.replace('red', 'grey');
	}
}

function filterTasks() {
    const list = document.querySelectorAll('li');
    const filterText = filterInput.value.toLowerCase();
    let displayedItemsCount = 0;
    list.forEach(li => {
        if (li.firstChild.textContent.toLowerCase().includes(filterText)) {
            li.style.display = 'block';
            displayedItemsCount++;
        }
        else
            li.style.display = 'none';
    });
    if (displayedItemsCount === 0)
        deleteAllBtn.classList.replace('red', 'grey');
    else
        deleteAllBtn.classList.replace('grey', 'red');
}


// LOCALSTORE

function loadFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('datas'));
    tasks.forEach((task) => addTaskLi(task));
    
    if (ul.querySelector('li') !== null)
        deleteAllBtn.classList.replace('grey', 'red');
}

function saveToLocalStorage(task) {
    let tasks;
    let stored = localStorage.getItem('datas');

    if (stored === null) tasks = [];
    else tasks = JSON.parse(stored);

    tasks.push(task);
    localStorage.setItem('datas', JSON.stringify(tasks));
}

function deleteFromLocalStorage(taskToDelete) {
    let stored = localStorage.getItem('datas');
    let tasks = JSON.parse(stored);

    tasks.forEach(function(task, index) {
        if (task.title === taskToDelete)
            tasks.splice(index, 1);    
    });
    
    localStorage.setItem('datas', JSON.stringify(tasks));
}


// UI ELEMENT STATES

function taskInputReset() {
    taskInput.value = '';
    addTaskBtn.classList.replace('green', 'grey');
    deleteAllBtn.classList.replace('grey', 'red');
}

function enableAddBtn(e) {
    if (taskInput.value.trim() == '')
        addTaskBtn.classList.replace('green', 'grey');
    else
        addTaskBtn.classList.replace('grey', 'green');
}


//TASK OBJECT

class Task {
    constructor (title, status, priority) {
        this.title = title;
        this.priority = priority;
        this.status = status;
    }
}

t1 = new Task('task1', 'future');

console.log(JSON.stringify(t1));