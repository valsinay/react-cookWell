import * as React from "react";
import { Combobox } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../hooks/searchContext";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const url = "https://api.jsonbin.io/v3/b/62d56dbd5ecb581b56c3e44d";
  const [ingredients, setIngredients] = useState([]);
  const {  setSearchedQuery } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const {  record } = await response.json();
        setIngredients(record.ingredients);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  let ingredientNames = ingredients.map(({ name }) => name);

  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSearchedQuery(selectedIngredient.toString());
  }, [setSearchedQuery, selectedIngredient]);

  const filteredIngredients =
    query === ""
      ? ingredientNames
      : ingredientNames.filter((ingredient: string) => {
          return ingredient.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="px-4 w-full  sticky top-0 z-50 ">
      <div className="w-full flex  bg-white rounded-bl-md rounded-br-md px-4 py-2 shadow-md flex-col flex-wrap md:flex-row md:justify-between sm:flex-row sm:justify-between lg:flex-row lg:justify-between">
        <div className="relative h-10  flex flex-shrink-0 cursor-pointer">
          <img src="./tomato.svg" alt="" className="object-contain" />
          <section className="ml-1">
            <h3 className="text-md text-gray-900">CookWell</h3>
            <p className="italic text-xs text-gray-600">by Devexperts</p>
          </section>
        </div>
        <Combobox
          value={selectedIngredient}
          onChange={setSelectedIngredient}
          multiple
        >
          <Combobox.Label className="relative flex justify-center max-w-full">
            <Combobox.Input
              placeholder="Filter ingredients"
              className="h-12 w-64 max-w-xs px-6 text-base text-black   border-2 rounded-lg border-opacity-50 outline-none focus:border-gray-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className=" leading-10  text-opacity-80  bg-white text-gray-300 absolute left-5 top-1 px-1 transition duration-200 input-text">
              Filter ingredients
            </span>
          </Combobox.Label>
          <Combobox.Options className="  max-w-fit w-64 right-8 top-14  absolute z-10 mt-1 max-h-60 overflow-x-hidden overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-gray-500 focus:outline-none sm:text-sm">
            {filteredIngredients.map((ingredient) => (
              <Combobox.Option
                className="flex items-center hover:bg-black hover:text-gray-300 ease-in-out duration-200 h-12 w-64 relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                key={ingredient}
                value={ingredient}
              >
                {({ selected }) => (
                  <li className="list-none flex items-center">
                    {selected && (
                      <FontAwesomeIcon
                        className="p-1 bg-pink-500 text-white rounded-sm mr-4"
                        icon={faCheck}
                      />
                    )}
                    {ingredient}
                  </li>
                )}
                {/* {ingredient} */}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>
    </div>
  );
}

export default Navbar;
