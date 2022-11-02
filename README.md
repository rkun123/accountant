# 初期化

## `sql-migrate`

```bash
docker compose exec sql-migrate up
```

```bash
docker compose exec db mysql -h db -u accountant -p accountant
```

# 機能追加
## 1. `graph/schema.resolvers.go` に定義を追加
`type` / `input` / `query` / `Mutation` に定義を追加していく

## 2. `graph/operations.graphql` に定義を追加
`query`で定義を追加

## 3. Go側の型とresolver定義を生成
1. `go run github.com/99designs/gqlgen generate`
2. `cd client && yarn generate`