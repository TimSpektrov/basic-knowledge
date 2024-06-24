    let input;
    let button;
    let todoSavedAllList = localStorage.getItem('todos') ? JSON.parse(localStorage.todos) : [];

// создаём и возвращаем заголовок приложения
function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}


// создаём и возвращаем форму для создания дела
function createTodoItemForm() {
    // создание элементов
    let form = document.createElement('form');
    input = document.createElement('input');
    button = document.createElement('button');

    // создание атрибутов
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    button.classList.add('btn', 'btn-primary')
    button.textContent = 'Добавить дело';
    button.setAttribute('disabled', '');

    // объединение элементов в единую структуру
    // buttonWrapper.append(button);
    form.append(input);
    form.append(button)
    return form
}

// создаём и возвращаем список элементов
function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    todoSavedAllList.forEach(item => {

        list.append(createTodoItem(item).item)
    })
    return list;
}

// функция создания дела
function createTodoItem({name, done, id}) {
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажетих в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили дляэлементов списка, а также для размещения кнопок в егоправой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'aling-items-center');
    if (done) {
        item.classList.add('list-group-item-success')
    }
    item.textContent = name;
    item.id = id;
    console.log(id)
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    // Вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    console.log(todoSavedAllList);
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // добавляем обработчики на кнопки
    doneButton.addEventListener('click', function() {
        item.classList.toggle('list-group-item-success');
        console.log(item.id)
        let index = todoSavedAllList.findIndex(el => el.id === item.id)
        todoSavedAllList[index].done = !todoSavedAllList[index].done
        saveList(todoSavedAllList)
    });

    deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
            item.remove();
            saveList(todoSavedAllList.filter(elem => elem.id !== item.id))
        }
    });

    // Приложению нужен доступ к самому элементу и к кнопкам, чтобы обрабатывать события нажатия
    return {
        item,
        doneButton,
        deleteButton,
    };
}

function getDisablesButton() {
    if (input.value) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

function saveList(newArr) {
    localStorage.setItem('todos', JSON.stringify(newArr))
    todoSavedAllList = [...newArr]
}

let container = document.getElementById('todo-app');
let todoAppTitle = createAppTitle('Список дел');
let todoItemForm = createTodoItemForm();
let todoList = createTodoList();

container.append(todoAppTitle);
container.append(todoItemForm);
container.append(todoList);
// todoList.append(todoItems[0].item);//
// todoList.append(todoItems[1].item);//

// браузер создаёт событие submit на форме по нажатию Enter или на кнопку создания дела
button.addEventListener('click', function(e) {
    e.preventDefault();

    let id = String(Date.now())
    let newItem = {name: input.value, id,  done: false}
    saveList([...todoSavedAllList, newItem])
    let todoItem = createTodoItem(newItem);

    // Создаём и добавляем в список новое дело с названием из поля для ввода
    todoList.append(todoItem.item);

    // обнуляем значение в поле, чтобы не пришлось стирать вручную
    todoList.append(todoItem.item);
    input.value = '';
    getDisablesButton();
});

input.addEventListener('input', () => {
    getDisablesButton();
});

