const main = document.querySelector("main");
renderTodoList()

function renderTodoList() {
    let todolist = document.createElement('section');
    todolist.classList.add('todolist');
    let title = document.createElement('h1');
    title.innerHTML = "my todolist";
    todolist.appendChild(title);

    renderTask(todolist);
    renderTask(todolist);
    renderTask(todolist);
    main.appendChild(todolist);
}

function renderTask(todolist) {
    let task = document.createElement('div');
    task.classList.add('task');
        let time = document.createElement('div');
        time.classList.add('time');
            let dateInput = document.createElement('input');
            let timeInput = document.createElement('input');
            dateInput.type = "date";
            timeInput.type = "time";
            time.appendChild(dateInput);
            time.appendChild(timeInput);
        task.appendChild(time);

        let content = document.createElement('div');
            content.id = "content";
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";

            let taskContent = document.createElement('p');
            taskContent.innerHTML = "Faire la vaisselle";

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
        task.appendChild(content);
        task.appendChild(deleteDiv);
    todolist.appendChild(task);
}
