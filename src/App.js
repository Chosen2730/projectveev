import "./App.css";
import AppRoute from "./Routes/routes";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const initialOptions = {
    "client-id": process.env.REACT_APP_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className='mx-auto max-w-[1800px]'>
            <AppRoute />
          </div>
        </PersistGate>
      </Provider>
    </PayPalScriptProvider>
  );
}

export default App;
