'use strict';

import { bookshelf } from '../config/database';
import Episode       from '../models/episodes';

const Season = bookshelf.Model.extend({
  tableName: 'seasons',
  idAttribute: 'id',
  hasTimestamps: true,
  episodes: function(){ return this.hasMany(Episode, 'id_season') }
});

export default Season;
