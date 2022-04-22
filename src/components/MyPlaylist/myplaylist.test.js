import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import MyPlaylist from './index'

describe('My playlist', () => {

    test('render my playlists', () => {
        render(<Provider store={store}>
            <BrowserRouter>
              <MyPlaylist />
            </BrowserRouter>
          </Provider>)
        const playlist = screen.getByTestId('playlist')
        expect(playlist).toBeInTheDocument
    })
})