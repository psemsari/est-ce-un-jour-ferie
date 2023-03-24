import { useEffect, useState} from 'react';
import './App.css';

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

const Header = ({day}) => {
  return (
    <header className={"App-header " + (day.day ? 'isFerie' : '')}>
      <h2>
        Est ce un jour férié ?
      </h2>
      <h1>
        <IsFerie day={day}></IsFerie>
      </h1>
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

  return (
    <div className="App">
      <Header day={day}></Header>
    </div>
  );
}

export default App;
