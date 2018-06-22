const MultiMatchMediaQuery = require("./MultiMatchMediaQuery");

class Device {
    constructor(name, group, width, height, matchListener) {
        this.name = name;
        this.group = group;
        this.width = width;
        this.height = height;

        this.portraitMediaQuery = this.createPortraitMediaQuery();
        this.landscapeMediaQuery = this.createLandscapeMediaQuery();

        this.addMatchListener(matchListener);

        this.getMatch = this.getMatch.bind(this);
        this.addMatchListener = this.addMatchListener.bind(this);
        this.removeMatchListener = this.removeMatchListener.bind(this);
    }

    addMatchListener(listener) {
        if (listener) {
            this.portraitMediaQuery.addListener(listener);
            this.landscapeMediaQuery.addListener(listener);
        }
    }

    removeMatchListener(listener) {
        this.portraitMediaQuery.removeListener(listener)
        this.landscapeMediaQuery.removeListener(listener)
    }

    createPortraitMediaQuery() {
        let mediaQueries = [];
        mediaQueries.push(window.matchMedia(`(width: ${this.width}px)`));
        mediaQueries.push(window.matchMedia(`(height: ${this.height}px)`));
        return new MultiMatchMediaQuery(this.name, mediaQueries)
    }

    createLandscapeMediaQuery() {
        let mediaQueries = [];
        mediaQueries.push(window.matchMedia(`(height: ${this.width}px)`));
        mediaQueries.push(window.matchMedia(`(width: ${this.height}px)`));
        return new MultiMatchMediaQuery(this.name + 'Landscape', mediaQueries)
    }

    getMatch() {
        if (this.portraitMediaQuery.isMatched()) {
            return {group: this.group, name: this.portraitMediaQuery.name};
        } else if (this.landscapeMediaQuery.isMatched()) {
            return {group: this.group, name: this.landscapeMediaQuery.name};
        }
        return false;
    }
}

module.exports = Device;