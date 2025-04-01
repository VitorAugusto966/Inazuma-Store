import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/";
import { Provider } from "react-redux";
import { Store, persistor } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
