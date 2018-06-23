# Functions

list of functions for openfaas

## function list

play with neo4j and s2

### neo4j-register

insert user data to neo4j

### neo4j-login

login via neo4j

### neo4j-gql

graphql endpoint

### s2-cover-rect

using jaigouk/s2 image and python swig, it returns cellIDs

## SETUP (local os x)

```sh
# install faas
git clone https://github.com/openfaas/faas
cd faas && git checkout master && ./deploy_stack.sh
docker service ls
# install faas-cli
curl -sL cli.openfaas.com | sudo sh
# install grafana
docker service create -d \
--name=grafana \
--publish=3000:3000 \
--network=func_functions \
stefanprodan/faas-grafana:4.6.3

cd .. && cd functions
make
make push
faas-cli deploy -f ./stack.yml
```

## dev

for node.js functions, you need to check this [article](https://www.smashingmagazine.com/2018/06/nodejs-tools-techniques-performance-servers/?utm_source=DailyDrip+Homepage+Newsletter&utm_campaign=7c83611c11-EMAIL_CAMPAIGN_2018_03_22_COPY_02&utm_medium=email&utm_term=0_1e4a41c1c6-7c83611c11-161638545)


for testing s2-cover-rect,

```console
nosetests s2-cover-rect/function/test_handler.py -v--nocapture
```

deleting all services including openfaas

```console
docker service rm $(docker service ls -q)
docker service ls
docker system prune -a
```

## todo
- [] use [polly.js](https://netflix.github.io/pollyjs/#/) for node.js functions