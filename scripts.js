const input = document.querySelector('.input')
const addButton = document.querySelector('.add')
const container = document.querySelector('.container')

function addTarefa(nome) {
    const itemTarefa = document.createElement('div')
    itemTarefa.classList.add('item')

    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'text'
    inputTarefa.disabled = true
    inputTarefa.value = nome
    inputTarefa.classList.add('item-input')

    const editButton = document.createElement('button')
    editButton.classList.add('edit')
    editButton.innerText = 'EDITAR'
    editButton.addEventListener('click', () => editTarefa(inputTarefa, nome))

    const removeButton = document.createElement('button')
    removeButton.classList.add('remove')
    removeButton.innerText = 'REMOVER'
    removeButton.addEventListener('click', () => removerTarefa(itemTarefa, nome))

    container.append(itemTarefa)
    itemTarefa.append(inputTarefa)
    itemTarefa.append(editButton)
    itemTarefa.append(removeButton)
}



function editTarefa(inputTarefa, nome) { 
    inputTarefa.disabled = !inputTarefa.disabled
    if (!inputTarefa.disabled) {
        const index = todos.indexOf(nome)
        todos[index] = inputTarefa.value
        saveTodos()
    }
}

function removerTarefa(item, nome) {
    item.parentNode.removeChild(item)
    const index = todos.indexOf(nome)
    todos.splice(index, 1)
    saveTodos()
}

function checkInput() {
    const inputValue = input.value
    if (inputValue !== '') {
        addTarefa(inputValue)
        todos.push(inputValue)
        // salvando no localstorage
        localStorage.setItem('todos', JSON.stringify(todos))
        saveTodos()
        input.value = ''
        input.focus()
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}


addButton.addEventListener('click', checkInput)
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkInput()
    }
})

const todos = JSON.parse(localStorage.getItem('todos')) || []
for (const task of todos) {
    addTarefa(task)
}