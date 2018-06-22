class ReactiveMedia {

    constructor(devices, groups) {
        this.devices = devices;
        this.groups = groups;
        this.mediaChangeListeners = [];
        this.getMatchedMedia = this.getMatchedMedia.bind(this);
        this.onMediaQueryChange = this.onMediaQueryChange.bind(this);
        this.addMediaChangeListener = this.addMediaChangeListener.bind(this);
        this.removeMediaChangeListener = this.removeMediaChangeListener.bind(this);
        this.devices.forEach(device => device.addMatchListener(this.onMediaQueryChange));
        this.groups.forEach(group => group.addMatchListener(this.onMediaQueryChange));
    }

    addMediaChangeListener(listener) {
        this.mediaChangeListeners.push(listener);
    }

    removeMediaChangeListener(remove) {
        this.mediaChangeListeners = this.mediaChangeListeners.filter((listener) => listener !== remove);
    }

    onMediaQueryChange() {
        let newMedia = this.getMatchedMedia();
        if (newMedia && newMedia !== this.matchedMedia) {
            this.matchedMedia = newMedia;
            this.mediaChangeListeners.forEach((listener) => listener.handleMediaChange(this.matchedMedia))
        }
    }

    getMatchedMedia() {
        let matchedDevices = this.devices.filter(device => !!device.getMatch());
        let matches = (matchedDevices && matchedDevices.length > 0) ? matchedDevices.map(device => device.getMatch()) : [];
        let group = this.groups.find(group => group.isMatched());
        return {group: group, matches: matches};
    }

    addDevice(device){
        this.devices.push(device);
    }

    removeDevice(remove){
        this.devices = this.devices.filter(device=> device !== remove);
    }

    addGroup(group){
        this.groups.push(group);
    }

    removeGroup(remove){
        this.groups = this.groups.filter(group=> group !== remove);
    }
}

module.exports =  ReactiveMedia;