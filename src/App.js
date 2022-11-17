import "./App.css";
import AppRoute from "./Routes/routes";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className='mx-auto max-w-[1800px]'>
          <AppRoute />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
