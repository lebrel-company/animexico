dev:
	docker-compose up

build:
	docker-compose build

stop:
	docker container stop $(docker container ls -aq)

delete:
	docker container rm $(docker container ls -aq)
