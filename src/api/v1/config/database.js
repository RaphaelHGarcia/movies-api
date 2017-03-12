'use strict';

import Bookshelf       from 'bookshelf';
import dbConfig        from '../../../../knexfile';
import knex            from 'knex';
import bookshelfBcrypt from 'bookshelf-bcrypt';

const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];
const connection = knex(config);
const _bookshelf = Bookshelf(connection);

_bookshelf.plugin(bookshelfBcrypt);
_bookshelf.plugin('virtuals')
_bookshelf.plugin('pagination');
_bookshelf.plugin('visibility');

export const bookshelf = _bookshelf;
