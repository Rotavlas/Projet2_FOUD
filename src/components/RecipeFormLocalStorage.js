import React, { useState } from 'react';

const RecipeFormLocalStorage = ({ onRecipeAdd }) => {
  const [formData, setFormData] = useState({ name: '', instructions: '', image: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name: formData.name,
      instructions: formData.instructions,
      image: formData.image,
    };
    onRecipeAdd(newRecipe);
    setFormData({ name: '', instructions: '', image: '' });
  };

  return (
    <div className='container bg-light pb-4 border mb-4'>
      <h2 className='row justify-content-center pt-3'>Ajouter une nouvelle recette</h2>
      <br/>
      <form onSubmit={handleFormSubmit} className='col-md-5 mx-auto'>
        <div className="form-group">
          <label>Nom de la recette</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" required/>
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} className="form-control" required/>
        </div>
        <div className="form-group">
          <label>Image (URL)</label>
          <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="form-control" required/>
        </div>
        <button type="submit" className="btn btn-primary">Ajouter la recette</button>
      </form>
    </div>
  );
};

export default RecipeFormLocalStorage;
