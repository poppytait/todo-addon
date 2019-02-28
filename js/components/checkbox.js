class Checkbox {
    constructor(info) {
        this.uniqId = info.uniqId;
        this.name = info.name;
        this.contentCheckbox = info.contentCheckbox;
        this.removeButton = '';
        this.checkBoxButton = ''
        this.listElement = '';

        this.render();
        this.initEvents();
    }

    initEvents() {
        this.remove();
    }

    remove() {
        this.removeButton.addEventListener('click', () => {
            removeElement(this.listElement);
            triggerEventDelete(this.uniqId);
        });
    }

    render() {
        document.getElementById(this.contentCheckbox)
            .insertAdjacentHTML('beforeend', createList(this.uniqId, this.name));

        this.postRender();
    }

    postRender() {
        this.removeButton = document.getElementById(`remove-${this.uniqId}`);
        this.checkButton = document.getElementById(`checkbox-${this.uniqId}`);
        this.listElement = document.getElementById(`list-${this.uniqId}`);
    }
}

const createList = (uniqId, name) =>{
    return `<li id="list-${uniqId}" >${name}<button class="remove" id="remove-${uniqId}">x</button>
    <input type="checkbox" id="checkbox-${uniqId}">
    <p class="complete" style="display:none">complete</p></li>`;
}

const removeElement = (element) => {
    element && element.parentNode && element.parentNode.removeChild(element);
}

const triggerEventDelete = (uniqId) => {
    var event = new CustomEvent('deleteCheckbox', { 'detail': uniqId });
    document.dispatchEvent(event);
}

export default Checkbox;