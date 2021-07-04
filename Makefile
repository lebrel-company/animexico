up:
	cls
	docker-compose up

build:
	docker-compose build

restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker container stop $$(docker container ls -aq)

delete:
	docker container rm $$(docker container ls -aq)

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
