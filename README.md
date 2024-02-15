# Minddump

A place to dump your thoughts and worries. Messages can be private and public allowing u to choose that to share with other and what to be private. Use it as your personal diary or maybe just a place to vent out 



## Run Locally
### Database configuration

Before running the project, create a mongodb database and provide the connection url for prisma in the .env file

### OAuth Configuration

Create an account in Google developer console and create a project. The redirect uri must be set as localhost to run the project locally. The Secret_id and Client_id are required and should be entered in an env file.

### Env Variables

Env variables for Google OAuth, MongoDB and Auth.js should be provided in a .env file in the root dir

### Starting the node server 

Clone the project

```bash
  git clone https://github.com/adithyakb10/minddump-nextjs
```

Go to the project directory

```bash
  cd minddump-nextjs
```

Install dependencies

```bash
  npm install
```

Set up prisma 

```bash
  npx prisma init
  npx prisma db push
  npx prisma generate
```

Start the server

```bash
  npm run dev
```

## Tech Stack
- Built using next-js
- Authentication using auth.js
- Database - MongoDB
- ORM - Prisma
## Badges

![GitHub issues](https://img.shields.io/github/issues/adithyakb10/minddump-nextjs)

![GitHub commit activity](https://img.shields.io/github/commit-activity/t/adithyakb10/minddump-nextjs)

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/adithyakb10/minddump-nextjs/main)

## Demo

Checkout the live demo : https://minddump.vercel.app

## Acknowledgements

Inspired from this website 

 - [dump.place](https://dump.place)
 

## Appendix

Raise an issue if anything needs to be fixed 
PRs are welcome 


## License

[MIT](https://choosealicense.com/licenses/mit/)




