package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/rkun123/accountant/db"
	"github.com/rkun123/accountant/graph/generated"
	"github.com/rkun123/accountant/graph/model"
	"github.com/rkun123/accountant/utils"
)

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateAccount(ctx context.Context, input model.NewAccount) (*model.Account, error) {
	con := db.GetDB()
	tx, err := con.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Commit()

	sql := `
	INSERT INTO accounts(genre_id, amount, description)
	VALUES (?, ?, ?)
	`
	result, err := tx.Exec(sql, input.GenreID, input.Amount, input.Description)
	if err != nil {
		return nil, utils.HandleErrorWithRollback(tx, err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, utils.HandleErrorWithRollback(tx, err)
	}

	selectRow := tx.QueryRow(`SELECT id, amount, description, created_at, genre_id FROM accounts WHERE id = ?`, id)

	account := &model.Account{
		Genre: &model.Genre{},
	}

	if err := selectRow.Scan(&account.ID, &account.Amount, &account.Description, &account.CreatedAt, &account.Genre.ID); err != nil {
		return nil, utils.HandleErrorWithRollback(tx, err)
	}

	genreRow := tx.QueryRow(`SELECT id, title FROM genres WHERE id = ?`, account.Genre.ID)

	if err := genreRow.Scan(&account.Genre.ID, &account.Genre.Title); err != nil {
		return nil, utils.HandleErrorWithRollback(tx, err)
	}

	return account, nil
}

// CreateGenre is the resolver for the createGenre field.
func (r *mutationResolver) CreateGenre(ctx context.Context, input model.NewGenre) (*model.Genre, error) {
	con := db.GetDB()
	tx, err := con.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Commit()

	result, err := tx.Exec(`INSERT INTO genres(title) VALUES (?)`, input.Title)
	if err != nil {
		return nil, utils.HandleErrorWithRollback(tx, err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, utils.HandleErrorWithRollback(tx, err)
	}

	row := tx.QueryRow(`SELECT id, title FROM genres WHERE id = ?`, id)

	genre := &model.Genre{}

	if err := row.Scan(&genre.ID, &genre.Title); err != nil {
		return nil, utils.HandleErrorWithRollback(tx, err)
	}

	return genre, nil

}

// DeleteAccount is the resolver for the deleteAccount field.
func (r *mutationResolver) DeleteAccount(ctx context.Context, id int) (int, error) {
	con := db.GetDB()
	tx, err := con.Begin()
	if err != nil {
		return 0, err
	}
	defer tx.Commit()

	result, err := tx.Exec(`DELETE FROM accounts WHERE id = ?`, id)
	if err != nil {
		return 0, utils.HandleErrorWithRollback(tx, err)
	}

	deletedId, err := result.LastInsertId()
	if err != nil {
		return 0, utils.HandleErrorWithRollback(tx, err)
	}
	return int(deletedId), nil
}

// Accounts is the resolver for the accounts field.
func (r *queryResolver) Accounts(ctx context.Context, month *time.Time) ([]*model.Account, error) {
	con := db.GetDB()

	sql := buildQueryToGetAccountsInMonth(month)

	rows, err := con.Query(sql)
	if err != nil {
		return nil, err
	}

	var accounts []*model.Account

	for rows.Next() {
		account := &model.Account{}
		genre := &model.Genre{}
		if err := rows.Scan(&account.ID, &genre.ID, &account.Amount, &account.Description, &account.CreatedAt, &genre.Title); err != nil {
			return nil, err
		}
		account.Genre = genre
		accounts = append(accounts, account)
	}
	return accounts, nil
}

// Analysis is the resolver for the analysis field.
func (r *queryResolver) Analysis(ctx context.Context, start time.Time, end time.Time) (*model.Analysis, error) {
	con := db.GetDB()

	row := con.QueryRow("SELECT IFNULL(SUM(amount), 0) FROM accounts WHERE created_at > ? AND created_at < ?", start, end)

	analysis := &model.Analysis{}

	if err := row.Scan(&analysis.Amount); err != nil {
		return nil, err
	}

	// analyse consumes
	consumeSql := `
	SELECT
		SUM(amount), genres.id, genres.title
	FROM
		accounts
	JOIN
		genres
	ON
		accounts.genre_id = genres.id
	WHERE
		created_at > ? AND created_at < ? AND accounts.amount < 0
	GROUP BY
		genres.id
	`

	consumeRows, err := con.Query(consumeSql, start, end)
	if err != nil {
		return nil, err
	}
	consumeAnalysises := []*model.GenreAnalysis{}
	for consumeRows.Next() {
		consumeAnalysis := &model.GenreAnalysis{
			Genre: &model.Genre{},
		}
		consumeRows.Scan(&consumeAnalysis.Amount, &consumeAnalysis.Genre.ID, &consumeAnalysis.Genre.Title)
		consumeAnalysises = append(consumeAnalysises, consumeAnalysis)
	}

	// analyse consumes
	incomeSql := `
	SELECT
		SUM(amount), genres.id, genres.title
	FROM
		accounts
	JOIN
		genres
	ON
		accounts.genre_id = genres.id
	WHERE
		created_at > ? AND created_at < ? AND accounts.amount > 0
	GROUP BY
		genres.id
	`

	incomeRows, err := con.Query(incomeSql, start, end)
	if err != nil {
		return nil, err
	}
	incomeAnalysises := []*model.GenreAnalysis{}
	for incomeRows.Next() {
		incomeAnalysis := &model.GenreAnalysis{
			Genre: &model.Genre{},
		}
		incomeRows.Scan(&incomeAnalysis.Amount, &incomeAnalysis.Genre.ID, &incomeAnalysis.Genre.Title)
		incomeAnalysises = append(incomeAnalysises, incomeAnalysis)
	}

	analysis.Consumes = consumeAnalysises
	analysis.Incomes = incomeAnalysises

	return analysis, nil
}

// Genres is the resolver for the genres field.
func (r *queryResolver) Genres(ctx context.Context) ([]*model.Genre, error) {
	con := db.GetDB()

	sql := `
	SELECT id, title
	FROM genres
	`
	rows, err := con.Query(sql)
	if err != nil {
		return nil, err
	}

	var genres []*model.Genre

	for rows.Next() {
		genre := &model.Genre{}
		if err := rows.Scan(&genre.ID, &genre.Title); err != nil {
			return nil, err
		}
		genres = append(genres, genre)
	}

	return genres, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func buildQueryToGetAccountsInMonth(month *time.Time) string {
	sql := `
			SELECT
				accounts.id,
				accounts.genre_id,
				accounts.amount,
				accounts.description,
				accounts.created_at,
				genres.title
			FROM accounts
			JOIN genres
			ON accounts.genre_id = genres.id
			`
	if month != nil {
		start := month
		end := month.AddDate(0, 1, 0)
		sql += `
		WHERE
			created_at >= "` + start.Format("2006-01-02T15:04:05Z") + `"`
		sql += `
		AND
			created_at < "` + end.Format("2006-01-02T15:04:05Z") + `"`
	}

	sql += `
	ORDER BY accounts.created_at DESC
	`

	return sql
}
