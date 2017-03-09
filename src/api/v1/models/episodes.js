'use strict';

import { bookshelf } from '../config/database';

const Episode = bookshelf.Model.extend({
  tableName: 'episodes',
  idAttribute: 'id',
  hasTimestamps: true,
  season: function(){ return this.belongsTo('season', 'id') },
});

export default Episode;
