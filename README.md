# Movies API

### Dependences
- NodeJS (https://nodejs.org/en/download/current/)
- Mysql (https://www.mysql.com/downloads/)
- Redis (https://redis.io/download)

### Clone Repository
``` 
git clone https://github.com/RaphaelHGarcia/movies-api.git
```

### Configuration
----------------
- Configure your mysql in `knexfile.js`.
- Configure your redis in `src\api\v1\config\redis.js`.

### Installation
```
npm install
npm run knex migrate:latest
npm run dev
``` 
