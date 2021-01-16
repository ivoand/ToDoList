let template = document.querySelector(".template");

document
    .querySelector(".new-task")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        let textarea = this.querySelector("textarea");

        if (textarea.value !== "") {
            let task = template.cloneNode(true);
            task.classList.remove("template");
            task.querySelector("pre").textContent = textarea.value;

            task.addEventListener("click", function () {
                this.classList.toggle("done");
            });

            task.querySelector(".option").addEventListener("click", function (event) {
                event.stopPropagation();
                task.querySelector(".options").classList.toggle("active");
            });

            task.querySelector(".edit").addEventListener("click", function (e) {
                e.stopPropagation();
                console.log("edit");
            });
            task.querySelector(".remove").addEventListener("click", function (e) {
                e.stopPropagation();
                console.log("remove");
            });

            document.querySelector(".task-list").append(task);

            textarea.value = "";
        }
    });
