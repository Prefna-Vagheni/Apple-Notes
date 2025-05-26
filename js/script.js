'use strict';

const notesContainer = document.querySelector('.notes-container');
const addNote = document.querySelector('.add-note');
const searchNote = document.querySelector('.search-bar');
const editTheList = document.querySelector('.edit');
const createNote = document.querySelector('.create-note');
const searchWithVoice = document.querySelector('.fa-microphone');
const textarea = document.querySelector('textarea');
const submitBtn = document.querySelector('.done');

let keyPressed;
let fileTitle;

document.querySelector('.year').textContent = new Date().getFullYear();

let lineForTitle;
let plainText;
let textValue;
let currentlyEditinfgNoteId;

const addNoteToDom = function (note) {
  toggleNewNotePage('add');
  const html = `
    <article class="added-note w-full" data-id="${note.id}">
     <h4 class="note-heading">${note.title}</h4>
     <article class="paragraph d-flex overflow-hidden">
       <p class="creation-date">${note.date}</p>
       <p class="text">${note.body}</p>
     </article>
    </article>
    `;
  notesContainer.insertAdjacentHTML('afterbegin', html);
};

console.log(Date.now(), new Date('2025-05-21T15:30:00').getTime());

const formatDate = function (dateInput) {
  const now = Date.now();
  const then = new Date(dateInput).getTime();

  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMin < 60) return `${diffMin} min${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHours < 24)
    return `${diffHours} min${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDay < 60) return `${diffDay} min${diffDay !== 1 ? 's' : ''} ago`;

  const rawDate = new Date();
  const day = String(rawDate.getDate()).padStart(2, '0');
  const month = String(rawDate.getUTCMonth() + 1).padStart(2, '0');
  const year = rawDate.getFullYear();

  const dateStamp = `${day}/${month}/${year}`;

  return dateStamp;
};

const toggleNewNotePage = function (param) {
  return param === 'add'
    ? createNote.classList.add('hidden')
    : createNote.classList.remove('hidden');
};

// Add a new note
const addNewNote = function () {
  const fieldValue = textarea.value.split('\n');
  const headline = fieldValue[0];
  const remaingText = fieldValue.slice(1).join(' ');

  if (!headline && !remaingText) return toggleNewNotePage('add');

  const noteObject = {
    id: Date.now(),
    title: headline,
    body: remaingText,
    date: formatDate(),
  };

  // Save data to local Storage
  const saveToLocalStorage = JSON.parse(localStorage.getItem('notes')) || [];
  saveToLocalStorage.push(noteObject);
  localStorage.setItem('notes', JSON.stringify(saveToLocalStorage));

  textarea.value = '';

  addNoteToDom(noteObject);

  notesContainer.classList.remove('hidden');
};

// Edit a single note
const editNote = function (e) {
  if (!e.target.classList.contains('edit-single-note')) return;

  const noteElement = e.target.closest('.added-note');
  const noteId = +noteElement.dataset.id;

  const savedNote = JSON.parse(localStorage.getItem('notes')) || [];
  const noteToEdit = savedNotes.find((note) => note.id === noteId);

  if (!noteToEdit) return;

  textarea.value = `${noteToEdit.title}\n${noteToEdit.body}`;

  currentlyEditinfgNoteId = noteId;

  toggleNewNotePage('remove');
};

// Delete a single note from DOM and localStorage.
const removeNote = function (e) {
  const card = e.target.closest('.added-note');
  const noteId = +card.dataset.id;

  if (!e.target.closest('.added-note').classList.contains('added-note')) return;

  card.remove();

  let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes = savedNotes.filter((note) => note.id !== noteId);
  localStorage.setItem('notes', JSON.stringify(savedNotes));

  console.log(savedNotes);
};

addNote.addEventListener('click', () => {
  toggleNewNotePage('remove');
});

window.addEventListener('DOMContentLoaded', () => {
  const storedNote = JSON.parse(localStorage.getItem('notes')) || [];
  storedNote.forEach((note) => addNoteToDom(note));

  if (storedNote.length > 0) notesContainer.classList.remove('hidden');
});

document.querySelector('.back-to-list').addEventListener('click', () => {
  toggleNewNotePage('add');

  addNewNote();
});

submitBtn.addEventListener('click', () => {
  addNewNote();
});

// Share file
document.querySelector('.share-btn').addEventListener('click', function () {
  const title = document.querySelector('h1');
  const body = document.querySelector('section');

  navigator.share?.({
    title: title.textContent,
    text: body.textContent,
  }) ?? alert('Nothing to be shared.');
});

// Event listener to delete an item from the localStorage
notesContainer.addEventListener('click', removeNote);

//Delete file
document.querySelector('.delete-btn').addEventListener('click', () => {
  textarea.value = '';
  toggleNewNotePage('add');
});
