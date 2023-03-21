import { useState } from 'react';
import './App.css';

function compare(dates, actual) {
  const comp = actual.toISOString().slice(0, 10)
  for (let day of Object.keys(dates))
  {
    if (day === comp)
      return true
  }
  return false
}

function IsFerie(dates) {
  const actual = useState(new Date())[0]

  if (compare(dates, actual))
  {
    return (<p>OUI</p>);
  }
  return (<p>NON</p>);
}

function App() {
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
            <IsFerie dates={DATE}></IsFerie>
          </a>
        </p>
      </header>
    </div>
  );
}

const DATE = {"2023-01-01": "1er janvier",
              "2023-04-10": "Lundi de Pâques",
              "2023-05-01": "1er mai",
              "2023-05-08": "8 mai",
              "2023-05-18": "Ascension",
              "2023-05-29": "Lundi de Pentecôte",
              "2023-07-14": "14 juillet",
              "2023-08-15": "Assomption",
              "2023-11-01": "Toussaint",
              "2023-11-11": "11 novembre",
              "2023-12-25": "Jour de Noël"}

export default App;
