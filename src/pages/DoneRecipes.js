import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [recipeFinished, setRecipeFinished] = useState([]);
  const [allRecipesFinished, setAllRecipesFinished] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setRecipeFinished(JSON.parse(localStorage.getItem('doneRecipes')));
    setAllRecipesFinished(JSON.parse(localStorage.getItem('doneRecipes')));
  }, [setRecipeFinished]);

  const filter = (fil) => {
    if (fil === 'drinks') {
      const newList = allRecipesFinished.filter((recipe) => recipe.type === 'drink');
      setRecipeFinished(newList);
    } else if (fil === 'foods') {
      const newList = allRecipesFinished.filter((recipe) => recipe.type === 'food');
      setRecipeFinished(newList);
    } else {
      setRecipeFinished(allRecipesFinished);
    }
  };

  return (
    <>
      <Header title="Done Recipes" isSearch={ false } />
      {allRecipesFinished?.length > 0 && (
        <div className="filter-buttons">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filter('all') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => filter('foods') }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filter('drinks') }
          >
            Drinks
          </button>
        </div>
      )}
      {recipeFinished?.length > 0 && (
        recipeFinished.map((recipe, index) => {
          const { id, category, name, image, doneDate, tags,
            nationality, type, alcoholicOrNot } = recipe;
          return (
            <div key={ `${index}-${name}` } className="done-recipe">
              <button
                onClick={ () => {
                  if (type === 'drink') {
                    history.push(`/drinks/${id}`);
                  } else {
                    history.push(`/foods/${id}`);
                  }
                } }
                type="button"
              >
                <img
                  src={ image }
                  alt={ name }
                  data-testid={ `${index}-horizontal-image` }
                  width="200px"
                />
                <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
              </button>
              <div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}`}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
                {tags.map((tag, inx) => (
                  <p
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ `${name}-${inx}` }
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <ShareButton recipe={ recipe } index={ index } />
            </div>
          );
        })
      )}
    </>
  );
}

export default DoneRecipes;
