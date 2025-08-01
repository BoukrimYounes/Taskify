import { FaPlus } from "react-icons/fa6";
import logoBlack from "../assets/icon_black.png";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { router, useForm, usePage } from "@inertiajs/react";
import { FaUsers } from "react-icons/fa6";
import { Combobox } from '@headlessui/react';
import { HiCalendarDateRange } from "react-icons/hi2";
import { CgMoveTask } from "react-icons/cg";
import { TbMenu4 } from "react-icons/tb";
import { LuLetterText } from "react-icons/lu";
import { IoTicket } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const { user } = usePage().props.auth;
    const { users } = usePage().props;
    const { flash } = usePage().props;

     useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const filteredUsers = query === ''
      ? users
      : users.filter((user) =>
          `${user.firstname} ${user.lastname}`
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

    const { data, setData, post, errors, processing } = useForm({
        title: "",
        description: "",
        status: "",
        type: "",
        deadline: "",
        user_id: "",
        assigned_members: [],
    });

    useEffect(() => {
        setData("user_id", user.id);
    }, [user, setData]);

    function handleCancel() {
        setShowAlert(false);
        setIsDropdownOpen(false);
    }

   // In the form submission handler:
function handleSubmit(e) {
    e.preventDefault();

    // Enhanced validation
    if (!data.title.trim()) {
        toast.error("Please enter a task title");
        return;
    }
    if (!data.description.trim()) {
        toast.error("Please enter a description");
        return;
    }
    if (data.assigned_members.length === 0) {
        toast.error("Please assign at least one team member");
        return;
    }
    if (!data.deadline) {
        toast.error("Please select a deadline");
        return;
    }

    // Date validation
    const selectedDate = new Date(data.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        toast.error("Deadline must be in the future");
        return;
    }

    post("/tasks",{
        onSuccess: () => {
            setAddTask(false);
            setData({
                title: "",
                description: "",
                status: "",
                type: "",
                deadline: "",
                user_id: user.id,
                assigned_members: [],
            });
            router.reload();
        }
    },)
}
    return (
        <>
         
            <nav className="bg-main shadow-sm">
                {/* Desktop Navbar */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Toaster position="top-center" reverseOrder={false} />
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0 w-12 md:w-14 lg:w-16 flex  ">
                            <img src={logoBlack} className="w-full" alt="" />
                        </div>

                        <div className="flex gap-4 justify-center items-center">
                            {/* Main Content */}
                            <div className="flex-1 items-center justify-center space-x-4 hidden md:flex">
                                {/* Add Task Button */}
                                <button
                                    onClick={() => setAddTask(true)}
                                    className="flex items-center space-x-2 rounded-full bg-purple-600 px-6 py-2.5 text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-700 hover:shadow-md hover:scale-[101%] active:translate-y-0"
                                >
                                    <FaPlus className="h-5 w-5" />
                                    <span className="font-medium">
                                        Add Task
                                    </span>
                                </button>
                            </div>

                            {/* Profile Section */}
                            <div className="flex items-center">
                                
                                <div
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="relative  cursor-pointer h-11 w-11 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold  hover:bg-purple-700 transition-colors"
                                >
                                    {user.firstname.charAt(0).toUpperCase()}
                                    {user.lastname.charAt(0).toUpperCase()}
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Floating Action Button */}
                <div className="fixed bottom-6 right-6 md:hidden z-50">
                    <button
                        onClick={() => setAddTask(true)}
                        className="p-2 rounded-full bg-purple-600 text-white shadow-xl shadow-purple-300 hover:bg-purple-700 transition-transform hover:scale-110"
                    >
                        <FaPlus className="h-8 w-8" />
                    </button>
                </div>
            </nav>
            {isDropdownOpen && (
                <div className="absolute  right-0 top-12 mt-2 w-56 rounded-lg bg-white shadow-lg border border-[#e6e6fa] z-50">
                    {/* User Info Section */}
                    <div className="border-b pb-3 border-[#e6e6fa] px-4 pt-3">
                        <p className="font-semibold text-gray-800 truncate">
                            {user.firstname} {user.lastname}
                        </p>
                        <small className="font-medium text-gray-500 text-sm truncate block">
                            {user.email}
                        </small>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={() => setShowAlert(true)}
                        className="w-full flex items-center gap-2 text-red-500 hover:bg-[#e6e6fa] px-4 py-2.5 rounded-md transition-colors duration-200 ease-in-out"
                    >
                        <BiLogOut size={18} className="flex-shrink-0" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            )}
            {showAlert && (
                <div className="fixed min-h-screen w-full inset-0 bg-gray-700/50 backdrop-blur-sm flex items-center justify-center z-[1000]">
                    {/* Modal Container */}
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xs w-full mx-4 border border-[#e6e6fa]">
                        {/* Modal Title */}
                        <h2 className="text-lg font-bold mb-4 text-gray-800">
                            Confirm Logout
                        </h2>

                        {/* Modal Message */}
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to log out?
                        </p>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3">
                            {/* Cancel Button */}
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-[#e6e6fa] rounded-lg transition-colors duration-200 ease-in-out"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                            {/* Logout Button */}
                            <button
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 ease-in-out"
                                onClick={() => router.post('/logout',{
                                    onSuccess: () => { toast.success(flash.success)}
                                })}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {addTask && (
                <>
                    <div
                        onClick={() => setAddTask(false)}
                        className="h-screen w-full  fixed inset-0 bg-black/30 backdrop-blur-md z-[100] cursor-pointer transition-opacity"
                    ></div>

                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white  p-8 rounded-2xl shadow-2xl w-full max-w-lg z-[10000] border border-white/20 overflow-y-auto h-[calc(100%-70px)]">
                        
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#2a2a4]">
                                <span className="bg-[#e6e6fa] text-[#2a2a4a]  p-2 rounded-md mr-2">
                                    🚀
                                </span>
                                Create New Task
                            </h2>
                            {/* Update Task Status */}
                            <button
                                onClick={() => setAddTask(false)}
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

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Title Field */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-[#4a4a6a] flex items-center gap-1 ml-2">
                                    <LuLetterText />
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e6e6fa]/30 focus:border-[#e6e6fa]  bg-transparent focus:ring-2 focus:ring-[#e6e6fa]/20 transition-all placeholder:text-[#4a4a6a]/60 "
                                    placeholder="Enter task title"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description Field */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-[#4a4a6a] flex items-center gap-1 ml-2">
                                    <TbMenu4 />
                                    Description
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="w-full max-h-[90px] px-4 py-3 rounded-xl border-2 border-[#e6e6fa]/30 focus:border-[#e6e6fa]  bg-transparent focus:ring-2 focus:ring-[#e6e6fa]/20 transition-all placeholder:text-[#4a4a6a]/60"
                                    placeholder="Describe the task details..."
                                ></textarea>
                                {errors.description && (
                                    <p className="text-red-500 text-sm">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Status & Type Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-[#4a4a6a] flex items-center gap-1 ml-2">
                                        <CgMoveTask size={20} /> Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 rounded-xl border-2 border-[#e6e6fa]/30 focus:border-[#e6e6fa]  bg-transparent appearance-none focus:ring-2 focus:ring-[#e6e6fa]/20 transition-all"
                                        >
                                             <option value=""> Choose a status</option>
                                            <option value="To-Do">To-Do</option>
                                            <option value="In-Progress">
                                                In-Progress
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                        </select>
                                        {errors.status && (
                                            <p className="text-red-500 text-sm">
                                                {errors.status}
                                            </p>
                                        )}

                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4a6a]/60">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-[#4a4a6a] flex items-center gap-1 ml-2">
                                        <IoTicket />
                                        Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border-2 border-[#e6e6fa]/30 focus:border-[#e6e6fa]  bg-transparent appearance-none focus:ring-2 focus:ring-[#e6e6fa]/20 transition-all"
                                        >
                                            <option value="">Choose a type</option>
                                            <option value="Base">Base</option>
                                            <option value="Feature">
                                                Feature
                                            </option>
                                            <option value="Bug">Bug</option>
                                        </select>
                                        {errors.type && (
                                            <p className="text-red-500 text-sm">
                                                {errors.type}
                                            </p>
                                        )}

                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4a6a]/60 ">
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date & Assignees */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-[#4a4a6a] flex items-center gap-1 ml-2">
                                        <HiCalendarDateRange /> Deadline
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={data.deadline}
                                            onChange={(e) =>
                                                setData(
                                                    "deadline",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 appearance-none rounded-xl border-2 border-[#e6e6fa]/30 focus:border-[#e6e6fa]  bg-transparent focus:ring-2 focus:ring-[#e6e6fa]/20 transition-all"
                                        />
                                        {errors.deadline && (
                                            <p className="text-red-500 text-sm">
                                                {errors.deadline}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
      <label className="block text-sm font-medium text-[#4a4a6a]">
        Assign Team Members
      </label>
      
      <Combobox 
        as="div" 
        value={selectedUsers} 
        onChange={(users) => {
          setSelectedUsers(users);
          setData('assigned_members', users.map(u => u.id));
        }}
        multiple
      >
        <div className="relative">
          <Combobox.Input
            className="w-full px-4 py-3 rounded-xl border-2 border-[#e6e6fa]/30 focus:border-[#e6e6fa] bg-transparent focus:ring-2 focus:ring-[#e6e6fa]/20 transition-all"
            placeholder="Search users..."
            onChange={(e) => setQuery(e.target.value)}
          />
          
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg border border-gray-200">
            {filteredUsers.length === 0 && query !== '' ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No users found
              </div>
            ) : (
              filteredUsers.map((user) => (
                <Combobox.Option
                  key={user.id}
                  value={user}
                  className={({ active }) =>
                    `px-4 py-2 text-sm cursor-pointer ${
                      active ? 'bg-blue-100' : 'bg-white'
                    }`
                  }
                >
                  {user.firstname} {user.lastname}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedUsers.map((user) => (
            <div 
              key={user.id}
              className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full text-sm"
            >
              {user.firstname} {user.lastname}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedUsers = selectedUsers.filter(u => u.id !== user.id);
                  setSelectedUsers(updatedUsers);
                  setData('assigned_members', updatedUsers.map(u => u.id));
                }}
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </Combobox>
    </div>

                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setAddTask(false)}
                                    className="px-6 py-3 text-[#4a4a6a]  bg-[#e6e6fa]/20  hover:bg-[#e6e6fa]/30  rounded-xl transition-all flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-[#e6e6fa] hover:bg-[#d6d6fa]   text-[#2a2a4a]  rounded-xl font-semibold transition-all flex-1 shadow-lg shadow-[#e6e6fa]/30 "
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
