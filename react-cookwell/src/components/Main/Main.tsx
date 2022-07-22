import * as React from "react";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import * as Modal from 'react-modal';

function Main() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState();

  const url = "https://api.jsonbin.io/v3/b/62d56dbd5ecb581b56c3e44d";

  const [modalIsOpen,setModalIsOpen] = useState(false)
  const [cardIsClicked,setCardIsClicked] = useState(false)

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
    <div className="color mt-5 w-full grid lg:grid-cols-4 md:grid-cols-2 ">
     { cardIsClicked ? <Modal isOpen={modalIsOpen} > </Modal> : ''}
      {recipes?.map((recipe) => {
        return <Card key={recipe.id} setCardIsClicked={setCardIsClicked} recipe={recipe} />;
      })}
    </div>
  );
}

export default Main;
