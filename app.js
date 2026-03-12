// kaapataan Queryselectorilla elementit HTML puolelta, jotta päässään niihin kiinni JS:llä
// käytetään CONSTIA, koska nämä eivät vaihdu, joten LETiä ei tarvitse

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

//Luodaan TYHJÄ Array/lista jonne tallennetaan kaikki todo:t 
let allTodos = getTodos();
updateTodoList();

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
    //Kutsutaan todon tallentaja funktiota, jolloin luodut muutokset menevät suoraan
    //LOcal storageen.
    saveTodos();
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

function createTodoItem(todo, todoIndex){
    //luodaan uusi ID perustuen Arrayn indeksiin jokaiselle todo:lle
    //saadaan forEach loopista todoIndex, joka lisää sen jokaiseen IDhen nyt
    const todoId = "todo-"+todoIndex;
    //Luodaan uusi lista elementti, jotta voidaan lisätä todo input kentän tekstit näkyville
    //Create elementin kautta, "li" luo lista itemin
    const todoLI = document.createElement("li");
    //Annetaan listalle luokka TODO, niin se saa CSS:stä muokkaukset jotka teimme
    todoLI.className = "todo"; 
    //``tärkeät, jotta voidaan käyttää useata templatea samaan aikaan
    //Annettu TodoID, jotta jokaiselle todo taskilla oma ID
    //Todo text tille lisätty Todo, jolloin task tulee näkyviin sivulle
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todo}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/>
            </svg>
        </button>
    `
    //Palauttaa lisätyn asian Arrayhin, jolloin muutos tulee näkyviin
    return todoLI;
}

//Tallenetaan tällä funktiolla Todo array LOcal Storageen
//Tai kun tulee muutoksia
function saveTodos(){
    //VAIN Merkkijonoja voi tallentaa LocalStorageen, joten meidän pitää
    //Muuttaa Array merkkijonoksi, muuttamalla tieto Json muotoon
    const todosJson = JSON.stringify(allTodos);
    //Local storage object löytyy suoraan emmeteistä
    //Monta metodia, get, set, remove ja clear
    //Tiedon tallentamiseen käytetään SetItem
    //SetItem haluaa kaksi arvoa, annanmme sille merkkijonon sekä 
    //Arrayn jonka loimme alussa, allTodos, joka on muutettu yllä mainitun 
    //muuttujan kautta nyt merkkijonoksi
    localStorage.setItem("todos", todosJson);
}
//Functiota täytyy kutsua, jotta se aktivoituu
saveTodos();

function getTodos(){
    //Luodaan funktio, jolla kutsutaan todo tiedot esiin 
    //LOcal Storagesta, käytetään metodia getItem
    //KOska ilman tätä tieto ei lataudu local storagesta
    //Luodaan OR rakenne, jotta local storagesta ei palaudu nullia || 
    //Nyt jos "todos" on tyhjä, se tallentaa tyhjän arrayn
    const todos = localStorage.getItem("todos") || "[]";
    //täytyy palauttaa ne oikeaan muotoon, koska nyt ne on tallennettu 
    //Merkkijonoksi Jsonina
    return JSON.parse(todos);
}

