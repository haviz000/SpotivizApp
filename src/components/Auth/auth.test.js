import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import Auth from "./index";
import userEvent from "@testing-library/user-event";

it("should render auth page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    </Provider>
  );
  const pageAuth = screen.getByTestId("auth-page");
  const btnAuth = screen.getByTestId("btn-auth");
  const imgAuth = screen.getByTestId("img-auth");
  
  expect(imgAuth).toBeInTheDocument;
  expect(btnAuth).toBeInTheDocument;
  expect(pageAuth).toBeInTheDocument;

});

it("should render profile page after btn-click",() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    </Provider>
  );

  const pageAuth = screen.getByTestId("auth-page");
  const btnAuth = screen.getByTestId("btn-auth");
  userEvent.click(btnAuth);
  expect(pageAuth).not.toBeInTheDocument;

  
})
