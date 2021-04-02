let Event = {};
let activeEvents = {};

const executable = (target, selector) => {
    if ([
        '*',
        'window',
        'document',
        'document.documentElement',
        window,
        document,
        document.documentElement
    ].indexOf(selector) > -1) return true;

    if (typeof selector !== 'string' && selector.contains) {
        return selector === target || selector.contains(taarget);
    }

    return target.closest(selector);
}

const getIndex = (array, selector, callback) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].selector === selector && array[i].callback.toString() === callback.toString()) {
            return i;
        }
        return -1;
    }
}

const handler = event => {
    if (!activeEvents[event.type]) return;
    activeEvents[event.type].forEach(listener => {
        if (!executable(event.target, listener.selector)) return;
        listener.callback(event);
    })
}

Event.get = () => {
    let o = {};
    for (let type in activeEvents) {
        if (activeEvents.hasOwnProperty(type)) {
            o[type] = activeEvents[type];
        }
    }
    return o;
}

Event.on = (types, selector, callback) => {
    if (!selector || !callback) return;

    types.split(',').forEach(type => {
        type = type.trim();
        if (!activeEvents[type]) {
            activeEvents[type] = [];
            window.addEventListener(type, handler, true);
        }

        activeEvents[type].push({
            selector,
            callback
        })
    })
}

Event.once = (types, selector, callback) => {
    Event.on(types, selector, function temp(event) {
        callback(event);
        Event.off(types, selector, temp);
    })
}

Event.off = (types, selector, callback) => {
    types.split(',').forEach(type => {
        type = type.trim();

        if (!activeEvents[type]) return;

        if (activeEvents[type].length < 2 || !selector) {
            delete activeEvents[type];
            window.removeEventListener(type, handler, true);
            return;
        }

        const index = getIndex(activeEvents[type], selector, callback);
        if (index < 0) return;
        activeEvents[type].splice(index, 1);
    })
}

export default Event;