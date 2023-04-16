# Project To-Do App

## Introduction

This is a site where you can create an account and have control over your tasks. You can
- Register yourself
- Login with your credential
- Create to do's and new task
- Edit your to do's names
- Check your tasks
- Delete your tasks


## Tecnologies

Project is created with:

- NextJs (front end)
- Planetscale (database)
- Prisma (ORM)

## Libraries

- [React DnD](https://react-dnd.github.io/react-dnd/about)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)
- [MUI](https://mui.com/)
- [Typescript](https://www.typescriptlang.org/)
- Bcrypt
- [Nookies](https://web.mobills.com.br/dashboard?utm_source=home_site&utm_content=iniciar_sessao)
- [React Hook Form](https://react-hook-form.com/)


## Setup

Verify your node version `node -v`

```
$ git clone https://github.com/peVelosa/to-do-app.git
$ cd to-do-app
$ npm install
```
In the root path create a `.env` file. Then create
```
DATABASE_URL=mysql://root@127.0.0.1:3309/to-do-app
SHADOW_DATABASE_URL=mysql://root@127.0.0.1:3310/to-do-app
NEXT_PUBLIC_BASE_URL=http://localhost:3000/api
```


## Deploy
Not ready
