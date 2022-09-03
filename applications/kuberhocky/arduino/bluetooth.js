const noble = require('@abandonware/noble');

const formatRSSI = (rssi) => {
    const signal = 2 * (rssi + 100);
    if (signal > 100) {
        return 100;
    }
    return signal;
};

const discoverDevices = function() {
    noble.on('stateChange', (state) => {
        if (state === 'poweredOn') {
            console.log('Looking for Bluetooth devices');
            noble.startScanning([], false);
        } else {
            noble.stopScanning();
        }
    });


    noble.on('discover', (peripheral) => {
        const id = process.platform === 'darwin' ? peripheral.id : peripheral.address;
        console.log(`[${new Date()}] ID: ${id}\tSignal: ${formatRSSI(peripheral.rssi)}%\tName: ${peripheral.advertisement.localName}`);
    });

}

discoverDevices();