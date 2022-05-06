let circle = ' <svg class="circle">\n        <circle r="45" cx="65" cy="65" stroke="teal" stroke-width="10" fill="none" stroke-linecap="round"></circle>\n      </svg>'
let cross = '<svg class="circle">\n        <line class="first__line" x1="25" y1="25" x2="110" y2="110" stroke="crimson" stroke-width="10" stroke-linecap="round"></line>\n        <line class="second__line" x1="110" y1="25" x2="25" y2="110" stroke="crimson" stroke-width="10" stroke-linecap="round"></line>\n      </svg>'
let game = document.querySelector('.game-field')
let field = document.querySelector('.game-field_cell')
let fields = document.querySelectorAll('.game-field_cell')
let btnResert = document.querySelector('.reset-button')
let move = null;
let res = document.querySelector('.res')
let btnBack = document.querySelector('.btn__back')
let append = []

const myModalEl = document.getElementById('myModal')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  resert();
  move--;
  append = [];
});

function backMove() {
  if(append.length > 0) {
    append[append.length-1].innerHTML = '';
    append.pop();
    move--;
  }
};

function resert() {
  fields.forEach(e => {
    e.innerHTML="";
    e.classList.remove('active');
  });
};

function showModal() {
  let myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
  })
   myModal.show();
};

game.addEventListener('click', e => {
    if(e.target.className = 'game-field_cell') {
      if(e.target.className != 'game-field_cell') {
        return
      } else {
        append.push(e.target);
        console.log(append)
        move % 2 === 0 ? e.target.innerHTML = cross : e.target.innerHTML = circle;
        move++;
        checked();
      }
    }
  });

btnBack.addEventListener('click', ()=> {
  backMove()
});

btnResert.addEventListener('click', ()=> {
  resert()
});

     const checked = () => {
     const fields =  document.querySelectorAll('.game-field_cell')
     const winPositions = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
     ];

     for (let idx = 0; idx < winPositions.length; idx++) {
        if (
            fields[winPositions[idx][0]].innerHTML == cross &&
            fields[winPositions[idx][1]].innerHTML == cross &&
            fields[winPositions[idx][2]].innerHTML == cross
        ) {
            setTimeout(() => {
            fields[winPositions[idx][0]].classList.add('active')
            fields[winPositions[idx][1]].classList.add('active')
            fields[winPositions[idx][2]].classList.add('active')

            showModal()
           }, 1300);
            res.innerText = "Crosses Won!"

        }
        else if (
           fields[winPositions[idx][0]].innerHTML == circle &&
           fields[winPositions[idx][1]].innerHTML == circle &&
           fields[winPositions[idx][2]].innerHTML == circle
       ) {
           setTimeout(() => {
            fields[winPositions[idx][0]].classList.add('active')
            fields[winPositions[idx][1]].classList.add('active')
            fields[winPositions[idx][2]].classList.add('active')

            showModal()
           }, 1300);
            res.innerText = "Zeros Won!"

       }
       else if(append.length == 9) {
            setTimeout(() => {
              showModal()
           }, 1300);
            res.innerText = "Draw!"
       }
     }
 }

 // Реализация WebSocket

let chatForm = document.querySelector('.chat__form'),
    chatInput = document.querySelector('.chat__input'),
    chatBtn = document.querySelector('.chat__btn')

function dateChat() {
  let date = new Date();
  let timeMessage = String(date.getDate()).padStart(2, '0') + '.' +
  String(date.getMonth() + 1).padStart(2, '0') + '.' +
  date.getFullYear() + " " +
  new Date().toLocaleTimeString().slice(0,-3);
  return timeMessage;
}


const webSocket = new WebSocket('ws://localhost:8081');
webSocket.onmessage = async function(e) {
  //const data = e.data.text();
  const message = await new Response(e.data).text()
  console.log(message)
  chatForm.innerHTML +=
  '<p class="m-0 text-light fst-italic">'+'Alex'+'</p>' +
  '<div class="chat__message row rounded-3 bg-white mt-1 p-2 pb-0 mb-3 m-0 mx-2">' + message +
  '<p class="chat__date m-0 text-end pe-0 fst-italic">' + dateChat() + '</p>' + '</div>'
  chatForm.scrollTop = chatForm.scrollHeight;
};

chatBtn.addEventListener('click', () => {
  if(chatInput.value != '') {
    message = chatInput.value;
    webSocket.send(message);
    let sendMessageAudio = new Audio('assets/audio/sendMessage.mp3');
    sendMessageAudio.play();
    chatInput.value = '';
    console.log(chatInput)
  }
})
