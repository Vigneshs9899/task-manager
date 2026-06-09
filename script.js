let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

document
.getElementById("taskInput")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        addTask();
    }

});

function addTask(){

    const input =
    document.getElementById("taskInput");

    const taskText =
    input.value.trim();

    if(taskText === "") return;

    tasks.push({
        text:taskText,
        completed:false
    });

    saveTasks();

    input.value="";
}

function displayTasks(){

    const list =
    document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
        <span
            class="task-text ${task.completed ? 'completed' : ''}">
            ${task.text}
        </span>

        <div class="actions">

            <button
            class="complete-btn"
            onclick="toggleTask(${index})">

            ${task.completed ? 'Undo' : 'Done'}

            </button>

            <button
            class="delete-btn"
            onclick="deleteTask(${index})">

            Delete

            </button>

        </div>
        `;

        list.appendChild(li);
    });

    updateStats();
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
}

function clearTasks(){

    if(confirm("Delete all tasks?")){

        tasks=[];

        saveTasks();
    }
}

function updateStats(){

    document.getElementById("totalTasks").innerText =
    tasks.length;

    const completed =
    tasks.filter(task =>
        task.completed
    ).length;

    document.getElementById("completedTasks").innerText =
    completed;
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}
