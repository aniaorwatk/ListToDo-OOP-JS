const form = document.querySelector("[data-form]");
const listTasks = document.querySelector("[data-listTasks");
const input = document.querySelector("[data-input]");

let id = 1

class Storage {
    static addTasksStorage(tasksArr) {
        let storage = localStorage.setItem("todo", JSON.stringify(tasksArr))
        return storage
    }

    static getStorage() {
        let storage = localStorage.getItem("task") === null ? [] : JSON.parse(localStorage.getItem("task"));
        return storage
    }
}

let tasksArr = Storage.getStorage();
console.log(tasksArr)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    id += 1
    const task = new Task(id, input.value);
    tasksArr = [...tasksArr, task];
    UI.displayData();
    UI.clearInput();
  
    Storage.addTasksStorage(tasksArr)
})

class Task {
    constructor(id, task) {
        this.id = id;
        this.task = task
    }
}

class UI {
    static displayData() {
        let displayData = tasksArr.map((item) => {
            return `
                <div class="task">
                <p>${item.task}</p>
                <span class="remove" data-id=${item.id}>X</span>
                </div>
            `
        })
        listTasks.innerHTML = (displayData).join(" ")
    }
    static clearInput() {
        input.value = ""
    }

    static removeTask() {
        listTasks.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove")) {
                e.target.parentelement.remove()
            }
            let btnId = e.target.dataset.id

            UI.removeArrayTasks(btnId)
        })
    }

    static removeArrayTasks(id) {
        tasksArr = tasksArr.filter((item) => { item.id !== id })
        Storage.addTasksStorage(tasksArr)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    //remove from the dom
    UI.removeTask();
});
