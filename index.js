const form = document.querySelector("[data-form]");
const listTasks = document.querySelector("[data-listTasks]");
const input = document.querySelector("[data-input]");

const getId = () => {
    let id = Math.random() * 1000000;
    return id
}

class Storage {
    static addTodStorage(todoArr) {
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage() {
        let storage = localStorage.getItem("todo") === null ?
            [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    }
}

let tasksArr = Storage.getStorage();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    id = getId()
    const task = new Task(id, input.value);
    tasksArr = [...tasksArr, task];
    UI.displayData();
    UI.clearInput();
    Storage.addTodStorage(tasksArr);
});

class Task {
    constructor(id, task) {
        this.id = id;
        this.task = task;
    }
}

class UI {
    static displayData() {
        let displayData = tasksArr.map((item) => {
            return `
                <div class="task">
                <p>${item.task}</p>
                <span class="remove" data-id = ${item.id}> X</span>
                </div>
            `
        });
        listTasks.innerHTML = (displayData).join(" ");
    }
    static clearInput() {
        input.value = "";
    }
    static removeTodo() {
        listTasks.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove")) {
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            UI.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id) {
        tasksArr = tasksArr.filter((item) => item.id !== +id);
        Storage.addTodStorage(tasksArr);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
});
