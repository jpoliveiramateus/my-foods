import React from 'react';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Foods() {
  return (
    <>
      <Header title="Foods" isSearch />
      <Categories url="https://www.themealdb.com/api/json/v1/1/list.php?c=list" category="meals" />
      <Recipes />
      <Footer />
    </>
  );
}

export default Foods;
