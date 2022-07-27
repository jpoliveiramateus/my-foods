import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
import meals from  '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mockDrinkGGid from './mocks/mockDrinkGGid';
import mockA1DrinkId from './mocks/mockA1DrinkId';

const drinkInstrucoes = /Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it/i;

describe('Testa pagina de detalhes para Drinks', () => {
    beforeEach(() => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(mockDrinkGGid);
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gg') return Promise.resolve(drinks);
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories); 
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
              if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222') return Promise.resolve(mockA1DrinkId);
            },
          })
        );
      })

  it('Renderiza elementos corretamente dentro da pagina de detalhes', async () => {
      await act(async () => {
        renderWithRouter(<App />, '/drinks/15997');
      });
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('GG');
      expect(screen.getByTestId('recipe-category')).toHaveTextContent(/optional alcohol/i);

      expect(screen.getByRole('img', { name: /shareIcon/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /heartIcon/i })).toBeInTheDocument();

      expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent(/galliano/i);
      expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent(/ginger ale/i);
      expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent(/ice/i);

      expect(screen.getByText(drinkInstrucoes)).toBeInTheDocument();
      
      expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /kumpir/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /dal fry/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /poutine/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /lasagne/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /timbits/i })).toBeInTheDocument();

    });

    it('As recomendações aparecem na tela', async () => {
      await act(async () => {
        renderWithRouter(<App />, '/drinks/15997');
      });
      expect(screen.getByText(/recommendations/i)).toBeInTheDocument();
      expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument()
      expect(screen.getByTestId('1-recomendation-card')).toBeInTheDocument()
      expect(screen.getByTestId('1-recomendation-card')).toHaveTextContent('Kumpir')
      expect(screen.getByTestId('2-recomendation-card')).toBeInTheDocument()
      expect(screen.getByTestId('3-recomendation-card')).toBeInTheDocument()
      expect(screen.getByTestId('4-recomendation-card')).toBeInTheDocument()
      expect(screen.getByTestId('5-recomendation-card')).toBeInTheDocument()

    });

    it('Contem botões de left & right e Star Recipe', async () => {
      await act(async () => {
        renderWithRouter(<App />, '/drinks/15997');
      });
      expect(screen.getByRole('button', {name: /left/i})).toBeInTheDocument();
      expect(screen.getByRole('button', {name: /right/i})).toBeInTheDocument();
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /left/i }));
      userEvent.click(screen.getByRole('button', { name: /right/i }));
    });

    it('ao clicar em Star recipe deve redenrizar a rota "in-progres"', async () => {
      renderWithRouter(<App />, '/drinks/15997');

      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument()
      userEvent.click(screen.getByTestId('start-recipe-btn'))
      await waitFor(() => {
      expect(screen.getByTestId('0-ingredient-step')).toHaveTextContent('Galliano');
      userEvent.click(screen.getByRole('checkbox', { name: /galliano/i }))
      expect(screen.getByTestId('1-ingredient-step')).toHaveTextContent('Ginger ale')
      userEvent.click(screen.getByRole('checkbox', { name: /ginger ale/i }))
      expect(screen.getByTestId('2-ingredient-step')).toHaveTextContent('Ice')
      userEvent.click(screen.getByRole('checkbox', { name: /ice/i }))
      expect(screen.getByTestId('instructions')).toBeInTheDocument()
      expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument()
      userEvent.click(screen.getByRole('checkbox', { name: /galliano/i }))
      })

    });

    it('Teste redirecionamento para receita em progresso', () => {
      localStorage.setItem('inProgressRecipes', '{"meals":{},"cocktails":{"15997":[]}}');
      renderWithRouter(<App />, '/drinks/17222/in-progress');
    });

    it('Botão Continue Recipe aparece quando a receita está em progresso', async () => {
      localStorage.setItem('inProgressRecipes', '{"meals":{},"cocktails":{"15997":[]}}');
      renderWithRouter(<App />, '/drinks/15997');
      expect(await screen.findByRole('button', { name: /continue recipe/i })).toBeInTheDocument();
    });

    it('Botão Start Recipe some quando a receita foi finalizada', () => {
      localStorage.setItem('inProgressRecipes', '{"meals":{},"cocktails":{"15997":["0-Galliano","1-Ginger ale","2-Ice"]}}');
      localStorage.setItem('doneRecipes', '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","doneDate":"7/24/2022","tags":[]}]');
      renderWithRouter(<App />, '/drinks/15997');
      expect(screen.queryByRole('button', { name: /start recipe/i })).not.toBeInTheDocument();
    });
});
