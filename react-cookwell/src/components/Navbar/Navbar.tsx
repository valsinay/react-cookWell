import * as React from "react";

function Navbar() {
  return (
    <div className="px-4 w-full sticky top-0 z-50 ">
      <div className="w-full flex justify-between bg-white rounded-bl-md rounded-br-md px-4 py-2 shadow-md  ">
        <div className="relative h-10  flex flex-shrink-0 cursor-pointer">
          <img src="./tomato.svg" alt="" className="object-contain" />
          <section className="ml-1">
            <h3 className="text-md text-gray-900">CookWell</h3>
            <p className="italic text-xs text-gray-600">by Devexperts</p>
          </section>
        </div>
        <form
          className="flex items-center space-x-2 border border-gray-200 rounded-sm
                 px-3 py-1"
        >
          <input
            className="flex-1 bg-transparent outline-none"
            type="text"
            placeholder="Filter ingredients"
          />
          <button hidden type="submit"></button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
