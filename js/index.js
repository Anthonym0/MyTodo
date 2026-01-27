
const cards = {
  1: { name: "test", todos: { name: "salut" } },
  2: { name: "test", todos: { name: "salut" } },
  3: { name: "test", todos: { name: "salut" } },
  4: { name: "test", todos: { name: "salut" } },
};




document.addEventListener('DOMContentLoaded', (e) => {
    for (const id in cards) {
        const card = cards[id];

        const div = document.createElement('div');
        div.classList = 'container ml-5';
        div.id = 'card';
        
        document.appendChild(div);
    }
});