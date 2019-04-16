# Usetaxes

Ukrainian self-employed tax calculator.
Ukraine has 3 self-employment financial groups.
Usetaxes provides calculation only for 3-rd group (the most popular in IT).

Project has been built with privacy concepts in mind.
All user data is private and usetaxes do not send income information anywhere.

## Features

- total income, tax and profit calculation
- automatic currency conversion with NBU rate

## Deployment

Deployment can be made by using docker.

Execute this command for build a new docker image:

`docker build -t usetaxes .`

And this one for run a container that will deploy project into the S3 bucket:

`docker run --rm -it --env-file .env usetaxes`

Note, for deployment you have to create your personal `.env` file, you can use `.env.example` as a template.

## Contributions

All kind of contributions are welcome.

