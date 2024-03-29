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

//Клик по кнопке отправить
let btnSendComment = document.querySelector('.btn-send')
btnSendComment.addEventListener('click', function () {
    let commentName = document.getElementById('name-input')
    let commentBody = document.getElementById('textarea1')
    let parentId = document.getElementById('parent-answer').dataset.parentId

    let comment = {
        id: comments.length + 1,
        name: commentName.value,
        body: commentBody.value,
        // time: timeConverter(Math.floor(Date.now()/1000))
        time: Math.floor(Date.now()/1000),
        rating: 0,
        inFavorites: false,
        parent: parentId,
        answers: 0,
        isChoiceRating: ''
    }

    counterSymbolMessage()
    //Проверка что поля имя и комментарий не пустые
    if (commentName.value !== '' && commentBody.value !== '') {

        commentBody.value = ''
        textArea.style.height = 'auto'
        comments.push(comment)
        //Обновление счетчика ответов в комментарии
        if (parentId !== ' ') {
            comments.forEach(function (item) {
                if (item.id == +parentId) {
                    item.answers++
                }
            })
        }
        saveComments()
        com.showComments(comments)
    }

})

// document.querySelector('.btn-send').onclick = function () {
//     // тут код был как в функции в addEventListener
// }

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

//---------------Количество-введенных-символов-сообщения-----------------------

function counterSymbolMessage() {
    let showSymbol = document.querySelector('.input-block__counter-symbol')
    let messageLength = textArea.value.length
    let btn = document.querySelector('.input-block__btn-send')

    let messageWarning = document.querySelector('.input-block__warning-long-text')

    if (messageLength < 1000) {
        showSymbol.style.color = 'green'
        btn.disabled = false
        messageWarning.style.opacity = '0'
    } else {
        showSymbol.style.color = '#FF0000'
        btn.disabled = true
        messageWarning.style.opacity = '1'
    }
    showSymbol.innerText = `${messageLength}/1000`
}

//--------------Конвертирование-времени----------------------------------------

// function timeConverter(UNIX_timestamp){
//     let a = new Date(UNIX_timestamp * 1000);
//     let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     let monthsNumbers = ['01','02','03','04','05','06','07','08','09','10','11','12'];
//     let year = a.getFullYear();
//     let month = monthsNumbers[a.getMonth()];
//     let date = a.getDate();
//     let hour = a.getHours();
//     let min = a.getMinutes();
//     let sec = a.getSeconds();
//     //добавляем нули в начало
//     if (date < 10) {
//         date = '0' + date
//     }
//     if (hour < 10) {
//         hour = '0' + hour
//     }
//     if (min < 10) {
//         min = '0' + min
//     }
//     let time = date + '.' + month + ' ' + hour + ':' + min ;
//     return time;
// }

//--------------Выпадающий-список-сортировки--------------------------------
let btnSortList = document.querySelector('.header-panel__sort-text')

btnSortList.addEventListener('click', function() {
    document.getElementById('dropdownSort').classList.toggle('show')
})

//Закрывание выпадающего меню когда щелкаем вне его
window.onclick = function(event) {
    if (!event.target.matches('.header-panel__sort-text')) {
        let dropdowns = document.querySelector(".header-panel__dropdown-content");
        if (dropdowns.classList.contains('show')) {
            dropdowns.classList.remove('show');
        }
    }
}

//--------------Сортировка-по-дате-----------------------------------------

let btnSortTime = document.querySelector('.sort-time')

btnSortTime.addEventListener('click', function () {
    if (arrowSort.classList.contains('increase')) {
        arrowSort.classList.remove('increase')
    }
    showSortedComments(byTimeIncrease, byTimeDecrease)
    document.querySelector('.header-panel__sort-text').dataset.sort = 'time'
    document.querySelector('.header-panel__sort-text').innerText = btnSortTime.innerText
})


let btnSortRating = document.querySelector('.sort-rating')

