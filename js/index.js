import { Task } from "./task.js";
import { User } from "./user.js";
import { addElement } from "./lib.js";
//import {openUpdateModal, updateTaskInUI} from './update.js';
import { axios } from "./axiosFaisMaison.js";

let taskList = [];
let users = null;
let taskIdMax = 0;
const main = document.querySelector("main");

// localStorage.setItem("username", "JohnDoe");
// let username = localStorage.getItem("username");
// console.log(username);

// -----------------------------
// FETCH using ASYNC - AWAIT
// -----------------------------
getApi()
async function getApi() {
    const data = await axios.get();
    taskList = data.todos;    // data['todos']
    setLocal(taskList);
    taskIdMax = taskList.length;
    loadUsers();
    renderTodoList(taskList);
}


// -----------------------------
// FETCH using ASYNC - AWAIT With Callback
// -----------------------------
// const handleGetCallback = (data) => {
//   taskList = data.todos;    // data['todos']
//   setLocal(taskList);
//   taskIdMax = taskList.length;
//   loadUsers();
//   renderTodoList(taskList);
// };

// axios.getWithCallback(handleGetCallback);


// axios.get(handleCallback);
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

// -----------------------------
// FETCH LOCAL
// -----------------------------
// getLocal();

function getLocal() {
  let data = localStorage.getItem("todos");
  console.log(data);
  if (data != null) {
    taskList = JSON.parse(data);
  }
  taskIdMax = taskList.length;
  loadUsers();
  renderTodoList(taskList);
}

function setLocal(taskList) {
    localStorage.setItem("todos", JSON.stringify(taskList));
    console.warn(localStorage.getItem("todos"));
}


function renderTodoList(taskList) {
  let todolist = document.createElement("section");
  todolist.classList.add("todolist");
  let title = document.createElement("h1");
  title.classList.add("title");
  title.innerHTML = "My Todolist";

  let tasks = document.createElement("div");
  tasks.classList.add("tasks");

  let newTaskButton = document.createElement("button");
  newTaskButton.id = "add-task";
  newTaskButton.classList.add("round-button");
  newTaskButton.innerHTML = "+";
  newTaskButton.addEventListener("click", taskModal);

  todolist.appendChild(title);
  todolist.appendChild(tasks);
  todolist.appendChild(newTaskButton);
  main.appendChild(todolist);

  for (let task of taskList) {
    renderTask(task);
  }
}

function renderTask(task) {
  let tasks = document.querySelector(".tasks");
  let taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.id = task.id;


  let info = document.createElement("div");
  info.classList.add("time");
  info.id = task.id;
  let user = document.createElement("div");
  let taskId = document.createElement("div");
  taskId.classList.add("taskId");

  // user.innerHTML = users[task.userId].name;
  user.innerHTML = `User: ${
    users[task.userId] != undefined ? users[task.userId].name : task.userId
  }`;
  taskId.innerHTML = "Task Id: " + task.id;
  info.appendChild(user);
  info.appendChild(taskId);

  let content = document.createElement("div");
  content.classList.add("content");
  content.id = "content";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed ? true : false;
  if (checkbox.checked) {
    taskElement.classList.add("inactive");
  } else {
    taskElement.classList.remove("inactive");
  }
  task.completed = checkbox.checked ? true : false;

  checkbox.addEventListener("change", function (e) {
    let taskElement = checkbox.parentNode.parentNode;
    if (checkbox.checked) {
      taskElement.classList.add("inactive");
    } else {
      taskElement.classList.remove("inactive");
    }
  });

  let taskContent = document.createElement("p");
  taskContent.innerHTML = task.todo;

  let updateButton = document.createElement("button");
  updateButton.classList.add("btn-update");
  let iconButtonModif = document.createElement("i");
  iconButtonModif.classList.add("fa-solid");
  iconButtonModif.classList.add("fa-pen");
  updateButton.appendChild(iconButtonModif);
  content.appendChild(checkbox);
  content.appendChild(taskContent);
  content.appendChild(updateButton);

  let deleteDiv = document.createElement("div");
  deleteDiv.classList.add("div-delete");
  let buttonDelete = document.createElement("button");
  buttonDelete.classList.add("fa-solid");
  buttonDelete.classList.add("fa-trash");
  deleteDiv.appendChild(buttonDelete);

  buttonDelete.addEventListener("click", function (e) {
    let task = this.parentNode.parentNode;
    let id = parseInt(task.querySelector(".taskId").textContent.slice(-1)); // 1 - int
    task.remove();
    taskList = taskList.filter((e) => e.id != id);
    setLocal(taskList);
  });

  updateButton.addEventListener('click', function(e) {
    openUpdateModal(task);
    tasks.style.display = "none";
  });
  updateSubmitButton.addEventListener('click', function(e) {
  tasks.style.display = "flex";
  tasks.style.flexDirection = "column";
  });

  content.appendChild(checkbox);
  content.appendChild(taskContent);
  content.appendChild(updateButton);

  taskElement.appendChild(info);
  taskElement.appendChild(content);
  taskElement.appendChild(deleteDiv);

  tasks.appendChild(taskElement);
  tasks.appendChild(taskElement);
  sortTasks();
}

