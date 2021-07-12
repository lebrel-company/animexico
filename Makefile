up:
	cls
	docker-compose up

build:
	docker-compose build

run-mongo:
	docker run -d -p 27017:27017 mongo

API_PORT=4000
DIR=${CURDIR}
DOCKER_USERNAME=jairanpo
API_NAME=tamashii-api
INT_NAME=tamashii-integrations
NETWORK_NAME=api-network

#---------------------------------------------------------------------------

docker-create-network:
	docker network create $(NETWORK_NAME)

docker-build-server:
	docker build \
	-t $(DOCKER_USERNAME)/$(API_NAME) \
	-f .\server\Dockerfile \
	.\server

docker-build-server-test:
	docker build \
	-t $(DOCKER_USERNAME)/$(INT_NAME) \
	-f .\server\Dockerfile.test \
	.\server

docker-run-server:
	docker run \
	--rm \
	--detach \
	--network $(NETWORK_NAME) \
	--name $(API_NAME) \
	--publish $(API_PORT):$(API_PORT) \
	--volume $(DIR)/server/.env:/app/.env \
	--env CI=true \
	--env PORT=$(API_PORT) \
	$(DOCKER_USERNAME)/$(API_NAME)

docker-run-server-test:
	docker run \
	--rm \
	--network $(NETWORK_NAME) \
	--volume $(DIR)/server/.env:/app/.env \
	--env CI=true \
	--env API_PORT=$(API_PORT) \
	--env API_HOST=$(API_NAME) \
	$(DOCKER_USERNAME)/$(INT_NAME)


#---------------------------------------------------------------------------
# Continuous integration execution trying to emulate travisCI:

ci:
	cls
	make docker-build-server
	make docker-run-server
	make docker-build-server-test
	make docker-run-server-test


#---------------------------------------------------------------------------

restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker stop $$(docker ps -aq)

delete:
	docker rm $(docker ps -aq)

start-server:
	yarn --cwd server run build
	yarn --cwd server run start

tc:
	cls
	yarn --cwd client run test

ts:
	cls
	yarn --cwd server run test

tcart:
	cls
	yarn --cwd server run test-cart

torder:
	cls
	yarn --cwd server run test-order

tauth:
	cls
	yarn --cwd server run test-signup

tprod:
	cls
	yarn --cwd server run test-prod

seed:
	cls
	yarn --cwd server run seed

drop:
	cls
	yarn --cwd server run drop
