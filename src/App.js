import { useEffect, useState} from 'react';
import './App.css';
import Anim from './Anim';

function compareDateAndMonth (date, actual) {
  if (date.getDate() === actual.getDate()
      && date.getMonth() === actual.getMonth())
      return 1
  return 0
}

function getDay(dates, actual) {
  for (let day in dates)
  {
    const date = new Date(day)
    if (compareDateAndMonth(date, actual))
      return {day: dates[day]}
  }
  return {day: null}
}

const IsFerie = ({day}) => {
  if (day.day)
    return <>🎉{day.day}🎉</>
  return <>NON</>
}

const Canva = () => {
  useEffect(() => {
    Anim()
  }, [])
  
  return (
    <canvas id="c"></canvas>
  )
}

const Header = ({day}) => {

  if (day.day)
    return (
      <header className="App-header isFerie">
        <div id="block">
          <div id="text">
            <h2>
              Est ce un jour férié ?
            </h2>
            <h1>
              <IsFerie day={day}></IsFerie>
            </h1>
          </div>
        </div>
        <Canva></Canva>
      </header>
    )

  return (
    <header className="App-header">
      <div id="block">
        <div id="text">
          <h2>
            Est ce un jour férié ?
          </h2>
          <h1>
            <IsFerie day={day}></IsFerie>
          </h1>
        </div>
      </div>
    </header>
  )
}

function App() {
  const [data, setData] = useState({});

  const actual = useState(new Date())[0]

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch("https://calendrier.api.gouv.fr/jours-feries/metropole/2023.json")
      const json = await response.json()
      setData(json)
    }
    datafetch()
  }, []);

  const day = getDay(data, actual)

  if (data === {}) return (<></>)

  return (
    <div className="App">
      <Header day={day}></Header>
    </div>
  );
}

export default App;
