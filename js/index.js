
const cards = {
  1: { title: "test", todos: { name: "salut" } },
  2: { title: "test", todos: { name: "salut" } },
  3: { title: "test", todos: { name: "salut" } },
  4: { title: "test", todos: { name: "salut" } },
};


                // <div class="card">
                //     <h1 class="ml-2" id="title">TITLE CARD</h1>
                //     <div class="card-content">
                //         <button class="button btn-card mt-3">TITLE TODO</button>
                //         <button class="button btn-card mt-3">ADD NEW CARD</button>
                //     </div>
                // </div>

document.addEventListener('DOMContentLoaded', (e) => {
    for (const id in cards) {
        const card = cards[id];

        const div = document.createElement('div');
        div.classList = 'card';

        const title = document.createElement('h1');
        title.classList = 'ml-2';
        title.id = 'title';
        title.textContent = cards[id].title;
        div.appendChild(title);

        const card_content = document.createElement('div');
        card_content.classList = 'card-content';
        div.appendChild(card_content);

        const btn_card = document.createElement('button');
        btn_card.classList = 'button btn-card mt-3';
        btn_card.textContent = cards[id].title;
        card_content.appendChild(btn_card);

        const wrapper = document.getElementById('wrapper');
        wrapper.appendChild(div);
    }
});