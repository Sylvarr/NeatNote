const newNoteButton = document.getElementById("new_note_button");
const deleteNoteButton = document.getElementById("delete_note_button");
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
const deleteButton = document.getElementById("delete_note_button");

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

  let noteBundle = document.createElement("div");
  noteBundle.classList.add("notes_container_bundle");
  noteContainer.appendChild(noteBundle);

  noteContainer.addEventListener("click", () => {
    openNote(title, message, date);
    notesVisible();
  });

  let noteTitle = document.createElement("h2");
  noteTitle.classList.add("notes_container_note_title");
  noteBundle.appendChild(noteTitle);
  noteTitle.textContent = title;

  let closeButton = document.createElement("span");
  closeButton.classList.add("notes_container_close");
  noteBundle.appendChild(closeButton);
  closeButton.textContent = "X";
  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    noteContainer.remove();
  });

  let deleteNoteButton = document.createElement("span");
  deleteNoteButton.className = "notes_container_close";

  let noteMessage = document.createElement("p");
  noteMessage.classList.add("notes_container_note_body");
  noteContainer.appendChild(noteMessage);
  noteMessage.textContent = message;

  let noteDate = document.createElement("p");
  noteDate.classList.add("notes_container_note_date");
  noteContainer.appendChild(noteDate);
  noteDate.textContent = date;
}

function toggleCloseButtons() {
  document
    .querySelectorAll(".notes_container_close")
    .forEach(function (closeButton) {
      closeButton.classList.toggle("visible");
    });
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

newNoteButton.addEventListener("click", toggleVisible);

deleteButton.addEventListener("click", toggleCloseButtons);

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

invisiblePanel.addEventListener("click", toggleVisible);

cancelButton.addEventListener("click", toggleVisible);

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
