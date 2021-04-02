import * as dom from './dom.js';
import * as utilities from './utilities.js';

class Component {
    attached = [];
    debounce = null;
    element;
    template;
    _data;
    state;

    constructor(element, options) {
        this.attachTo = options.attachTo ? (utilities.getTypeOfObject(options.attachTo) === 'array' ? options.attachTo : [options.attachTo]) : [];
        this.element = element;
        this.template = options.template;
        this.state = options.state;
        this.isSharedState = options.isSharedState ? true : false;

        this._data = null;

        if (options.data && !options.state) {
            this._data = new Proxy(options.data, utilities.dataHandler(this));
        }

        if (this.state) {
            this.state.attach(this);
        }

        if (this.attachTo.length) {
            this.attachTo.forEach(a => {
                a.attach(this);
            })
        }
    }

    get data() {
        return this._data;
    }

    set data(value) {
        if (this.state) return true;
        this._data = new Proxy(value, utilities.dataHandler(this));
        utilities.debounceRender(this);
        return true;
    }

    attach(component) {
        let attachments = utilities.getTypeOfObject(component) === 'array' ? component : [component];
        for (let attachment of attachments) {
            this.attached.push(attachment);
        }
    }

    detach(component) {
        let attachments = utilities.getTypeOfObject(component) === 'array' ? component : [component];
        for (let attachment of attachments) {
            const index = this.attached.indexOf(attachment);
            if (index < 0) return;
            this.attached.splice(index, 1);
        }
    }

    render() {
        if (this.isSharedState) {
            dom.renderAttachments(this.attached, this);
            return;
        }

        if (!this.template) {
            console.error("No template.");
            return;
        }

        let element = utilities.getTypeOfObject(this.element) === 'string' ? document.querySelector(this.element) : this.element;
        if (!element) {
            console.log("No element.");
            return;
        }

        let data = utilities.copy((this.state ? this.state.data : this.data));

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

        dom.renderAttachments(this.attached, this);

        return element;
    }
}

export default Component;