

const form = document.querySelector('#form');
const taskInput = document.querySelector('#newTask');
const addTaskBtn = document.querySelector('#addTask');
const deleteAllBtn = document.querySelector('#deleteTasks');
const ul = document.querySelector('.collection');


form.addEventListener('submit', addTask);
taskInput.addEventListener('keyup', enableAddBtn);
deleteAllBtn.addEventListener('click', deleteAll);
ul.addEventListener('click', deleteTask);
ul.addEventListener('click', completeTask);

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
    let check = document.createElement('a');
    let del = document.createElement('a');
    let li = document.createElement('li');
    check.className = 'secondary-content';
    check.innerHTML = '<i class="material-icons">check</i>';
    check.href = "#!";
    check.style = 'margin-right: 12px;';
    del.className = 'secondary-content';
    del.innerHTML = '<i class="material-icons">delete</i>';
    del.href = "#!";
    li.className = 'collection-item grey lighten-3';
    li.appendChild(document.createTextNode(taskText));
    li.appendChild(del);
    li.appendChild(check);
    li.style = 'margin: 2px; box-shadow: 1px 1px #ccc;';
    ul.appendChild(li);
}

function completeTask(e) {
    let target = e.target;
    if (target.textContent === 'check') {
        if (target.parentElement.parentElement.classList.contains('green'))
            target.parentElement.parentElement.classList.replace('green', 'grey');
        else
            target.parentElement.parentElement.classList.replace('grey', 'green');
    }
}

function deleteTask(e) {
    let target = e.target;
    if (target.textContent === 'delete') {
        target.parentElement.parentElement.remove();
        deleteFromLocalStorage(target.parentElement.parentElement.childNodes[0].textContent);
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

function deleteFromLocalStorage(taskToDelete) {
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

