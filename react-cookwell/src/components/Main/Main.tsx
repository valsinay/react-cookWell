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
  const [ingredients, setIngredients] = useState();

  const url = "https://api.jsonbin.io/v3/b/62d56dbd5ecb581b56c3e44d";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe | null>(null);
  const { searchedQuery, setSearchedQuery } = useContext(SearchContext);
  console.log(searchedQuery);

  const filteredRecipesFinal = recipes.map((recipe) => {
    // console.log(recipe.ingredients);
    // substringsArray.some(substring=>yourBigString.includes(substring))
    return recipe.ingredients.some((strings: any) =>
      searchedQuery.includes(strings)
    );
  });

  // const ex = [
  //   "2 tablespoons extra-virgin olive oil",
  //   "6 anchovy fillets (see Tip)",
  //   "8 ounces whole-wheat rotini or farfalle pasta",
  //   "1 ½ cups low-sodium vegetable broth or chicken broth",
  //   "1 tablespoon lemon zest",
  //   "½ teaspoon ground pepper",
  // ].map(x=>x.trim())

  // console.log(searchedQuery);

  const filtered = recipes.filter(x=>{
    if( x.ingredients.toString().includes(searchedQuery)){
         return true
     }
     else{return false}
  })
  console.log(filtered);

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
        const { metadata, record } = await response.json();
        setRecipes(record.recipes);
        setIngredients(record.ingredients);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="color mt-10 w-full grid lg:grid-cols-4 md:grid-cols-2 ">
      {modalIsOpen ? (
        <ReactModal
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => resetCurrentRecipe()}
          overlayClassName="Overlay"
          className="Modal"
          isOpen={modalIsOpen}
        >
          {currentRecipe?.preparationMethod.map((method: any) => {
            return (
              <div className="p-2 items-start flex  justify-between">
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
        filtered
          // ?.filter((x) => {
          //   console.log(x.ingredients);
          //   if (searchedQuery == "") {
          //     return recipes;
          //   } else {
          //     if (x.ingredients.toString().includes(searchedQuery)) {
          //       console.log("yes");
          //       return true;
          //     } else {
          //       console.log("no");
          //       return false;
          //     }
          //   }
          // })
          .map((recipe) => {
            return (
              <Card
                key={recipe.id}
                setCurrentRecipe={setCurrentRecipe}
                recipe={recipe}
              />
            );
          })}
    </div>
  );
}

export default Main;
