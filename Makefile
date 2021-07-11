up:
	cls
	docker-compose up

build:
	docker-compose build

run-mongo:
	docker run -d -p 27017:27017 mongo

SERVER_PORT = 4000
DIR = ${CURDIR}

docker-build-server:
	docker build \
	-t jairanpo/tamashii-server \
	-f .\server\Dockerfile \
	.\server

docker-run-server:
	docker run \
	-v $(DIR)/server/.env:/app/.env \
    --publish 4000:$(SERVER_PORT) \
    jairanpo/tamashii-server

ci:
	cls
	docker build \
	-t jairanpo/tamashii-server \
	-f .\server\Dockerfile.dev \
	.\server
	make  docker-run-server
	yarn --cwd server run test

restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker container stop $$(docker container ls -aq)

delete:
	docker container rm $$(docker container ls -aq)

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
