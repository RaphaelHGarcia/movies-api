'use strict';

exports.up = (knex) => knex.schema.createTable('episodes', (table) => {
  table.increments('id').primary().notNullable()
  table.integer('id_season').notNullable()
  table.date('air_date').notNullable()
  table.integer('episode_number').notNullable()
  table.string('name').notNullable()
  table.text('overview').notNullable()
  table.integer('season_number').notNullable()
  table.timestamps()
  table.unique(['episode_number', 'season_number'])
});

exports.down = (knex) => knex.schema.dropTable('episodes');
