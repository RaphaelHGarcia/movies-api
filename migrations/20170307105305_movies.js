'use strict';

exports.up = (knex) => knex.schema.createTable('movies', (table) => {
  table.increments('id').primary().notNullable()
  table.string('original_language').notNullable()
  table.string('original_title').notNullable()
  table.text('overview').notNullable()
  table.date('release_date').notNullable()
  table.integer('runtime').notNullable()
  table.float('popularity').notNullable()
  table.string('tagline')
  table.string('directed_by').notNullable()
  table.string('screenplay_by').notNullable()
  table.string('starred_by').notNullable()
  table.timestamps()
});

exports.down = (knex) => knex.schema.dropTable('movies');
