########### SCRIPT PARAMETERS
SCRIPT_FOLDER ?= $(shell cd ../gitsubmodules/community-components/components/api/cluster-management-by-api/common-scripts && pwd)
#CLUSTER_APPLY ?= "${SCRIPT_FOLDER}/cluster-apply.sh"
CLUSTER_TEMPLATE_APPLY ?= "${SCRIPT_FOLDER}/cluster-template-create-instance.sh"
#MD_APPLY ?= "${SCRIPT_FOLDER}/md-apply.sh"
#CLUSTER_DELETE ?= "${SCRIPT_FOLDER}/cluster-delete.sh"
CLUSTER_DELETE_ALL ?= "${SCRIPT_FOLDER}/cluster-delete-all.sh"

#### json file names
#KKP_CLUSTER_PAYLOAD=cluster.json
#KKP_CLUSTER_ADDON=addon-*.json
#KKP_CLUSTER_ADD_MACHINE_DEPLOYMENT=machine_deployment*.json

SHELL=/bin/bash
include ./kkp-env.sh
include ./secrets/kkp-token.sh
export


#doc The makefile manage the different operations to the KKP API.
#doc Please ensure your correct configured .kkp-env.sh
#doc Therefore you can find the following operations:
#doc usage: ENV=val make TARGET
#doc

#doc make create-cluster-from-template:
#doc 	creates cluster from a predefined cluster template spec over the KKP API
#doc
.PHONY: create-cluster-from-template-all
create-cluster-from-template-all:
	${CLUSTER_TEMPLATE_APPLY} aws-team-a 1
	${CLUSTER_TEMPLATE_APPLY} gcp-team-b 1

.PHONY: create-cluster-from-template-team-a
create-cluster-from-template-team-a:
	${CLUSTER_TEMPLATE_APPLY} aws-team-a 1

.PHONY: create-cluster-from-template-team-b
create-cluster-from-template-team-b:
	${CLUSTER_TEMPLATE_APPLY} gcp-team-b 1

.PHONY:
count-clusters:
	@echo "------------------"
	@echo "Count of Clusters of Team A: $$(kubectl get cluster -l team=A --no-headers | wc -l)"
	@echo "Count of Clusters of Team B: $$(kubectl get cluster -l team=B --no-headers | wc -l)"
	@echo "------------------"
#doc make delete-all-cluster:
#doc 	delete all clusters in specified project
#doc
.PHONY: delete-all-cluster
delete-all-cluster:
	${CLUSTER_DELETE_ALL} false

#doc delete all clusters via kubectl of this project
.PHONY: delete-all-cluster-kubectl
delete-all-cluster-kubectl:
	KUBECONFIG=${KKP_MASTER_KUBECONFIG} kubectl delete cluster -l project-id=${KKP_PROJECT} #--dry-run

#doc make help:
#doc 	print help
#doc
.PHONY: help
help: Makefile
	@sed -n 's/^#doc//p' $<



######### KKP Management
KKP_MASTER_KUBECONFIG ?= ../../../kubermatic/sig-cs-infra/lab.kubermatic.io/run.lab.kubermatic.io/vault/kubeconfig
KKP_CLUSTER_TEMPLATES ?= ./clustertemplates
KKP_SECRECTS ?= ./secrets
kkp-clustertemplate-apply:
	KUBECONFIG=${KKP_MASTER_KUBECONFIG} kubectl apply -f ${KKP_SECRECTS}
	KUBECONFIG=${KKP_MASTER_KUBECONFIG} kubectl apply -f ${KKP_CLUSTER_TEMPLATES}

######## VAULT
VAULT_ADDR="https://vault.loodse.com"
VAULT_ENGINE_PATH="sig-cs-infra/kubegames"
VAULT_LOCAL="./secrets"
VAULT_SCRIPT="../gitsubmodules/community-components/helper/vault/vault-kv-management.sh"
vault-upload:
	VAULT_ADDR=${VAULT_ADDR} VAULT_ENGINE_PATH=${VAULT_ENGINE_PATH} LOCAL="${VAULT_LOCAL}" \
		${VAULT_SCRIPT} --upload

vault-download:
	VAULT_ADDR=${VAULT_ADDR} VAULT_ENGINE_PATH=${VAULT_ENGINE_PATH} LOCAL="${VAULT_LOCAL}" \
		${VAULT_SCRIPT}

vault-login:
	VAULT_ADDR=${VAULT_ADDR} vault login --method=oidc --path=loodse
