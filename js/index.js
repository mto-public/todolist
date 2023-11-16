import {Task} from './task.js';
import {User} from './user.js';
import {addElement} from './lib.js';
// import {update} from './update.js';
import {axios} from './axiosFaisMaison.js';

let users = null;
let taskIdMax = 0;
const main = document.querySelector("main");


// -----------------------------
// FETCH using ASYNC - AWAIT
// -----------------------------
const handleCallback = (data) => {
    // const taskList = data['todos'];
    const taskList = data.todos;
    taskIdMax = taskList.length;
    console.log(taskList);
    loadUsers();
    renderTodoList(taskList);
    // console.log(taskList);
}

axios.get(handleCallback)
// taskModal() 

// -----------------------------
// FETCH using THEN
// -----------------------------

// fetch("https://dummyjson.com/todos")
//   .then((res) => res.json())
//   .then((data) => {
//     const todosArray = data.todos;

//     todosArray.forEach((todo) => {
//       const task = new Task(todo.id, null, null, todo.todo, todo.completed);

//       renderTask(task);
//     });
//   })
//   .catch((err) => {
//     console.error(`erreur : ${err}`);
//   });

function renderTodoList(taskList) {
    let todolist = document.createElement('section');
    todolist.classList.add('todolist');
    let title = document.createElement('h1');
    title.classList.add('title');
    title.innerHTML = "My Todolist";

    let tasks = document.createElement('div');
    tasks.classList.add('tasks');

    let newTaskButton = document.createElement('button');
    newTaskButton.id = "add-task";
    newTaskButton.classList.add('round-button');
    newTaskButton.innerHTML = "+";
    newTaskButton.addEventListener('click', taskModal);
    
    todolist.appendChild(title);
    todolist.appendChild(tasks);
    todolist.appendChild(newTaskButton);
    main.appendChild(todolist);

    for(let task of taskList) {
        renderTask(task);
    }
}

function renderTask(task) {
    let tasks = document.querySelector('.tasks');
    let taskElement = document.createElement('div');
    taskElement.classList.add('task');

        let info = document.createElement('div');
        info.classList.add('time');
            let user = document.createElement('div');
            let taskId = document.createElement('div');

            // user.innerHTML = users[task.userId].name;
            user.innerHTML = `User: ${users[task.userId] != undefined ? users[task.userId].name : task.userId}`;
            taskId.innerHTML = "Task Id: " + task.id;
            info.appendChild(user);
            info.appendChild(taskId);
        

        let content = document.createElement('div');
            content.classList.add("content");

            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = task.completed ? true : false;
            if (checkbox.checked) {
                taskElement.classList.add('inactive');
            } else {
                taskElement.classList.remove('inactive');
            }
            task.completed = checkbox.checked ? true : false;

            checkbox.addEventListener('change', function(e) {
                let taskElement = checkbox.parentNode.parentNode;
                if (checkbox.checked) {
                    taskElement.classList.add('inactive');
                } else {
                    taskElement.classList.remove('inactive');
                }
            })

            let taskContent = document.createElement('p');
            taskContent.innerHTML = task.todo;

            let updateButton = document.createElement('button');
            updateButton.classList.add("btn-update");
                let iconButtonModif = document.createElement('i');
                iconButtonModif.classList.add("fa-solid");
                iconButtonModif.classList.add("fa-pen");
                updateButton.appendChild(iconButtonModif);     
            content.appendChild(checkbox);
            content.appendChild(taskContent);
            content.appendChild(updateButton);

        let deleteDiv = document.createElement('div');
            deleteDiv.classList.add("div-delete");
            let buttonDelete = document.createElement('button');
            buttonDelete.classList.add('fa-solid');
            buttonDelete.classList.add('fa-trash');
            deleteDiv.appendChild(buttonDelete);

            buttonDelete.addEventListener('click', function(e) {
                this.parentNode.parentNode.remove();
            });

        taskElement.appendChild(info);
        taskElement.appendChild(content);
        taskElement.appendChild(deleteDiv);
        
    tasks.appendChild(taskElement);
}


function taskModal() {
    let modal = document.getElementById("taskModal");
    modal.style.visibility = (modal.style.visibility == "visible") ? "hidden" : "visible";
    let modalClose = document.querySelector(".modalClose");
    modalClose.addEventListener('click', closeModal);
    
    const form = document.querySelector(".taskForm");
    form.onsubmit = function(e) {
        e.preventDefault();
        const taskName = document.getElementById("taskName").value;
        const taskInfo = document.getElementById("description").value;
        let task = {
            id: ++taskIdMax,
            userId: 1,
            todo: taskName,
            completed: false
        }
        // console.log(task);    
        closeModal();
        renderTask(task);
    };
}


function closeModal() {
    let modal = document.getElementById("taskModal");
    modal.style.visibility = "hidden";
    // Reset form fields to their initial state
    document.getElementById('taskName').value = '';
    document.getElementById('description').value = '';
}

function loadUsers() {
    users = [
        {id: 1, name: "Toan"},
        {id: 2, name: "Munir"},
        {id: 3, name: "Emilly"},
        {id: 4, name: "Newkid"},
        {id: 5, name: "Yalis"},
        {id: 6, name: "Christophe"},
        {id: 7, name: "Briac"},
        {id: 8, name: "Bilel"},
        {id: 9, name: "Adrien"}
    ]
}

    // let currentDate = new Date();
    // let optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    // let formattedDate = currentDate.toLocaleDateString('fr-FR', optionsDate);
    // let formattedTime = currentDate.toLocaleTimeString('fr-FR', optionsTime);

    // for(let task of taskList) {
    //     renderTask(task);
    // }