
let textArea: HTMLElement = <HTMLElement> document.querySelector('.input-block__input')

textArea.addEventListener("input", function() {
    textArea.style.height = 'auto'
    textArea.style.height = (textArea.scrollHeight - 40) + 'px'
})


