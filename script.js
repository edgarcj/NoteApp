//Se toma boton añadir
const addBtn = document.getElementById("add");
//Se almacenan notas localmente como  notes
const notes = JSON.parse(localStorage.getItem("notes"));
//Si hay notas por c/u se ejecuta addNewNote con la nota correspondiente
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}
//Evento click que añade nota nueva llamando a la función addNewNote
addBtn.addEventListener("click", () => {
  addNewNote();
});
//Función principal para añadir nota
function addNewNote(text = "") {
  //se crea elemento div
  const note = document.createElement("div");
  //Se añade a lista de clases con nombre note
  note.classList.add("note");
  //Se aplica el HTML a note
  note.innerHTML = `
    <div class="notes">
      <div class="tools">
        <button class="edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="main ${text ? "hidden" : ""}"></textarea>
    </div>`;
  //Selector de Botón editar
  const editBtn = note.querySelector(".edit");
  //Selector de Botón eliminar
  const deleteBtn = note.querySelector(".delete");
  //Selector de area principal
  const main = note.querySelector(".main");
  //Selector de area de texto
  const textArea = note.querySelector("textarea");
  //Evento editar que oculta o muestra nota marcada
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  //Valor del texto
  textArea.value = text;
  //Se guarda texto en area principal
  main.innerHTML = marked(text);
  //borrar nota
  deleteBtn.addEventListener("click", () => {
    note.remove();
  });
  //Evento que guarda valor del input en area de texto
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);
    //Función de actualización
    updateLS();
  });
  //agrega nota como hijo de body
  document.body.appendChild(note);
}
//Función de actualización
function updateLS() {
  //Constante con selector del texto de todas las notas
  const notesText = document.querySelectorAll("textarea");
  //Se crea notes como un arreglo
  const notes = [];
  //Por cada iteración-note-valor, de la consulta de selectores text area, se añade a un arreglo
  notesText.forEach((note) => {
    notes.push(note.value);
  });
  //se almacena localmente y se muestra item notes
  localStorage.setItem("notes", JSON.stringify(notes));
}
