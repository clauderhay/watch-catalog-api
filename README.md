# Watch API Catalog

Hello, this is my submission for the Assessment on the Watch API Catalog.

## Clone Repository

Make sure you clone the repository in your IDE or clone it via git bash.

```bash
git clone https://github.com/clauderhay/watch-catalog-api.git
```

## Project Setup

First is to install necessary dependencies

```bash
npm install
```

Since we're using typeorm, make sure you have a server host ready so you won't have to manually create the table for data persistence.

Enter the necessary credentials in the data-source.ts file

```javascript
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'watch-catalog',
  synchronize: false,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
};
```

### Generate a Migration script to create the necessary table in the database

```bash
npm run typeorm:generate
```

After generating, make sure you migrate the generated script.

```bash
npm run typeorm:migrate
```

Once the table has been created, we can now start the project by building the project first, then running it:

```bash
npm run build

npm start
```

Congratulations!

## Swagger API

Navigate to the swagger to check the endpoints: [Watch Catalog API](http://localhost:3000/api)

You can now do testing on the endpoints and make sure you input the correct format for each request.

PS. Search Functionality (by name and reference number) and Pagination is added on the list of watches ( /watches/search ) endpoint.

## Unit Test

I'm not a fan of Unit tests. But what I made was to cover all endpoints and making sure that each one is working properly.

Run the test:

```bash
npm run test
```

This is a unit test of the Controller.

## Additional Information

This is a very basic coding structure of what was being asked for the assessment.

But a good highlight about this is that i've implemented a CQRS-pattern making sure that the read and write functions are segregated.

I also would like to point out that I haven't really added any comments within my code, although I know it's good practice to do so, but as far as readability, it's very straight-forward and how it is structured could give you a good feel of how easy it is to navigate the whole project.
