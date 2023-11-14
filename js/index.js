import {Task} from './task.js';
import {addElement} from './lib.js';

let count = 0;

let taskList = [
    new Task(null, '13/11/2023', '15:54', "hello", true),
    new Task(null, '13/11/2023', '15:54', "hello", true)
];

const main = document.querySelector("main");
renderTodoList()

function renderTodoList() {
    let todolist = document.createElement('section');
    todolist.classList.add('todolist');
    let title = document.createElement('h1');
    title.innerHTML = "My Todolist";

    let tasks = document.createElement('div');
    tasks.classList.add('tasks');

    let newTaskButton = document.createElement('button');
    newTaskButton.id = "add-task";
    newTaskButton.innerHTML = "Add";
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
    // let task = new Task(null, formattedDate, formattedTime, "hello", true);
    // let task = new Task(null, '13/11/2023', '15:54', "hello", true);

    // for(let task of taskList) {
    //     renderTask(task);
    // }
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

        taskElement.appendChild(time);
        taskElement.appendChild(content);
        taskElement.appendChild(deleteDiv);
        
    tasks.appendChild(taskElement);

}

// function deleteTask(task) {
//     console.log('delete')
// }

// taskModal();
const modal = document.getElementById("taskModal");
function taskModal() {
    // let modal = document.getElementById("taskModal");
    modal.style.visibility = (modal.style.visibility == "visible") ? "hidden" : "visible";
    let modalClose = document.querySelector(".modalClose");
    modalClose.addEventListener('click', closeModal);
    
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const taskName = document.getElementById("taskName");
    const taskInfo = document.getElementById("info");

    const submitButon = document.getElementById("submitButton");
    submitButon.addEventListener("click", function(e) {
        e.preventDefault();
        alert(++count);
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
    });
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

