# Movies API

### Dependences
- NodeJS (https://nodejs.org/en/download/current/)
- Mysql (https://www.mysql.com/downloads/)
- Redis (https://redis.io/download)

### Clone Repository
``` 
https://github.com/RaphaelHGarcia/movies-api.git
```

### Configuration
----------------
- Configure your mysql in `src\config\database.js`.
- Configure your redis in `src\config\redis.js`.

### Installation
```
npm install
npm run knex migrate:latest
npm run dev
``` 
