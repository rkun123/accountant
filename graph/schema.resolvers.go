package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"time"

	"github.com/rkun123/accountant/db"
	"github.com/rkun123/accountant/graph/generated"
	"github.com/rkun123/accountant/graph/model"
)

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateAccount(ctx context.Context, input model.NewAccount) (*model.Account, error) {
	con := db.GetDB()
	sql := `
	INSERT INTO accounts(genre_id, amount, description)
	VALUES (?, ?, ?)
	`
	result, err := con.Exec(sql, input.GenreID, input.Amount, input.Description)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	fmt.Printf("id: %d\n", id)

	selectRow := con.QueryRow(`SELECT id, amount, description, created_at, genre_id FROM accounts WHERE id = ?`, id)

	account := &model.Account{
		Genre: &model.Genre{},
	}

	if err := selectRow.Scan(&account.ID, &account.Amount, &account.Description, &account.CreatedAt, &account.Genre.ID); err != nil {
		return nil, err
	}
	fmt.Println(account)

	genreRow := con.QueryRow(`SELECT id, title FROM genres WHERE id = ?`, account.Genre.ID)

	if err := genreRow.Scan(&account.Genre.ID, &account.Genre.Title); err != nil {
		return nil, err
	}
	fmt.Println(account)

	return account, nil
	// panic(fmt.Errorf("not implemented: CreateTodo - createTodo"))
}

// CreateGenre is the resolver for the createGenre field.
func (r *mutationResolver) CreateGenre(ctx context.Context, input model.NewGenre) (*model.Genre, error) {
	con := db.GetDB()
	result, err := con.Exec(`INSERT INTO genres(title) VALUES (?)`, input.Title)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	row := con.QueryRow(`SELECT id, title FROM genres WHERE id = ?`, id)

	genre := &model.Genre{}

	if err := row.Scan(&genre.ID, &genre.Title); err != nil {
		return nil, err
	}

	return genre, nil

	// panic(fmt.Errorf("not implemented: CreateGenre - createGenre"))
}

// Accounts is the resolver for the accounts field.
func (r *queryResolver) Accounts(ctx context.Context) ([]*model.Account, error) {
	con := db.GetDB()
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
	// panic(fmt.Errorf("not implemented: Accounts - accounts"))
}

// Analysis is the resolver for the analysis field.
func (r *queryResolver) Analysis(ctx context.Context, start time.Time, end time.Time) (*model.Analysis, error) {
	con := db.GetDB()

	fmt.Println(start.String(), end.String())
	row := con.QueryRow("SELECT IFNULL(SUM(amount), 0) FROM accounts WHERE created_at > ? AND created_at < ?", start, end)

	analysis := &model.Analysis{}

	if err := row.Scan(&analysis.Amount); err != nil {
		return nil, err
	}
	return analysis, nil
	// panic(fmt.Errorf("not implemented: Analysis - analysis"))
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
	// panic(fmt.Errorf("not implemented: Genres - genres"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
