package main

import (
	"net/http"

	"crypto/subtle"
	"fmt"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
	"github.com/rkun123/accountant/db"
	"github.com/rkun123/accountant/graph"
	"github.com/rkun123/accountant/graph/generated"
	"github.com/rs/cors"
)

// OPTIONSのときだけ無視するBASIC認証
func myBasicAuth(realm string, creds map[string]string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// OPTIONSのときは、BASIC認証を通さない
			if r.Method != "OPTIONS" {
				fmt.Println("CHECK BASIC AUTH")
				user, pass, ok := r.BasicAuth()
				if !ok {
					basicAuthFailed(w, realm)
					return
				}

				credPass, credUserOk := creds[user]
				if !credUserOk || subtle.ConstantTimeCompare([]byte(pass), []byte(credPass)) != 1 {
					basicAuthFailed(w, realm)
					return
				}
			}
			fmt.Println("BASIC AUTH OK")

			next.ServeHTTP(w, r)
		})
	}
}
func basicAuthFailed(w http.ResponseWriter, realm string) {
	w.Header().Add("WWW-Authenticate", fmt.Sprintf(`Basic realm="%s"`, realm))
	w.WriteHeader(http.StatusUnauthorized)
}

func main() {
	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		// AllowedOrigins: []string{"https://accountant-six.vercel.app", "http://localhost:5173", "*"},
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		Debug:            false,
	}).Handler)

	// Basic Auth
	if credentials, err := getCredentials(); err == nil {
		router.Use(myBasicAuth("家計簿", *credentials))
	}

	// Custom Auth
	/*
		if credentials, err := getCredentials(); err == nil {
			router.Use(func(next http.Handler) http.Handler {
				return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
					auth := r.Header.Get("Authorization")
					chunks := strings.Split(auth, ":")
					if len(chunks) < 2 {
						w.WriteHeader(400)
						return
					}

					pass, err := (*credentials)[chunks[0]]
					if err || pass != chunks[1] {
						w.WriteHeader(401)
						return
					}
					next.ServeHTTP(w, r)
				})
			})
		}
	*/

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				// Check against your desired domains here
				return r.Host == "localhost:8080"
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})

	router.Handle("/", playground.Handler("Accountant", "/query"))
	router.Handle("/query", srv)

	db.Init()

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		panic(err)
	}
}
