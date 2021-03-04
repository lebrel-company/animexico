dev:
	docker-compose up

build:
	docker container stop $(docker container ls -aq)
	docker container rm $(docker container ls -aq)
	docker-compose build