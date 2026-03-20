const todoDiv = document.getElementById("todoDiv");
const doingDiv = document.getElementById("doingDiv");
const doneDiv = document.getElementById("doneDiv");

let draggedId = null;
let sourceColumn = null;

let tasks = {
    todo:[],
    doing:[],
    done:[]
}
todoDiv.addEventListener("dblclick",()=>{
    const todo = prompt("plz enter a Todo");

    if(!todo || todo == null) return alert("note can't be empty :/")

    const id = Date.now();

    let note = document.createElement("div");
    note.setAttribute("class","items-center hover:rotate-[-2deg] rotate-0 transition-transform justify-center flex h-40 w-48 rounded-tr-md rounded-tl-md bg-linear-to-br text-white font-bold font-poppins border-t-4 border-l-4 border-emerald-400 rounded-br-xl mt-1 ml-1 rounded-bl-xl shadow-box from-emerald-400 via-emerald-500 to-emerald-700 ");
    note.setAttribute("id",id);
    note.innerHTML = todo;

    tasks.todo.push([id,todo]);
    storeNotes()
loadTasks()
    console.log(tasks.todo)

    
})

async function loadTasks (){
    todoDiv.innerHTML = "";
    doingDiv.innerHTML = "";
    doneDiv.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("tasks"));

    if (data) tasks = data;

    tasks.todo.forEach((task)=>{

    let note = document.createElement("div");
    note.setAttribute("class","items-center hover:rotate-[-2deg]  rotate-0 mt-1 ml-1 transition-transform justify-center flex h-40  rounded-tr-md rounded-tl-md bg-linear-to-br text-white font-bold font-poppins border-t-4 border-l-4 border-gray-400 rounded-br-xl rounded-bl-xl shadow-box from-gray-400 via-gray-500 to-gray-700 ");
    note.setAttribute("id",task[0]);
    note.setAttribute("draggable","true");

    note.innerHTML = task[1];
    todoDiv.appendChild(note);

    note.addEventListener("dragstart", () => {
    draggedId = task[0];
    
    // identify source column
    if (tasks.todo.find(t => t[0] === draggedId)) sourceColumn = "todo";
    else if (tasks.doing.find(t => t[0] === draggedId)) sourceColumn = "doing";
    else sourceColumn = "done";
});

    note.addEventListener("click",()=> delNote(task[0]))

    })

    tasks.doing.forEach((task)=>{

    let note = document.createElement("div");
    note.setAttribute("class","items-center hover:rotate-[-2deg] rotate-0 transition-transform justify-center flex h-40  rounded-tr-md rounded-tl-md bg-linear-to-br text-white font-bold font-poppins border-t-4 border-l-4 border-rose-400 rounded-br-xl mt-1 ml-1 rounded-bl-xl shadow-box from-rose-400 via-rose-500 to-rose-700 ");
    note.setAttribute("id",task[0]);
    note.setAttribute("draggable","true");

    note.innerHTML = task[1];
    doingDiv.appendChild(note);
    
    note.addEventListener("dragstart", () => {
    draggedId = task[0];
    
    // identify source column
    if (tasks.todo.find(t => t[0] === draggedId)) sourceColumn = "todo";
    else if (tasks.doing.find(t => t[0] === draggedId)) sourceColumn = "doing";
    else sourceColumn = "done";
});

    note.addEventListener("click",()=> delDoingNote(task[0]))
    })

    tasks.done.forEach((task)=>{

    let note = document.createElement("div");
    note.setAttribute("class","items-center hover:rotate-[-2deg] rotate-0 transition-transform justify-center flex h-40 rounded-tr-md rounded-tl-md bg-linear-to-br text-white font-bold font-poppins border-t-4 border-l-4 border-teal-400 rounded-br-xl mt-1 ml-1 rounded-bl-xl shadow-box from-teal-400 via-teal-500 to-teal-700 ");
    note.setAttribute("id",task[0]);
    note.setAttribute("draggable","true");

    note.innerHTML = task[1];
    doneDiv.appendChild(note);

    note.addEventListener("dragstart", () => {
    draggedId = task[0];
    
    // identify source column
    if (tasks.todo.find(t => t[0] === draggedId)) sourceColumn = "todo";
    else if (tasks.doing.find(t => t[0] === draggedId)) sourceColumn = "doing";
    else sourceColumn = "done";
});

    note.addEventListener("click",()=> delDoneNote(task[0]))
    })

}

[todoDiv, doingDiv, doneDiv].forEach((col) => {

    col.addEventListener("dragover", (e) => {
        e.preventDefault(); // VERY IMPORTANT (allows drop)
    });

    col.addEventListener("drop", () => {

        if (!draggedId) return;

        // find the task data
        let taskData;

        taskData = tasks[sourceColumn].find(t => t[0] === draggedId);

        // remove from old column
        tasks[sourceColumn] = tasks[sourceColumn].filter(t => t[0] !== draggedId);

        // add to new column
        if (col === todoDiv) tasks.todo.push(taskData);
        else if (col === doingDiv) tasks.doing.push(taskData);
        else tasks.done.push(taskData);

        draggedId = null;
        sourceColumn = null;

        storeNotes();
        loadTasks();
    });
});

function storeNotes(){
    
    localStorage.setItem("tasks",JSON.stringify(tasks));
    console.log("saved!")
    
}

function delNote(id){
    tasks.todo = tasks.todo.filter((taskArr)=> taskArr[0] !== id);

    todoDiv.innerHTML = ""
    storeNotes()
    loadTasks()
}

function delDoingNote(id){
    tasks.doing = tasks.doing.filter((taskArr)=> taskArr[0] !== id);

    doingDiv.innerHTML = ""
    storeNotes()
    loadTasks()
}

function delDoneNote(id){
    tasks.done = tasks.done.filter((taskArr)=> taskArr[0] !== id);

    doneDiv.innerHTML = ""
    storeNotes()
    loadTasks()
}

loadTasks()