function taskModal() {
  let modal = document.getElementById("taskModal");
  modal.style.visibility =
    modal.style.visibility == "visible" ? "hidden" : "visible";
  let modalClose = document.querySelector(".modalClose");
  modalClose.addEventListener("click", closeModal);
  const taskName = document.getElementById("taskName");
  const taskInfo = document.getElementById("info");
  const form = document.querySelector(".taskForm");
  form.onsubmit = function (e) {
    e.preventDefault();
    const taskName = document.getElementById("taskName").value;
    if(taskName === "") {
        return
    }
    const taskInfo = document.getElementById("description").value;
    let task = {
      id: ++taskIdMax,
      userId: 1,
      todo: taskName,
      completed: false,
    };
    taskList.push(task);
    setLocal(taskList);
    // console.log(task);
    closeModal();
    renderTask(task);
  };
}

function closeModal() {
  let modal = document.getElementById("taskModal");
  modal.style.visibility = "hidden";
  // Reset form fields to their initial state
  document.getElementById("taskName").value = "";
  document.getElementById("description").value = "";
}

function loadUsers() {
  users = [
    { id: 1, name: "Toan" },
    { id: 2, name: "Munir" },
    { id: 3, name: "Emilly" },
    { id: 4, name: "Newkid" },
    { id: 5, name: "Yalis" },
    { id: 6, name: "Christophe" },
    { id: 7, name: "Briac" },
    { id: 8, name: "Bilel" },
    { id: 9, name: "Adrien" },
  ];
}

// let currentDate = new Date();
// let optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
// let optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
// let formattedDate = currentDate.toLocaleDateString('fr-FR', optionsDate);
// let formattedTime = currentDate.toLocaleTimeString('fr-FR', optionsTime);

// for(let task of taskList) {
//     renderTask(task);
// }
function openUpdateModal(task) {
  let modal = document.getElementById("updateModal");
  modal.style.display = "block";  
  
  // Obtenez les éléments du formulaire de mise à jour
  const updateForm = document.querySelector(".updateForm");
  const updateDate = document.getElementById("updateDate");
  const updateTime = document.getElementById("updateTime");
  const updateTaskName = document.getElementById("updateInfo");
  const updateTaskInfo = document.getElementById("updateTaskName");
  // Pré-remplissez le formulaire 
  updateDate.innerHTML = "user : " + task.userId;
  updateTime.innerHTML = "id : " + task.id;
  updateTaskName.value = task.content;
  updateTaskInfo.value = task.todo;
  // On récupère le bouton de soumission du formulaire de mise à jour
  const updateSubmitButton = document.getElementById("updateSubmitButton");

  // Ajoutez un écouteur d'événements au bouton de soumission
  updateSubmitButton.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Mettez à jour les valeurs des infos
      task.date = updateDate.value;
      task.time = updateTime.value;
      task.content = updateTaskInfo.value;
      console.log(task.content);
      
      // On masque la modal apres la mise a jour
      modal.style.display = "none";
      // On met à jour les valeur dans l'interface utilisateur
      updateTaskInUI(task);
  });
}



function updateTaskInUI(task) {

  let updateDate = document.getElementById("updateDate");
  let updateTime = document.getElementById("updateTime");
  let updateTaskName = document.getElementById("updateTaskName");
  let updateInfo = document.getElementById("content");

  updateDate.value = task.date;
  updateTime.value = task.time;
  updateTaskName.value = task.content;
  updateInfo.value = task.content;

  // Mettez à jour le contenu de la tâche dans l'interface utilisateur
  let tasks = document.querySelectorAll('.task');
  let taskElementid = 0;
  tasks.forEach(taskElement => {
      console.log(task.id);
      
      if (taskElementid == task.id) {
          console.log(taskElementid);
          let taskContent = taskElement.querySelector('#content p');
          if (updateInfo.value) {
              task.todo = updateInfo.value;                
              renderTask(task);  
              const taskDiv = document.getElementById(task.id);
              taskDiv.remove(); 
          }
      }
      
      taskElementid++;
  });
}

function sortTasks() {
  const tasksContainer = document.querySelector(".tasks");
  const taskElements = Array.from(tasksContainer.querySelectorAll(".task"));
  const sortedTasks = taskElements.sort((a, b) => {
    const idA = parseInt(a.id);
    const idB = parseInt(b.id);
    return idA - idB;
  });
  
  tasksContainer.innerHTML = ""; // Clear container
  
  sortedTasks.forEach(task => {
    tasksContainer.appendChild(task);
  });
}
