up:
	cls
	docker-compose up

build:
	docker-compose build

build-server:
	docker build \
	-t jairanpo/tamashii-test \
	-f .\server\Dockerfile.dev \
	.\server

run-server:
	docker run \
    --network host \
    --env NODE_ENV=CI \
    --env MONGO_HOST=mongodb://localhost \
    --env MONGO_PORT=27017 \
    --env MONGO_DB=database \
    --env GRAPHQL_PORT=4000 \
    --env CI=true \
    jairanpo/tamashii-test \
    npm test -- --coverage

ci:
	make build-server
	make run-server


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
