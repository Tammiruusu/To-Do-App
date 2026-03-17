//NOTES JAVASCRIPT OSUUS

//Muistiinpano Array, johon tallennetaan muistiinpano Localia käyttäen
let notes = [];


function saveNote(event) {

    //Estää, kun submit buttonia painetaan, että sivu ei lataudu uudestaan
    event.preventDefault()

    //Napattiin otsikko ja muistiinpano tekstit, tarvitaan .value jotta
    //saadaan input kentän tekstit itsellemme. Trim taas poistaa turhat 
    //välilyönnit
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    //Käytetään aiemmin luotua Arrayta ja lisätään muistiinpanot sinne objekteina
    //unshiftillä saamme lyötyä objektit listaan aina kun uusia lisätään
    //käytetään aiemmin napattuja arvoja TITLE ja CONTENT, generateID luodaan myöhemmin
    notes.unshift({
        id: generateId(),
        title: title,
        content: content
    });

    //Kutsutaan funktiota SaveNotes, joka tallentaa ne JSON tiedostona LOCALSTORAGEEN
    saveNotes()

}

//Luo ID:n päivämäärän mukaan, to string muuttaa sen merkkijonoksi, jotta helpompi
//Tallentaa takaisin objektiin
function generateId() {
    return Date.now().toString()
};


//tallentaan meidän lista merkkijonona, stringify tarvitaan, koska ollaan
//annettu ne objekteina ja LocalStorageen voi tallentaa ne vain merkkijonona
function saveNotes() {
    localStorage.setItem('quickNotes', JSON.stringify(notes))
}





//Funktio joka avaa muistiinpanot
function openNoteDialog() {
    //Elementit kaapattu ID:n kautta Notes.html:stä
    const dialog = document.getElementById('noteDialog');
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');

    //avaa dialogi/muistiinpano ikkunan
    dialog.showModal();
    titleInput.focus();

};

//Muistiinpano sulku ikkuna
function closeNoteDialog() {
    //Kaapattu Notedialog ID jotta se voidaan sulkea
    document.getElementById('noteDialog').close()

};


//Tärkein Eventlistener, se odottaa, että kaikki pää elementit on ladattu
//Ja sillä saadaan suljettua Muistiinpano ikkuna, kun klikataan ikkunan
//ulkopuolelle, sekä submit tapahtuma
document.addEventListener('DOMContentLoaded', function() {

    //Tallentaa Muistiinpanot, odottaa Submit napin toimintaa
    document.getElementById('noteForm').addEventListener('submit', saveNote);

    //Suljetaan notedialog käyttäen kuuntelijaa, jos klikataan muualle kuin Event.targetiin,
    //funktio käyttää closeNoteDialog funktiota ja sulkee Muistiinpano ikkunan
    document.getElementById('noteDialog').addEventListener('click', function(event) {
        if(event.target === this) {
            closeNoteDialog()
        }
    });
});