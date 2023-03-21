import Comment1 from "./Comment1";

let textArea: HTMLElement = <HTMLElement> document.querySelector('.input-block__input')

textArea.addEventListener("input", function() {
    textArea.style.height = 'auto'
    textArea.style.height = (textArea.scrollHeight - 40) + 'px'
    counterSymbolMessage()
})

// -------------------Увеличение окна ввода комментария сверху-------------------
interface OneComment {
    id: number
    name: string
    body: string
    time: number
    rating: number
    inFavorites: boolean | string
    parent: string
    answers: number
    isChoiceRating: boolean | string
}

let comments: OneComment[] = []
let com: Comment1 = new Comment1()
loadComments()


//Клик по кнопке отправить
let btnSendComment: Element | null = document.querySelector('.btn-send')
btnSendComment?.addEventListener('click', function () {
    let commentName: HTMLElement | null = document.getElementById('name-input')
    let commentBody: HTMLElement | null = document.getElementById('textarea1')
    let parentId:string = document.getElementById('parent-answer')?.dataset.parentId as string

    let comment: OneComment = {
        id: comments.length + 1,
        name: (<HTMLInputElement>commentName).value,
        body: (<HTMLInputElement>commentBody).value,
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
    if ((<HTMLInputElement>commentName).value !== '' && (<HTMLInputElement>commentBody).value !== '') {

        (<HTMLInputElement>commentBody).value = ''
        textArea.style.height = 'auto'
        comments.push(comment)
        //Обновление счетчика ответов в комментарии
        if (parentId !== ' ') {
            comments.forEach(function (item: OneComment) {
                if (item.id == +parentId) {
                    item.answers++
                }
            })
        }
        saveComments()
        com.showComments(comments)
    }

})

// функция сохранения комментариев в LocalStorage
function saveComments(): void {
    localStorage.setItem('commentss', JSON.stringify(comments))
}

function loadComments(): void {
    let commentsFromLocalStorage: string | null = localStorage.getItem('commentss')
    if (!!commentsFromLocalStorage) {
        comments = JSON.parse(commentsFromLocalStorage)
        com.showComments(comments)
    }
}

//---------------Количество-введенных-символов-сообщения-----------------------

function counterSymbolMessage() {
    let showSymbol: HTMLElement | null = document.querySelector('.input-block__counter-symbol')
    let messageLength: number = (<HTMLInputElement>textArea).value.length
    let btn: HTMLButtonElement | null = document.querySelector('.input-block__btn-send')

    let messageWarning: HTMLElement | null = document.querySelector('.input-block__warning-long-text')

    if (!!showSymbol && !!messageLength && !!btn && !!messageWarning) {
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
let btnSortList: Element | null = document.querySelector('.header-panel__sort-text')

btnSortList?.addEventListener('click', function() {
    let menuSort: HTMLElement | null = document.getElementById('dropdownSort')
    if (!!menuSort) {
        menuSort.classList.toggle('show')
    }
})

//Закрывание выпадающего меню когда щелкаем вне его
window.onclick = function(event) {
    const clickedElement = event.target as Element
    if (!clickedElement?.matches('.header-panel__sort-text')) {
        let dropdowns: Element | null = document.querySelector(".header-panel__dropdown-content")
        if (dropdowns?.classList.contains('show')) {
            dropdowns.classList.remove('show');
        }
    }
}

//--------------Сортировка-по-дате-----------------------------------------

let btnSortTime: HTMLElement | null = document.querySelector('.sort-time')

btnSortTime?.addEventListener('click', function () {
    if (arrowSort.classList.contains('increase')) {
        arrowSort.classList.remove('increase')
    }
    showSortedComments(byTimeIncrease, byTimeDecrease)
    let selectedSortParameter: HTMLElement | null =  document.querySelector('.header-panel__sort-text')
    if (selectedSortParameter != null) {
        selectedSortParameter.dataset.sort = 'time'
        selectedSortParameter.innerText = btnSortTime!.innerText
    }
})


let btnSortRating: HTMLElement | null = document.querySelector('.sort-rating')

btnSortRating?.addEventListener('click', function () {
    if (arrowSort.classList.contains('increase')) {
        arrowSort.classList.remove('increase')
    }
    showSortedComments(byRatingIncrease, byRatingDecrease)
    let selectedSortParameter: HTMLElement | null =  document.querySelector('.header-panel__sort-text')
    if (selectedSortParameter != null) {
        selectedSortParameter.dataset.sort = 'rating'
        selectedSortParameter.innerText = btnSortRating!.innerText
    }
})

let btnSortAnswers: HTMLElement | null = document.querySelector('.sort-answers')

btnSortAnswers?.addEventListener('click', function () {
    if (arrowSort.classList.contains('increase')) {
        arrowSort.classList.remove('increase')
    }
    showSortedComments(byAnswersIncrease, byAnswersDecrease)
    let selectedSortParameter: HTMLElement | null =  document.querySelector('.header-panel__sort-text')
    if (selectedSortParameter != null) {
        selectedSortParameter.dataset.sort = 'answers'
        selectedSortParameter.innerText = btnSortAnswers!.innerText
    }
})


// Сортировка по возрастанию и убывнию стрелками
let arrowSort = <HTMLElement>document.querySelector('.header-panel__sort-arrow')

arrowSort.addEventListener('click', function() {
    arrowSort.classList.toggle('increase')
    let selectedSortParameter: HTMLElement | null = document.querySelector('.header-panel__sort-text')

    if (selectedSortParameter != null) {
        if (selectedSortParameter.dataset.sort === 'time') {
            showSortedComments(byTimeIncrease, byTimeDecrease)
        } else if (selectedSortParameter.dataset.sort === 'rating') {
            showSortedComments(byRatingIncrease, byRatingDecrease)
        } else if (selectedSortParameter.dataset.sort === 'answers') {
            showSortedComments(byAnswersIncrease, byAnswersDecrease)
        }
    }


})


function showSortedComments(sortedParameterIncrease: () => void, sortedParameterDecrease: () => void): void {
    if (arrowSort.classList.contains('increase')) {
        //timeIncrease
        if (localStorage.getItem('commentss')) {
            sortedParameterIncrease()
            com.showComments(comments)
        }
    } else {
        //timeDecrease
        if (localStorage.getItem('commentss')) {
            sortedParameterDecrease()
            com.showComments(comments)
        }
    }
}

function byTimeIncrease(): void {
    comments.sort(function (a, b) {
        return a.time - b.time
    })
}

function byTimeDecrease(): void {
    comments.sort(function (a, b) {
        return b['time'] - a['time']
    })
}

function byRatingIncrease(): void {
    comments.sort(function (a, b) {
        return a.rating - b.rating
    })
}

function byRatingDecrease(): void {
    comments.sort(function (a, b) {
        return b.rating - a.rating
    })
}

function byAnswersIncrease(): void {
    comments.sort(function (a, b) {
        return a.answers - b.answers
    })
}

function byAnswersDecrease(): void {
    comments.sort(function (a, b) {
        return b.answers - a.answers
    })
}

//--------------Сортировка-избранного-----------------------------------------

let favoritesList: HTMLElement | null = document.querySelector('.header-panel__favorites')

favoritesList?.addEventListener('click', function() {
    let favoritesArr: OneComment[] = []
    for (let i = 0; i < comments.length; i++){
        if (comments[i].inFavorites) {
            favoritesArr.push(comments[i])
        }
    }
    com.showComments(favoritesArr)
})

//--------------События-при-кликах-на-комментарии--------------------------

let commentField: HTMLElement | null = document.querySelector('.comment-field')

commentField?.addEventListener('click', function(event) {
    let clickedElement = event.target as Element

    if (clickedElement != null) {


        //Действия для кликов по кнопке избранное
        if (clickedElement.classList.contains('comment__footer-favorites-text') || clickedElement.classList.contains('comment__footer-favorites-logo')) {
            let commentId: string = clickedElement.parentElement?.parentElement?.parentElement?.parentElement?.dataset.commentId!
            com.changeFavorites(commentId, comments)
            clickedElement.parentElement?.firstElementChild?.classList.toggle('logo-active')

            if (clickedElement.parentElement?.firstElementChild?.classList.contains('logo-active')) {
                (<HTMLElement>clickedElement.parentElement.lastElementChild).innerText = 'В избранном'
            } else {
                //todo
                (<HTMLElement>clickedElement.parentElement?.lastElementChild).innerText = 'В избранное'
            }

            saveComments()
        }

        //Действия для кликов по увеличению/уменьшению рейтинга
        if (clickedElement.classList.contains('rating-plus-img')) {
            let commentId: string = clickedElement.parentElement?.parentElement?.parentElement?.parentElement?.dataset.commentId!
            let counter: Element | null = clickedElement.previousElementSibling
            let res = counter!.textContent = `${Number(counter!.textContent) + 1}`
            //Повышение рейтинга только на 1
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].id == +commentId) {
                    if (comments[i].isChoiceRating === '') {
                        comments[i].rating = +res
                        comments[i].isChoiceRating = true
                    } else if (comments[i].isChoiceRating === true) {
                        counter!.textContent = `${Number(counter!.textContent) - 1}`
                    } else if (comments[i].isChoiceRating === false) {
                        comments[i].rating = +res
                        comments[i].isChoiceRating = ''
                    }
                }
            }
            saveComments()
            com.ratingColor()
        } else if (clickedElement.classList.contains('rating-minus-img')) {
            let commentId: string = clickedElement.parentElement?.parentElement?.parentElement?.parentElement?.dataset.commentId!
            let counter:Element | null = clickedElement.nextElementSibling
            let res = counter!.textContent = `${Number(counter!.textContent) - 1}`
            //Понижение рейтинга только на 1
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].id == +commentId) {
                    if (comments[i].isChoiceRating === '') {
                        comments[i].rating = +res
                        comments[i].isChoiceRating = false
                    } else if (comments[i].isChoiceRating === false) {
                        counter!.textContent = `${Number(counter!.textContent) + 1}`
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
        if (clickedElement.classList.contains('comment__footer-answer-text') || clickedElement.classList.contains('comment__footer-answer-img')) {
            let commentAuthor = (<HTMLElement>clickedElement.parentElement?.parentElement?.previousElementSibling?.previousElementSibling?.firstElementChild)['innerText']
            let showAnswerName: HTMLElement | null = document.querySelector('.input-block__parent-answer')
            if (showAnswerName != null) {
                showAnswerName.style.display = 'flex'
                showAnswerName.innerHTML = `
                <div class="input-block__parent-answer-logo">
                    <img class="input-block__parent-answer-img" src="./images/answer_comment.svg" alt="answer">
                </div>
                <div class="input-block__parent-answer-text">
                    ${commentAuthor}
                </div>`
                let commentId: string = clickedElement.parentElement?.parentElement?.parentElement?.parentElement?.dataset.commentId!
                showAnswerName.dataset.parentId = commentId
            }

        }
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
let btnAnswerOff: HTMLElement | null = document.querySelector('.input-block__parent-answer')
btnAnswerOff?.addEventListener('click', function() {
    if (btnAnswerOff != null) {
        btnAnswerOff.style.display = 'none'
        btnAnswerOff.innerHTML = ''
        btnAnswerOff.dataset.parentId = ' '
    }
})


