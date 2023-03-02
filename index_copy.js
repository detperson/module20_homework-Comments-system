import Comment from "./Comment.js";

var textArea = document.querySelector('.input-block__input');
textArea.addEventListener("input", function () {
    textArea.style.height = 'auto';
    textArea.style.height = (textArea.scrollHeight - 40) + 'px';
    counterSymbolMessage()
});

// -------------------Увеличение окна ввода комментария сверху-------------------


let comments = []
let com = new Comment()
loadComments()


// переписать на Эвент Листенер
document.querySelector('.btn-send').onclick = function () {
    let commentName = document.getElementById('name-input')
    let commentBody = document.getElementById('textarea1')

    let comment = {
        name: commentName.value,
        body: commentBody.value,
        time: timeConverter(Math.floor(Date.now()/1000))
    }

    commentBody.value = ''
    textArea.style.height = 'auto';
    counterSymbolMessage()
    comments.push(comment)
    saveComments()
    com.showComments(comments)
}

// функция сохранения комментариев в LocalStorage
function saveComments() {
    localStorage.setItem('commentss', JSON.stringify(comments))
}

function loadComments() {
    if (localStorage.getItem('commentss')) {
        comments = JSON.parse(localStorage.getItem('commentss'))
        com.showComments(comments)
    }
}

// function showComments() {
//     let commentField = document.querySelector('.comment-field')
//     let out = ''
//     comments.forEach(function(item) {
//         out += `<div class="comment" style="display: flex">
//                     <div class="input-block__user-logo">
//                         <img class="input-block__logo-img" src="https://picsum.photos/seed/logo/100" alt="user-logo">
//                     </div>
//                     <div class="input-block__form">
//                         <div class="input-block__other">
//                             <div class="input-block__user-name">
//                                 ${item.name}
//                             </div>
//                             <div class="input-block__counter-simbol">
//                                 ${item.time.toLocaleString()}
//                             </div>
//                         </div>
//                         <div class="input-block__comment-input">
//                             <p class='comment-body'>${item.body}</p>
//                         </div>
//                     </div>
//                 </div>`
//         // out +=`<p class='comment-date'>${item.time.toLocaleString()}</p>`
//         // out +=`<p class='input-block__user-name'>${item.name}</p>`
//         // out +=`<p class='comment-body'>${item.body}</p>`
//     })
//     commentField.innerHTML = out
// }

//----------------Увеличение-счетчика-сообщений--------------------------------

// function updateCounterComments() {
//     let counter = document.querySelector('.header-panel__comments-counter')
//     let comments = JSON.parse(localStorage.getItem('commentss'))
//     counter.innerText = `(${comments.length})`
// }

//---------------Количество-введенных-символов-сообщения-----------------------

function counterSymbolMessage() {
    let showSymbol = document.querySelector('.input-block__counter-symbol')
    let messageLength = textArea.value.length
    let btn = document.querySelector('.input-block__btn-send')

    if (messageLength < 1000) {
        showSymbol.style.color = 'green'
        btn.disabled = false
    } else {
        showSymbol.style.color = '#FF0000'
        btn.disabled = true
    }
    showSymbol.innerText = `${messageLength}/1000`
}

//--------------Конвертирование-времени----------------------------------------

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let monthsNumbers = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let year = a.getFullYear();
    let month = monthsNumbers[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    //добавляем нули в начало
    if (date < 10) {
        date = '0' + date
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (min < 10) {
        min = '0' + min
    }
    let time = date + '.' + month + ' ' + hour + ':' + min ;
    return time;
}

