up:
	docker-compose up

build:
	docker-compose build

restart:
	docker-compose restart

restart:
	docker-compose restart

down:
	docker-compose down

stop:
	docker container stop $$(docker container ls -aq)

delete:
	docker container rm $$(docker container ls -aq)

ts:
	yarn --cwd client run tests
