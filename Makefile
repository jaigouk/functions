TAG?=latest

all:
	cd contrib && ./ci.sh

push:
	cd contrib && ./docker-push.sh

deploy:
	cd contrib && ./deploy.sh