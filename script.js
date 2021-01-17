let template = document.querySelector(".template");
let count = localStorage.getItem("task_count");

if (count === null && count != Number(count)) {
    count = 0;
}

document
    .querySelector(".new-task")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        let textarea = this.querySelector("textarea");
        count++;
        addTask(textarea.value, count);
        textarea.value = "";

    });

function addTask(text, order) {
    if (text !== "") {
        let task = template.cloneNode(true);
        task.setAttribute("data-order", order);
        task.classList.remove("template");
        task.querySelector("pre").textContent = text;
        localStorage.setItem("task[" + order + "]", text);
        localStorage.setItem("task_count", order);

        task.addEventListener("click", function () {
            if (!this.classList.contains("editable")) {
                this.classList.toggle("done");

            }

        });

        // Option pogas click

        task.querySelector(".option").addEventListener("click", function (event) {
            event.stopPropagation();
            task.querySelector(".options").classList.toggle("active");

        });

        // Edit pogas click

        task.querySelector(".edit").addEventListener("click", function (e) {
            e.stopPropagation();
            if (!task.classList.contains("done")) {
                task.querySelector("pre").setAttribute("contenteditable", true);
                task.classList.add("editable");
                task.querySelector(".options").classList.remove("active");
            }

        });

        // SAVE pogas click

        task.querySelector(".save").addEventListener("click", function (e) {
            e.stopPropagation();

            task.classList.remove("editable");
            task.querySelector("pre").removeAttribute("contenteditable");
        });

        // Remove pogas click

        task.querySelector(".remove").addEventListener("click", function (e) {
            e.stopPropagation();
            task.remove();
        });

        // UP pogas click

        task.querySelector(".up").addEventListener("click", function (e) {
            e.stopPropagation();
        });

        // DOWN pogas click

        task.querySelector(".down").addEventListener("click", function (e) {
            e.stopPropagation();
        });






        document.querySelector(".task-list").append(task);



    }
}

for (let i = 1; i <= count; i++) {
    addTask(localStorage.getItem("task[" + i + "]"), i);
}
