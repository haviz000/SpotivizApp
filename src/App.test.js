import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from './App.tsx';

describe('App', () => {

    test('render App page', () => {
        render(<Provider store={store}>
              <App />
          </Provider>)
        const createlaylist = screen.getByTestId('App')
        expect(createlaylist).toBeInTheDocument
    })
})