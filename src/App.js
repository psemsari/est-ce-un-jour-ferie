import { useEffect, useState} from 'react';
import './App.css';

function compare(dates, actual) {
  const comp = actual.toISOString().slice(0, 10)
  const lst = dates.dates
  for (let day in lst)
  {
    if (day === comp)
      return lst[day]
  }
  return null
}

function IsFerie(dates)
{
  const actual = useState(new Date())[0]
  const day = compare(dates, actual)
  console.log(day)
  if (day)
  {
    return (
      <span>
        {day}
      </span>
    );
  }
  return (
    <span>
      NON
    </span>
  );
}

function App() {
  const [data, setData] = useState({});
  useEffect(() => {

    const datafetch = async () => {
      const response = await fetch("https://calendrier.api.gouv.fr/jours-feries/metropole/2023.json")
      const json = await response.json()
      setData(json)
    }

    datafetch()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          Est ce un jour ferie ?
        </p>
        <p>
          <a
            className="App-link"
            href="https://calendrier.api.gouv.fr/jours-feries/metropole/2023.json"
            target="_blank"
            rel="noopener noreferrer"
          >
          <IsFerie dates={data}></IsFerie>
          </a>
        </p>
      </header>
    </div>
  );
}

// const DATE = {"2023-01-01": "1er janvier",
//               "2023-04-10": "Lundi de Pâques",
//               "2023-05-01": "1er mai",
//               "2023-05-08": "8 mai",
//               "2023-05-18": "Ascension",
//               "2023-05-29": "Lundi de Pentecôte",
//               "2023-07-14": "14 juillet",
//               "2023-08-15": "Assomption",
//               "2023-11-01": "Toussaint",
//               "2023-11-11": "11 novembre",
//               "2023-12-25": "Jour de Noël"}

export default App;
