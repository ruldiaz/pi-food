import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate.jsx';
import Detail from './components/Detail.jsx';
import RecipeUpdate from './components/RecipeUpdate';
import RecipeDelete from './components/RecipeDelete';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/recipe" component={RecipeCreate} />
        <Route path="/recipes/:id" component={Detail} />
        <Route path="/recipeupdate/:id" component={RecipeUpdate} />
        <Route path="/recipedelete/:id" component={RecipeDelete} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
