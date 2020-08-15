const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

//store listitems
const listItems = [];

let dragStartIndex;

createList();

//insert list item into DOM
function createList() {
  [...richestPeople]
    .map(a => ({ value: a , sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)//reversing back in array form object
    .forEach((person, index) => {
      // console.log(person)
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable=true>
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
      </div>
    `;
    
    listItems.push(listItem);
    draggable_list.appendChild(listItem);
    
  });

  addEventListener();
}

function dragStart() {
  // console.log('Event: ','dragstatr');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartIndex);
}
function dragOver(e) {
  // console.log('Event: ','dragover');
  e.preventDefault();
  
}
function dragEnter() {
  // console.log('Event: ','dragenter');
  this.classList.add('over');
}
function dragLeave() {
  // console.log('Event: ','dragleave');
  this.classList.remove('over');
}

function dragDrop() {
  // console.log('Event: ','drop');
  const dragEndIndex = +this.getAttribute('data-index');
  // console.log(dragEndIndex);
  swapItem(dragStartIndex, dragEndIndex);

  this.classList.remove('over');

}

//swapping the draggable item
function swapItem(formIndex, toIndex) {
  const itemOne = listItems[formIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  
  listItems[formIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

//check order in list form the list of array
function checkOrderList() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    
    if(personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItem = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  draggableListItem.forEach(itme => {
    itme.addEventListener('dragover', dragOver);
    itme.addEventListener('drop', dragDrop);
    itme.addEventListener('dragenter', dragEnter);
    itme.addEventListener('dragleave', dragLeave);

  });
}

check.addEventListener('click', checkOrderList);
