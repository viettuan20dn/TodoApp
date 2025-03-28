const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
  saveTodos();
  updateTodoList();
});

function addTodo() {
  const todoValue = todoInput.value.trim();
  if (todoValue == "") return;

  todoInput.value = "";
  allTodos.push({value:todoValue,completed:false});
}

function updateTodoList() {
  todoList.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    const todoItem = createHTMLTodoItem(todo, todoIndex);
    todoList.appendChild(todoItem);
  });
}

function createHTMLTodoItem(todo, todoIndex) {
  const todoIT = document.createElement("li");
  todoIT.className = "todo";
  todoIT.innerHTML = `
  <input type="checkbox" id="todo-${todoIndex}" />
          <label class="custom-checkbox" for="todo-${todoIndex}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label class="todo-text" for="todo-${todoIndex}">
            ${todo.value}
          </label>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-color)"
            >
              <path
                d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z"
              />
            </svg>
          </button>
  `;
  const deleteBtnElement = todoIT.querySelector(".delete-button");
  deleteBtnElement.addEventListener("click", () => {
    deleteTodo(todoIndex);
  });

  const checkboxElement = todoIT.querySelector("input");
  checkboxElement.addEventListener("change",()=>{
    allTodos[todoIndex].completed = checkboxElement.checked;
    saveTodos();
  })
  checkboxElement.checked = todo.completed;

  return todoIT;
}
function deleteTodo(todoIndex) {
  allTodos = allTodos.filter((_, index) => index != todoIndex);
  saveTodos();
  updateTodoList();
}
function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
