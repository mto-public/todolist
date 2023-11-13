// addElement(main, 'section', {id: 'todolist', class: 'class1', content: 'hello'});

export function addElement(parent, type = 'div', options = {}) {
    let element = document.createElement(type);
    for(let key in options) {
        // console.log(key + ': ' + options[key]);
        if(key === 'id') {
            element.id = options[key];
        } else if(key === 'class') {
            element.classList.add(options[key]);
        } else if(key === 'content') {
            element.innerHTML = options[key];
        }
    }

    if(typeof(parent) === "string" && parent !== "") {
        parent = document.querySelector(parent);
    } else if(parent === "") {
        return element;
    }
    parent.appendChild(element);
    // console.log(element);
}