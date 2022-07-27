import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import  { screen } from '@testing-library/react';

describe("Testando Componente Footer", () => {
    test("Contém os icone na tela", () => {
        renderWithRouter( <App />, '/foods')
        const drinkIcon =  screen.getByRole('img', {name: /drinkIcon/i})
        expect(drinkIcon).toBeInTheDocument();
        const mealIcon = screen.getByRole('img', {name: /mealIcon/i})
        expect(mealIcon).toBeInTheDocument();
    })
    test("Verificar se ao clicar no botom é redirecionado", () => {
        const { history } =  renderWithRouter( <App />, '/foods')
        const buttonDrinks =  screen.getByRole('button', { name: /drinkicon/i })
        expect(buttonDrinks).toBeInTheDocument();
        userEvent.click(buttonDrinks)
        expect(history.location.pathname).toBe('/drinks')
        const buttonMealicon = screen.getByRole('img', { name: /mealicon/i })
        userEvent.click(buttonMealicon)
        expect(history.location.pathname).toBe('/foods')
    })
})
