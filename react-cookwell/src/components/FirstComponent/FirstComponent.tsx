import * as React from "react";
import { useEffect, useState } from "react";


export default function FirstComponent() {
  let Logo =
    "https://logrocket-assets.io/static/home-hero-c97849b227a3d3015730e3371a76a7f0.svg";

    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<any[]>([])
    const [ingredients, setIngredients] = useState()

        const url = "https://api.jsonbin.io/v3/b/62d56dbd5ecb581b56c3e44d";

useEffect(() => {
  const fetchData = async () =>{
    setLoading(true);
    try {
      const response= await fetch(url);
      const {metadata,  record} = await response.json()
      setRecipes(record.recipes)
      setIngredients(record.ingredients)
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

  fetchData();
}, []);

console.log(recipes);
console.log(ingredients);



  return (
    <div>
    {loading && <div>Loading</div>}
    {!loading && (
      <div>
        <h2>Doing stuff with data</h2>
        {recipes?.map(item => (<span key={item}>{item.title}</span>))}
      </div>
    )}
    </div>
  );
}
