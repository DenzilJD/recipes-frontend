import React, { useState } from "react";

export default function Modal({ recipe, updateRecipe }) {
    const [showModal, setShowModal] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
    const [ingredient, setIngredient] = useState('');
    const [dishName, setDishName] = useState(recipe.name);
    const [step, setStep] = useState('');

    return (
        <>
            <button
                className="w-1/2 bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                    setShowModal(true);
                    if (recipe === '')
                        setUpdatedRecipe({});
                }}
            >
                {recipe === '' ? 'Create Recipe' : 'Update'}
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative p-6">
                                    <input className="my-4 text-blueGray-500 text-lg leading-relaxed" placeholder="Dish Name" value={dishName} onChange={(e) => setDishName(e.target.value)} />
                                    <br />
                                    <input className="my-4 text-blueGray-500 text-lg leading-relaxed" placeholder="Ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                                    {updatedRecipe && updatedRecipe.ingredients ? updatedRecipe.ingredients.map(t => <li key={t._id}>{t.name}</li>) : ''}
                                    <button className="bg-orange-500 rounded-md p-1" onClick={() => {
                                        setUpdatedRecipe(t => {
                                            if (t.ingredients)
                                                t = { ...t, ingredients: [...t.ingredients, { name: ingredient }] };
                                            else
                                                t = { ...t, ingredients: [{ name: ingredient }] };
                                            setIngredient('');
                                            return t;
                                        });
                                    }}>Add Ingredient</button>
                                    <br />
                                    <input className="my-4 text-blueGray-500 text-lg leading-relaxed" placeholder="Step" value={step} onChange={(e) => setStep(e.target.value)} />
                                    <ol>{updatedRecipe && updatedRecipe.steps ? updatedRecipe.steps.map(t => <li key={t._id}>{t}</li>) : ''}</ol>
                                    <button className="bg-orange-500 rounded-md p-1" onClick={() => {
                                        setUpdatedRecipe(t => {
                                            if (t.steps)
                                                t = { ...t, steps: [...t.steps, step] };
                                            else
                                                t = { ...t, steps: [step] };
                                            setStep('');
                                            return t;
                                        });
                                    }}>Add Step</button>
                                    <br />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            if (updatedRecipe.name && updatedRecipe.ingredients && updatedRecipe.steps)
                                                setShowModal(false);
                                            updateRecipe({ ...updatedRecipe, name: dishName });
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}