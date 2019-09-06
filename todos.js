//Referenciando Elementos
let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');

//Pegando os dados to storage. Array vazio como valor padrão, caso o JSON esteja vazio
let todos = JSON.parse(localStorage.getItem('list_todo')) || [];

//Função para renderizar os todos
function renderTodos() {
    //Removendo o conteudo do listElement, antes de renderizar novamente
    listElement.innerHTML = '';
    //for of é um tipo de for para percorrer todo um vetor
    for (todo of todos) {
        let todoElement = document.createElement('li');
        let todoText = document.createTextNode(todo);


        //botão excluir todo
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#')
        let linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        //Pegando a posição de um todo
        //Método indexOf permite pegar a pposição de um valor em um array, de acordo com a string passada
        let pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' +
            pos + ')');

        listElement.appendChild(todoElement);
    }
}

renderTodos();

//Função Adcionar Todo
function addTodo() {
    //Pegando o valor do campo de texto em uma variável
    let todoText = inputElement.value;
    //push() adiciona no fim do array
    todos.push(todoText);
    //Limpando o campo de texto
    inputElement.value = '';
    renderTodos();
    saveToStorage();
}
//Chamando a função no clique do botão
buttonElement.onclick = addTodo;

//Remover um todo
function deleteTodo(pos) {
    //método splice remove do array um item de acordo com sua posição
    //Como os items não têm id, teremos que utilizar a posição deles no array para saber qual item especifico iremos excluir
    //remover o item da posição, com a quantidade
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

//LocalStorage salva os todos, mesmo se atualizar a página ou sair do navegador. 
//Função para salvar no Storage
function saveToStorage() {
    //Variavel localStorage acessa o Storage
    localStorage.setItem('list_todo', JSON.stringify(todos));
}