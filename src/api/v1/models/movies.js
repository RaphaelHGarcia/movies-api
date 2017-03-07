'use strict';

import { bookshelf } from '../config/database';

const Movie = bookshelf.Model.extend({
  tableName: 'movies',
  idAttribute: 'id',
  hasTimestamps: true
});

export default Movie;
