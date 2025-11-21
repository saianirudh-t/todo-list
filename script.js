sub=document.querySelector('#sub')
container=document.querySelector('.container')
let arr=[]
sub.addEventListener('click',(event)=>{
    let inp=document.querySelector("#task")
    let task=inp.value
    let div=document.createElement('div')
    let del=document.createElement('button')
    let update=document.createElement('button')
    let checkbox=document.createElement('input')
    let p=document.createElement('p')
    p.innerText=task
    checkbox.setAttribute('type','checkbox')
    del.innerText="remove"
    update.innerText='update'
    div.classList.add('task')
    div.append(checkbox,p,del,update)
    arr.push({entered:task,completed:false})
    container.append(div)
    checkbox.addEventListener('change',()=>{
        if (checkbox.checked){
            arr.completed=true
            p.style.textDecoration="line-through"
            console.log(arr)
        }
        else{
            arr.completed=false
            p.style.textDecoration='none'
            console.log(arr)
        }
    })
    del.addEventListener('click',(e)=>div.remove())
    update.addEventListener('click',(e)=>{
        inp.value=p.innerText
        div.remove()
    })
    inp.value=''
    console.log(arr)
})