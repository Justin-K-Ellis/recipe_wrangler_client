# Recipe Wrangler (Client) Analysis & Enhancements

## Code Review

Recipe Wrangler is a fullstack app that lets that allows users to search for recipes (using
the Spoonacular API) and create/save customer recipes. The backend is written in Express.js
(with a PostgreSQL database) and the frontend is written in Next.js. This analysis will
focus on possible improvements to the frontend, with an emphasis on user experience.

### New Features

Though this app has a solid foundation, users would benefit from additional features in
several areas.

- Full CRUD Abilities for Custom Recipes

- Saving Favorited Recipes

- Saving "Want to Try" Recipes

- Adding Social Auth Options

- Adding a Loading Spinner

### Code Quality Improvements

- Not storing current user information in `localStorage`

## Enhancement Proposal

Improvements to this project must be scoped and will focus on the following items:

### (1) Not storing current user information in `localStorage`

**Reason**: Storing user information is a potential security vulernability, as it can
leave users open to cross site scripting attacks. Furthermore, users expect to be able to
delete cookies with standard browser tools (such as Chrome's Privacy and Security settings),
but storing data in `localStorage` acts as a kind of quasi-cookie that users will not
expect to have to delete, or even know about if they are less technical.

Whenever possible, the app should use the native Firebase auth methods for getting and passing
user information instead of persisting it in `localStorage`.

### (2) Full CRUD Abilities for Custom Recipes

**Reason**: Users can currently create and access custom recipes, but once created, there's
no way to modify or delete this data. Users typically expect to be able to have some control
over the data they've deliberately created themselves, so the app should give them the power
to update and delete custom recipes.

### (3) Saving Favorited Recipes

**Reason**: Users who find a recipe they particularly like should not have search for it
each time (along with the additonal effort for of running the search itself and browsing the
results, users not remembering the exact name of a recipe they liked is a potential pain
point).

The id of a favorited recipe should be saved in the DB so it can be retrieved later for the
user to view.

### (4) Adding a Loading Spinner

**Reason**: Even if the queried data (data from the Spoonacular API or the DB) is not
available instantly, users expect some kind of feedback to their action, and a blank screen
can be interpreted as the user's query (or the app) failing. This can be mitigated by
adding a loading spinner.
