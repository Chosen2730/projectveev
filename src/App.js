import "./App.css";
import AppRoute from "./Routes/routes";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <div className='mx-auto max-w-[1800px]'>
        <AppRoute />
      </div>
    </Provider>
  );
}

export default App;
