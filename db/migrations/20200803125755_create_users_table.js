exports.up = function (knex) {
  console.log("creating users table ...");
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary();
    usersTable.text("avatar_url");
    usersTable.string;
  });
};

exports.down = function (knex) {
  console.log("dropping users table ...");
  return knex.schema.dropTable("users");
};
