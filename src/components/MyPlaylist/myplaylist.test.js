import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import MyPlaylist from "./index";
import config from "../../utils/config";

const getPlaylistResponse = rest.get(
  `${config.SPOTIFY_BASE_URL}/me/playlists`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          items: [
            {
              collaborative: false,
              description: "test desc",
              external_urls: {
                spotify: "test spotify link",
              },
              href: "test spotify link",
              id: "test id",
              images: [
                {
                  height: 640,
                  url: "test img url",
                  width: 640,
                },
              ],
              name: "test name",
            },
          ],
        },
      ])
    );
  }
);

const getPlaylistErrorResponse = rest.get(
  `${config.SPOTIFY_BASE_URL}/me/playlists`,
  (req, res, ctx) => {
    return res(ctx.status(500));
  }
);

const handlers = [getPlaylistResponse, getPlaylistErrorResponse];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should render myPlaylist page", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MyPlaylist />
      </BrowserRouter>
    </Provider>
  );
  const myPlaylistPage = await screen.getByTestId("playlist")
  expect(myPlaylistPage).toBeVisible;
});














// describe('My playlist', () => {

//     test('render my playlists', () => {
//         render(<Provider store={store}>
//             <BrowserRouter>
//               <MyPlaylist />
//             </BrowserRouter>
//           </Provider>)
//         const playlist = screen.getByTestId('playlist')
//         expect(playlist).toBeInTheDocument
//     })
// })
