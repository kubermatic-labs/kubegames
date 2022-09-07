import five from 'johnny-five';
import config from './config.js';
import cluster from './cluster.js';

var ports = [
    { id: config.teamA.template, port: "/dev/ttyACM0" }, // this[0]
    { id: config.teamB.template, port: "/dev/ttyACM1" } // this[1]
  ];


const api = new cluster(config.kkp.project);

const boards = new five.Boards(ports).on('ready', function() {
    // does nothing?
    console.log("Start Boards");
  });


setTimeout( function() {

    const motionA = new five.Motion({pin: 2, board: boards[0]} );
    const motionB = new five.Motion({pin: 2, board: boards[1]});
    console.log('motion sensors active')
    motionA.on("motionend", motion => {
        console.log("Motion Team A")
        api.createClusterByTemplate(config.teamA.template, 1).then(data => {
            console.log("Cluster Created for Team A");
        });
    });

    motionB.on("motionend", motion => {
        console.log("Motion Team B ")
        api.createClusterByTemplate(config.teamB.template, 1).then(data => {
            console.log("Cluster Created for Team B");
        });
    });



  }, 5000);
