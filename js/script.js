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

const addNoteToDom = function (note) {
  toggleNewNotePage('add');
  const html = `
    <article class="added-note w-full">
     <h4 class="note-heading">${note.title}</h4>
     <article class="paragraph d-flex overflow-hidden">
       <p class="creation-date">${note.date}</p>
       <p class="text">${note.body}</p>
     </article>
    </article>
    `;
  notesContainer.insertAdjacentHTML('afterbegin', html);
};

const formatDate = function () {
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

const removeNote = function (e) {
  if (!e.taget.classList.contains('added-note')) return;
  console.log(e.target);
  const noteElement = e.target.closest('added-note');
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

// Delete an item from the localStorage
notesContainer.addEventListener('click', (e) => {
  const card = e.target.closest('.added-note');
  const noteId = Number(card.dataset.id);

  if (!e.target.closest('.added-note').classList.contains('added-note')) return;
  card.remove();

  let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes = savedNotes.filter((note) => note.id !== noteId);
  localStorage.setItem('notes', JSON.stringify(savedNotes));

  console.log('Condition cleared');
  const noteElement = e.target.closest('.added-note');
});

//Delete file
document.querySelector('.delete-btn').addEventListener('click', () => {
  textarea.value = '';
  toggleNewNotePage('add');
});

console.log(window);
