import {Task} from './task.js';
import {addElement} from './lib.js';
// import {update} from './update.js';

let taskList = [
    new Task(null, '13/11/2023', '15:54', "hello", true),
    new Task(null, '13/11/2023', '15:54', "hello", false),
    new Task(null, '13/11/2023', '15:54', "hello", false)
];

const main = document.querySelector("main");
renderTodoList()

function renderTodoList() {
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

    // let currentDate = new Date();
    // let optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    // let formattedDate = currentDate.toLocaleDateString('fr-FR', optionsDate);
    // let formattedTime = currentDate.toLocaleTimeString('fr-FR', optionsTime);

    for(let task of taskList) {
        renderTask(task);
    }
}

function renderTask(task) {
    let tasks = document.querySelector('.tasks');
    let taskElement = document.createElement('div');
    taskElement.classList.add('task');

        let time = document.createElement('div');
        time.classList.add('time');
            let dateInput = document.createElement('div');
            let timeInput = document.createElement('div');

            dateInput.innerHTML = task.date;
            timeInput.innerHTML = task.time;
            time.appendChild(dateInput);
            time.appendChild(timeInput);
        

        let content = document.createElement('div');
            content.classList.add("content");

            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = task.status ? true : false;
            if (checkbox.checked) {
                taskElement.classList.add('inactive');
            } else {
                taskElement.classList.remove('inactive');
            }
            task.status = checkbox.checked ? true : false;

            checkbox.addEventListener('change', function(e) {
                let taskElement = checkbox.parentNode.parentNode;
                if (checkbox.checked) {
                    taskElement.classList.add('inactive');
                } else {
                    taskElement.classList.remove('inactive');
                }
            })

            let taskContent = document.createElement('p');
            taskContent.innerHTML = task.content;

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

        taskElement.appendChild(time);
        taskElement.appendChild(content);
        taskElement.appendChild(deleteDiv);
        
    tasks.appendChild(taskElement);

}

function taskModal() {
    let modal = document.getElementById("taskModal");
    modal.style.visibility = (modal.style.visibility == "visible") ? "hidden" : "visible";
    let modalClose = document.querySelector(".modalClose");
    modalClose.addEventListener('click', closeModal);
    
    const form = document.querySelector(".form");
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const taskName = document.getElementById("taskName");
    const taskInfo = document.getElementById("info");

    form.onsubmit = function(e) {
        e.preventDefault();
        // Récupérez la valeur de l'élément
        const valueDate = date.value;
        const valueTime = time.value;
        const valuetaskName = taskName.value;
        const valueInfo = taskInfo.value;
        let task = {
            id: null,
            date: valueDate,
            time: valueTime,
            content: valueInfo,
            status: null
        }
            
        closeModal();
        renderTask(task);
    };
}

function closeModal() {
    let modal = document.getElementById("taskModal");
    modal.style.visibility = "hidden";
    // Reset form fields to their initial state
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('taskName').value = '';
    document.getElementById('info').value = '';
}

