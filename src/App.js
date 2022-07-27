import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/foods/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/drinks/:id"
          component={ RecipeDetails }
        />
        <Route
          path="/foods/:id"
          component={ RecipeDetails }
        />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/foods" component={ Foods } />
        <Route path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
