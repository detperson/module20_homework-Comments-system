export default class Comment1 {

    showComments(comments: OneComment[]) {
        let commentField: Element | null = document.querySelector('.comment-field')
        let out: string = ''
        comments.forEach(function(item) {
            if (item.parent === ' ') {
                out += `
                    <div class="comment" data-comment-id="${item.id}">
                        <div class="comment__user-logo">
                            <img class="comment__user-logo-img user-logo-img" src="https://picsum.photos/seed/${item.name}/100" alt="user-logo">
                        </div>
                        <div class="comment__form">
                            <div class="comment__other">
                                <div class="comment__user-name user-name">
                                    ${item.name}
                                </div>
                                <div class="comment__post-data">
                                    ${timeConverter(item.time)}
                                </div>
                            </div>
                            <div class="comment__text-block">
                                <p class="comment__body comment__body-for-mobile">
                                    ${item.body}
                                </p>
                            </div>
                            <div class="comment__footer">
                                <div class="comment__footer-answer footer-btn">
                                    <img class="comment__footer-answer-img" src="./images/answer_comment.svg" alt="answer">
                                    <div class="comment__footer-answer-text">Ответить</div>
                                </div>
                                <div class="comment__footer-favorites favorites-btn">
                                    <div class="comment__footer-favorites-logo"></div>
                                    <div class="comment__footer-favorites-text">В избранное</div>
                                </div>
                                <div class="comment__footer-rating">
                                    <img class="rating-minus-img" src="./images/minus-rating.svg" alt="minus">
                                    <div class="rating-count">${item.rating}</div>
                                    <img class="rating-plus-img" src="./images/plus-rating.svg" alt="plus">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="answers"></div>`
            }
            // out +=`<p class='comment-date'>${item.time.toLocaleString()}</p>`
            // out +=`<p class='input-block__user-name'>${item.name}</p>`
            // out +=`<p class='comment-body'>${item.body}</p>`
        })
        if (commentField != null) {
            commentField.innerHTML = out
        }
        this.updateCounterComments()

        // Добавление ответов
        comments.forEach(function(item) {
            if (item.parent !== ' ') {
                //Это цикл для добавления имя родителя ответу.
                //Его желательно как то упростить, что бы делалось за 1 цикл при добавлении ответа
                let parentName: string = ''
                let parenComment: NodeListOf<Element> = document.querySelectorAll('.comment')
                parenComment.forEach(function(com: Element) {
                    if (item.parent === (<HTMLElement>com).dataset.commentId) {
                        parentName = (<HTMLElement>com.getElementsByClassName('comment__user-name')[0]).innerText
                    }
                })
                //---------------------------------------------------------------------------
                let outAnswer: string = `
                    <div class="comment answer" data-comment-id="${item.id}">
                        <div class="comment__user-logo">
                            <img class="comment__user-logo-img user-logo-img" src="https://picsum.photos/seed/${item.name}/100" alt="user-logo">
                        </div>
                        <div class="comment__form">
                            <div class="comment__other">
                                <div class="comment__user-name user-name">
                                    ${item.name}
                                </div>
                                <div class="comment__other__answer-to">
                                    <div class="comment__other__answer-to-logo">
                                        <img class="comment__other__answer-to-img" src="./images/answer_comment.svg" alt="answer">
                                    </div>
                                    <div class="comment__other__answer-to-text">${parentName}</div>
                                </div>
                                <div class="comment__post-data">
                                    ${timeConverter(item.time)}
                                </div>
                            </div>
                            <div class="comment__text-block">
                                <p class="comment__body">
                                    ${item.body}
                                </p>
                            </div>
                            <div class="comment__footer">
                                <div class="answer__footer-favorites favorites-btn">
                                    <div class="comment__footer-favorites-logo"></div>
                                    <div class="comment__footer-favorites-text">В избранное</div>
                                </div>
                                <div class="comment__footer-rating">
                                    <img class="rating-minus-img" src="./images/minus-rating.svg" alt="minus">
                                    <div class="rating-count">${item.rating}</div>
                                    <img class="rating-plus-img" src="./images/plus-rating.svg" alt="plus">
                                </div>
                            </div>
                        </div>
                    </div>`

                // let parenComment = document.querySelectorAll('.comment')
                parenComment.forEach(function(com) {
                    if (item.parent === (<HTMLElement>com).dataset.commentId) {
                        // parentName = com.getElementsByClassName('comment__user-name')[0].innerText
                        com.nextElementSibling?.insertAdjacentHTML("beforeend", outAnswer)
                    }
                })

            }
        })
        // Функция конвертирования времени
        // Не знаю правильно ли ее тут расположил или нет
        function timeConverter(UNIX_timestamp: number){
            let a: Date = new Date(UNIX_timestamp * 1000);
            let months: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let monthsNumbers: string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            let year: number = a.getFullYear();
            let month: string = monthsNumbers[a.getMonth()];
            let date: number = a.getDate();
            let hour: number = a.getHours();
            let min: number = a.getMinutes();
            let sec: number = a.getSeconds();
            //добавляем нули в начало
            if (date < 10) {
                date = Number('0' + date.toString())
            }
            if (hour < 10) {
                hour = Number('0' + hour.toString())
            }
            if (min < 10) {
                min = Number('0' + min.toString())
            }
            let time = date + '.' + month + ' ' + hour + ':' + min ;
            return time;
        }

        this.ratingColor()
        comments.forEach(function(item) {
            //Добавляем логотип активного "Избранного" и кнопку "В избранном"
            if (item.inFavorites) {
                let favoritesBtns: NodeListOf<Element> = document.querySelectorAll('.comment__footer-favorites-logo')
                favoritesBtns.forEach(function(favBtn: Element) {
                    let commentId: string = (<HTMLElement>favBtn.closest('.comment')).dataset.commentId!
                    if (item.id == +commentId) {
                        favBtn.classList.add('logo-active')

                        if (favBtn.nextElementSibling != null) {
                            (<HTMLElement>favBtn.nextElementSibling).innerText = 'В избранном'
                        }

                    }
                })
            }
        })

    }

    //----------------Увеличение-счетчика-сообщений--------------------------------
    updateCounterComments() {
        let counter: HTMLElement | null = document.querySelector('.header-panel__comments-counter')
        let comments: OneComment[] = JSON.parse(localStorage.getItem('commentss')!)
        if (counter != null) {
            counter.innerText = `(${comments.length})`
        }
    }

    //----------------Изменение-цвета-рейтинга-------------------------------------
    ratingColor() {
        let ratingCounts: NodeListOf<HTMLElement> = document.querySelectorAll('.rating-count')
        for (let i = 0; i < ratingCounts.length; i++) {
            if (+ratingCounts[i] != null) {
                if (+ratingCounts[i].textContent! > 0) {
                    ratingCounts[i].style.color = '#8AC540'
                } else if (+ratingCounts[i].textContent! < 0) {
                    ratingCounts[i].style.color = '#FF0000'
                } else if (+ratingCounts[i].textContent! == 0) {
                    ratingCounts[i].style.color = 'rgba(0, 0, 0, .4)'
                }
            }
        }
    }

    //----------------Добавление/удаление-в-избранное------------------------------
    changeFavorites(commentId: string, commentsList: OneComment[]) {
        for (let i = 0; i < commentsList.length; i++) {
            if (commentsList[i].id == +commentId) {
                if (commentsList[i].inFavorites == false) {
                    commentsList[i].inFavorites = true
                } else {
                    commentsList[i].inFavorites = false
                }
            }
        }
    }

}

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