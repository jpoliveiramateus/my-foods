import App from '../App';
const { screen } = require('@testing-library/react');
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

describe('Teste da página Favorite Recipes', () => {
    beforeEach(() => {
      window.localStorage.clear();
    })

    it('Teste se os filtros, All, Foods, Drinks se aplicam corretamente', () => {
      localStorage.setItem('favoriteRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"},{"id":"53060","type":"food","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]')

      renderWithRouter(<App />, '/favorite-recipes');

      expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /burek/i })).toBeInTheDocument();
    
      userEvent.click(screen.getByRole('button', { name: /foods/i }));

      expect(screen.getByRole('heading', { name: /burek/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /gg/i })).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /all/i}));

      expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /burek/i })).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /drinks/i }));

      expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /burek/i })).not.toBeInTheDocument();
    });

    it('Teste se ao clicar no card é redirecionado para a página de detalhes do drink', () => {
      localStorage.setItem('favoriteRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"},{"id":"53060","type":"food","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]')

      const { history } = renderWithRouter(<App />, '/favorite-recipes');

      userEvent.click(screen.queryByRole('heading', { name: /gg/i }));
      expect(history.location.pathname).toBe('/drinks/15997');
    });

    it('Teste se ao clicar no card é redirecionado para a página de detalhes da comida', () => {
      localStorage.setItem('favoriteRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"},{"id":"53060","type":"food","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]')

      const { history } = renderWithRouter(<App />, '/favorite-recipes');

      userEvent.click(screen.getByRole('heading', { name: /burek/i }));
      expect(history.location.pathname).toBe('/foods/53060');
    });

    it('É possível copiar o link da página de detalhes ao clicar no botão de compartilhar', () => {
      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
  
      localStorage.setItem('favoriteRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"},{"id":"53060","type":"food","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]')

      renderWithRouter(<App />, '/favorite-recipes');

      expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
      userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });

    it('Card é removido da tela ao desfavoritar', () => {
      localStorage.setItem('favoriteRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"},{"id":"53060","type":"food","nationality":"Croatian","category":"Side","alcoholicOrNot":"","name":"Burek","image":"https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg"}]')

      renderWithRouter(<App />, '/favorite-recipes');

      expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
      userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
      expect(screen.queryByRole('heading', { name: /gg/i })).not.toBeInTheDocument();
    });
});
