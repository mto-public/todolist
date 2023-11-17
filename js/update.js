export function openUpdateModal(task) {
    let modal = document.getElementById("updateModal");
    modal.style.display = "block";  
    
    const updateForm = document.querySelector(".updateForm");
    const updateDate = document.getElementById("updateDate");
    const updateTime = document.getElementById("updateTime");
    const updateTaskName = document.getElementById("updateInfo");
    const updateTaskInfo = document.getElementById("updateTaskName");
    console.log(task.todo);
    // Pré-remplissez le formulaire 
    updateDate.innerHTML = "user : " + task.userId;
    updateTime.innerHTML = "id : " + task.id;
    updateTaskName.value = task.content;
    updateTaskInfo.value = task.todo;
    console.log(updateDate.value);
  
  
    const updateSubmitButton = document.getElementById("updateSubmitButton");
  
    updateSubmitButton.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Mettez à jour l'objet de la tâche
        task.date = updateDate.value;
        task.time = updateTime.value;
        task.content = updateTaskInfo.value;
        console.log(task.content);
        
        modal.style.display = "none";
        // Mettez à jour la tâche dans l'interface utilisateur
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
  
  
  