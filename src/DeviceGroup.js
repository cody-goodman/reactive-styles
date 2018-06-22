const MultiMatchMediaQuery = require("./MultiMatchMediaQuery");

class DeviceGroup {

    constructor(name, sizes) {
        this.name = name;
        this.minWidth = sizes.minWidth;
        this.minHeight = sizes.minHeight;
        this.maxWidth = sizes.maxWidth;
        this.maxHeight = sizes.maxHeight;
        this.mediaQuery = this.createMediaQuery();

        this.isMatched = this.isMatched.bind(this);
        this.addMatchListener = this.addMatchListener.bind(this)
        this.removeMatchListener = this.removeMatchListener.bind(this)

    }

    addMatchListener(listener) {
        this.mediaQuery.addListener(listener);
    }

    removeMatchListener(listener) {
        this.mediaQuery.removeListener(listener);
    }

    createMediaQuery() {
        let mediaQueries = [];
        if (this.minWidth) {
            mediaQueries.push(window.matchMedia(`(min-width: ${this.minWidth}px)`));
        }
        if (this.minHeight) {
            mediaQueries.push(window.matchMedia(`(min-height: ${this.minHeight}px)`));
        }
        if (this.maxWidth) {
            mediaQueries.push(window.matchMedia(`(max-width: ${this.maxWidth}px)`));
        }
        if (this.maxHeight) {
            mediaQueries.push(window.matchMedia(`(max-height: ${this.maxHeight}px)`));
        }
        return new MultiMatchMediaQuery(this.name, mediaQueries);
    }

    isMatched() {
        return this.mediaQuery.isMatched()
    }
}

module.exports = DeviceGroup;