'use strict';

import { bookshelf } from '../config/database';
import Episode       from '../models/episodes';

const Season = bookshelf.Model.extend({
  tableName: 'seasons',
  idAttribute: 'id',
  hasTimestamps: true,
  outputVirtuals: true,
  virtuals: {
    episode_count: function() {
      // const count =  Episode.where('id_season', this.id).count('*').then(c => {  console.log(c);return c });
      // return count || 0;
      const count = bookshelf.knex.count('*').from('episodes').then(c => {return c});
      console.log(count);
      // return bookshelf.knex('episodes');
    }
  },
  episodes: function(){ return this.hasMany(Episode, 'season_number') }

});

export default Season;
