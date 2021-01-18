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
        addTask(textarea.value, false, count);
        textarea.value = "";

    });

function addTask(text, status, order) {
    if (text !== "") {
        let task = template.cloneNode(true);
        task.setAttribute("data-order", order);
        task.classList.remove("template");
        if (status) {
            task.classList.add("done");
        }

        task.querySelector("pre").textContent = text;
        localStorage.setItem("task[" + order + "]", JSON.stringify([text, status]));
        localStorage.setItem("task_count", order);

        // notikums kad uzdevums ir izpildīts (nosvītrots un pelēks)

        task.addEventListener("click", function () {
            if (!this.classList.contains("editable")) {
                this.classList.toggle("done");
                localStorage.setItem("task[" + order + "]", JSON.stringify([text, this.classList.contains("done")]));
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
            text = task.querySelector("pre").textContent
            localStorage.setItem("task[" + order + "]", JSON.stringify([text, false]));
            task.querySelector("pre").removeAttribute("contenteditable");
        });

        // Remove pogas click

        task.querySelector(".remove").addEventListener("click", function (e) {
            e.stopPropagation();

            for (let i = order; i < count; i++) {
                localStorage.setItem("task[" + i + "]", localStorage.getItem("task[" + (i + 1) + "]"));
            }

            localStorage.removeItem("task[" + count + "]");

            count--;
            localStorage.setItem("task_count", count);
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
    let item = JSON.parse(localStorage.getItem("task[" + i + "]"));
    addTask(item[0], item[1], i);
}
