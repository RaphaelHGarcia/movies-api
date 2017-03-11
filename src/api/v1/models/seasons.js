'use strict';

import { bookshelf } from '../config/database';
import Episode       from '../models/episodes';

const Season = bookshelf.Model.extend({
  tableName: 'seasons',
  idAttribute: 'id',
  hasTimestamps: true,
  episodes: function(){ return this.hasMany(Episode, 'season_number') }
});

export default Season;
