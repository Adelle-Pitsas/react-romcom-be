/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('romcomData', function(table) {
    table.increments('id')
    table.string('title')
    table.string('descriptor1')
    table.string('descriptor2')
    table.string('url')
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('romcomData')
};
