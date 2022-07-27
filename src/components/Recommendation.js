import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const SIX = 6;

function Recommendation() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      if (history.location.pathname.includes('/drinks')) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals.slice(0, SIX));
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.drinks.slice(0, SIX));
      }
    };
    fetchAPI();
  }, [history]);

  if (history.location.pathname.includes('/drinks')) {
    return (
      <div>
        <h2>Recommendations</h2>
        <div
          style={ { display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth' } }
        >
          {recipes.length > 0 && (
            recipes.map((recipe, index) => (
              <button
                className="recomendation-card"
                key={ recipe.idMeal }
                data-testid={ `${index}-recomendation-card` }
                type="button"
                onClick={ () => history.push(`/foods/${recipe.idMeal}`) }
              >
                <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
                <p data-testid={ `${index}-recomendation-title` }>{recipe.strMeal}</p>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div
        style={ { display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
        } }
      >
        {recipes.length > 0 && (
          recipes.map((recipe, index) => (
            <button
              key={ recipe.idDrink }
              className="recomendation-card"
              data-testid={ `${index}-recomendation-card` }
              onClick={ () => history.push(`/drinks/${recipe.idDrink}`) }
              type="button"
            >
              <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } />
              <p data-testid={ `${index}-recomendation-title` }>{recipe.strDrink}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Recommendation;
