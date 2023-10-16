import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeFormLocalStorage from './components/RecipeFormLocalStorage';
// import { setDebugLevel } from "helperModule";


// if(process.env.NODE_ENV === 'debug'){
//   setDebugLevel(1)
// }

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [customRecipes, setCustomRecipes] = useState([]);

  const addRecipeToLocalStorage = (newRecipe) => {
    const updatedRecipes = [...customRecipes, newRecipe]; 
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setCustomRecipes(updatedRecipes);
  };

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setCustomRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <RecipeList recipes={recipes} />} />
        <Route path="/recipe/:recipeId" component={RecipeDetail} />
      </Switch>
      <RecipeFormLocalStorage onRecipeAdd={addRecipeToLocalStorage} />
    </BrowserRouter>
  );
};

export default App;
