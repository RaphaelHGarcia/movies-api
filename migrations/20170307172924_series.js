'use strict';

exports.up = (knex) => knex.schema.createTable('series', (table) => {
  table.increments('id').primary().notNullable()
  table.date('first_air_date').notNullable()
  table.date('last_air_date')
  table.integer('number_of_episodes').defaultTo(0)
  table.integer('number_of_seasons').defaultTo(0)
  table.string('original_language')
  table.string('original_name').unique()
  table.text('overview')
  table.float('popularity')
  table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('series');
