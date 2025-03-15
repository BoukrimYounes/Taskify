import React from "react";
import Todo from "../compontnts/Todo";
import Inprogress from "../compontnts/Inprogress";
import Complated from "../compontnts/Complated";

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4 my-4">
      <Todo />
      <Inprogress />
      <Complated />
    </div>
  );
}

export default Home;
