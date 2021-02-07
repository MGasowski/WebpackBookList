import * as mdb from 'mdb-ui-kit';
import { booksTable, form, formInputs } from './dom-loader';

let booksCount = 0;
const categoriesCount = new Map();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const row = booksTable.insertRow(-1);
  for (let i = 0; i < 5; i++) {
    const cell = row.insertCell(i);
    if (i === 0) cell.innerHTML = booksCount.toString();
    else cell.innerHTML = formInputs[i - 1].value;
  }
  row.insertCell().innerHTML = `<button id=but${booksCount} class=\`btn btn-danger\`>X</button>`;
  addBook();
  window.location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
  if (categoriesCount.size === 0) initializeCategoryCount();
  // Fill books table
  Object.keys(localStorage).forEach((key) => {
    // couldnt get rid of webpack log in localstorage :/
    if (localStorage.getItem(key) !== 'INFO') {
      const book = JSON.parse(localStorage.getItem(key));
      const row = booksTable.insertRow();
      row.insertCell().innerHTML = book.id;
      row.insertCell().innerHTML = book.name;
      row.insertCell().innerHTML = book.author;
      row.insertCell().innerHTML = book.category;
      row.insertCell().innerHTML = book.priority;

      const button = document.createElement('button');
      button.addEventListener('click', () => {
        removeBook(book.id);
      });
      button.innerHTML = 'X';
      button.classList.add('btn', 'btn-danger');
      row.insertCell().appendChild(button);
    }
  });

  const categories = document.getElementsByClassName('category');
  for (let category of categories) {
    category.addEventListener('click', () => {
      categorySort(category.innerText);
    });
  }

  const categoriesCountFields = document
    .getElementById('categoryCounter')
    .getElementsByClassName('dropdown-item');
  for (let field of categoriesCountFields) {
    console.log(field.innerText)
    field.innerText = field.innerText + ': ' + categoriesCount.get(field.innerText);
  }
});

function removeBook(id) {
  localStorage.removeItem(id);
  booksTable.deleteRow(id + 1);
}

function initializeCategoryCount() {
  categoriesCount.set('Kryminał', 0);
  categoriesCount.set('Sci-Fi', 0);
  categoriesCount.set('Fantasy', 0);
  categoriesCount.set('Poezja', 0);
  categoriesCount.set('Dramat', 0);
  categoriesCount.set('Nauki ścisłe', 0);
}

function addBook() {
  const book = {
    id: booksCount,
    name: formInputs[0].value,
    author: formInputs[1].value,
    category: formInputs[2].value,
    priority: formInputs[3].value,
  };
  localStorage.setItem(booksCount.toString(), JSON.stringify(book));
  booksCount++;
  categoriesCount.set(book.category, categoriesCount.get(book.category) + 1);
}

function categorySort(category) {
  const tr = booksTable.getElementsByTagName('tr');
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[3];
    if (td) {
      const txtValue = td.textContent || td.innerText;
      if (txtValue === category) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

export default {
  mdb,
};
