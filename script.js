sub = document.querySelector('#sub')
container = document.querySelector('.container')
let arr = []

let taskDone=document.getElementById("taskDone")
let totalTasks=document.getElementById("totalTasks")

function updateCompletedCount() {
    let completed = arr.filter(t => t.completed).length
    taskDone.innerText= completed
    totalTasks.innerText=arr.length
}

function progressBar(){
    let done=document.querySelector(".done")
    let bar=taskDone/totalTasks;
    done.style.width=`${bar}%`
}
function saveToLocal() {
    localStorage.setItem("tasks", JSON.stringify(arr))
}

function createTask(task, completed) {

    let div = document.createElement('div')
    let del = document.createElement('button')
    let update = document.createElement('button')
    let checkbox = document.createElement('input')
    let p = document.createElement('p')
    p.innerText = task
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = completed
    div.classList.add('task')
    del.classList.add('remove-btn')
    update.classList.add('update-btn')
    del.innerHTML=`<img src="remove.svg">`
    update.innerHTML =`<img src="edit.svg">`
    div.append(checkbox, p, update, del)
    container.append(div)
    if (completed) p.style.textDecoration = "line-through"
    checkbox.addEventListener('change', () => {
        let index = arr.findIndex(t => t.entered === task)
        if (index !== -1) {
            arr[index].completed = checkbox.checked
            saveToLocal()
        }

        p.style.textDecoration = checkbox.checked ? "line-through" : "none"
        p.style.color=checkbox.checked ? "darkGrey":"#333"
        updateCompletedCount()
    })

    del.addEventListener('click', () => {
        div.remove()
        arr = arr.filter(t => t.entered !== task)
        saveToLocal()
        updateCompletedCount()
    })

    update.addEventListener('click', () => {
        document.querySelector("#task").value = p.innerText
        div.remove()
        arr = arr.filter(t => t.entered !== task)
        saveToLocal()
        updateCompletedCount()
    })
}

window.addEventListener("load", () => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || []
    arr = saved
    saved.forEach(taskObj => {
        createTask(taskObj.entered, taskObj.completed)
    })
    updateCompletedCount() 
})
let main=document.querySelector(".main")
let msg=document.createElement('p')
msg.innerHTML=`<p style="color:red;">Task already exists</p>`
msg.style.display="none"
main.insertBefore(msg,sub)
sub.addEventListener('click', () => {
    let inp = document.querySelector("#task");
    let task = inp.value.trim()
    if (task === "") return;
    if (arr.some(item => item.entered === task)) {
        msg.style.display="block"
        setTimeout(() => {
            msg.style.display="none"
        }, 1500);
        return;
    }
    createTask(task, false)
    arr.push({ entered: task, completed: false })
    saveToLocal()
    updateCompletedCount()
    inp.value = ""
})

