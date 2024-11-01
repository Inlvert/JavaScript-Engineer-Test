import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom";
import AddSuperhero from './pages/Add';
import HomePage from './pages/Home';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/add" component={AddSuperhero} />
      </Switch>
    </div>
  );
}

export default App;
