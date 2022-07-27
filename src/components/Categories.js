import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from '../context/context';
import '../styles/Categories.css';

const FIVE = 5;
const TWELVE = 12;

const urlFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Categories({ url, category }) {
  const [filters, setFilters] = useState([]);
  const history = useHistory();
  const { setDrinks, setFoods, setCategoryName } = useContext(context);
  const [lastUrlFood, setLastUrlFood] = useState(urlFoods);
  const [lastUrlDrink, setLastUrlDrinks] = useState(urlDrinks);

  useEffect(() => {
    const fetchApiCategorys = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const newData = data[category].slice(0, FIVE);
      setFilters(newData);
    };
    return fetchApiCategorys();
  }, [url, category]);

  const fetchCategories = async (urlCategory, page) => {
    if (page === 'drinks') {
      const response = await fetch(urlCategory);
      const data = await response.json();
      const newData = data.drinks.slice(0, TWELVE);
      setDrinks(newData);
    } else {
      const response = await fetch(urlCategory);
      const data = await response.json();
      const newData = data.meals.slice(0, TWELVE);
      setFoods(newData);
    }
  };

  const filterCategory = (strCategory) => {
    setCategoryName(strCategory);
    const { pathname } = history.location;
    const fetchDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`;
    const fetchMeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`;

    if (pathname === '/drinks' && fetchDrinks !== lastUrlDrink) {
      fetchCategories(fetchDrinks, 'drinks');
      setLastUrlDrinks(fetchDrinks);
    } else if (fetchDrinks === lastUrlDrink) {
      fetchCategories(urlDrinks, 'drinks');
      setLastUrlDrinks(urlDrinks);
    } else if (fetchMeals !== lastUrlFood) {
      fetchCategories(fetchMeals, 'foods');
      setLastUrlFood(fetchMeals);
    } else {
      fetchCategories(urlFoods, 'foods');
      setLastUrlFood(urlFoods);
    }
  };

  return (
    <section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          const { pathname } = history.location;
          return pathname.includes('drinks')
            ? fetchCategories(urlDrinks, 'drinks')
            : fetchCategories(urlFoods, 'foods');
        } }
      >
        All
      </button>
      {filters.map((filter) => {
        const { strCategory } = filter;
        return (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => filterCategory(strCategory) }
          >
            {strCategory}
          </button>
        );
      })}
    </section>
  );
}

Categories.propTypes = {
  url: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Categories;
