import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { history, store } from "./store/store.config.ts";
import { ThemeProvider } from "./theme/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
