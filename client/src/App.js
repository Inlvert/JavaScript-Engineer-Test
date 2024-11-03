import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom";
import AddSuperhero from './pages/Add';
import HomePage from './pages/Home';
import SuperheroDetails from './components/SuperheroDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/superheroes" component={AddSuperhero} />
        <Route path="/superheroes/:superheroId" component={SuperheroDetails} />
      </Switch>
    </div>
  );
}

export default App;