btnSortRating.addEventListener('click', function () {
    if (arrowSort.classList.contains('increase')) {
        arrowSort.classList.remove('increase')
    }
    showSortedComments(byRatingIncrease, byRatingDecrease)
    document.querySelector('.header-panel__sort-text').dataset.sort = 'rating'
    document.querySelector('.header-panel__sort-text').innerText = btnSortRating.innerText
})

let btnSortAnswers = document.querySelector('.sort-answers')

btnSortAnswers.addEventListener('click', function () {
    if (arrowSort.classList.contains('increase')) {
        arrowSort.classList.remove('increase')
    }
    showSortedComments(byAnswersIncrease, byAnswersDecrease)
    document.querySelector('.header-panel__sort-text').dataset.sort = 'answers'
    document.querySelector('.header-panel__sort-text').innerText = btnSortAnswers.innerText
})


// Сортировка по возрастанию и убывнию стрелками
let arrowSort = document.querySelector('.header-panel__sort-arrow')

arrowSort.addEventListener('click', function() {
    arrowSort.classList.toggle('increase')
    if (document.querySelector('.header-panel__sort-text').dataset.sort === 'time') {
        showSortedComments(byTimeIncrease, byTimeDecrease)
    } else if (document.querySelector('.header-panel__sort-text').dataset.sort === 'rating') {
        showSortedComments(byRatingIncrease, byRatingDecrease)
    } else if (document.querySelector('.header-panel__sort-text').dataset.sort === 'answers') {
        showSortedComments(byAnswersIncrease, byAnswersDecrease)
    }

})


function showSortedComments(sortedParameterIncrease, sortedParameterDecrease) {
    if (arrowSort.classList.contains('increase')) {
        //timeIncrease
        if (localStorage.getItem('commentss')) {
            sortedParameterIncrease()
            // console.log(comments)
            com.showComments(comments)
        }
    } else {
        //timeDecrease
        if (localStorage.getItem('commentss')) {
            sortedParameterDecrease()
            // console.log(comments)
            com.showComments(comments)
        }
    }
}

function byTimeIncrease() {
    comments.sort(function (a, b) {
        return a.time - b.time
    })
}

function byTimeDecrease() {
    comments.sort(function (a, b) {
        return b['time'] - a['time']
    })
}

function byRatingIncrease() {
    comments.sort(function (a, b) {
        return a.rating - b.rating
    })
}

function byRatingDecrease() {
    comments.sort(function (a, b) {
        return b.rating - a.rating
    })
}

function byAnswersIncrease() {
    comments.sort(function (a, b) {
        return a.answers - b.answers
    })
}

function byAnswersDecrease() {
    comments.sort(function (a, b) {
        return b.answers - a.answers
    })
}

//--------------Сортировка-избранного-----------------------------------------

let favoritesList = document.querySelector('.header-panel__favorites')

favoritesList.addEventListener('click', function() {
    let favoritesArr = []
    for (let i = 0; i < comments.length; i++){
        if (comments[i].inFavorites) {
            favoritesArr.push(comments[i])
        }
    }
    com.showComments(favoritesArr)
})

//--------------События-при-кликах-на-комментарии--------------------------

let commentField = document.querySelector('.comment-field')

