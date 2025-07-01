# Recipe Wrangler

## Description

Recipe Wrangler is a web app that lets user search for and create recipes. It uses the
[Spoonacular API](https://spoonacular.com/food-api/docs#Search-Recipes-Complex) as a source of data for recipes. Authenticated users can favorite recipes they like from their search results, and also create their own recipes (as well as update and delete their custom recipes).

A deployed instance of the app is available [here](https://recipe-wrangler-client-git-ag-d5439f-justin-klitgaards-projects.vercel.app/).

## Tech Stack

### Frontend (this repo)

- Next.js (application logic)
- Tailwind CSS and daisyUI (styling)
- Firebase (authentication)

### Backend

- Express.js
- PostgreSQL and Knex.js
- Firebase (authentication)

Link to the backend repo [here](https://github.com/Justin-K-Ellis/recipe_wrangler_api "Recipe Wrangler API").

## Installation

You'll need a Firebase account with a project set up for authentication. Doing so is fairly
straightforward, and you can find documentation [here](https://firebase.google.com/docs/auth?_gl=1*czozel*_up*MQ..*_ga*MjEwNTYwMjc3OS4xNzQ2ODM4OTE3*_ga_CW55HF8NVT*czE3NDY4Mzg5MTYkbzEkZzAkdDE3NDY4Mzg5MTYkajAkbDAkaDA.).

Once you've done so and have the configuration information, place the config info in a .env
file at the root of the project with the following fields:

```
NEXT_PUBLIC_FB_API_KEY
NEXT_PUBLIC_FB_AUTH_DOMAIN
NEXT_PUBLIC_FB_PROJECT_ID
NEXT_PUBLIC_FB_STORAGE_BUCKET
NEXT_PUBLIC_FB_MESSAGING
NEXT_PUBLIC_FB_APP_ID
```

In the same .env file, you'll need to add field called `NEXT_PUBLIC_EXP_API` that points to
the Express API this app consumes. See documentation on the backend repo linked above for
details.

You should have at least Node.js version 10.9.0 installed to run this app.

To build the app:

```bash
npm install
npm run build
```

To run it:

```bash
npm run start
```

## Usage

Users can:

- Create an account with email and password.
- Sign in if they have an existing account.
- Search for recipes by keyword. Users reach the search page either by through the "Find
  a Recipe" card on the home screen or through the "Find a Recipe" link on the sidebar.
  - Results are displayed as a list of cards. Clicking on one of these cards brings the
    user to a new page where they see information on:
    - Cook time
    - Servings
    - A list of ingredients
    - A list of prep steps
  - Users can also opt to add the recipe to their favorites. Favorites can be found by
    clicking on the "Favorites" link on the sidebar.
- Create their own recipes (throug the "Create a Recipe" link in the sidebar). They can supply information on
  - The recipe's name
  - Type of cuisine
  - Prep/cook time
  - Number of servings
  - Ingredients
  - Prep/cook steps
- Users can access their custom recipes in the "My Recipes", where they can update or
  delete their recipes.
