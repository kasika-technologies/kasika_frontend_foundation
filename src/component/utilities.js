const copy = (o, allowHTML) => {
    const cloneArray = () => {
        return o.map(item => {
            return copy(item, allowHTML);
        })
    }

    const cloneFunction = () => {
        let clone = o.bind(this);
        copyProperties(clone);
        return clone;
    }

    const cloneMap = () => {
        let clone = new Map();
        for (let [k, v] of o) {
            clone.set(k, copy(v, allowHTML));
        }
        return clone;
    }

    const cloneObject = () => {
        let clone = {};
        copyProperties(clone);
        return clone;
    }

    const cloneSet = () => {
        let clone = new Set();
        for (let item of set) {
            clone.add(copy(item, allowHTML));
        }
        return clone;
    }

    const copyProperties = clone => {
        for (let key in o) {
            if (o.hasOwnProperty(key)) {
                clone[key] = copy(o[key], allowHTML);
            }
        }
    }

    const sanitizeString = () => {
        return o.replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, function (c) {
            return `&#${c.charCodeAt(0)};`;
        });
    }

    const type = getTypeOfObject(o);

    switch (type) {
        case 'array':
            return cloneArray();
            break;
        case 'function':
            return cloneFunction();
            break;
        case 'map':
            return cloneMap();
            break;
        case 'object':
            return cloneObject();
            break;
        case 'set':
            return cloneSet();
            break;
        case 'string':
            if (!allowHTML) {
                return sanitizeString();
            } else {
                return o;
            }
            break;
        default:
            return o;
            break;
    }
}

const dataHandler = instance => {
    return {
        get(object, property) {
            if (['object', 'array'].indexOf(getTypeOfObject(object[property])) > -1) {
                return new Proxy(object[property], dataHandler(instance));
            }
            return object[property];
        },
        set(object, property, value) {
            if (object[property] === value) {
                return true;
            }
            object[property] = value;
            instance.render();
            return true;
        }
    }
}

const debounceRender = (buhin) => {
    if (buhin.debounce) {
        window.cancelAnimationFrame(buhin.debounce);
    }

    buhin.debounce = window.requestAnimationFrame(() => {
        buhin.render();
    })
}

const getTypeOfObject = o => {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

export {copy, dataHandler, debounceRender, getTypeOfObject}
