const saved = document.getElementById("saved-notes");
const contain = document.getElementById("written");
const Note = document.getElementById("theNote");
const save = document.getElementById("save");

let notes = [];
let theIndex = 0;

contain.addEventListener('submit',function(e){
    console.log("clicked");
    e.preventDefault();
    const n = Note.value.trim();
    if(n==='') return;
    if (n !== ''){
        notes.push(n);
       listNote();
       saveToStorage();
    }
    Note.value='';
    document.querySelectorAll('#saved-notes li').forEach(item => item.classList.remove('selected'));
})

save.addEventListener('click', function(e){
    console.log("clicked " + theIndex);
    e.preventDefault();
    const n = Note.value.trim();
    if (n !== ''){
     
    notes[theIndex] = n;
    listNote();
    }
})

function listNote(){
    saved.innerHTML='';
    
    save.disabled = true;
    notes.forEach((n, index) => {
        const preview = n.length > 20 ? n.substring(0,19) + '...':n;


        const li = document.createElement('li')

        li.innerHTML = `
            <span class='note-preview'> ${preview}<span>
            <button class = 'deleteButton' data-index="${index}"> <i class="fa-solid fa-trash-can"></i> <button>
        `;

        li.addEventListener('click',() => {
            Note.value=n;
            document.querySelectorAll('#saved-notes li').forEach(item => item.classList.remove('selected'));
            li.classList.add('selected');
            save.disabled = false;
            theIndex=index;

        })
        saved.appendChild(li);

        li.querySelector('.deleteButton').addEventListener('click', function(e) {
            e.stopPropagation();
            notes.splice(index,1);
            saveToStorage();
            listNote();
            Note.value='';

        })


    })

}

function saveToStorage(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadFromStorage(){
    const stored = localStorage.getItem('notes');
    if (stored){
        notes = JSON.parse(stored);
        listNote();
    }
}

loadFromStorage();