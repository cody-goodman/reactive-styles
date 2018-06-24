const StyleSheet = require('../src/StyleSheet');

const styleSheet = new StyleSheet({
    desktop: {
        default: {
            form: {
                color: 'blue'
            }
        }
    },
    phone: {
        galaxyS5: {
            form: {
                color: 'white',
                margin: '200px'
            }
        },
        default: {
            form: {
                color: 'yellow',
                height: '100px'
            }
        }
    },
    default: {
        form: {
            color: 'red',
            width: '100px'
        }
    }
});

describe('StyleSheet Tests', () => {

    it('should return default styles when no group or device is matched', () => {
        let expectedStyles = {form: {color: 'red', width: '100px'}};
        let styles = styleSheet.getStyles({matches: []});
        expect(styles).toEqual(expectedStyles);
    });

    it('should return default group styles when no device is matched', () => {
        let expectedStyles = {form: {color: 'blue', width: '100px'}};
        let styles = styleSheet.getStyles({matches: [], group: {name: 'desktop'}});
        expect(styles).toEqual(expectedStyles);
    });

    it('should return styles for matched device', () => {
        let expectedStyles = {form: {color: 'white', margin: '200px', width: '100px', height: '100px'}};
        let styles = styleSheet.getStyles({matches: [{group: {name: 'phone'}, name: 'galaxyS5'}]});
        expect(styles).toEqual(expectedStyles);
    })
});