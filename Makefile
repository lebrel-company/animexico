up:
	cls
	docker-compose up

build:
	docker-compose build

run-mongo:
	docker run -d -p 27017:27017 mongo

SERVER_PORT=4000
DIR=${CURDIR}
DOCKER_USERNAME=jairanpo
TA_SERVER=tamashii-server
TA_SERVER_TEST=tamashii-server-test


#---------------------------------------------------------------------------
docker-build-server:
	docker build \
	-t $(DOCKER_USERNAME)/$(TA_SERVER) \
	-f .\server\Dockerfile \
	.\server

docker-build-server-test:
	docker build \
	-t $(DOCKER_USERNAME)/$(TA_SERVER_TEST) \
	-f .\server\Dockerfile.test \
	.\server

docker-run-server:
	docker run \
	--rm \
	--detach \
	--publish $(SERVER_PORT):$(SERVER_PORT) \
	--volume $(DIR)/server/.env:/app/.env \
	--env CI=true \
	--env PORT=$(SERVER_PORT) \
	$(DOCKER_USERNAME)/$(TA_SERVER)

#---------------------------------------------------------------------------
# Continuous integration execution trying to emulate travisCI:

ci:
	make docker-build-server
	make docker-build-server-test
	make docker-run-server
	docker run \
    --rm \
	--volume $(DIR)/server/.env:/app/.env \
    --env CI=true \
    $(DOCKER_USERNAME)/$(TA_SERVER)
	docker build \
	-t $(DOCKER_USERNAME)/$(TA_SERVER_TEST) \
	-f .\server\Dockerfile.dev \
	.\server
	make  docker-run-server

#---------------------------------------------------------------------------

restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker stop $(docker ps -aq)

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
