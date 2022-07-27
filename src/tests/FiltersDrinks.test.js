import renderWithRouter from './renderWithRouter';
import { act, screen } from '@testing-library/react';
import meals from '../../cypress/mocks/meals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealCategories from '../../cypress/mocks/mealCategories';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import otherDrinks from '../../cypress/mocks/otherDrinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks'
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import mockYellow from './mocks/mockYellow';
import mockYellowName from './mocks/mockYellowName';

import App from '../App';
import drinks from '../../cypress/mocks/drinks';
import userEvent from '@testing-library/user-event';

describe('test drinks', () => {
  beforeEach(async () => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: async () => {
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17219') return mockYellow;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Yellow') return mockYellowName;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return oneDrinkId15997;
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return meals;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return drinks;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return drinkCategories;
          if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return mealCategories;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') return cocktailDrinks;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') return milkDrinks;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown') return otherDrinks;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') return cocoaDrinks;
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') return ordinaryDrinks;
        },

      })
    );
    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });
  })
  it('Ao seelecionar bottom "all" aparecem todos os tipo', async () => {
    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('All-category-filter'))
    expect(await screen.findByText(/GG/i)).toBeInTheDocument();
    expect(await screen.findByText(/A1/i)).toBeInTheDocument();
    expect(await screen.findByText(/ABC/i)).toBeInTheDocument();
    const cards = await screen.findAllByTestId(/-recipe-card/)
    expect(cards.length).toEqual(12)
  })
  it('Ao entrar na pagina foods renderiza elementos sem filtragem de categoria', async () => {
    expect(await screen.findByText(/GG/i)).toBeInTheDocument();
  });
  it('Ao filtrar por cocktails renderiza somente elementos dessa categoria', async () => {
    userEvent.click(await screen.findByRole('button', { name: /cocktail/i }));
    expect(await screen.findByText(/57 Chevy with a White License Plate/i)).toBeInTheDocument();
  })
  it('Ao filtrar por shake renderiza somente elementos dessa categoria', async () => {
    userEvent.click(await screen.findByRole('button', { name: /shake/i }));
    expect(await screen.findByText(/151 Florida Bushwacker/i)).toBeInTheDocument();
  })
  it('Ao filtrar por other/unknown renderiza somente elementos dessa categoria', async () => {
    userEvent.click(await screen.findByRole('button', { name: /other\/unknown/i }));
    expect(await screen.findByText(/A Piece of Ass/)).toBeInTheDocument();
  })
  it('Ao filtrar por ordinary drink renderiza somente elementos dessa categoria', async () => {
    userEvent.click(await screen.findByRole('button', { name: /ordinary drink/i }));
    expect(await screen.findByText(/3-Mile Long Island Iced Tea/i)).toBeInTheDocument();
  })
  it('Ao filtrar por cocoa renderiza somente elementos dessa categoria', async () => {
    userEvent.click(await screen.findByRole('button', { name: /cocoa/i }));
    expect(await screen.findByText(/Castillian Hot Chocolate/i)).toBeInTheDocument();
  })
  it('Ao clicar no botão na categaria duas vezes , seleciona e desselecionar', async () => {
    const shakeButton  = await screen.findByRole('button', { name: /shake/i })
    userEvent.click(shakeButton);
    expect(await screen.findByText(/151 Florida Bushwacker/i)).toBeInTheDocument();
    userEvent.click(shakeButton);
    expect(await screen.findByText(/GG/i)).toBeInTheDocument();
    userEvent.click(shakeButton)
  })
  it('gg', async () => {
    userEvent.click(await screen.findByRole('heading', { name: /gg/i }))
  });
  it('yellow', async () => {
    userEvent.click(await screen.findByRole('button', { name: /search\-icon/i }))
    userEvent.click(await screen.findByRole('radio', { name: /name/i }))
    userEvent.type(screen.getByRole('textbox'), 'Yellow')
    userEvent.click(screen.getByTestId('exec-search-btn'))
  })
})
