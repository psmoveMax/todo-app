(function() {
    // создаем и возвращаем заголовок приложения
    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    // создаем и возвращаем форму для создания дела
    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        button.classList.add('btn', 'btn-primary');
        button.disabled = true;
        console.log(button);
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }


    function createTodoItem(obj,id_number) {
        let item = document.createElement('li');

        // кнопки помещаем в элемент, который в одной группе

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //устанавливаем стили для элемента списка, а также для размещения кнопок в его правой части с помощью флекс
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;
        item.setAttribute('id',id_number );
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn','btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        // приложению даем доступ к самому элементу и кнопкам, чтобы обрабатывались события нажатия
        return {
            item,
            doneButton,
            deleteButton
        };
    }

    // создаем и возвращаем список элементов
    function createTodoList(){
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }


    function createTodoApp(container, title ='Список дел') {
  

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();


        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);


        let button = document.getElementsByClassName('btn');
        
        let id_number = 0;
        let obj = [];

        todoItemForm.form.addEventListener('input', function(e) {

            e.preventDefault();

            if (!todoItemForm.input.value) {
                button[0].disabled = true;
            }else{
                button[0].disabled = false;
            }
           

    

        });


        

        //браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
            // эта строчка необходима, чтобы предотвратить действия браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();


            // игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }   


            console.log('Всего было: '+id_number);

  




             obj[id_number] = {
                "id": id_number,
                "name": todoItemForm.input.value,
                "done": false
            };


            let todoItem = createTodoItem(obj[id_number],id_number);

            id_number = id_number + 1;
            console.log(id_number);
            console.log(obj);


            //добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
            });

            todoItem.deleteButton.addEventListener('click', function(){
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    console.log(todoItem.item);     
                    delete obj[todoItem.item.id];
                }
            });
            console.log(todoItem.item.id);     

            //создаем и добавляем в список дел новое дело с названием из поля для ввода
            todoList.append(todoItem.item);


            //обнуляем значение в поле, чтобы не пришлось стирать вручную
            todoItemForm.input.value = '';
        });
    }


    window.createTodoApp = createTodoApp;
})();