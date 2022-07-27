import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from '../context/context';

function ListIngredients({ recipe, setIsFinish }) {
  const { isSaveLocal, setIsSaveLocal } = useContext(context);
  const history = useHistory();
  const { pathname } = history.location;
  const [ingredients, setIngredients] = useState([]);
  const id = pathname.split('/')[2];
  const page = pathname.includes('drinks') ? 'cocktails' : 'meals';
  const [listIngredientsLocal, setListIngredientsLocal] = useState([]);

  useEffect(() => {
    const listRecipe = Object.entries(recipe);
    const listAllIngredients = listRecipe
      .filter((arr) => arr[0].includes('strIngredient'));
    const listIngredients = listAllIngredients.filter((arr) => arr[1]);
    const allIngredients = listIngredients.reduce((acc, arr, index) => {
      acc = [...acc, `${index}-${arr[1]}`];
      return acc;
    }, []);
    setIngredients(allIngredients);
  }, [recipe]);

  const saveProgress = (ing) => {
    setIsSaveLocal('saveLocalStorage');
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isSaveIngredient = recipesInProgress[page][id].some((i) => i === ing);
    if (isSaveIngredient) {
      const newRecipesInProgress = {
        ...recipesInProgress,
        [page]: {
          ...recipesInProgress[page],
          [id]: recipesInProgress[page][id].filter((i) => i !== ing),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProgress));
    } else {
      const newRecipesInProgress = {
        ...recipesInProgress,
        [page]: {
          ...recipesInProgress[page],
          [id]: [...recipesInProgress[page][id], ing],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProgress));
    }
  };

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress && ingredients.length > 0) {
      setListIngredientsLocal(recipesInProgress[page][id]);
      const isMarkedIngredients = () => {
        ingredients.forEach((_ing, index) => {
          if (ingredients.some((i) => i === recipesInProgress[page][id][index])) {
            setIsFinish(false);
          } else {
            setIsFinish(true);
          }
        });
      };
      isMarkedIngredients();
    }
  }, [isSaveLocal, ingredients, id, page, setIsFinish]);

  if (listIngredientsLocal.length > 0) {
    return (
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        {ingredients.map((ingredient, index) => (
          <label
            key={ ingredient }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              id={ ingredient }
              value={ ingredient }
              onClick={ () => saveProgress(ingredient) }
              defaultChecked={ listIngredientsLocal.some((i) => i === ingredient) }
            />
            {ingredient}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      {ingredients.map((ingredient, index) => (
        <label
          key={ ingredient }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            name={ ingredient }
            id={ ingredient }
            value={ ingredient }
            onClick={ () => saveProgress(ingredient) }
          />
          {ingredient}
        </label>
      ))}
    </div>
  );
}

ListIngredients.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  setIsFinish: propTypes.func.isRequired,
};

export default ListIngredients;
