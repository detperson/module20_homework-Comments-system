var textArea = document.querySelector('.input-block__input');
textArea.addEventListener("input", function () {
    textArea.style.height = 'auto';
    textArea.style.height = (textArea.scrollHeight - 40) + 'px';
});

// -------------------Увеличение окна ввода комментария сверху-------------------


let comments = []
loadComments()

// переписать на Эвент Листенер
document.querySelector('.btn-send').onclick = function () {
    let commentName = document.getElementById('name-input')
    let commentBody = document.getElementById('textarea1')

    let comment = {
        name: commentName.value,
        body: commentBody.value,
        // time: Math.floor(Date.now()/1000)
        time: new Date()
    }

    commentBody.value = ''
    comments.push(comment)
    saveComments()
    showComments()
}

// функция сохранения комментариев в LocalStorage
function saveComments() {
    localStorage.setItem('commentss', JSON.stringify(comments))
}

function loadComments() {
    if (localStorage.getItem('commentss')) {
        comments = JSON.parse(localStorage.getItem('commentss'))
        showComments()
    }
}

function showComments() {
    let commentField = document.querySelector('.comment-field')
    let out = ''
    comments.forEach(function(item) {
        out += `<div class="comment" style="display: flex">
                    <div class="input-block__user-logo">
                        <img class="input-block__logo-img" src="https://picsum.photos/seed/logo/100" alt="user-logo">
                    </div>
                    <div class="input-block__form">
                        <div class="input-block__other">
                            <div class="input-block__user-name">
                                ${item.name} 
                            </div>
                            <div class="input-block__counter-simbol">
                                ${item.time.toLocaleString()}
                            </div>
                        </div>
                        <div class="input-block__comment-input">
                            <p class='comment-body'>${item.body}</p>
                        </div>
                    </div>
                </div>`
        // out +=`<p class='comment-date'>${item.time.toLocaleString()}</p>`
        // out +=`<p class='input-block__user-name'>${item.name}</p>`
        // out +=`<p class='comment-body'>${item.body}</p>`
    })
    commentField.innerHTML = out
}

