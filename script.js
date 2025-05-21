const saved = document.getElementById("saved-notes");
const contain = document.getElementById("written");
const Note = document.getElementById("theNote");

let notes=[];

contain.addEventListener('submit',function(e){
    console.log("clicked");
    e.preventDefault();
    const n = Note.value.trim();
    if (n !== ''){
        notes.push(n);
       listNote();
    }
})

function listNote(){
    saved.innerHTML='';
    notes.forEach((n, index) => {
        const preview = n.substring(0,9);

        const li = document.createElement('li')
        li.innerHTML=`<a href=#><div><span>${preview}<span></div></a>`
        saved.appendChild(li);


    })

}
