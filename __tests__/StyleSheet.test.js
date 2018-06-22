const StyleSheet = require('../src/StyleSheet');

test('this is a test', () => {
    let styleSheet = new StyleSheet({
        desktop: {
            default: {
                form: {
                    color: 'blue'
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
    let styles = styleSheet.getStyles({matches: [], group: {name: 'desktop'}})
    expect(styles.form.color).toBe('blue')
    expect(styles.form.width).toBe('100px')
});