import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CreatePlaylist from ".";
import store from "../../store";
import config from "../../utils/config";
import userEvent from "@testing-library/user-event";

const getSearchResponse = rest.get( `${config.SPOTIFY_BASE_URL}/search`,(req,res,ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
    tracks: {
      items: [
        {
          id: '1',
          album: {
            images: [
              {
                url: 'test image url',
              },
            ]
          },
          name: 'test title',
          artists: [
            {
              name: 'test artist',
            },
          ],
          uri: 'test uri',
          duration_ms: 1000,
          external_urls: {
            spotify: 'test spotify url',
          },
        }
      ],
    }
  }));
})

const getSearchErrorResponse = rest.get(
  `${config.SPOTIFY_BASE_URL}/me/playlists`,
  (req, res, ctx) => {
    return res(ctx.status(500));
  }
);

const handlers = [getSearchResponse, getSearchErrorResponse];

const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should get tracks", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CreatePlaylist />
      </BrowserRouter>
    </Provider>
  );
  const submit = await screen.getByTestId("submit")
  const search = await screen.getByTestId("search-input")
  const tracks = await screen.getByTestId("tracks")
  
  userEvent.type(search, 'slank');
  userEvent.click(submit);
  expect(tracks).toBeVisible;
});
