up:
	cls
	docker-compose up

build:
	docker-compose build

run-mongo:
	docker run -d -p 27017:27017 mongo

dbs:
	docker build \
	-t jairanpo/tamashii-test \
	-f .\server\Dockerfile \
	.\server

GRAPHQL_PORT = 4000
MONGODB = mongodb://localhost:27017/database
drs:
	docker run \
    --env MONGODB=$(MONGODB) \
    --env GRAPHQL_PORT=$(GRAPHQL_PORT) \
    --env CI=true \
    --publish $(GRAPHQL_PORT):$(GRAPHQL_PORT) \
    --name jairanpo/tamashii-test \
    jairanpo/tamashii-test

ci:
	cls
	make down
	make run-mongo
	make dbs
	make drs
	docker run \
	--name ci-api \
    --network host \
    --env MONGODB=$(MONGODB) \
    --env GRAPHQL_PORT=$(GRAPHQL_PORT) \
    --env CI=true \
    --name tamashii-test \
    jairanpo/tamashii-test \
    npm test -- --coverage



restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker container stop $$(docker container ls -aq)

delete:
	docker container rm $$(docker container ls -aq)

build-server:
	yarn --cwd server run build

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
