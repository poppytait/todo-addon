const getTodos = () => {
  let todos = [];
  let todosStr = localStorage.getItem('todo');
  if (todosStr != null) {
      todos = JSON.parse(todosStr); 
  }
  return todos;
}

const add = () => {
  const task = document.getElementById('task').value;

  let todos = getTodos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

const show = () => {
  let todos = getTodos();

  let renderTodo = '<ul>'

  for(let i=0; i<todos.length; i++) {
    renderTodo += `<li>${todos[i]}<button class="remove" id="${i}">x</button><input type="checkbox" id="${i}"><p class="complete" style="display:none">complete</p></li>`;
  };
  renderTodo += '</ul>';

  document.getElementById('todos').innerHTML = renderTodo;

  let buttons = document.getElementsByClassName('remove');
  Array.from(buttons).map(button => button.addEventListener('click', remove));

  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  Array.from(checkboxes).map(checkbox => checkbox.addEventListener('click', markAsComplete));
}

const markAsComplete = (event) => {
  let checkBox = event.target;
  let id = event.target.id;
  
  let complete = document.getElementsByClassName('complete');

  if (checkBox.checked) {
    complete[id].style.display = "inline"
  } else {
    complete[id].style.display = "none";
  }

  return false;
}


const remove = (event) => {
  console.log(event)
  let id = event.target.id;
  let todos = getTodos();
  todos.splice(id, 1); 
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

const enter = (event) => {
  if (event.keyCode === 13) {
    add();
    document.getElementById('task').value='';
  }
}

document.getElementById('task').addEventListener('keypress', enter);
show();
