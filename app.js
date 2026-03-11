// kaapataan Queryselectorilla elementit HTML puolelta, jotta päässään niihin kiinni JS:llä
// käytetään CONSTIA, koska nämä eivät vaihdu, joten LETiä ei tarvitse

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');

//Luodaan TYHJÄ Array/lista jonne tallennetaan kaikki todo:t 
let allTodos = [];

//Lisätään kuuntelija, joka aktivoituu submittia(ADD-BUTTON) painamalla
//Ja toteuttaa annetun funktion
todoForm.addEventListener('submit', function(e){
    //PreventDefault estää, että sivu päivittyy heti submittin jälkeen
    e.preventDefault();
    addTodo();
})


//Functio jolla lisätään todo:t arrayhin
function addTodo(){
    //trim metodi poistaa turhat 'tyhjät', esim.'        jees' > 'jees'
    //todoInput.valua nappaa kiinni input kentän tekstiin
    const todoText = todoInput.value.trim;
    alert(todoText);
}