# #!/bin/sh

# based on
# https://github.com/openfaas/faas/blob/master/guide/deployment_digitalocean.md
# https://docs.docker.com/machine/drivers/digital-ocean/
for i in 1 2 3; do
    docker-machine create \
        --driver digitalocean \
        --digitalocean-tags openfaas \
        --digitalocean-region=fra1 \
        --digitalocean-size 1gb \
        --digitalocean-access-token $DOTOKEN \
        --digitalocean-private-networking=true \
        --digitalocean-monitoring=true \
        machine-$i;
done
        # --digitalocean-image ubuntu-16-04 \

# docker-machine ssh machine-1
# docker-machine rm machine-1 machine-2 machine-3