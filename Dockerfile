FROM golang:1.18-bullseye

RUN go install github.com/cosmtrek/air@v1.40.4
RUN go install github.com/rubenv/sql-migrate/...@latest

WORKDIR /app

CMD [ "air", "-c", ".air.toml"]