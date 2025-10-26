import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import Root from "./Layout/Root.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeContextProvider>
      <Root />
    </ThemeContextProvider>
  </Provider>
);
