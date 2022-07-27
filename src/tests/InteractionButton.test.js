import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import meals from  '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import mockCorba from './mocks/mockCorba';

describe('interagir com os botões foods',() => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
              if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
              if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
              if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return mockCorba;
            },
          })
        );
    });

    it('Testar foods em local storage vem vazio', async  () => {
        renderWithRouter(<App />, '/foods');
        expect(await screen.findByText(/corba/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/corba/i));
        expect(await screen.findByTestId('favorite-btn'))
        userEvent.click(await screen.findByTestId('favorite-btn'))
    });

    it('Testar foods em local storage', async () => {
        localStorage.setItem('favoriteRecipes',
        '[ { "id": "52977", "type": "food", "nationality": "Turkish", "category": "Side", "alcoholicOrNot": "", "name": "Corba", "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" } ]'
    )
        renderWithRouter(<App />, '/foods');
        expect(await screen.findByText(/corba/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/corba/i));
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'blackHeartIcon.svg')
        userEvent.click(screen.getByTestId('favorite-btn'))
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'whiteHeartIcon.svg')
        userEvent.click(screen.getByTestId('favorite-btn'))
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'blackHeartIcon.svg')
    });
})
