//inizializzo gli elementi
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//nomi delle classi di font
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variabili
let LIST, id;

//local storage
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//data di oggi
const opstions = {weekday:"short", month:"long", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", opstions);

//funzione: add to do
function addToDo(toDo, id, done, trash){
    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
</li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//aggiungi task usando il tasto invio
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        //controllo se l'input è vuoto
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //ogni volta che faccio un update alla mia lista, devo inserire questa riga di codice per salvarlo nel local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
})


//tasks completati
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;

} 


//rimuovi task
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//funzione cancella tutto
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

//targettare gli item creati in modo dinamico
list.addEventListener("click", function(event){
    const element = event.target; //mi ritorna l'elemento cliccato all'interno della lista
    const elementJob = element.attributes.job.value; //complete oppure delete
    if(elementJob  == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //ogni volta che faccio un update alla mia lista, devo inserire questa riga di codice per salvarlo nel local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

