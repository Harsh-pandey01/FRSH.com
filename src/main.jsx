import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import Root from "./Layout/Root.jsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeContextProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </ThemeContextProvider>
  </Provider>
);
