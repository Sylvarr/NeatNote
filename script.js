const newNoteButton = document.querySelector(".controls_new_note");
const notesContainer = document.querySelector(".notes_container");
const modal = document.querySelector(".modal");
const invisiblePanel = document.querySelector(".invisible_panel");
const cancelButton = document.getElementById("cancelButton");
const saveButton = document.getElementById("saveButton");
const title = document.getElementById("title");
const message = document.getElementById("message");
const closeNote = document.querySelector(".opened_notes_note_button");
const openedNotes = document.querySelector(".opened_notes ");
const openedNotesTitle = document.querySelector(".opened_notes_note_title");
const openedNotesContent = document.querySelector(".opened_notes_note_content");
const openedNotesDate = document.querySelector(".opened_notes_note_date");

let noteArray = [];

class Note {
  static nextId = 1;
  constructor(title, message) {
    this.title = title.value;
    this.message = message.value;
    this.id = Note.nextId;
    Note.nextId++;
    this.date = moment().format("MMMM Do YYYY");
  }
}

function toggleVisible() {
  modal.classList.toggle("visible");
  invisiblePanel.classList.toggle("visible_panel");
}

function notesVisible() {
  openedNotes.classList.toggle("visible");
}

function createNote(title, message, date) {
  let noteContainer = document.createElement("div");
  noteContainer.classList.add("notes_container_note");
  notesContainer.appendChild(noteContainer);

  noteContainer.addEventListener("click", () => {
    openNote(title, message, date);
    notesVisible();
  });

  let noteTitle = document.createElement("h2");
  noteTitle.className = "notes_container_note_title";
  noteContainer.appendChild(noteTitle);
  noteTitle.textContent = title;

  let noteMessage = document.createElement("p");
  noteMessage.classList.add("notes_container_note_body");
  noteContainer.appendChild(noteMessage);
  noteMessage.textContent = message;

  let noteDate = document.createElement("p");
  noteDate.classList.add("notes_container_note_date");
  noteContainer.appendChild(noteDate);
  noteDate.textContent = date;
}

function openNote(title, message, date) {
  openedNotesTitle.textContent = title;
  openedNotesContent.textContent = message;
  openedNotesDate.textContent = date;
}

function clearInput() {
  title.value = "";
  message.value = "";
}

function loadNotes() {
  let storedNotes = JSON.parse(localStorage.getItem("notes"));
  if (storedNotes) {
    noteArray = storedNotes;
    if (storedNotes.length > 0) {
      Note.nextId = storedNotes[storedNotes.length - 1].id + 1;
    }
    storedNotes.forEach((note) => {
      createNote(note.title, note.message, note.date);
    });
  }
}

document.addEventListener("DOMContentLoaded", loadNotes);

newNoteButton.addEventListener("click", () => {
  toggleVisible();
});

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

invisiblePanel.addEventListener("click", () => {
  toggleVisible();
});

cancelButton.addEventListener("click", (e) => {
  toggleVisible();
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  let newNote = new Note(title, message);
  noteArray.push(newNote);
  createNote(newNote.title, newNote.message, newNote.date);
  localStorage.setItem("notes", JSON.stringify(noteArray));
  clearInput();
  toggleVisible();
});

closeNote.addEventListener("click", () => {
  openedNotes.classList.toggle("visible");
});
