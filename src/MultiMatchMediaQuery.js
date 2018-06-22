class MultiMatchMediaQuery {
    constructor(name, mediaQueries) {
        this.name = name;
        this.mediaQueries = mediaQueries;
        this.listeners = [];

        this.isMatched = this.isMatched.bind(this);
        this.addListener = this.addListener.bind(this);
        this.removeListener = this.removeListener.bind(this);
        this.handleMediaChange = this.handleMediaChange.bind(this);

        this.matches = this.isMatched();
        this.mediaQueries.forEach(query => query.addListener(this.handleMediaChange))

    }

    isMatched() {
        return this.mediaQueries.every(query => query.matches);
    }

    addListener(listener) {
        if (listener) {
            this.listeners.push(listener);
        }
    }

    removeListener(remove) {
        this.listeners = this.listeners.filter(listener => listener !== remove);
    }

    handleMediaChange() {
        let old = this.matches;
        this.matches = this.isMatched();
        if (old !== this.matches) {
            this.listeners.forEach(callback => callback(this))
        }
    }
}

module.exports = MultiMatchMediaQuery;