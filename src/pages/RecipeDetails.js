import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';
import InteractionButtons from '../components/InteractionButtons';
import Recommendation from '../components/Recommendation';
import context from '../context/context';
import '../styles/RecipeDetails.css';

function RecipesDetails() {
  const { setIsSaveLocal, isSaveLocal } = useContext(context);
  const history = useHistory();
  const { pathname } = history.location;
  const [recipe, setRecipe] = useState({});
  const id = pathname.split('/')[2];
  const page = pathname.includes('drinks') ? 'cocktails' : 'meals';
  const [inProgress, setInProgress] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

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

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress && Object.keys(recipesInProgress[page])
      .some((idLocal) => idLocal === id)) {
      setInProgress(true);
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes && doneRecipes.some((recipeLocal) => recipeLocal.id === id)) {
      setIsFinish(true);
    }
  }, [isSaveLocal, id, page]);

  if (pathname.includes('/drinks')) {
    const { strDrinkThumb, strDrink,
      strInstructions, strAlcoholic } = recipe;
    const listRecipe = Object.entries(recipe);
    const listAllIngredients = listRecipe
      .filter((arr) => arr[0].includes('strIngredient'));
    const listIngredients = listAllIngredients.filter((arr) => arr[1]);
    const ingredients = listIngredients.reduce((acc, arr) => {
      acc = [...acc, arr[1]];
      return acc;
    }, []);

    const listAllMeasure = listRecipe
      .filter((arr) => arr[0].includes('strMeasure'));
    const listMeasure = listAllMeasure.filter((arr) => arr[1]);
    const measures = listMeasure.reduce((acc, arr) => {
      acc = [...acc, arr[1]];
      return acc;
    }, []);

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
          <h3>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ `${index}-${ingredient}` }
            >
              {`${ingredient}  ${measures[index] === undefined
                ? '' : `- ${measures[index]}`}`}
            </p>
          ))}
          <p data-testid="instructions">{strInstructions}</p>
          <Recommendation />
        </div>
        {!isFinish && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start-button"
            onClick={ () => {
              history.push(`/drinks/${id}/in-progress`);
              setIsSaveLocal('saveLocalStorageDrink');
            } }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
      </div>
    );
  }

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;
  const listRecipe = Object.entries(recipe);
  const listAllIngredients = listRecipe
    .filter((arr) => arr[0].includes('strIngredient'));
  const listIngredients = listAllIngredients.filter((arr) => arr[1]);
  const ingredients = listIngredients.reduce((acc, arr) => {
    acc = [...acc, arr[1]];
    return acc;
  }, []);

  const listAllMeasure = listRecipe
    .filter((arr) => arr[0].includes('strMeasure'));
  const listMeasure = listAllMeasure.filter((arr) => arr[1]);
  const measures = listMeasure.reduce((acc, arr) => {
    acc = [...acc, arr[1]];
    return acc;
  }, []);

  const linkYoutube = strYoutube?.replace('watch?v=', 'embed/');

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
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ `${index}-${ingredient}` }
          >
            {`${ingredient}  ${measures[index] && `- ${measures[index]}`}`}
          </p>
        ))}
        <iframe
          data-testid="video"
          width="300"
          height="250"
          src={ linkYoutube }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;
         autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p data-testid="instructions">{strInstructions}</p>
        <Recommendation />
      </div>
      {!isFinish && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-button"
          onClick={ () => {
            history.push(`/foods/${id}/in-progress`);
            setIsSaveLocal('saveLocalStorageMeal');
          } }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>)}
    </div>
  );
}

export default RecipesDetails;
