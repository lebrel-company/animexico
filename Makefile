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
