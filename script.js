const yourTodo = document.querySelector('.your-todo');
const submitTodo = document.querySelector('.submit-todo');
const todoList = document.querySelector('.list-todos ul');
const deleteAll = document.querySelector('.delete-all');

document.addEventListener('DOMContentLoaded', getFromLocal);

submitTodo.addEventListener('click', (e)=>{
    e.preventDefault();

    const todoElement = document.createElement('div');
    todoElement.classList.add('single-todo');

    const todoContent = document.createElement('li');
    todoContent.innerText = yourTodo.value;
    todoContent.classList.add('todo-content');
    todoElement.appendChild(todoContent);

    saveToLocal({
        task: yourTodo.value,
        completed: false
    });

    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    completedBtn.classList.add('complete-btn');
    todoElement.appendChild(completedBtn);

    const editBtn = document.createElement('button');
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editBtn.classList.add('edit-btn');
    todoElement.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteBtn.classList.add('delete-btn');
    todoElement.appendChild(deleteBtn);

    todoList.appendChild(todoElement);
    yourTodo.value = "";

})

deleteAll.addEventListener('click', ()=>{
    Array.from(todoList.children).forEach((todoItem) => {
        todoItem.remove();
    })
    deleteAllFromLocal();
})

todoList.addEventListener('click', checkEditDelete);

function checkEditDelete(e){
    const item = e.target;

    if(item.classList[0] == 'complete-btn'){
        const entireTodo = item.parentElement;
        entireTodo.classList.toggle("todo-completed");
        toggleCheckInLocal(entireTodo);
    }

    if(item.classList[0] == 'delete-btn'){
        const entireTodo = item.parentElement;
        entireTodo.remove();
        removeFromLocal(entireTodo);
    }

    if(item.classList[0] == 'edit-btn'){
        const entireTodo = item.parentElement;
        const oldValue = entireTodo.children[0].innerText;
        const editTodo = prompt("Edit your selected task", oldValue);
        if(/^(?!_)(?!\[)(?!\])(?!\\)(?!\^)[a-zA-z0-9][a-zA-Z0-9\s]*$/.test(editTodo))
        {
            entireTodo.children[0].innerText = editTodo;
            updateLocal(entireTodo, oldValue);
        }
    }
}

function saveToLocal(newTodo){
    let allTodos;
    if(localStorage.getItem('allTodos') === null){
        allTodos = [];
    }else{
        allTodos = JSON.parse(localStorage.getItem('allTodos'));
    }
    allTodos.push(newTodo);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

function getFromLocal(){
    let allTodos;
    if(localStorage.getItem('allTodos') === null){
        allTodos = [];
    }else{
        allTodos = JSON.parse(localStorage.getItem('allTodos'));
    }
    allTodos.forEach((todo)=>{
        const todoElement = document.createElement('div');
        todoElement.classList.add('single-todo');

        const todoContent = document.createElement('li');
        todoContent.innerText = todo.task;
        todoContent.classList.add('todo-content');
        todoElement.appendChild(todoContent);

        if(todo.completed === true){
            todoElement.classList.add('todo-completed');
        }else{
            todoElement.classList.remove('todo-completed');
        }

        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        completedBtn.classList.add('complete-btn');
        todoElement.appendChild(completedBtn);

        const editBtn = document.createElement('button');
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editBtn.classList.add('edit-btn');
        todoElement.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteBtn.classList.add('delete-btn');
        todoElement.appendChild(deleteBtn);

        todoList.appendChild(todoElement);
    })
}

function removeFromLocal(todo){
    let allTodos;
    if(localStorage.getItem('allTodos') === null){
        allTodos = [];
    }else{
        allTodos = JSON.parse(localStorage.getItem('allTodos'));
    }
    const indexToRemove = allTodos.findIndex(item => item.task === todo.children[0].innerText);
    allTodos.splice(indexToRemove, 1);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

function toggleCheckInLocal(todo){
    let allTodos;
    if(localStorage.getItem('allTodos') === null){
        allTodos = [];
    }else{
        allTodos = JSON.parse(localStorage.getItem('allTodos'));
    }
    const indexToToggle = allTodos.findIndex(item => item.task === todo.children[0].innerText);
    allTodos[indexToToggle].completed = !allTodos[indexToToggle].completed;
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

function updateLocal(todo, oldValue){
    let allTodos;
    if(localStorage.getItem('allTodos') === null){
        allTodos = [];
    }else{
        allTodos = JSON.parse(localStorage.getItem('allTodos'));
    }
    const indexToUpdate = allTodos.findIndex(item => item.task === oldValue);
    allTodos[indexToUpdate].task = todo.children[0].innerText;
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

function deleteAllFromLocal(){
    let allTodos;
    if(localStorage.getItem('allTodos') === null){
        allTodos = [];
    }else{
        allTodos = JSON.parse(localStorage.getItem('allTodos'));
    }
    allTodos = [];
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
}