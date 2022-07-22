import * as React from "react";
import { IRecipe } from "../../models/Recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
type Props = {
  recipe: IRecipe;
  setCardIsClicked:(c:boolean)=>void
};

function Card({ recipe, setCardIsClicked }: Props) {
  const ingredients = recipe.ingredients;
  console.log(recipe.ingredients);

  return (
    <>
    <form action="" onClick={() => console.log('lcicked')}>
      <div className="max-w-screen-xl p-5 sm:p-10 md:p-4 flex mt-0	cursor-pointer hover:scale-105 ease-in-out duration-300">
        <div className="rounded overflow-hidden shadow-lg flex flex-col border">
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
          <img className="lg:w-full" src={recipe.imageUrl} alt="" />

          <div className="p-8 pb-6">
            <ul>
              {recipe.ingredients.map((ingredient) => {
                return (
                  <li className="text-gray-500 text-sm" key={ingredient}>
                    {ingredient}
                  </li>
                );
              })}
            </ul>
          </div>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </div>
      </div>
      </form>
    </>
  );
}

export default Card;
