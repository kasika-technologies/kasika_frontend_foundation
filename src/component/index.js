import * as utilities from './utilities.js';

class Component {
    debounce = null;
    element;
    template;
    _data;

    constructor(element, options) {
        this.element = element;
        this.template = options.template;
        this.data = new Proxy(options.data, utilities.dataHandler(this));
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = new Proxy(value, utilities.dataHandler(this));
        utilities.debounceRender(this);
        return true;
    }

    render() {
        if (!this.template) {
            console.error("No template.");
            return;
        }

        let element = utilities.getTypeOfObject(this.element) === 'string' ? document.querySelector(this.element) : this.element;
        if (!element) {
            console.log("No element.");
            return;
        }

        let data = utilities.copy(this.data);

        let template;
        if (utilities.getTypeOfObject(this.template) === 'function') {
            template = this.template(data, element, element);
        } else {
            template = this.template;
        }

        if (!['string', 'number'].includes(utilities.getTypeOfObject(template))) {
            return;
        }

        element.innerHTML = template;

        return element;
    }
}

export default Component;