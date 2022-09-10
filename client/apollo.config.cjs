module.exports = {
  client: {
    service: {
      name: "accountant",
      localSchemaFile: "../graph/schema.graphqls",
      url: "http://localhost:8080/query",
    },
  },
};
