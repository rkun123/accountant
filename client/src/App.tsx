import "./App.css";
import clsx from "clsx";
import Analysis from "./Analysis";
import MonthControl from "./MonthControl";
import Accounts from "./Accounts";
import Edit from "./Edit";
import useMonthRange from "./useMonthRange";
import Twemoji from "./lib/Twemoji";

function App() {
  const { month, nextMonth, setMonth } = useMonthRange();
  return (
    <div className="App">
      <div className="flex justify-center">
        <div className="w-screen md:w-96 flex flex-col gap-4">
          <div className={clsx("flex", "text-4xl", "justify-center")}>
            <Twemoji emoji="💸" />
          </div>
          <MonthControl start={month} end={nextMonth} setMonth={setMonth} />
          <Analysis
            start={month.format("YYYY-MM-DDThh:mm:ssZ")}
            end={nextMonth.format("YYYY-MM-DDThh:mm:ssZ")}
          />
          <Edit />
          <Accounts month={month} />
        </div>
      </div>
    </div>
  );
}

export default App;
