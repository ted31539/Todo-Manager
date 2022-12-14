import './scss/_variables.scss';
import './scss/all.scss';
import '../index.html';
import { http } from './js/makeRequest';

const formAlertDOM = document.querySelector('#alert');
const formAddBtn = document.querySelector('#add-form-btn');
const formTodoContentDOM = document.querySelector('#todo-form-content');
const todoListDOM = document.querySelector('#todo-list');
const api = 'https://thawing-waters-97059.herokuapp.com';
let singleTodoAlertDOM;
let btnIsDisabled = false;

function getTodo(id) {
  try {
    return http.get(`${api}/api/todo/${id}`);
  } catch (err) {
    console.log(err);
  }
}

function removeTodo(id) {
  try {
    return http.delete(`${api}/api/todo/${id}`);
  } catch (err) {
    console.log(err);
  }
}

function addTodo(data) {
  try {
    return http.post(`${api}/api/todo`, data);
  } catch (err) {
    console.log(err);
  }
}

function editTodo(id, content) {
  try {
    return http.patch(`${api}/api/todo/${id}`, content);
  } catch (err) {
    console.log(err);
  }
}

function renderTodos(todos) {
  const todosPropertiesAry = Object.keys(todos);

  let str = '';
  todosPropertiesAry.forEach((item) => {
    todos[item].completed
      ? (str += `<li><p class="todo-done"><i class="bi bi-check-circle"></i>${todos[item].todo}</p>
      <div class="button-group">
      <div class="todo-list-alert"></div><button type="button" class="btn edit-btn"  data-id="${item}">
        <i class="bi bi-pencil-square edit-btn-icon" data-id="${item}"></i>
      </button>
      <button type="button" class="btn remove-btn" data-id="${item}">
        <i class="bi bi-trash-fill remove-btn-icon" data-id="${item}"></i>
      </button>
    </div></li>`)
      : (str += `<li><p class="">${todos[item].todo}</p><div class="button-group">
      <div class="todo-list-alert"></div><button type="button" class="btn edit-btn" data-id="${item}">
        <i class="bi bi-pencil-square edit-btn-icon" data-id="${item}"></i>
      </button>
      <button type="button" class="btn remove-btn" data-id="${item}">
        <i class="bi bi-trash-fill remove-btn-icon" data-id="${item}"></i>
      </button>
    </div></li>`);
  });

  todoListDOM.innerHTML = str;
}

function renderTodo(id, todo) {
  const editModalDiv = document.createElement('div');
  editModalDiv.id = 'edit-modal';
  editModalDiv.classList.add('edit-modal');
  editModalDiv.innerHTML = `  <div class="edit-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <h3>?????? Todo</h3>
      <form class="single-todo-form">
        <div class="form-control">
          <label>Todo ID</label>
          <p class="task-edit-id">${todo.id}</p>
        </div>
        <div class="form-control">
          <label>Todo</label>
          <input type="text" class="todo-edit-content" value="${todo.todo.todo}">
        </div>
        <div class="form-control">
          <label>??????</label>
          <input type="checkbox" class="todo-edit-completed" id="todo-edit-complelted" name="completed" value="${todo.todo.completed}">
        </div>
        <div class="form-control">
        <div id="modal-alert" class="alert"></div>
        </div>
        <div class="button-group">
          <input type="button" class="btn btn-modal-cancel" value="??????" id="edit-modal-close" />
          <input type="button" class="btn btn-modal-send" value="??????" id="edit-modal-send" />
        </div>
      </form>
    </div>
  </div>
</div>`;

  document.body.appendChild(editModalDiv);
  const completedCheckedDOM = document.querySelector('.todo-edit-completed');
  completedCheckedDOM.checked = todo.todo.completed;
}

async function showTodos() {  
  try {
    let { data, success } = await http.get(`${api}/api/todo`);
    if (success) {
      if (!data) {
        return;
      }
      renderTodos(data);
    }
  } catch (err) {
    console.log(err);
  }
}

