import React, { useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import context from '../context/context';
import '../styles/Recipes.css';

function Recipes() {
  const { foods, drinks, categoryName } = useContext(context);

  const history = useHistory();
  if (history.location.pathname.includes('/foods')) {
    if (categoryName === 'Goat' && foods.length === 1) {
      return (
        <div key={ foods[0].idMeal } className="card-recipe">
          <button
            type="button"
            onClick={ () => history.push(`/foods/${foods[0].idMeal}`) }
          >
            <div
              data-testid="0-recipe-card"
            >
              <i className="fa-solid fa-arrow-right-to-bracket" />
              <h1 data-testid="0-card-name">{foods[0].strMeal}</h1>
              <img
                src={ foods[0].strMealThumb }
                alt={ foods[0].strMeal }
                data-testid="0-card-img"
              />
            </div>
          </button>
        </div>
      );
    }
    return (
      foods?.length > 0 && (
        foods.map((recipe, index) => {
          const { strMealThumb, idMeal, strMeal } = recipe;
          return (
            <div key={ idMeal } className="card-recipe">
              {(foods.length === 1 && foods[0].idMeal !== '52968')
               && <Redirect to={ `/foods/${idMeal}` } />}
              <button
                type="button"
                onClick={ () => history.push(`/foods/${idMeal}`) }
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                >
                  <i className="fa-solid fa-arrow-right-to-bracket" />
                  <h1 data-testid={ `${index}-card-name` }>{strMeal}</h1>
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              </button>
            </div>
          );
        })
      )
    );
  }
  return (
    drinks.length > 0 && (
      drinks.map((recipe, index) => {
        const { strDrinkThumb, idDrink, strDrink } = recipe;
        return drinks.length === 1 ? history.push(`/drinks/${idDrink}`) : (
          <div key={ idDrink } className="card-recipe">
            <button
              type="button"
              key={ idDrink }
              onClick={ () => history.push(`/drinks/${idDrink}`) }
            >
              <div
                data-testid={ `${index}-recipe-card` }
              >
                <i className="fa-solid fa-arrow-right-to-bracket" />
                <h1 data-testid={ `${index}-card-name` }>{strDrink}</h1>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </button>
          </div>
        );
      })
    )
  );
}

export default Recipes;
