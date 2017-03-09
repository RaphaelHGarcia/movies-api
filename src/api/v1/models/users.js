'use strict';

import { bookshelf } from '../config/database';

const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },
  hidden: ['password'],
  hasTimestamps: true
});


export default User;
