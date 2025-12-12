## Project Idea

Smart Recipe Finder is a responsive web application that helps users discover recipes based on ingredients they already have at home. The application allows users to search for recipes, filter results by cuisine type, save their favorite recipes for future reference and explore new culinary ideas with a random recipe generator.

## Team Members

Polina Averkova, Julia Naguib, Elizaveta Voropaeva

## Features

-  Search recipes by main ingredient

-  Search random recipe

-  View recipe details: ingredients and cooking process

-  Add and remove recipes from favourites

## Project Structure

```text
src/
  components/       # Reusable UI components
  context/          # React Context for favourites
  hooks/            # Custom hooks (data fetching)
  styles/           # Application styles
  tests/            # Unit tests
  types/            # TypeScript interfaces and types
  
```
# Getting Started
## Prerequisites

Before running the project, make sure you have installed:

- Node.js (version 18 or higher)

- npm

## Environment Variables

This project uses TheMealDB API which is public and requires no authentication. All API calls are made to the public endpoint:
`https://www.themealdb.com/api/json/v1/1/`

No environment variables are required for basic functionality.

## Build and run instructions

Follow these steps to set up the project locally:
```bash
git clone https://github.com/elisanikky/smart-recipe-finder.git
cd smart-recipe-finder
npm install
npm run dev
```
## Run tests

The project includes example unit tests to demonstrate testing skills.

```bash
npm run test
```

The tests demonstrate:

- Rendering of UI components

- Correct display of recipe data

- Handling of user interactions (e.g. button clicks)

All test files are located in the `src/tests` directory.




