// kaapataan Queryselectorilla elementit HTML puolelta, jotta päässään niihin kiinni JS:llä
// käytetään CONSTIA, koska nämä eivät vaihdu, joten LETiä ei tarvitse

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

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
    const todoText = todoInput.value.trim();
    //Jos input kentässä on enemmän kirjaimia kuin 0, vasta silloin todo lisätään
    //Ylhäällä trim poistaa välilyönnit, joten se ei lasketa 'pituuteen/length'

    if(todoText.length > 0){
    //Käytetään PUSH metodia, jotta voidaan työntää input kentän teksti arrayhin
    allTodos.push(todoText);
    //palauttaa päivitetyn listan, oli sinne lisätty tai poistettu asioita
    updateTodoList();
    //Kun todo lisätty, alla oleva komento tyhjentää kentän, tapahtuu vain jos käyttäjä
    //lisää tekstiä, koska if lausekkeen sisällä
    todoInput.value = "";
    }
}


//päivittää listan/Arrayn kun siihen lisätään jotain tai poistetaan jotain
function updateTodoList(){
    //tyhjentää listan
    todoListUL.innerHTML = "";
    //Käytetään foreach looppia, jotta tuodaan esiin kaikki arrayn itemit näkyviin
    allTodos.forEach((todo, todoIndex)=>{
        //tarvitsee RETURN statementin Createtodo Itemiin, jotta tämä toimii
        todoItem = createTodoItem(todo, todoIndex);
        //Appendilla tuodaan todot näkyviin sivulle
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo){
    //Luodaan uusi lista elementti, jotta voidaan lisätä todo input kentän tekstit näkyville
    //Create elementin kautta, "li" luo lista itemin
    const todoLI = document.createElement("li");
    todoLI.innerHTML = todo;
    //Palauttaa lisätyn asian Arrayhin, jolloin muutos tulee näkyviin
    return todoLI;
}