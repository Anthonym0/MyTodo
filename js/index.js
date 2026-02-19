const cards = [
    { 
        title: "Liste Principale", 
        todos: [] 
    },
    {
        title: "Liste Secondaire",
        todos: [{ title: "Acheter du pain", description: "..." }]
    }
];

function deleteTodo(index) {
    cards.splice(index, 1);
    LoadCards();
}

function LoadCards() {
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = "";

    for (const id in cards) {
        const card = cards[id];

        const div = document.createElement('div');
        div.className = 'card'; 
        div.id = id;

        const div_top = document.createElement('div');
        div_top.className = 'is-flex is-justify-content-space-between'; 
        div_top.id = id;

        const title = document.createElement('h1');
        title.classList.add('ml-2');
        title.textContent = card.title;
        title.style.whiteSpace = "nowrap";
        div_top.appendChild(title);

        const deleteCard = document.createElement('button');
        deleteCard.className = 'button is-danger is-small actionbtn';
        deleteCard.style.whiteSpace = "nowrap";
        div_top.appendChild(deleteCard);
        
        const span = document.createElement('span');
        span.className = 'icon'; 
        const i = document.createElement('i');
        i.className = 'fa-solid fa-trash'; 
        
        span.appendChild(i);
        deleteCard.appendChild(span);

        deleteCard.addEventListener('click', () => {
            deleteTodo(div.id);
        });

        div.appendChild(div_top);

        const card_content = document.createElement('div');
        card_content.className = 'card-content';
        div.appendChild(card_content);

            
        for (const todo of card.todos) {
            const btn_todo = document.createElement('div'); 
            btn_todo.className = 'button btn-card mt-3 is-flex is-justify-content-space-between is-align-items-center'; 
            btn_todo.id = card.todos.indexOf(todo);

            const todoTitle = document.createElement('span');
            todoTitle.style.overflow = "hidden";
            todoTitle.style.textOverflow = "ellipsis";
            todoTitle.textContent = todo.title;
            btn_todo.appendChild(todoTitle);

            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'is-flex'; 

            const editbtn = document.createElement('button');
            editbtn.className = 'button is-info is-small actionbtn'; 
            
            const spanedit = document.createElement('span');
            spanedit.className = 'icon'; 
            const iedit = document.createElement('i');
            iedit.className = 'fa-solid fa-pen-to-square'; 
            
            spanedit.appendChild(iedit);
            editbtn.appendChild(spanedit);
            
            editbtn.addEventListener('click', () => {
                editTodo(div.id, btn_todo.id); 
            });

            const deletebtn = document.createElement('button');
            deletebtn.className = 'button is-danger is-small actionbtn'; 
            
            const span = document.createElement('span');
            span.className = 'icon'; 
            const i = document.createElement('i');
            i.className = 'fa-solid fa-trash'; 
            
            span.appendChild(i);
            deletebtn.appendChild(span);

            deletebtn.addEventListener('click', (e) => {
                deleteTask(div.id, btn_todo.id);
            });

            actionsContainer.appendChild(editbtn);
            actionsContainer.appendChild(deletebtn);
            
            btn_todo.appendChild(actionsContainer);
            card_content.appendChild(btn_todo);
        }

        const btn_addnew = document.createElement('button');
        btn_addnew.className = 'button btn-card mt-3 addnewtodo'; 
        btn_addnew.textContent = "Add new todo";
        btn_addnew.id = div.id;
        card_content.appendChild(btn_addnew);

        wrapper.appendChild(div);
    }

    const AddNewTodo = document.getElementsByClassName("addnewtodo");
    for (const btn of AddNewTodo) {
        btn.addEventListener('click', () => {
            addTodoInputs(btn.id);
        })
    }

}

async function editTodo(index_card, index_todo) {
    const data = {
        title: "",
        description: "",
        id: index_card,
    }

    const oldtitle = cards[index_card].todos[index_todo].title;
    const olddescription = cards[index_card].todos[index_todo].description;

    const { value: formValues } = await Swal.fire({
        title: "Edit Todo",
        html: `
            <input id="addtodo_title_input" class="swal2-input" placeholder="Title" value="${oldtitle}">
            <textarea class="swal2-textarea" id="addtodo_description_input" rows="5" placeholder="Description of your task">${olddescription}</textarea>
            `,
            backdrop: false,
            preConfirm: () => {
                return [
                    data.title = document.getElementById('addtodo_title_input').value,
                    data.description = document.getElementById('addtodo_description_input').value,
                ];
            }
        });

    if (formValues) {
        updateTodo(data, index_card, index_todo);

        Swal.fire({
            title: "Success",
            text: "Your todo has been edited.",
            icon: "success",
            backdrop: false,
        });
    }
}

function deleteTask(index_card, index_todo) {
    cards[index_card].todos.splice(index_todo, 1);
    LoadCards();
}

function updateTodo(data, index_card, index_todo) {
    cards[index_card].todos[index_todo].title = data.title;
    cards[index_card].todos[index_todo].description = data.description;
    LoadCards();
}

function saveTodo(data) {
    cards[data.id].todos.push(data)
    LoadCards();
}

function IsEmpty(text) {
    if (!text.trim().length)
        return true;
    return false
}

async function addTodoInputs(id) {
    let data = {
        title: "",
        description: "",
        id: id,
    }

    const { value: formValues } = await Swal.fire({
        title: "Add Todo",
        html: `
            <input id="addtodo_title_input" class="swal2-input" placeholder="Title">
            <textarea class="swal2-textarea" id="addtodo_description_input" rows="5" placeholder="Description of your task"></textarea>
        `,
        backdrop: false,
        focusConfirm: false,
        preConfirm: () => {
            return [
                data.title = document.getElementById('addtodo_title_input').value,
                data.description = document.getElementById('addtodo_description_input').value,
            ];
        }
    });
    
    if (IsEmpty(data.title)) {
        Swal.fire({
            title: "Error",
            text: "You must add a title to your task.",
            icon: "error",
            backdrop: false,
        });
        return;
    }
    if (formValues) {
        Swal.fire({
            title: "Success",
            text: "Your todo has been successfully saved.",
            icon: "success",
                backdrop: false,
        });

        saveTodo(data);
    }
}

async function newCard() {
    let data = {
        title: "",
        todos: [],
    }

    const { value: formValues } = await Swal.fire({
        title: "New card",
        html: `
            <input id="addcard_title_input" class="swal2-input" placeholder="Title">
        `,
        backdrop: false,
        focusConfirm: false,
        preConfirm: () => {
            return [
                data.title = document.getElementById('addcard_title_input').value,
            ];
        }
    });

    if (IsEmpty(data.title)) {
        Swal.fire({
            title: "Error",
            text: "You must add a title to your task.",
            icon: "error",
            backdrop: false,
        });
        return;
    }
    if (formValues) {
        Swal.fire({
            title: "Success",
            text: "Your card has been successfully created.",
            icon: "success",
                backdrop: false,
        });

        cards.push(data);
        LoadCards();
    }

}

document.addEventListener('DOMContentLoaded', () => {
  LoadCards();

  const newCardBtn = document.getElementById('new_card_btn');
  newCardBtn.addEventListener('click', () => {
    newCard();
  });
});