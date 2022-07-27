import App from '../App';
const { screen, act } = require('@testing-library/react');
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import meals from  '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mockA1DrinkId from './mocks/mockA1DrinkId';
import mockCorba from './mocks/mockCorba';

describe('Teste componente RecipeInProgress', () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) =>
      Promise.resolve({
          json: () => {
            if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
            if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
            if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222') return Promise.resolve(mockA1DrinkId);
            if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(mockCorba);
          },
        })
      );

      window.localStorage.clear();
    })

    it('É possivel marcar todos os ingredientes da receita e finaliza-lá *drinks', async () => {
      localStorage.setItem('doneRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"7/24/2022","tags":[]}]')

      await act(async () => {
        renderWithRouter(<App />, '/drinks/17222/in-progress');
      });

      userEvent.click(screen.getByText(/0\-gin/i));
      userEvent.click(screen.getByText(/1\-grand marnier/i));
      userEvent.click(screen.getByText(/2\-lemon juice/i));
      userEvent.click(screen.getByText(/3\-grenadine/i));

      userEvent.click(screen.getByRole('button', { name: /finish recipe/i }));
    });

    it('É possivel marcar todos os ingredientes da receita e finaliza-lá *drinks', async () => {
      renderWithRouter(<App />, '/drinks/17222/in-progress');
  
      userEvent.click(await screen.findByText(/0\-gin/i));
      userEvent.click(screen.getByText(/1\-grand marnier/i));
      userEvent.click(screen.getByText(/2\-lemon juice/i));
      userEvent.click(screen.getByText(/3\-grenadine/i));
  
      userEvent.click(screen.getByRole('button', { name: /finish recipe/i }));
    });

    it('É possivel marcar todos os ingredientes da receita e finaliza-lá *foods', async () => {
      localStorage.setItem('doneRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"7/24/2022","tags":[]}]')

      await act(async () => {
        renderWithRouter(<App />, '/foods/52977/in-progress');
      });

      userEvent.click(screen.getByText(/0\-lentils/i));
      userEvent.click(screen.getByText(/1\-onion/i));
      userEvent.click(screen.getByText(/2\-carrots/i));
      userEvent.click(screen.getByText(/3\-tomato puree/i));
      userEvent.click(screen.getByText(/4\-cumin/i));
      userEvent.click(screen.getByText(/5\-paprika/i));
      userEvent.click(screen.getByText(/6\-mint/i));
      userEvent.click(screen.getByText(/7\-thyme/i));
      userEvent.click(screen.getByText(/8\-black pepper/i));
      userEvent.click(screen.getByText(/9\-red pepper flakes/i));
      userEvent.click(screen.getByText(/10\-vegetable stock/i));
      userEvent.click(screen.getByText(/11\-water/i));
      userEvent.click(screen.getByText(/12\-sea salt/i));

      userEvent.click(screen.getByRole('button', { name: /finish recipe/i }));
    });

    it('É possivel marcar todos os ingredientes da receita e finaliza-lá *foods', async () => {
      await act(async () => {
        renderWithRouter(<App />, '/foods/52977/in-progress');
      });

      userEvent.click(screen.getByText(/0\-lentils/i));
      userEvent.click(screen.getByText(/1\-onion/i));
      userEvent.click(screen.getByText(/2\-carrots/i));
      userEvent.click(screen.getByText(/3\-tomato puree/i));
      userEvent.click(screen.getByText(/4\-cumin/i));
      userEvent.click(screen.getByText(/5\-paprika/i));
      userEvent.click(screen.getByText(/6\-mint/i));
      userEvent.click(screen.getByText(/7\-thyme/i));
      userEvent.click(screen.getByText(/8\-black pepper/i));
      userEvent.click(screen.getByText(/9\-red pepper flakes/i));
      userEvent.click(screen.getByText(/10\-vegetable stock/i));
      userEvent.click(screen.getByText(/11\-water/i));
      userEvent.click(screen.getByText(/12\-sea salt/i));

      userEvent.click(screen.getByRole('button', { name: /finish recipe/i }));
    });
})
