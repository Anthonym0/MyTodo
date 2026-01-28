
const cards = {
    1: { 
        title: "Liste Principale", 
        todos: [ 
            { name: "salut" }, 
            { name: "test" },
            { name: "test" },
            { name: "test" },
        ] 
    },
    2: {
        title: "Liste Secondaire",
        todos: [
            { name: "Acheter du pain" }
        ]
    }
};

function LoadCards() {
    const wrapper = document.getElementById('wrapper');

    for (const id in cards) {
        const card = cards[id];

        const div = document.createElement('div');
        div.className = 'card'; 
        const title = document.createElement('h1');
        title.classList.add('ml-2');
        title.id = 'title';
        title.textContent = card.title;
        div.appendChild(title);

        const card_content = document.createElement('div');
        card_content.className = 'card-content';
        div.appendChild(card_content);

            
        for (const todo of card.todos) {
            const btn_todo = document.createElement('button');
            btn_todo.className = 'button btn-card mt-3'; 
            btn_todo.textContent = todo.name;
            
            card_content.appendChild(btn_todo);
        }

        const btn_addnew = document.createElement('button');
        btn_addnew.className = 'button btn-card mt-3 addnewtodo'; 
        btn_addnew.textContent = "Add new todo";
        card_content.appendChild(btn_addnew);

        wrapper.appendChild(div);
    }
}


document.addEventListener('DOMContentLoaded', (e) => {
  LoadCards();

  const AddNewTodo = document.getElementById('addnewtodo');
  AddNewTodo.addEventListener('click', () => {
    
  });
});