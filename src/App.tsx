import "./App.css";
import GpaDisplay from "./components/GpaDisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-left" theme="colored" />
      <GpaDisplay />
    </>
  );
};

export default App;
