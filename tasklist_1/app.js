

const form = document.querySelector('#form');
const taskInput = document.querySelector('#newTask');
const addTaskBtn = document.querySelector('#addTask');
const deleteAllBtn = document.querySelector('#deleteTasks');
const ul = document.querySelector('.collection');


form.addEventListener('submit', addTask);
taskInput.addEventListener('keyup', enableAddBtn);
deleteAllBtn.addEventListener('click', deleteAll);
ul.addEventListener('click', deleteTask);

loadFromLocalStorage();

function addTask(e) {
    let taskText = taskInput.value;
    if (taskText.trim() !== '') {
        addTaskLi(taskText);
        saveToLocalStorage(taskText);
        taskInputReset();
    }
    e.preventDefault();
}

function addTaskLi(taskText) {
    let a = document.createElement('a');
    let li = document.createElement('li');
    a.className = 'delete-item secondary-content';
    a.innerHTML = '<i class="fa fa-remove"></i>';
    li.className = 'collection-item grey lighten-3';
    li.appendChild(document.createTextNode(taskText));
    li.appendChild(a);
    ul.appendChild(li);
}

function deleteTask(e) {
    let target = e.target;
    if (target.classList.contains('fa-remove')) {
        target.parentElement.parentElement.remove();
        deleteFromLocal(target.parentElement.parentElement.textContent);
    }
    
    if (ul.querySelector('li') === null)
        deleteAllBtn.classList.replace('red', 'grey');
}

function deleteAll() {
    ul.innerHTML = '';
    deleteAllBtn.classList.replace('red', 'grey');
    localStorage.setItem('data', JSON.stringify([]));
}


// LOCALSTORE

function loadFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('data'));
    tasks.forEach((task) => addTaskLi(task));
    
    if (ul.querySelector('li') !== null)
        deleteAllBtn.classList.replace('grey', 'red');
}

function saveToLocalStorage(task) {
    let tasks;
    let stored = localStorage.getItem('data');

    if (stored === null) tasks = [];
    else tasks = JSON.parse(stored);

    tasks.push(task);
    localStorage.setItem('data', JSON.stringify(tasks));
}

function deleteFromLocal(taskToDelete) {
    let stored = localStorage.getItem('data');
    let tasks = JSON.parse(stored);

    tasks.forEach(function(task, index) {
        if (task === taskToDelete)
            tasks.splice(index, 1);    
    });
    
    localStorage.setItem('data', JSON.stringify(tasks));
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

