let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

    let task = document.getElementById("taskInput").value;

    if(task==="") return;

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    document.getElementById("taskInput").value="";
}

function displayTasks(){

    let list=document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        list.innerHTML += `
        <li>
            ${task}
            <button onclick="deleteTask(${index})">
                Delete
            </button>
        </li>
        `;
    });
}

function deleteTask(index){

    tasks.splice(index,1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}
