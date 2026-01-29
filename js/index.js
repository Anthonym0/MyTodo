const cards = {
    1: { 
        title: "Liste Principale", 
        todos: [] 
    },
    2: {
        title: "Liste Secondaire",
        todos: [
            { title: "Acheter du pain", description: "" }
        ]
    }
};

function LoadCards() {
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = "";

    for (const id in cards) {
        const card = cards[id];

        const div = document.createElement('div');
        div.className = 'card'; 
        div.id = id;

        const title = document.createElement('h1');
        title.classList.add('ml-2');
        title.textContent = card.title;
        div.appendChild(title);

        const card_content = document.createElement('div');
        card_content.className = 'card-content';
        div.appendChild(card_content);

            
        for (const todo of card.todos) {
            const btn_todo = document.createElement('div'); 
            btn_todo.className = 'button btn-card mt-3 is-flex is-justify-content-space-between is-align-items-center'; 
            btn_todo.id = card.todos.indexOf(todo);

            const todoTitle = document.createElement('span');
            todoTitle.textContent = todo.title;
            btn_todo.appendChild(todoTitle);

            const deletebtn = document.createElement('button');
            deletebtn.className = 'button is-danger is-small actionbtn'; 
            
            const span = document.createElement('span');
            span.className = 'icon'; 
            
            const i = document.createElement('i');
            i.className = 'fa-solid fa-trash'; 
            
            span.appendChild(i);
            deletebtn.appendChild(span);
            btn_todo.appendChild(deletebtn);

            deletebtn.addEventListener('click', (e) => {
                deleteTodo(div.id, btn_todo.id);
            });

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

function deleteTodo(index_card, index_todo) {
    cards[index_card].todos.splice(index_todo, 1);
    LoadCards();
}

function saveTodo(data) {
    cards[data.id].todos.push(data)
    LoadCards();
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
                data.description = document.getElementById('addtodo_title_input').value,
            ];
        }
    });

    if (formValues) {
        Swal.fire({
            title: "Success",
            text: "Your todo has been successfully saved.",
            icon: "success",
            draggable: true,
            backdrop: false,
        });

        saveTodo(data);
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
  LoadCards();





  
});