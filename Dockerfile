FROM alpine:3.9

RUN apk add --no-cache \
  nodejs \
  nodejs-npm \
  python \
  py-pip \
  groff \
  less
RUN npm i -g @angular/cli && pip install awscli

WORKDIR /app/src

COPY . .

RUN npm i && \
  rm -rf /app/src/dist && \
  npm run build --prod && \
  cp -R /app/src/dist /app && \
  rm -rf /app/src

ENTRYPOINT aws s3 sync /app/dist/ s3://$AWS_S3_BUCKET
