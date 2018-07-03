import { EventEmitter } from 'events';

class Store extends EventEmitter {
    constructor() {
        super();
        this.path = null;
    };

    getAll() {
        return this.path;
    }

    setCategory(categories) {
        this.path = categories;
        this.emit('change');
    }
}

const store = new Store();

export default store;
