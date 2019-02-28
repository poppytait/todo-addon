import Checkbox from './checkbox';
var uniqid = require('uniqid');

const todoColection = [];

class Todo {
    constructor(elements) {
        this.input = document.getElementById(elements.input);
        this.contentCheckbox = elements.contentCheckbox;
        this.initEvents();
        this.initCheckboxKeeped();
    }

    initCheckboxKeeped() {
        if(existLocalStorage) {
            JSON.parse(localStorage.getItem('todo')).forEach(element => {
                newCheckbox({
                    uniqId: element.uniqId,
                    name: element.name,
                    contentCheckbox: element.contentCheckbox,
                    input: this.input
                });
            });
        }
    }

    initEvents() {
        this.onPressKey();
        this.onDelete();
    }

    onPressKey() {
        this.input.addEventListener('keypress', (event) => {
            if(pressEnter(event)) {
                newCheckbox({
                    uniqId: uniqid(),
                    name: getInputValue(this.input),
                    contentCheckbox: this.contentCheckbox,
                    input: this.input
                });

                clearInputValue(this.input);
                createLocalStorage(todoColection);
            }
        });
    }

    onDelete() {
        this.input.addEventListener('deleteCheckbox', (event) => {
            todoColection.filter((el, index) => {
                if (el.uniqId == event.detail) {
                    todoColection.splice(index, 1);
                }
            });

            createLocalStorage(todoColection);
        });
    }
}

const newCheckbox = (info) => {
    todoColection.push(
        new Checkbox({
            uniqId: info.uniqId,
            name: info.name,
            contentCheckbox: info.contentCheckbox,
            input: info.input
        })
    );
}

const existLocalStorage = () => {
    return localStorage.getItem('todo') !== undefined;
}

const createLocalStorage = (todoColection) => {
    localStorage.setItem('todo', JSON.stringify(todoColection));
}

const clearInputValue = (input) => {
    input.value = '';
}

const getInputValue = (input) => {
    return input.value;
}
const pressEnter = (event) => {
    return  event.keyCode === 13;
}

export default Todo;