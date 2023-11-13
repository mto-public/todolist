import {Task} from './task.js';
import {addElement} from './lib.js';

const main = document.querySelector("main");
renderTodoList()

function renderTodoList() {
    let todolist = document.createElement('section');
    todolist.classList.add('todolist');
    let title = document.createElement('h1');
    title.innerHTML = "My Todolist";

    let tasks = document.createElement('div');
    tasks.classList.add('tasks');

    todolist.appendChild(title);
    todolist.appendChild(tasks);

    // let currentDate = new Date();
    // let optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    // let formattedDate = currentDate.toLocaleDateString('fr-FR', optionsDate);
    // let formattedTime = currentDate.toLocaleTimeString('fr-FR', optionsTime);
    // let task = new Task(null, formattedDate, formattedTime, "hello", true);
    // let task = new Task(null, '13/11/2023', '15:54', "hello", true);

    let taskList = [
        new Task(null, '13/11/2023', '15:54', "hello", true),
        new Task(null, '13/11/2023', '15:54', "hello", true)
    ];

    for(let task of taskList) {
        renderTask(tasks, task);
    }

    main.appendChild(todolist);
}

function renderTask(tasks, task) {
    let taskElement = document.createElement('div');
    taskElement.classList.add('task');

        let time = document.createElement('div');
        time.classList.add('time');
            // let dateInput = document.createElement('input');
            // let timeInput = document.createElement('input');
            // dateInput.type = "date";
            // timeInput.type = "time";

            let dateInput = document.createElement('div');
            let timeInput = document.createElement('div');

            dateInput.innerHTML = task.date;
            timeInput.innerHTML = task.time;
            time.appendChild(dateInput);
            time.appendChild(timeInput);
        

        let content = document.createElement('div');
            content.id = "content";
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = task.date ? true : false;

            let taskContent = document.createElement('p');
            taskContent.innerHTML = task.content;

            let buttonModif = document.createElement('button');
                let iconButtonModif = document.createElement('i');
                iconButtonModif.classList.add("fa-solid");
                iconButtonModif.classList.add("fa-pen");
                buttonModif.appendChild(iconButtonModif);     
            content.appendChild(checkbox);
            content.appendChild(taskContent);
            content.appendChild(buttonModif);

        let deleteDiv = document.createElement('div');
            deleteDiv.id = "delete";
            let buttonDelete = document.createElement('button');
            buttonDelete.classList.add('fa-solid');
            buttonDelete.classList.add('fa-trash');
            deleteDiv.appendChild(buttonDelete);

            buttonDelete.addEventListener('click', function(e) {
                this.parentNode.parentNode.remove();
            });

        let newTaskButton = document.createElement('button');
        newTaskButton.id = "add-task";
        newTaskButton.innerHTML = "Add";
        newTaskButton.addEventListener('click', function(e) {
            this.style.color = "red";
            let taskModal = taskModal();
        });

        taskElement.appendChild(time);
        taskElement.appendChild(content);
        taskElement.appendChild(deleteDiv);
        taskElement.appendChild(newTaskButton);
        
    tasks.appendChild(taskElement);
}

// function deleteTask(task) {
//     console.log('delete')
// }
