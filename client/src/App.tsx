import "./App.css";
import Analysis from "./Analysis";
import Accounts from "./Accounts";
import Edit from "./Edit";

function App() {
  return (
    <div className="App">
      <div className="flex flex-row justify-center">
        <div className="w-screen md:w-96 flex flex-col gap-4">
          <Analysis />
          <Edit />
          <Accounts />
        </div>
      </div>
    </div>
  );
}

export default App;
