'use strict';

const notesContainer = document.querySelector('.notes-container');
const addNote = document.querySelector('.add-note');
const searchNote = document.querySelector('.search-bar');
const editTheList = document.querySelector('.edit');
const createNote = document.querySelector('.create-note');

const searchWithVoice = document.querySelector('.fa-microphone');
// const noteTitile = document.querySelector('.note-title');
const textarea = document.querySelector('textarea');
const submitBtn = document.querySelector('.done');

// console.log(Date.now(), new Date());

let keyPressed;
let fileTitle;
let notesArray = JSON.parse(localStorage.getItem('allNotes')) || [];
// const remaingText = [];

console.log(notesContainer);

document.querySelector('.year').textContent = new Date().getFullYear();

let lineForTitle;
let plainText;
let textValue;

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
    tite: headline,
    body: remaingText,
    date: formatDate,
  };

  notesArray.push({ title: headline, content: remaingText });

  localStorage.setItem('allNotes', JSON.stringify(noteObject));

  // Save data to local Storage
  // localStorage.setItem('saveNote', JSON.stringify(noteObject));

  // Get data
  // const storedData = JSON.parse(localStorage.getItem('saveNote'));
  // console.log(storedData);
  // Remove specific item
  // localStorage.removeItem('saveNote');

  //Clear all data
  // localStorage.clear();

  textarea.value = '';
  toggleNewNotePage('add');
  const html = `
    <article class="added-note w-full">
     <h4 class="note-heading">${headline}</h4>
     <article class="paragraph d-flex overflow-hidden">
       <p class="creation-date">${formatDate()}</p>
       <p class="text">${remaingText}</p>
     </article>
    </article>
    `;
  notesContainer.classList.remove('hidden');
  notesContainer.insertAdjacentHTML('afterbegin', html);
};

const saveNoteToLocalhost = function () {};

// let areaVAlue = textarea.value;
// ========================================================

// textarea.addEventListener('keydown', function (e) {
//   const lines = textarea.value.split('\n');
//   keyPressed = e.key;
//   if (areaVAlue) {
//     textValue = areaVAlue;
//     console.log(textarea.value);
//   }
//   if (e.key === 'Enter') {
//     lineForTitle = lines[0];
//     plainText = lines.slice(1).join(' ');
//     textValue = textarea.value.split('\n');
//   }
//   console.log(plainText, lineForTitle);
//   console.log(textValue);
// });
// console.log(textValue);

// =========================================================

// textarea.addEventListener('input', function () {
//   //   const totalLines = this.value.split('\n');
//   if (keyPressed === 'Enter') {
//     console.log(plainText);
//     // fileTitle = totalLines[0];
//     // const textTitle = text[0];
//     // console.log(fileTitle);
//     // const splittedText = totalLines.slice(1).join(' ');
//     // console.log(splittedText);
//     // remaingText.push(totalLines.slice(1).join(' '));
//     console.log(remaingText);
//   }
// });

addNote.addEventListener('click', () => {
  toggleNewNotePage('remove');
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
    title: title,
    text: body,
  }) ?? alert('Nothing to be shared.');
});

//Delete file
document.querySelector('.delete-btn').addEventListener('click', () => {
  textarea.value = '';
  toggleNewNotePage('add');
});
