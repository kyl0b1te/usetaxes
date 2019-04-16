FROM alpine:3.9

RUN apk add --no-cache \
  nodejs \
  nodejs-npm \
  python \
  py-pip \
  groff \
  less
RUN npm i -g @angular/cli && pip install awscli

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i
COPY . .

ENTRYPOINT rm -rf /app/dist && \
  npm run build --prod && \
  aws s3 sync /app/dist/ s3://$AWS_S3_BUCKET
