package main

import (
	"encoding/json"
	"io/ioutil"
)

var credentials_path = "credentials.json"

func getCredentials() (*map[string]string, error) {
	bytes, err := ioutil.ReadFile(credentials_path)
	if err != nil {
		return nil, err
	}

	credentials := &map[string]string{}

	if err := json.Unmarshal(bytes, credentials); err != nil {
		return nil, err
	}

	return credentials, nil
}
