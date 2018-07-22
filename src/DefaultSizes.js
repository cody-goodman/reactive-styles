const Device = require('./Device');
const DeviceGroup = require('./DeviceGroup');

const mobile = new DeviceGroup('mobile', {maxWidth: 749});
const tablet = new DeviceGroup('tablet', {minWidth: 650, maxWidth: 991});
const desktop = new DeviceGroup('desktop', {minWidth: 992});
const DeviceGroups = [mobile, tablet, desktop];

const Devices = [
    new Device('galaxyS5', mobile, 360, 640),
    new Device('pixel2', mobile, 411, 731),
    new Device('pixel2XL', mobile, 411, 823),
    new Device('iPhone5', mobile, 320, 568),
    new Device('iPhone6', mobile, 375, 667),
    new Device('iPhone7', mobile, 375, 667),
    new Device('iPhone8', mobile, 375, 667),
    new Device('iPhone6Plus', mobile, 414, 736),
    new Device('iPhone7Plus', mobile, 414, 736),
    new Device('iPhone8Plus', mobile, 414, 736),
    new Device('iPhoneX', mobile, 375, 812),
    new Device('iPad', tablet, 768, 1024),
    new Device('iPadPro', tablet, 1024, 1366),
];


module.exports = {
    Devices,
    DeviceGroups
};