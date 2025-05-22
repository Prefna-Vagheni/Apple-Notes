'use strict';

const notesContainer = document.querySelector('.notes-container');
const addNote = document.querySelector('.add-note');
const searchNote = document.querySelector('.search-bar');
const editTheList = document.querySelector('.edit');
const searchWithVoice = document.querySelector('.fa-microphone');
const noteTitile = document.querySelector('.note-title');
const textarea = document.querySelector('textarea');
const submitBtn = document.querySelector('.done');

let keyPressed;
let fileTitle;
const remaingText = [];

console.log(notesContainer);

const formatDate = function () {
  const rawDate = new Date();
  const day = String(rawDate.getDate()).padStart(2, '0');
  const month = String(rawDate.getUTCMonth() + 1).padStart(2, '0');
  const year = rawDate.getFullYear();

  const dateStamp = `${day}/${month}/${year}`;

  return dateStamp;
};

document.querySelector('.year').textContent = new Date().getFullYear();

let lineForTitle;
let plainText;
let textValue;
let areaVAlue = textarea.value;

textarea.addEventListener('keydown', function (e) {
  const lines = textarea.value.split('\n');
  keyPressed = e.key;
  if (areaVAlue) {
    textValue = areaVAlue;
    console.log(textarea.value);
  }
  if (e.key === 'Enter') {
    lineForTitle = lines[0];
    plainText = lines.slice(1).join(' ');
    textValue = textarea.value.split('\n');
  }
  console.log(plainText, lineForTitle);
  console.log(textValue);
});
console.log(textValue);

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

submitBtn.addEventListener('click', (e) => {
  const value = textarea.value.split('\n');
  const headline = value[0];
  const remaingText = value.slice(1).join(' ');

  const html = `
    <article class="added-note w-full">
     <h4 class="note-heading">${fileTitle}</h4>
     <article class="paragraph d-flex overflow-hidden">
       <p class="creation-date">${formatDate()}</p>
       <p class="text">${remaingText}</p>
     </article>
    </article>
    `;
  notesContainer.insertAdjacentHTML('beforeend', html);
  textarea.value = '';
});
