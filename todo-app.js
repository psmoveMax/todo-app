(function () {
  // случайное число от min до (max+1)
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    button.classList.add("btn", "btn-primary");
    button.disabled = true;

    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoItem(obj, id_number) {
    let item = document.createElement("li");

    // кнопки помещаем в элемент, который в одной группе

    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    //устанавливаем стили для элемента списка, а также для размещения кнопок в его правой части с помощью флекс
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    item.textContent = obj.name;
    item.setAttribute("id", id_number);
    buttonGroup.classList.add("btn-group", "btn-group-sm");
    if (obj.done == true) {
      item.classList.add("list-group-item-success");
    } else {
    }
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению даем доступ к самому элементу и кнопкам, чтобы обрабатывались события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoApp(container, title, listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let button = document.getElementsByClassName("btn");
    if (
      localStorage.getItem(listName) == null ||
      localStorage.getItem(listName).length == 0 ||
      localStorage.getItem(listName) == "undefined"
    ) {
      var obj = [];
      localStorage.setItem(listName, JSON.stringify(obj));
      console.log("new");
    } else {
      var obj = JSON.parse(window.localStorage[listName]);

      for (let i = 0; i < obj.length; i++) {

        let todoItem = createTodoItem(obj[i], obj[i].id);

        //добавляем обработчики на кнопки
        todoItem.doneButton.addEventListener("click", function () {
          todoItem.item.classList.toggle("list-group-item-success");


          if (todoItem.item.classList.contains("list-group-item-success")) {
            obj[i].done = true;
          } else {
            obj[i].done = false;
          }

          localStorage.setItem(listName, JSON.stringify(obj));
        });

        todoItem.deleteButton.addEventListener("click", function () {
          if (confirm("Вы уверены?")) {
            todoItem.item.remove();

            var indexObj;
            for (var i = 0; i < obj.length; i++) {
              if (obj[i].id == todoItem.item.id) {
                indexObj = i;
                break;
              }
            }
            obj.splice(indexObj, 1);
            localStorage.setItem(listName, JSON.stringify(obj));
          }


          localStorage.setItem(listName, JSON.stringify(obj));
        });
        todoList.append(todoItem.item);
      }
    }

    todoItemForm.form.addEventListener("input", function (e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        button[0].disabled = true;
      } else {
        button[0].disabled = false;
      }
    });

    //браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
    todoItemForm.form.addEventListener("submit", function (e) {
      // эта строчка необходима, чтобы предотвратить действия браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      let id_number = randomInteger(1, 10000);

      let length_obj = obj.length;
      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      obj[length_obj] = {
        id: id_number,
        name: todoItemForm.input.value,
        done: false,
      };

      localStorage.setItem(listName, JSON.stringify(obj));

      let todoItem = createTodoItem(obj[length_obj], id_number);

      //добавляем обработчики на кнопки
      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");


        if (todoItem.item.classList.contains("list-group-item-success")) {
          obj[length_obj].done = true;
        } else {
          obj[length_obj].done = false;
        }

        localStorage.setItem(listName, JSON.stringify(obj));
      });

      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();

          var indexObj;
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].id == todoItem.item.id) {
              indexObj = i;
              break;
            }
          }
          obj.splice(indexObj, 1);
          localStorage.setItem(listName, JSON.stringify(obj));
        }


        localStorage.setItem(listName, JSON.stringify(obj));
      });

      //создаем и добавляем в список дел новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      //обнуляем значение в поле, чтобы не пришлось стирать вручную
      todoItemForm.input.value = "";
    });
  }

  window.createTodoApp = createTodoApp;
})();
