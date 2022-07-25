import * as React from "react";
import { IRecipe } from "../../models/Recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
type Props = {
  recipe: IRecipe;
  setCurrentRecipe:(c:IRecipe)=>void
};

function Card({ recipe, setCurrentRecipe }: Props) {

  return (
    <>
    <form className="flex justify-center" onClick={() => setCurrentRecipe(recipe)}>
      <div className="max-w-screen-xl p-5 sm:p-10 md:p-4 flex mt-0	cursor-pointer hover:scale-105 ease-in-out duration-300 min-h-full">
        <div className="rounded items-start overflow-hidden shadow-lg flex flex-col border">
          <div className="flex items-center p-4">
            <div className="text-lg">
              <a
                href="#"
                className="text-gray-900 font-medium leading-none hover:text-indigo-600"
              >
                {recipe.title}
              </a>
              <p className="text-gray-600 text-xs">{recipe.timeToPrepare}</p>
            </div>
          </div>
          <img className="w-full max-h-72 object-cover" src={recipe.imageUrl} alt="" />

          <div className="px-8 py-4 flex-1">
            <ul>
              {recipe.ingredients.map((ingredient) => {
                return (
                  <li className="text-gray-500 text-md" key={ingredient}>
                    {ingredient}
                  </li>
                );
              })}
            </ul>
          </div>
          <FontAwesomeIcon className="p-4" icon={faUpRightFromSquare} />
        </div>
      </div>
      </form>
    </>
  );
}

export default Card;
