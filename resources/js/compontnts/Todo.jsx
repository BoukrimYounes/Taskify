import { router, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import toast from "react-hot-toast";


const TodoHeader = ({ number }) => (
  <div className="flex justify-between items-center p-3 border-b border-main">
    <h1 className="font-bold text-gray-800 uppercase flex items-center gap-1">
      <LuListTodo size={22} className="text-blue-500" />
      To-Do
    </h1>
    <div className="flex items-center justify-center w-8 h-8 bg-main rounded-full">
      <span className="text-white text-sm font-semibold">{number}</span>
    </div>
  </div>
);

const TodoCard = (props) => {
  const {
    id,
    title,
    description,
    deadline,
    assigned_members = [],
    creator,
    status,
    type,
    created_at,
    index,
    deleteTask,
  } = props;
  const typeColors = {
    Feature: "bg-green-100 text-green-800",
    Bug: "bg-rose-100 text-rose-800",
    Base: "bg-gray-100 text-gray-600",
  };
  const { flash } = usePage().props;


  const [EditForm, setEditForm] = useState(false);
  const [newstatus, setStatus] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(`/tasks/${id}`, { 
      status: newstatus
    }, {
      preserveScroll: true,  // Add this to maintain scroll position
      onSuccess: () => {
        // Wrap in setTimeout to ensure toast shows before any potential reload
        setTimeout(() => {
          toast.success(flash.success);
          setEditForm(false);
           router.reload()
        }, 100);
      },
      onError: (errors) => {
        toast.error(`❌ ${errors.message || flash.error}`);
        console.error('Update error:', errors);
      }
    });
  };


  return (
    <>
      <div className="group text-left relative w-full p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1  ">
        <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => setEditForm(true)}
            className="cursor-pointer  p-2 bg-white hover:bg-slate-50 rounded-lg shadow-sm border border-slate-100"
          >
            <MdOutlineEdit className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={() => deleteTask(index)} // Delete THIS task
            className="cursor-pointer  p-2 bg-white hover:bg-slate-50 rounded-lg shadow-sm border border-slate-100"
          >
            <MdDeleteOutline className="w-4 h-4 text-rose-500" />
          </button>
        </div>
        <div className="space-y-4 ">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            <span
              className={`px-4 py-1 bg-blue-200 text-blue-800 text-sm font-medium rounded-full`}
            >
              {status}
            </span>
            <span
              className={`px-4 py-1 ${typeColors[type]} text-sm font-medium rounded-full`}
            >
              {type}
            </span>
            <span className="px-4 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
              {new Date(deadline).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          
            <div className="text-sm font-medium text-slate-500">
              Assigned by{" "}
              <span className="text-purple-600">{creator.firstname} {creator.lastname}</span>
            </div>
            <div className="flex -space-x-2">
              {assigned_members.map((user, index) => (
                <div
                  key={index}
                  className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-800 rounded-full text-sm font-medium border-2 border-white shadow-sm"
                >
               
               { user.firstname.charAt(0).toUpperCase() ?? '?'}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500">Created at {new Date(created_at).toLocaleDateString()}</p>
        </div>
      </div>
      {EditForm && (
        <>
          <div
            onClick={() => setEditForm(false)}
            className="h-screen w-full fixed inset-0 bg-black/30 backdrop-blur-md z-[100] cursor-pointer transition-opacity"
          ></div>

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white  p-8 rounded-3xl shadow-2xl shadow-[#e6e6fa]/20  w-full max-w-md z-[10000] border-2 border-[#e6e6fa]/10 ">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-[#2a2a4]">
                  <span className="bg-[#e6e6fa] text-[#2a2a4a]  p-2 rounded-md mr-2">
                    🖋️
                  </span>
                  Update Task Status
                </h2>
              </div>
              <button
                onClick={() => setEditForm(false)}
                className="p-2 hover:bg-[#e6e6fa]/20 rounded-full transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-[#4a4a6a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Status Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#4a4a6a] ml-2 tracking-wide">
                  Current Status <strong>({status})</strong>
                </label>
                <div className="relative group">
                  <select
                   value={newstatus}
                  onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-[#e6e6fa]/40 focus:border-[#e6e6fa]  bg-white/80  backdrop-blur-sm 
              transition-all duration-300 hover:shadow-md hover:shadow-[#e6e6fa]/20 focus:shadow-lg focus:shadow-[#e6e6fa]/30
              cursor-pointer appearance-none font-medium text-[#2a2a4a] "
                  >
                    <option value=""> Choose a status</option>
                    <option value="To-Do" className="flex items-center py-2">
                      To-Do
                    </option>
                    <option
                      value="In-Progress"
                      className="flex items-center py-2"
                    >
                      In-Progress
                    </option>
                    <option value="Completed" className="flex items-center py-2">
                      Completed
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a4a6a]/60  group-hover:text-[#2a2a4a] transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => setEditForm(false)}
                  className="px-8 py-3.5 text-[#4a4a6a]  bg-[#e6e6fa]/10 hover:bg-[#e6e6fa]/2 
            rounded-xl transition-all duration-300 flex-1 font-semibold
            hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#e6e6fa]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gradient-to-br from-[#e6e6fa] to-[#d6d6fa] 
            text-[#2a2a4a]  rounded-xl font-bold transition-all duration-300 flex-1 
            shadow-lg shadow-[#e6e6fa]/30 
            hover:shadow-xl hover:shadow-[#e6e6fa]/40 hover:-translate-y-0.5
            active:scale-95"
                >
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

const Todo = ({tasks}) => {


   const deleteTask = (taskIndex) => {
      router.delete(`/tasks/${taskIndex}`)
    };

  return (
    <div className="h-[95vh] bg-white rounded-xl shadow-xl overflow-hidden">
      <TodoHeader number={tasks.length} />
      <div className="px-1.5 py-4 space-y-4 overflow-y-auto h-[calc(100%-70px)]">
        {tasks.map((task, index) => (
          <TodoCard
            key={index}
            id={task.id}
            index={index} // Pass current task index
            deleteTask={deleteTask} // Pass delete handler
            {...task} // Spread task properties
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
