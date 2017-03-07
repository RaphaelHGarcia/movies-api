'use strict';

import { bookshelf } from '../config/database';

const User = bookshelf.Model.extend({
  tableName: 'users'
});


export default User;
