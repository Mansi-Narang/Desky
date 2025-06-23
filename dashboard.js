const input = document.getElementById('addTask');
const addBtn = document.getElementById('add');
const taskList = document.querySelector('.tasklist');
const progressBar = document.getElementById('progress');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const day = document.querySelector('#day');
const month = document.querySelector('#month');
const date = document.querySelector('#date');

let newDay = new Date();
day.innerText = days[newDay.getDay()];
month.innerText = months[newDay.getMonth()];
date.innerText = newDay.getDate();



function addInQueue(task){
    let newTask = document.createElement('li');
    newTask.innerText = task.task;
    newTask.id = task.id;

    if(task.completeTask) {
        newTask.classList.add('done');
    }

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";
    delBtn.classList.add("delete-btn");
    delBtn.id = newTask.id;
    delBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        newTask.remove();
        Api.deleteToDo(event.target.id);
        updateProgressBar();
    });
    newTask.appendChild(delBtn);
    taskList.append(newTask);
}

function updateProgressBar(){
    let doneTasks = document.getElementsByClassName('done')?.length;
    let totalTasks = taskList.childNodes.length;
    if(totalTasks)
    progressBar.value = (doneTasks / totalTasks)*100;
}

async function getToDo(date){
    let tasks = await Api.getToDo(date);
    return tasks;
}

window.addEventListener("DOMContentLoaded", async()=>{
    const date = newDay.toISOString().slice(0,10);
    let tasks = await getToDo(date);
    tasks.map((task) => {
        addInQueue(task);
    })
    updateProgressBar();
})



async function addTask(){
    const text = input.value;
    if(text.length == 0){
        
    } 
    else{
        Api.postToDo({task: text});
        const date = newDay.toISOString().slice(0, 10);
        const tasks = await getToDo(date);
        
        taskList.innerHTML = "";
        tasks.map(task => addInQueue(task));
        updateProgressBar();
    }
}

addBtn.addEventListener("click", () => {
    addTask();
    updateProgressBar();
    input.value = "";
})

 function completeTask(id){
    Api.updateToDo(id);
}

taskList.addEventListener("click", async function(event){
    event.target.classList.toggle("done");
    completeTask(event.target.id);
    updateProgressBar();
})



document.querySelector(".finish").onclick = () => {
        alert("Great job today! See you tomorrow! 🌸");
    };


    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
    }



const datePicker = document.getElementById('datePicker');

// datePicker.max = new Date().toISOString().split("T")[0]; 

datePicker.value = newDay.toISOString().split("T")[0];//2025-06-21T17:00:00.000Z


datePicker.addEventListener("change", async (e) => {
    const selectedDate = e.target.value;

    let selected = new Date(selectedDate);
    day.innerText = days[selected.getDay()];
    month.innerText = months[selected.getMonth()];
    date.innerText = selected.getDate();

    taskList.innerHTML = "";

    let tasks = await Api.getToDo(selectedDate);
    tasks.map(task => addInQueue(task));

    updateProgressBar();
});