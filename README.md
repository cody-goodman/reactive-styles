# Reactive Styles

## Device Group
The DeviceGroup class represents the upper and lower size boundries for a group of devices such as phones or tablets.
Creating a DeviceGroup is simple: 
```javascript
const {DeviceGroup} = require('reactive-styles');
const DeviceGroups = {
    mobile: new DeviceGroup('mobile', {maxWidth: 749}),
    tablet: new DeviceGroup('tablet', {minWidth: 650, maxWidth: 991})
}

```

## Device

The Device class represents a real world device with specified screen size. The device object creates and listens window.matchMedia queries for the height and width of the device screen. It also creates and listens to queries with the specifiece height and width reversed to determine if a device is in landscape orientation so there is no need to create device objects for both portrait and landscape orientations. 
To define Landscape specific styles in a StyleSheet define another set of styles with 'Landscape' appended to the name of the device. (See StyleSheet section for example) 

```javascript
const {Device} = require('reactive-styles');
const DeviceGroups = require('reactive-styles').DefaultSizes.DeviceGroups;
let galaxyS5 = new Device('galaxyS5', DeviceGroups.mobile, 360, 640);
```

## Reactive Media

The reactive media class is a util that essentially wraps window.matchMedia to provide a bit of extra functionality to make responding to changes in window size or orientation easier.

```javascript

const {ReactiveMedia, DefaultSizes} = require('reactive-styles');
let reactiveMedia =  new ReactiveMedia(DefaultSizes.Devices, DefaultSizes.DeviceGroups)

```

Adding or removing groups and devices is easy
```javascript

// add new group and device
let mobile = new DeviceGroup('mobile', {maxWidth: 749});
let galaxyS5 = new Device('galaxyS5', DeviceGroups.mobile, 360, 640);

reactiveMedia.addGroup(mobile);
reactiveMedia.addDevice(galaxyS5);

//remove group and device
reactiveMedia.removeGroup(mobile);
reactiveMedia.removeDevice(galaxyS5);


```

Getting currently matched media
```javascript

let media = reactiveMedia.getMatchedMedia();
/*
media: {
    matches: [],   //an array of Device objects that match the current window size
    group: {}      // a DeviceGroup object that matches the current window size
}
 */
```

Add a listener to handle window size changes
```javascript
let listener = {handleMediaChange: (media)=> {
    //do something
}}
reactiveMedia.addListener(listener)
```


## Creating StyleSheets
StyleSheets are defined as nested JavaScript objects with the top level properties representing the device-groups and a default set of styles. 
Each device group can have multiple devices defined containing their own set of styles as well as a default set of styles specific to that device-group. 
When styles are computed for a device the device specific styles, default styles and device-group default styles are all combined with more specific matches overriding any duplicate styles (device > device-group-default > default)
This behavior makes it possible to define common styles in one place while allowing styles to be added or overridden for specific devices that need to be handled differently.

```javascript
{
    deviceGroup: {
        specificDevice: {
            styles:{}
        },
        default: {
            styles: {}
        }
    },
    default: {
        styles: {}
    }
}

```
### Example StyleSheet

```javascript

const ExampleStyles = {
    desktop:{
        default: {
            title:{
                color: 'blue'
            },
        }
    },
    phone:{
        galaxyS5:{
            title: {
                color: 'yellow'
            },
            subtitle: {
                color: 'yellow'
            }
        },
        galaxyS5Landscape:{
            title: {
                color: 'yellow',
                width: '80%'
            },
            subtitle: {
                color: 'yellow',
                width: '80%'
            }
        },
        default: {
            title: {
                width: '100%'
            },
            subtitle: {
                width: '100%'
            }
        }
    },
    default: {
        title: {
            color: 'red',
            width: '50%'
        },
        subtitle: {
            color: 'red',
            width: '50%'
        }
    }
}

module.exports = new StyleSheet(ExampleStyles);

```

Get Styles for Current Media
```javascript
const exampleStyles = require('./ExampleStyles');
let styles = exampleStyles.getStyles(reactiveMedia.getMatchedMedia());
```

styles (desktop)
```javascript
{
    title:{
        color: 'blue',
        width: '50%'
    },
    subtitle: {
        color: 'red',
        width: '50%'
    }
}
```
styles (galaxyS5)
```javascript
{
    title: {
        color: 'yellow',
        width: '100%'
    },
    subtitle: {
        color: 'yellow',
        width: '100%'
    }    
}
```
styles (galaxyS5Landscape)
```javascript
{
    title: {
        color: 'yellow',
        width: '80%'
    },
    subtitle: {
        color: 'yellow',
        width: '80%'
    }    
}
```

styles (mobile: no matching device)
```javascript
{
    title: {
       width: '100%',
       color: 'red'
    },
    subtitle: {
       width: '100%',
       color: 'red'
    } 
}
```

## Using Reactive Styles with React Components
```javascript

class SomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {styles: this.props.styleSheet.getStyles(this.props.reactiveMedia.getMatchedMedia())}
    }
    
    componentDidMount(){
        this.props.reactiveMedia.addListener(this)
    }
    
    componentWillUnmount(){
        this.props.reactiveMedia.removeListener(this)
    }
    
    handleMediaChange(media){
        this.setState({styles: this.props.styleSheet.getStyles(media)});
    }
    
    render(){
        return (
            <div>
                <h1 style={this.state.styles.title}>Styled Title</h1>
                <h2 style={this.state.styles.subtitle}>Styled Sub-Title</h2>
            </div>
        )
    }
}

```
