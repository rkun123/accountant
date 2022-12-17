package utils

import (
	"database/sql"
	"fmt"
)

func HandleErrorWithRollback(tx *sql.Tx, err error) error {
	if rollbackErr := tx.Rollback(); rollbackErr != nil {
		return fmt.Errorf("rollback err: %w", err)
	}
	return err
}
