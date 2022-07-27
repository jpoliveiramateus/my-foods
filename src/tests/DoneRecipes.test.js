import App from '../App';
const { screen } = require('@testing-library/react');
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

describe('Teste da página Done Recipes', () => {
    beforeEach(() => {
      window.localStorage.clear();
    })

    it('Teste se os filtros, All, Foods, Drinks se aplicam corretamente', () => {
      localStorage.setItem('doneRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"7/24/2022","tags":[]},{"id":"17222","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg","doneDate":"7/24/2022","tags":[]},{"id":"52977","type":"food","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg","doneDate":"7/24/2022","tags":["Soup"]}]')

      renderWithRouter(<App />, '/done-recipes');

      expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /a1/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    
      userEvent.click(screen.getByRole('button', {  name: /foods/i }));

      expect(screen.queryByRole('heading', { name: /gg/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /a1/i })).not.toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /all/i}));

      expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /a1/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /drinks/i }));

      expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /a1/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /corba/i })).not.toBeInTheDocument();
    });

    it('Teste se ao clicar no card é redirecionado para a página de detalhes do drink', () => {
      localStorage.setItem('doneRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"7/24/2022","tags":[]},{"id":"17222","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg","doneDate":"7/24/2022","tags":[]},{"id":"52977","type":"food","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg","doneDate":"7/24/2022","tags":["Soup"]}]')

      const { history } = renderWithRouter(<App />, '/done-recipes');

      userEvent.click(screen.queryByRole('heading', { name: /a1/i }));
      expect(history.location.pathname).toBe('/drinks/17222');
    });

    it('Teste se ao clicar no card é redirecionado para a página de detalhes da comida', () => {
      localStorage.setItem('doneRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"7/24/2022","tags":[]},{"id":"17222","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg","doneDate":"7/24/2022","tags":[]},{"id":"52977","type":"food","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg","doneDate":"7/24/2022","tags":["Soup"]}]')

      const { history } = renderWithRouter(<App />, '/done-recipes');

      userEvent.click(screen.getByRole('heading', { name: /corba/i }));
      expect(history.location.pathname).toBe('/foods/52977');
    });

    it('É possível copiar o link da página de detalhes ao clicar no botão de compartilhar', () => {
      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
  
      localStorage.setItem('doneRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"7/24/2022","tags":[]}]')

      renderWithRouter(<App />, '/done-recipes');


      expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });
});
