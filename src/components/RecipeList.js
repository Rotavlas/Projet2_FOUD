import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import jwt from 'jsonwebtoken';
import generateAuthToken from './generateAuthToken';


const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [customRecipes, setCustomRecipes] = useState([]);
  const [showAuthmodal, setShowAuthModal] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [email, setEmail] = useState('');
  const isEmailFilled = /^[^\s@]+@[^\s@]+[.]+[^\s@]+$/.test(email);

  const [password, setPassword] = useState('');
  const isPasswordFilled = /^(?=.*[A-Z])(?=.*\d).{12,}$/.test(password);

  const isFormValid = isEmailFilled && isPasswordFilled;

  


  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);
  const validAuthModal = () => setShowAuthModal(false);

  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipes(response.data.meals);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      }
    };

    fetchRecipes();

    const customRecipesFromLocalStorage = JSON.parse(localStorage.getItem('recipes')) || [];
    setCustomRecipes(customRecipesFromLocalStorage);

    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }

  }, []);

  const isFavoriteRecipe = (recipeId) => {
    return favorites.some((favRecipe) => favRecipe.idMeal === recipeId);
  };

  return (
    <div className='container'>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossOrigin="anonymous"></link>

      <link href='./App.css' rel='stylesheet'/>
      <div className='row justify-content-around'>
        <h1 className="text-center my-4">Bienvenue sur, Foud !</h1> 
        {user && (
        <div className="user-info">
          <p>Bienvenue, {user.name}</p>
        </div>
      )}
        <button className='btn btn-primary mt-4 mb-4' onClick={openAuthModal}>S'identifier</button>
      </div>
      


      {showAuthmodal && (
        <div className='container bg-light mb-4 pb-4'>
          <h1 className='text-center'>Authentification</h1>
          <button className='btn btn-secondary' onClick={closeAuthModal}>Fermer</button>
          <form onSubmit={validAuthModal} className='col-md-5 mx-auto'>
            <div className="form-group">
              <label className='form-label'>Nom</label>
              <input type="text" name="name" className="form-control" required/>
            </div>
            <div className="form-group">
              <label class="form-label" htmlFor="email">Email :</label>
              <input class="form-control" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label className='form-label'>Mot de passe (doit contenir majuscule, chiffre et 12 caractères au moins)</label>
              <input type="password" id ="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" disabled={!isFormValid} className="btn btn-primary">S'enregistrer</button>
          </form>
        </div>
      )}


      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-3 card mb-4 card-hover" key={recipe.idMeal} >
            <a href={`/recipe/${recipe.idMeal}`} style={{ color: 'black'}}>
              <div className='card-img-container'>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="img-fluid border rounded card-img card-img-top" />
              </div>  
                <p className="text-center card-title">{recipe.strMeal} {isFavoriteRecipe(recipe.idMeal) && (
              <span className="text-warning">★</span>
              )}   </p>   
                        
            </a>
            
          </div>
        ))}
      </div> 

      <h1>Vos Recettes !</h1>
      <div className='row'>
        {customRecipes.map((recipes, index) => (
          <div className="col-md-3 card mb-4" key={index}>            
              <img src={recipes.image} alt={recipes.name} className="img-fluid" />
              <p className="text-center card-title">{recipes.name}</p>
              {isFavoriteRecipe(recipes.name) && (
              <span className="star-icon">★</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};  

export default RecipeList;  