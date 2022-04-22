import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import CreatePlaylist from './index'

describe('My playlist', () => {

    test('render my playlists', () => {
        render(<Provider store={store}>
            <BrowserRouter>
              <CreatePlaylist />
            </BrowserRouter>
          </Provider>)
        const createlaylist = screen.getByTestId('create-playlist')
        expect(createlaylist).toBeInTheDocument
    })
})