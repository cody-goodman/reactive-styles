const assign = require('deep-assign');

class StyleSheet {

    constructor(styles) {
        this.styles = styles;
    }

    getStyles(media) {
        let styles = JSON.parse(JSON.stringify(this.styles));
        let defaultStyles = styles.default;

        // Find the first matched device for which there is a defined style
        let device = false;
        if (media.matches) {
            device = media.matches.find(device => {
                let styleGroup = styles[device.group.name];
                return styleGroup ? styleGroup[device.name] : false
            });
        }

        if (device) {
            // if a matched devices has defined styles return those styles (combined with any missing defaults)
            let deviceStyles = styles[device.group.name][device.name];
            let defaultGroupStyles = styles[device.group.name].default;
            return assign({}, defaultStyles, defaultGroupStyles, deviceStyles);
        } else if (media.group && styles[media.group.name]) {
            // if no devices match or styles are not defined, return default styles for group
            return assign({}, defaultStyles, styles[media.group.name].default)
        }
        // if both group and device is not matched or styles are undefined return default styles
        return defaultStyles;
    }
}

module.exports = StyleSheet;