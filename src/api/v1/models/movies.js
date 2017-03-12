'use strict';

import { bookshelf } from '../config/database';
import moment        from 'moment';

const Movie = bookshelf.Model.extend({
  tableName: 'movies',
  idAttribute: 'id',
  hasTimestamps: true,
});

export default Movie;
