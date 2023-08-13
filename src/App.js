import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for '+ message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);
  

const formatBackground = () =>{
  if(!weather) return 'bg-gradient-to-br from-purple-900  to-purple-300'
  const threshold = units === 'metric' ? 20 : 60

  if(weather.temp <= threshold) return 'bg-gradient-to-br from-purple-900  to-purple-300'

  return 'from-yellow-700 to-orange-700'
}

  return (
    <div className="h-screen  bg-gradient-to-br from-black to-purple-900">
      <div className={`mx-auto max-w-screen-md  py-1 px-20 bg-gradient-to-br from-purple-900  to-purple-300 h-fit shadow-xl shadow-gray-600 rounded-3xl ${formatBackground()}`}>
        <TopButtons setQuery = {setQuery}/>
        <Inputs setQuery= {setQuery} units={units} setUnits={setUnits}/>

        {weather && (
          <div>
            <TimeAndLocation weather={weather}/>
            <TemperatureAndDetails weather={weather}/>
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily}/>
          </div>
        )}

            <ToastContainer autoClose={5000} theme="dark" newestOnTop={true} />
      </div>
    </div>


  );
}

export default App;
