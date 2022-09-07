import https from './helper.js'
import config from "./config.js";


export default class Cluster {
    constructor(projectId) {
        this._projectId = projectId
    }

    async createClusterTemplate(clusterTemplate) {
        const uri = config.kkp.api + '/projects/' + this._projectId + '/clustertemplates';
        return https.post(uri, clusterTemplate)
    }

    async createClusterByTemplate(templateId, replicas) {
        const uri = config.kkp.api + '/projects/' + this._projectId + '/clustertemplates/' + templateId + '/instances';
        return https.post(uri, {"replicas": replicas})
    }

    async removeCluster(clusterId, dc) {
        const uri = config.kkp.api + '/projects/' + this._projectId + '/clusters/' + clusterId;
        return https.remove(uri)
    }

    async removeAllClustersFromProject() {
        const promises = [];
        this.getAllClustersFromProject().then(clusters => {
            clusters.forEach(cluster => {
                console.log(cluster.id);
                promises.push(this.removeCluster(cluster.id));
               
            });
            Promise.all(promises).then((values) => {
                console.log("Deleted Clusters ", values.length);
                
              });
        })
       


    }

    getAllClustersFromProject() {
        const uri = config.kkp.api + '/projects/' + this._projectId + '/clusters';

        return new Promise(function (resolve, reject) {
            return https.get(uri)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                })
        })


    }
}