commentField.addEventListener('click', function(event) {

    //Действия для кликов по кнопке избранное
    if (event.target.classList.contains('comment__footer-favorites-text') || event.target.classList.contains('comment__footer-favorites-logo')) {
        let commentId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.commentId
        com.changeFavorites(commentId, comments)
        event.target.parentElement.firstElementChild.classList.toggle('logo-active')
        if (event.target.parentElement.firstElementChild.classList.contains('logo-active')){
            event.target.parentElement.lastElementChild.innerText = 'В избранном'
        } else {
            event.target.parentElement.lastElementChild.innerText = 'В избранное'
        }

        saveComments()
    }

    //Действия для кликов по увеличению/уменьшению рейтинга
    if (event.target.classList.contains('rating-plus-img')) {
        let commentId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.commentId
        let counter = event.target.previousElementSibling
        let res = counter.textContent = `${Number(counter.textContent) + 1}`
        //Повышение рейтинга только на 1
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id == +commentId) {
                if (comments[i].isChoiceRating === '') {
                    comments[i].rating = +res
                    comments[i].isChoiceRating = true
                } else if (comments[i].isChoiceRating === true) {
                    counter.textContent = `${Number(counter.textContent) - 1}`
                } else if (comments[i].isChoiceRating === false) {
                    comments[i].rating = +res
                    comments[i].isChoiceRating = ''
                }
            }
        }
        saveComments()
        com.ratingColor()
    } else if (event.target.classList.contains('rating-minus-img')) {
        let commentId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.commentId
        let counter = event.target.nextElementSibling
        let res = counter.textContent = `${Number(counter.textContent) - 1}`
        //Понижение рейтинга только на 1
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id == +commentId) {
                if (comments[i].isChoiceRating === '') {
                    comments[i].rating = +res
                    comments[i].isChoiceRating = false
                } else if (comments[i].isChoiceRating === false) {
                    counter.textContent = `${Number(counter.textContent) + 1}`
                } else if (comments[i].isChoiceRating === true) {
                    comments[i].rating = +res
                    comments[i].isChoiceRating = ''
                }
            }
        }
        saveComments()
        com.ratingColor()
    }

    //Действия для кликов по кнопке ответить
    if (event.target.classList.contains('comment__footer-answer-text') || event.target.classList.contains('comment__footer-answer-img')) {
        let commentAuthor = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.firstElementChild['innerText']
        let showAnswerName = document.querySelector('.input-block__parent-answer')
        showAnswerName.style.display = 'flex'
        showAnswerName.innerHTML =`
            <div class="input-block__parent-answer-logo">
                <img class="input-block__parent-answer-img" src="./images/answer_comment.svg" alt="answer">
            </div>
            <div class="input-block__parent-answer-text">
                ${commentAuthor}
            </div>`
        let commentId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.commentId
        showAnswerName.dataset.parentId = commentId
        // document.querySelector('.input-block__parent-answer').dataset.parentId = commentId
    }

})

// function changeFavorites(commentId) {
//     for (let i = 0; i < comments.length; i++) {
//         if (comments[i].id == +commentId) {
//             if (comments[i].inFavorites == false) {
//                 comments[i].inFavorites = true
//             } else {
//                 comments[i].inFavorites = false
//             }
//         }
//     }
// }

//Функция для изменения рейтинга, если нужно больше чем на 1 повышать
//(использовал раньше пока не сделал повышение только на 1)
// function changeRating(commentId, counter) {
//     for (let i = 0; i < comments.length; i++) {
//         if (comments[i].id == +commentId) {
//             comments[i].rating = counter
//         }
//     }
// }

// function ratingColor() {
//     let ratingCounts = document.querySelectorAll('.rating-count')
//     for (let i = 0; i < ratingCounts.length; i++) {
//         if (+ratingCounts[i].textContent > 0) {
//             ratingCounts[i].style.color = '#8AC540'
//         } else if (+ratingCounts[i].textContent < 0) {
//             ratingCounts[i].style.color = '#FF0000'
//         } else if (+ratingCounts[i].textContent == 0) {
//             ratingCounts[i].style.color = 'rgba(0, 0, 0, .4)'
//         }
//     }
// }

//Крестик удаляет на чей комментарий отвечаем
let btnAnswerOff = document.querySelector('.input-block__parent-answer')
btnAnswerOff.addEventListener('click', function() {
    btnAnswerOff.style.display = 'none'
    btnAnswerOff.innerHTML = ''
    btnAnswerOff.dataset.parentId = ' '
})