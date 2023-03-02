export default class Comment {

    showComments(comments) {
        let commentField = document.querySelector('.comment-field')
        let out = ''
        comments.forEach(function(item) {
            out += `
                <div class="comment">
                    <div class="comment__user-logo">
                        <img class="comment__user-logo user-logo-img" src="https://picsum.photos/seed/${item.name}/100" alt="user-logo">
                    </div>
                    <div class="comment__form">
                        <div class="comment__other">
                            <div class="comment__user-name user-name">
                                ${item.name}
                            </div>
                            <div class="comment__post-data">
                                ${item.time}
                            </div>
                        </div>
                        <div class="comment__text-block">
                            <p class="comment__body">
                                ${item.body}
                            </p>
                        </div>
                        <div class="comment__footer">
                            <div class="comment__footer-answer footer-btn">
                                <img class="comment__footer-answer-img" src="./images/answer_comment.svg" alt="answer">
                                <div class="comment__footer-answer-text">Ответить</div>
                            </div>
                            <div class="comment__footer-favorites footer-btn">
                                <img class="comment__footer-favorites-img" src="./images/favorites_comment_off.svg" alt="favorites">
                                <div class="comment__footer-favorites-text">В избранное</div>
                            </div>
                            <div class="comment__footer-rating">
                                <img class="rating-minus-img" src="./images/minus-rating.svg" alt="minus">
                                <div class="rating-count">0</div>
                                <img class="rating-plus-img" src="./images/plus-rating.svg" alt="plus">
                            </div>
                        </div>
                    </div>
                </div>`
            // out +=`<p class='comment-date'>${item.time.toLocaleString()}</p>`
            // out +=`<p class='input-block__user-name'>${item.name}</p>`
            // out +=`<p class='comment-body'>${item.body}</p>`
        })
        commentField.innerHTML = out
        this.updateCounterComments()
    }

    //----------------Увеличение-счетчика-сообщений--------------------------------
    updateCounterComments() {
        let counter = document.querySelector('.header-panel__comments-counter')
        let comments = JSON.parse(localStorage.getItem('commentss'))
        counter.innerText = `(${comments.length})`
    }

}