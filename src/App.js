import { useEffect, useState} from 'react';
import './App.css';
import Anim from './Anim';

function compare(dates, actual) {
  const comp = actual.toISOString().slice(0, 10)
  for (let day in dates)
  {
    if (day === comp)
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
        <Canva></Canva>
        <div id="text">
          <h2>
            Est ce un jour férié ?
          </h2>
          <h1>
            <IsFerie day={day}></IsFerie>
          </h1>
        </div>
      </header>
    )

  return (
    <header className="App-header">
      <div id="text">
        <h2>
          Est ce un jour férié ?
        </h2>
        <h1>
          <IsFerie day={day}></IsFerie>
        </h1>
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

  const day = compare(data, actual)

  if (data === {}) return (<></>)

  return (
    <div className="App">
      <Header day={day}></Header>
    </div>
  );
}

export default App;
