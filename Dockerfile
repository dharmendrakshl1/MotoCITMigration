# DOCKER-VERSION 0.10.0

FROM ubuntu:14.04

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y nodejs npm git git-core

ADD start.sh /home/ubuntu/node-v0.10.29

RUN chmod +x /home/ubuntu/node-v0.10.29/start.sh

CMD ./home/ubuntu/node-v0.10.29/start.sh
