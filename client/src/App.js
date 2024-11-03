import React from 'react';
import { Switch, Route } from "react-router-dom";
import AddSuperhero from './pages/Add';
import HomePage from './pages/Home';
import SuperheroDetails from './components/SuperheroDetails';
import EditSuperhero from './components/EditSuperhero';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/superheroes" component={AddSuperhero} />
        <Route exact path="/superheroes/:superheroId" component={SuperheroDetails} />
        <Route exact path="/superheroes/:superheroId" component={EditSuperhero} />
      </Switch>
    </div>
  );
}

export default App;
