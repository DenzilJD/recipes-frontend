import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from './Card';
import Modal from './Modal';

const serverURL = process.env.REACT_APP_SERVER_URL;

export const Home = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [recipeType, setRecipeType] = useState('famous');

    //Automatically goes to the auth page if credentials are present in local storage
    //Temporary workaround for JWT
    useEffect(() => {
        if (!sessionStorage.getItem('email'))
            navigate('/auth');
    }, [navigate]);

    useEffect(() => {
        const func = async () => {
            if (recipeType === 'my') {
                const data = await axios.get(`${serverURL}/recipes/` + sessionStorage.getItem('_id'));
                setRecipes(data.data);
            }
            else {
                const data = await axios.get(`${serverURL}/recipes`);
                setRecipes(data.data);
            }
        }
        func();
    }, [recipeType]);

    const updateRecipe = async (recipe) => {
        var recip;
        recipe = { ...recipe, chef: sessionStorage.getItem('_id') };
        if (!recipe._id)
            recip = await axios.post(serverURL + '/recipes/create', recipe);
        else
            recip = await axios.post(serverURL + '/recipes/update', recipe);
        if (recipeType === 'my')
            setRecipeType('me');
        else
            setRecipeType('my');
        console.log(recip);
    }

    const deleteRecipe = async (id) => {
        await axios.delete(serverURL + '/recipes/' + id);
        if (recipeType === 'my')
            setRecipeType('me');
        else
            setRecipeType('my');
    }

    const displayRecipes = recipes.map(t => <Card recipe={t} recipeType={recipeType} updateRecipe={updateRecipe} deleteRecipe={deleteRecipe} key={t._id} />);

    return (
        <div>
            <header className="bg-white w-full flex items-center justify-center fixed top-0 max-sm:static -z-0 py-4 shadow-lg">
                <h1 className='text-5xl ml-4'>Recipes</h1>
                <nav className="ml-auto w-96 max-sm:hidden">
                    <ul className="flex justify-between mr-8">
                        <li>Home</li>
                        <li>Features</li>
                        <li>Contact Us</li>
                    </ul>
                </nav>
            </header>
            <div className='mt-24 max-sm:mt-4 flex justify-around'>
                <div
                    className={`${recipeType === 'famous' ? 'border-orange-400' : ''} border-b-4 text-center w-1/2`}
                    onClick={() => { setRecipeType('famous') }}
                >
                    <h1 className='text-2xl'>Famous Recipes</h1>
                </div>
                <div
                    className={`${recipeType !== 'famous' ? 'border-orange-400' : ''} border-b-4 text-center w-1/2`}
                    onClick={() => { setRecipeType('my') }}
                >
                    <h1 className='text-2xl'>My Recipes</h1>
                </div>
            </div>
            {recipeType !== 'famous' ?
                <div className='flex justify-end py-4'>
                    <Modal recipe={''} updateRecipe={updateRecipe} />
                </div> : ''}
            <div className='mt-10 flex justify-around flex-wrap h-min'>
                {displayRecipes}
            </div>
        </div>
    )
}