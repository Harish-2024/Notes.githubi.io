const addButton = document.getElementById('btn');

const updateLSData = () =>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    
    textAreaData.forEach((element)=>{
        return notes.push(element.value);
    });
    // console.log(notes);
    localStorage.setItem('Notes',JSON.stringify(notes));


}
// const containers = document.getElementsByClassName('container');
const addNewNote = (text = "") => {
    let Note;

    Note = document.createElement('div');

    Note.classList.add('notes');


    const htmlData = `<div class="operation">
    <button class="delete" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
    <button class="edit" title="Edit"><i class="fa-solid fa-pen-to-square" ></i></button>
</div>
<div class="main ${text ? "" : "hidden"}" ></div>
<textarea class=" ${text ? "hidden" : ""}" cols="23" rows="10"></textarea>`

    Note.insertAdjacentHTML('afterbegin', htmlData)

    // getting the references
    const editButton = Note.querySelector('.edit');
    const deleteButton = Note.querySelector('.delete');
    const mainDiv = Note.querySelector('.main');
    const textarea = Note.querySelector('textarea');

    // deleting the note

    deleteButton.addEventListener('click', () => {
        Note.remove();
        updateLSData();
    });

    // toggle beteween class using edit button
    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })


    document.body.children[2].appendChild(Note);
    


}

// Getting back data from local storage
const gettingNotes = JSON.parse(localStorage.getItem('Notes'));
if(gettingNotes){
    gettingNotes.forEach((Note)=>{
        addNewNote(Note)});
}

addButton.addEventListener('click', () => addNewNote());
