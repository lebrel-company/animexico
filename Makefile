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

ts-cart:
	cls
	yarn --cwd server run test-cart

ts-order:
	cls
	yarn --cwd server run test-order

ts-signup:
	cls
	yarn --cwd server run test-signup

seed:
	cls
	yarn --cwd server run seed

drop:
	cls
	yarn --cwd server run drop
