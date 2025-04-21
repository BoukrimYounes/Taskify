import React, { useEffect } from "react";
import Todo from "../compontnts/Todo";
import Inprogress from "../compontnts/Inprogress";
import Complated from "../compontnts/Complated";
import AppLayout from "./Layout";
import { router, usePage } from "@inertiajs/react";

function Home({ myTasks = [], assignedTasks = [] }) {
  // Combine both task types and filter by status
  const allTasks = [...myTasks, ...assignedTasks];
  const { auth } = usePage().props;
  console.log(allTasks)

  useEffect(() => {
    if (!auth.user) {
      router.visit('/');
    }
  }, [auth]);

  if (!auth.user) return null; 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4 my-4">
      <Todo tasks={allTasks.filter(task => task.status === "To-Do")} />
      <Inprogress tasks={allTasks.filter(task => task.status === "In-Progress")}  />
      <Complated tasks={allTasks.filter(task => task.status === "Completed")} />
    </div>
  );
}
Home.layout = page => <AppLayout children={page} />;

export default Home;