todoListDOM.addEventListener('click', async (e) => {
  const target = e.target;
  const id = e.target.dataset.id;

  // get todoAlertDOM
  if (target.matches('button')) {
    singleTodoAlertDOM = target.parentElement.firstElementChild;
  }
  if (target.matches('i')) {
    singleTodoAlertDOM = target.parentElement.parentElement.firstElementChild;
  }

  // ?????? all btns disablrd return
  if (btnIsDisabled) {
    return;
  }
  // ?????? btn State control
  btnIsDisabled = true;
  // ?????? all btns disablrd attribute
  setBtnDisabledState(btnIsDisabled);

  // ???????????? remove
  if (
    target.classList.contains('remove-btn') ||
    target.classList.contains('remove-btn-icon')
  ) {
    // render todoList alert
    renderAlert(singleTodoAlertDOM, "<i class='bi bi-arrow-clockwise'>");
    try {
      // remove todo
      await removeTodo(id);
      // renderAlert
      renderAlert(formAlertDOM, "<p class='text-info'>?????????????????????</p>");
      // render todoList
      showTodos();
    } catch (err) {
      // renderAlert
      renderAlert(
        singleTodoAlertDOM,
        "<p class='text-danger'>?????????????????????????????????!</p>"
      );
    }
    setTimeout(() => {
      // ?????? alert
      renderAlert(formAlertDOM, '');
      renderAlert(singleTodoAlertDOM, '');
      singleTodoAlertDOM = null;
      // ?????? btn State control
      btnIsDisabled = false;
      // ?????? all btns disablrd attribute
      setBtnDisabledState(btnIsDisabled);
    }, 3000);
  }
  // ???????????? edit
  if (
    target.classList.contains('edit-btn') ||
    target.classList.contains('edit-btn-icon')
  ) {
    // render todoList alert loading
    renderAlert(singleTodoAlertDOM, "<i class='bi bi-arrow-clockwise'>");

    try {
      const { data: todo } = await getTodo(id);
      // create Modal
      renderTodo(id, todo);
      renderAlert(singleTodoAlertDOM, '');

      const editModalDOM = document.querySelector('#edit-modal');
      const editTodoContentDOM = document.querySelector('.todo-edit-content');
      const completedCheckedDOM = document.querySelector(
        '.todo-edit-completed'
      );
      const modalAlertDOM = document.querySelector('#modal-alert');
      const editModalSendBtn = document.querySelector('#edit-modal-send');

      // ?????? btn State control
      btnIsDisabled = false;
      // ?????? all btns disablrd attribute
      setBtnDisabledState(btnIsDisabled);

      // ?????? modal
      editModalDOM.addEventListener('click', async (e) => {
        const target = e.target.id;
        // ????????????
        if (target === 'edit-modal-close') {
          editModalDOM.remove();
          return;
        }
        // ??????checkbox ??????????????????
        if (target === 'todo-edit-complelted') {
          completedCheckedDOM.value = completedCheckedDOM.checked;
        }
        // ????????????
        if (target === 'edit-modal-send') {
          editModalSendBtn.setAttribute('disabled', '');
          // resder modal alert
          renderAlert(modalAlertDOM, "<i class='bi bi-arrow-clockwise'>");
          // ???????????????
          const todoContent = editTodoContentDOM.value;
          // ?????? todo ?????? render alert
          if (!todoContent) {
            renderAlert(
              modalAlertDOM,
              "<p class='text-danger'>???????????????????????????</p>"
            );
            setTimeout(() => {
              renderAlert(modalAlertDOM, '');
              editModalSendBtn.removeAttribute('disabled');
            }, 3000);
            return;
          }
          try {
            // ?????? ??????????????????
            await editTodo(id, {
              completed: completedCheckedDOM.checked,
              todo: todoContent,
            });
            editModalDOM.remove();
            renderAlert(
              singleTodoAlertDOM,
              "<p class='text-info'>????????? todo!</p>"
            );
            showTodos();
          } catch (err) {
            // ????????????????????????
            renderAlert(
              modalAlertDOM,
              "<p class='text-danger'>?????????????????????????????????!</p>"
            );
            console.log(err);
          }
        }
      });
    } catch (err) {
      // ?????? ?????? todo ??????????????????
      renderAlert(
        singleTodoAlertDOM,
        "<p class='text-danger'>?????????????????????????????????!</p>"
      );
      console.log(err);
      setTimeout(() => {
        renderAlert(singleTodoAlertDOM, '');
        // ?????? btn State control
        btnIsDisabled = false;
        // ?????? all btns disablrd attribute
        setBtnDisabledState(btnIsDisabled);
      }, 3000);
    }
  }
});

formAddBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  // ?????? all btns disablrd return
  if (btnIsDisabled) {
    return;
  }
  // ?????? btn State control
  btnIsDisabled = true;
  // ?????? all btns disablrd attribute
  setBtnDisabledState(btnIsDisabled);
  // alert loading
  renderAlert(formAlertDOM, "<i class='bi bi-arrow-clockwise'>");

  // input empty return
  if (!formTodoContentDOM.value) {
    renderAlert(formAlertDOM, "<p class='text-danger'>???????????????????????????</p>");
    setTimeout(() => {
      renderAlert(formAlertDOM, '');
      btnIsDisabled = false;
      // ?????? all btns disablrd attribute
      setBtnDisabledState(btnIsDisabled);
    }, 3000);
    return;
  }
  try {
    // add todo
    await addTodo({
      todo: formTodoContentDOM.value,
    });
    // init form
    formTodoContentDOM.value = '';
    //  render form alert
    renderAlert(formAlertDOM, "<p class='text-info'>???????????? Todo!</p>");
    // show todos
    showTodos();
  } catch (err) {
    renderAlert(
      formAlertDOM,
      "<p class='text-danger'>?????????????????????????????????!</p>"
    );
    console.log(err);
  }
  setTimeout(() => {
    renderAlert(formAlertDOM, '');
    // ?????? btn State control
    btnIsDisabled = false;
    // ?????? all btns disablrd attribute
    setBtnDisabledState(btnIsDisabled);
  }, 3000);
});

function setBtnDisabledState(state) {
  // ?????? btn nodeList array
  let btnBOMs = Array.from(document.querySelectorAll('.btn'));
  // change btn disaabled attribute
  state
    ? btnBOMs.forEach((doms) => {
        doms.setAttribute('disabled', '');
      })
    : btnBOMs.forEach((doms) => {
        doms.removeAttribute('disabled');
      });
}

function renderAlert(dom, message) {
  dom.innerHTML = message;
}

async function init() {
  // render todoList alert
  renderAlert(todoListDOM, "<i class='bi bi-arrow-clockwise'>");
  try {
    let { data, success } = await http.get(`${api}/api/todo`);
    if (success) {
      if (!data) {
        return;
      }
      renderAlert(todoListDOM, "");
      renderTodos(data);
    }
  } catch (err) {
    console.log(err);
  }
}

init();
