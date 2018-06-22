/*
 * *********************************************************************************************************************
 * * Copyright 2017 - 2018 Cody Goodman
 * * LetCodyHandleIt.com
 * *********************************************************************************************************************
 */
const Device = require('./Device');
const DeviceGroup = require('./DeviceGroup');

const DeviceGroups = [
    new DeviceGroup('mobile', {maxWidth: 749}),
    new DeviceGroup('tablet', {minWidth: 650, maxWidth: 991}),
    new DeviceGroup('desktop', {minWidth: 992})
];

const Devices = [
    new Device('galaxyS5', DeviceGroups.mobile, 360, 640),
    new Device('pixel2', DeviceGroups.mobile, 411, 731),
    new Device('pixel2XL', DeviceGroups.mobile, 411, 823),
    new Device('iPhone5', DeviceGroups.mobile, 320, 568),
    new Device('iPhone6', DeviceGroups.mobile, 375, 667),
    new Device('iPhone7', DeviceGroups.mobile, 375, 667),
    new Device('iPhone8', DeviceGroups.mobile, 375, 667),
    new Device('iPhone6Plus', DeviceGroups.mobile, 414, 736),
    new Device('iPhone7Plus', DeviceGroups.mobile, 414, 736),
    new Device('iPhone8Plus', DeviceGroups.mobile, 414, 736),
    new Device('iPhoneX', DeviceGroups.mobile, 375, 812),
    new Device('iPad', DeviceGroups.tablet, 768, 1024),
    new Device('iPadPro', DeviceGroups.tablet, 1024, 1366),
];


module.exports = {
    Devices,
    DeviceGroups
};