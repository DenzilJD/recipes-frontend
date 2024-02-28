import React from 'react';
import food1 from '../assets/food-2.jpg';
import Modal from './Modal';
import FullView from './FullView';

export const Card = ({ recipe, recipeType, updateRecipe, deleteRecipe }) => {
    const displayIngredients = recipe.ingredients.map(t => <li key={t._id}>{t.name}</li>);

    return (
        <div className="m-4 max-w-sm w-full">
            <div className="h-48 flex-none bg-cover rounded-t text-center overflow-hidden"
                style={{ backgroundImage: `url(${food1})` }}>
            </div>
            <div className="border-r border-b border-l border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{recipe.name}</div>
                    <p className="text-gray-700 text-base">{displayIngredients}</p>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" alt="Avatar of Jonathan Reinink" />
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">{recipe.chef.name}</p>
                        </div>
                    </div>
                    <FullView recipe={recipe} />
                </div>
                {recipeType !== 'famous' ?
                    <div className='flex mt-4'>
                        <Modal recipe={recipe} updateRecipe={updateRecipe}>Update</Modal>
                        <div className="w-1/2 text-center bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => { deleteRecipe(recipe._id) }}>Delete</div>
                    </div> : ''}
            </div>
        </div>
    )
}