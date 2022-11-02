package graph

import "time"

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func buildSQLForAccounts(month *time.Time) string {
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
