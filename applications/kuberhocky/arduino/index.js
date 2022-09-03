import five from 'johnny-five';
import config from './config.js';
import cluster from './cluster.js';

const api = new cluster(config.kkp.project);
// const board = new five.Board();


api.getAllClustersFromProject().then(data => {
    console.log('endline', data);
});

/**
 board.on('ready', function () {
    // Create a new `motion` hardware instance.

    const motion = new five.Motion(2);

    // "calibrated" occurs once, at the beginning of a session,
    motion.on("calibrated", function() {
        console.log("calibrated", Date.now());

    });

    // "motionstart" events are fired when the "calibrated"
    // proximal area is disrupted, generally by some form of movement
    motion.on("motionstart", function() {
        console.log("motionstart", Date.now());
    });

    // "motionend" events are fired following a "motionstart" event
    // when no movement has occurred in X ms
    motion.on("motionend", function() {
        console.log("motionend", Date.now());
    });
});



 **/