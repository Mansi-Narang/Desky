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

const tasks= [];

if(tasks.length){
    tasks.map((task)=>{
        addInQueue(task);
    })
}

function addInQueue(task){
    let newTask = document.createElement('li');
    newTask.innerText = task;
    taskList.append(newTask);
}

function addTask(){
    const text = input.value;
    if(text.length == 0) alert('Enter some task to stay consistent!');
    else{
        tasks.push(text);
    }
}

addBtn.addEventListener("click", () => {
    addTask();
    addInQueue(input.value);
    updateProgressBar();
    input.value = "";
})

function completeTask(task){
    task.style.textDecoration = 'line-through';
}

taskList.addEventListener("click", function(event){
    event.target.classList.toggle("done");
    event.target.classList.toggle("checked");
    updateProgressBar();
})

function updateProgressBar(){
    let doneTasks = document.getElementsByClassName('checked')?.length;
    let totalTasks = tasks.length;

    progressBar.value = (doneTasks / totalTasks)*100;
}