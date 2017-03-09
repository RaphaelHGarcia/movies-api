'use strict';

import { bookshelf } from '../config/database';
import Season        from '../models/seasons';

const Serie = bookshelf.Model.extend({
  tableName: 'series',
  idAttribute: 'id',
  hasTimestamps: true,
  seasons: function () { return this.hasMany(Season, 'id_serie') }
});

export default Serie;
