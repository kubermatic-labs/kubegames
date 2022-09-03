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
        const uri = config.kkp.api + '/projects/' + this._projectId + '/dc/' + dc + '/clusters/' + clusterId;
        return https.remove(uri)
    }

    async removeAllClustersFromProject() {
        this.getAllClustersFromProject().then(clusters => {
            clusters.forEach(cluster => {
                this.removeCluster(cluster.id, cluster.spec.cloud.dc);
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
