import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import * as ReactModal from "react-modal";
import Spinner from "../Spinner/Spinner";
import { IRecipe } from "../../models/Recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../hooks/searchContext";

function Main() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<any[]>([]);

  const url = "https://api.jsonbin.io/v3/b/62d56dbd5ecb581b56c3e44d";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe | null>(null);
  const { searchedQuery } = useContext(SearchContext);
  
  useEffect(() => {
    currentRecipe ? setModalIsOpen(true) : setModalIsOpen(false);
  }, [currentRecipe]);


  const resetCurrentRecipe = () => {
    setModalIsOpen(false);
    setCurrentRecipe(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);        
        const {  record } = await response.json();
        setRecipes(record.recipes);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [searchedQuery]);

  return (
    <div data-testid='main-container' className="color mt-10 w-full grid lg:grid-cols-4 md:grid-cols-2 ">
      {modalIsOpen ? (
        <ReactModal
         data-testid="modal"
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => resetCurrentRecipe()}
          overlayClassName="Overlay"
          className="Modal"
          isOpen={modalIsOpen}
        >
          {currentRecipe?.preparationMethod.map((method: any) => {
            return (
              <div data-testid='modalDiv' className="p-2 items-start flex  justify-between">
                <p className="circle">{method.step}</p>
                <p className=" pl-4 basis-11/12 font-medium"> {method.text}</p>
              </div>
            );
          })}
          <button className="closeBtn" onClick={() => resetCurrentRecipe()}>
            <FontAwesomeIcon className="p-2" icon={faX} />
          </button>
        </ReactModal>
      ) : (
        ""
      )}
      {loading && (
        <div className="pos-center">
          <Spinner />
        </div>
      )}

      {!loading &&
        recipes.filter((recipe) => {
        return recipe.ingredients.toString().includes(searchedQuery.toLowerCase())
        }).map((recipe) => {
          return (
            <Card
              key={recipe.name}
              setCurrentRecipe={setCurrentRecipe}
              recipe={recipe}
            />
          );
        })}
    </div>
  );
}

export default Main;
