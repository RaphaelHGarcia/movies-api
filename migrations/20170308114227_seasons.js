'use strict';

exports.up = (knex) => knex.schema.createTable('seasons', (table) => {
  table.increments('id').primary().notNullable()
  table.integer('id_serie')
  table.date('air_date').notNullable()
  table.integer('season_number')
  table.integer('episode_count').defaultTo(0)
  table.text('overview')
  table.unique(['season_number', 'id_serie'])
  table.timestamps()
});


exports.down = (knex) => knex.schema.dropTable('seasons');
