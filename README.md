# Deploy Rabbitmq in kubernetes

## Deployer un cluster rabbitMQ

### Intstallation

```sh
kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"
```

### Création du cluster

```sh
apiVersion: rabbitmq.com/v1beta1
kind: RabbitmqCluster
metadata:
  name: production-rabbitmqcluster
spec:
  replicas: 3
  resources:
    requests:
      cpu: 500m
      memory: 1Gi
    limits:
      cpu: 1
      memory: 2Gi
  rabbitmq:
    additionalConfig: |
      log.console.level = info
      channel_max = 1700
      default_user= guest
      default_pass = guest
      default_user_tags.administrator = true
  service:
    type: LoadBalancer
```

### Déployer le projet `rabbit-receiver`

Créer un pod se connectant au rabbitMQ.

Et tester la connection avec le script `send.js`.

### Auto scaling

On veut maintenant faire monter à l'échelle automatiquement le projet receiver.

=> créer un <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">autoscaler</a> pour le déploiement du projet.
