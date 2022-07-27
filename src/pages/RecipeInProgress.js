import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';
import InteractionButtons from '../components/InteractionButtons';
import ListIngredients from '../components/ListIngredients';
import '../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.split('/')[2];
  const [isFinish, setIsFinish] = useState(true);

  useEffect(() => {
    const fetchApiById = async () => {
      if (pathname.includes('/drinks')) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.drinks[0]);
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
      }
    };
    fetchApiById();
  }, [id, pathname, setRecipe]);

  if (pathname.includes('/drinks')) {
    const { strDrinkThumb, strDrink,
      strInstructions, idDrink, strCategory, strAlcoholic, strTags } = recipe;

    const finishRecipeDrinks = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags?.split(',') || [],
    };

    return (
      <div className="recipe-card">
        <GoBackButton />
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          className="recipe-card-img"
        />
        <div className="card-title">
          <h2 data-testid="recipe-title">{strDrink}</h2>
          <InteractionButtons recipe={ recipe } />
        </div>
        <div className="card-main">
          <p data-testid="recipe-category">{strAlcoholic}</p>
          <ListIngredients recipe={ recipe } setIsFinish={ setIsFinish } />
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <footer
          style={ { position: 'fixed', width: '100%', bottom: 0 } }
        >
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ isFinish }
            className="finish-button"
            onClick={ () => {
              history.push('/done-recipes');
              const finished = JSON.parse(localStorage.getItem('doneRecipes'));
              if (!finished) {
                localStorage.setItem('doneRecipes', JSON.stringify([finishRecipeDrinks]));
              } else {
                localStorage.setItem('doneRecipes',
                  JSON.stringify([...finished, finishRecipeDrinks]));
              }
            } }
          >
            Finish Recipe
          </button>
        </footer>
      </div>
    );
  }

  const { strMealThumb,
    strMeal, strCategory, strInstructions, idMeal, strArea, strTags } = recipe;

  const finishRecipeFoods = {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: strTags?.split(',') || [],
  };

  return (
    <div className="recipe-card">
      <GoBackButton />
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        className="recipe-card-img"
      />
      <div className="card-title">
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <InteractionButtons recipe={ recipe } />
      </div>
      <div className="card-main">
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <ListIngredients recipe={ recipe } setIsFinish={ setIsFinish } />
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <footer
        style={ { position: 'fixed', width: '100%', bottom: 0 } }
      >
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isFinish }
          className="finish-button"
          onClick={ () => {
            history.push('/done-recipes');
            const finished = JSON.parse(localStorage.getItem('doneRecipes'));
            if (!finished) {
              localStorage.setItem('doneRecipes', JSON.stringify([finishRecipeFoods]));
            } else {
              localStorage.setItem('doneRecipes',
                JSON.stringify([...finished, finishRecipeFoods]));
            }
          } }
        >
          Finish Recipe
        </button>
      </footer>
    </div>
  );
}

export default RecipeInProgress;
