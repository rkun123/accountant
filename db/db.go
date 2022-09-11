package db

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB = nil
var dbConf = "accountant:accountant@tcp(db:3306)/accountant?charset=utf8mb4&collation=utf8mb4_general_ci&parseTime=true&loc=Asia%2FTokyo"

func GetDB() *sql.DB {
	return db
}

func Init() error {
	_db, err := sql.Open("mysql", dbConf)
	if err != nil {
		return err
	}

	db = _db
	return nil
}
