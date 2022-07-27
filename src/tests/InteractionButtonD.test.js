import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import meals from  '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mockDrinkGGid from './mocks/mockDrinkGGid';

describe('interagir com os botões drinks',  () => {
    beforeEach(async () => {
        global.fetch = jest.fn((url) =>
        Promise.resolve({
            json: () => {
              if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals)
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks)
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);
              if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(mockDrinkGGid);
            },
          })
        );
    });

    it('Testar foods em local storage vem vazio', async () => {
        renderWithRouter(<App />, '/drinks');
        expect(await screen.findByText(/GG/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/GG/i));
        expect(await screen.findByTestId('favorite-btn'))
        userEvent.click(await screen.findByTestId('favorite-btn'))
    });

    it('Testar foods em local storage', async () => {
        localStorage.setItem('favoriteRecipes', 
        '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]'     
    )
        renderWithRouter(<App />, '/drinks');

        expect(await screen.findByText(/GG/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/GG/i));
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'blackHeartIcon.svg')
        userEvent.click(screen.getByTestId('favorite-btn'))
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'whiteHeartIcon.svg')
        userEvent.click(screen.getByTestId('favorite-btn'));
        expect(await screen.findByTestId('favorite-btn'))
        .toHaveAttribute('src', 'blackHeartIcon.svg')
    });

    it('Link foi copiado',  () => {
        Object.assign(window.navigator, {
            clipboard: {
              writeText: jest.fn().mockImplementation(() => Promise.resolve()),
            },
        });
                
        renderWithRouter(<App />, '/drinks/15997')
        const shareButton = screen.getByTestId('share-btn');

        expect(shareButton).toBeInTheDocument();
        userEvent.click(shareButton);
        expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });
})
