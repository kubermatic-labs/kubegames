import config from './config.js';
import cluster from './cluster.js';

const api = new cluster(config.kkp.project);
api.removeAllClustersFromProject();