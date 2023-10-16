import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const history = useHistory(); 

  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);


  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        setRecipeDetails(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching recipe details: ', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

    const toggleFavorite = () => {
      if (recipeDetails) {
        const isCurrentlyFavorite = favorites.some((favRecipe) => favRecipe.idMeal === recipeDetails.idMeal);
        if (isCurrentlyFavorite) {
          const updatedFavorites = favorites.filter((favRecipe) => favRecipe.idMeal !== recipeDetails.idMeal);
          setFavorites(updatedFavorites);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
          const updatedFavorites = [...favorites, recipeDetails];
          setFavorites(updatedFavorites);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
      }
    };

    const isFavorite = recipeDetails && favorites.some((favRecipe) => favRecipe.idMeal === recipeDetails.idMeal);

  const handleGoBack = () => {
    history.goBack(); 
  };

  if (!recipeDetails) {
    const newRecipe = newRecipe.find((newRecipe) => newRecipe.name === recipeId);
    if (newRecipe) {
      return (
        <div className="recipe-detail-container">
          <h2>{newRecipe.name}</h2>
          <img src={newRecipe.image} alt={newRecipe.name} />
          <p>{newRecipe.description}</p>
          {isFavorite ? (
            <p>Cette recette est dans vos favoris!</p>
          ) : (
            <button className='Favbutton' onClick={() => {toggleFavorite(); handleGoBack();}}>Ajouter aux favoris</button>
          )}
          
        </div>
      );
    } else {
      return <div>Chargement...</div>;
    }
  }

  return (
    <div className="text-center">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossOrigin="anonymous" ></link>
      <div className="container text-center">
        <h2 className="mt-4">Détails de la recette</h2>
        <div className="card">
          <img src={recipeDetails.strMealThumb} className="card-img-top img-fluid mx-auto w-50 mt-2" alt={recipeDetails.strMeal} />
          <div className="card-body">
            <h5 className="card-title">{recipeDetails.strMeal}</h5>
            <p className="card-text">{recipeDetails.strInstructions}</p>
            <button onClick={handleGoBack} className="btn btn-primary mb-3">Retour</button> 
            <div className="recipe-detail-container">
            <button className='btn btn-tertiary' onClick={() => {toggleFavorite(); handleGoBack();}} >
              {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
            
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;