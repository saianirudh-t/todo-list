sub = document.querySelector('#sub')
container = document.querySelector('.container')
let arr = []

let taskDone = document.getElementById("taskDone")
let totalTasks = document.getElementById("totalTasks")

function updateCompletedCount() {
  let completed = arr.filter(t => t.completed).length
  taskDone.innerText = completed
  totalTasks.innerText = arr.length
}

function progressBar() {
  let done = document.querySelector(".done")
  let completed = arr.filter(t => t.completed).length

  if (arr.length === 0) {
    done.style.width = "0%"
    return
  }

  done.style.width = `${(completed / arr.length) * 100}%`
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

  div.classList.add('task')
  del.classList.add('remove-btn')
  update.classList.add('update-btn')

  p.innerText = task
  checkbox.type = 'checkbox'
  checkbox.checked = completed

  del.innerHTML = `<img src="remove.svg">`
  update.innerHTML = `<img src="edit.svg">`

  div.append(checkbox, p, update, del)
  container.append(div)

  if (completed) {
    p.style.textDecoration = "line-through"
    p.style.color = "darkgrey"
  }

  checkbox.addEventListener('change', () => {
    let index = arr.findIndex(t => t.entered === task)

    if (index !== -1) {
      arr[index].completed = checkbox.checked
      saveToLocal()
    }

    p.style.textDecoration = checkbox.checked ? "line-through" : "none"
    p.style.color = checkbox.checked ? "darkgrey" : "#333"

    updateCompletedCount()
    progressBar()
  })

  del.addEventListener('click', () => {
    div.remove()
    arr = arr.filter(t => t.entered !== task)
    saveToLocal()
    updateCompletedCount()
    progressBar()
  })

  update.addEventListener('click', () => {
    document.querySelector("#task").value = p.innerText
    div.remove()
    arr = arr.filter(t => t.entered !== task)
    saveToLocal()
    updateCompletedCount()
    progressBar()
  })
}

window.addEventListener("load", () => {
  let saved = JSON.parse(localStorage.getItem("tasks")) || []
  arr = saved

  saved.forEach(taskObj => {
    createTask(taskObj.entered, taskObj.completed)
  })

  updateCompletedCount()
  progressBar()
})

let box1 = document.querySelector(".box1")
let msg = document.createElement('p')
let ind=0
msg.style.display = "none"

box1.after(msg)

sub.addEventListener('click', takeValue)

document.addEventListener('keydown', e => {
  if (e.key === "Enter") takeValue()
})

function takeValue() {
  let inp = document.querySelector("#task")
  let task = inp.value.trim()

  if (task === "") return
  ind=arr.findIndex(item=>item.entered==task)
  if (ind!=-1) {
    msg.innerHTML = `<p style="color:red;">Task already exists at position ${ind+1} </p>`
    msg.style.display = "block"
    setTimeout(() => msg.style.display = "none", 1500)
    return
  }

  createTask(task, false)
  arr.push({ entered: task, completed: false })

  saveToLocal()
  updateCompletedCount()
  progressBar()

  inp.value = ""
}

let clearAllBtn = document.getElementById("clearAll")
let clearCompletedBtn = document.getElementById("clearCompleted")

let msg1=document.createElement('p')
let progress = document.querySelector(".progress")
progress.before(msg1)
msg1.style.display="none"
clearAllBtn.addEventListener("click", () => {
    if(arr.length!=0){
        msg1.innerHTML=`<p style="color:red">Total ${arr.length} tasks got removed`
    }
    else{
        msg1.innerHTML=`<p style="color:red">There is no tasks to remove`
    }
    msg1.style.display="block"
    setTimeout(() => msg1.style.display = "none", 1500)
    document.querySelectorAll(".task").forEach(div => div.remove())
    arr = []
    saveToLocal()
    updateCompletedCount()
    progressBar()
})

clearCompletedBtn.addEventListener("click", () => {
    let completedTasks=arr.filter(task=>task.completed)
    if (completedTasks.length!=0){
        msg1.innerHTML=`<p style="color:red";>Total ${completedTasks.length}tasks got removed</p>`
    }
    else{
        msg1.innerHTML=`<p style="color:red">There is no tasks to remove`
    }
    msg1.style.display="block"
    setTimeout(() => msg1.style.display = "none", 1500)
    document.querySelectorAll(".task").forEach(div => {
    let checkbox = div.querySelector("input[type='checkbox']")
    if (checkbox.checked){
    div.remove()
    }
  })
  arr = arr.filter(task => !task.completed)

  saveToLocal()
  updateCompletedCount()
  progressBar()
})
