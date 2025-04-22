"use client";

import { useState, useEffect } from "react";
import Astro from "../assets/astro.png";
import Image from "next/image";
import { AlignJustify, InboxIcon, ListCheck, Moon, LoaderCircle } from "lucide-react";
import { createTodo, deleteTodos, getTodos, toggleTodo, updateTodo } from "../connecting";

import Protected from "@/components/AuthLayout";

export default function TodoApp() {
  // Updated todo structure to match backend response
  const [todos, setTodos] = useState([]);
  
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    context: "work"
  });
  
  const [editingId, setEditingId] = useState(null);
  const [isTaskLoading , setIsTaskLoading] = useState(null);
  const [isTaskDeleting , setIsTaskDeleting] = useState(null);
  const [isTaskUpdating , setIsTaskUpdating] = useState(null);
  const [isTaskCreating , setIsTaskCreating] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });
  
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [stars, setStars] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Create stars and planets for the background
  useEffect(() => {
    const createStars = () => {
      const starsArray = [];
      for (let i = 0; i < 20; i++) {
        starsArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 10 + 5,
          delay: Math.random() * 5
        });
      }
      setStars(starsArray);
    };

    const createPlanets = () => {
      const planetsArray = [];
      for (let i = 0; i < 5; i++) {
        planetsArray.push({
          id: i,
          left: Math.random() * 80 + 10,
          top: Math.random() * 80 + 10,
          size: Math.random() * 40 + 20,
          duration: Math.random() * 100 + 100,
          delay: Math.random() * 10,
          color: [
            `hsl(${Math.random() * 60 + 240}, 70%, 50%)`,
            `hsl(${Math.random() * 60 + 260}, 80%, 40%)`,
            `hsl(${Math.random() * 60 + 280}, 60%, 60%)`
          ][Math.floor(Math.random() * 3)]
        });
      }
      setPlanets(planetsArray);
    };
    const fetchDetails = async () => {
      const response = await getTodos()
      setTodos(response.todos)
    }
    fetchDetails()

    createStars();
    createPlanets();
    setLoading(false);
  }, []);

  // Add new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.title.trim() === "") return;
    if (newTodo.description.trim() === "") return;

    setIsTaskCreating(true)
    await createTodo({...newTodo , isCompleted : false }).then((res) => { setTodos([...todos, res.todo]) ; setIsTaskCreating(false)})

    setNewTodo({
      title: "",
      description: "",
      context: "work"
    });
  };

  // Toggle todo completion status
  const toggleComplete = async (id) => {
    setIsTaskLoading(id);
    await toggleTodo(id).then(() => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, updatedAt: new Date().toISOString() } : todo
    ));})
    setIsTaskLoading(null)
  };

  // Delete todo
  const deleteTodo = async (id) => {
    setIsTaskDeleting(id);
    await deleteTodos(id).then((res) => {
    
    setTodos(todos.filter(todo => todo.id !== id));
    })
    setIsTaskDeleting(null);
  };

  // Start editing a todo
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditData({
      title: todo.title,
      description: todo.description,
    });
  };

  // Save edited todo
  const saveEdit = async () => {
    if (editData.title.trim() === "") return;
    if (editData.description.trim() === "") return;

    setIsTaskUpdating(editingId)
    await updateTodo(editingId ,{Title : editData.title , Description : editData.description}).then(() => {
      
      setTodos(todos.map(todo => 
        todo.id === editingId ? { 
          ...todo, 
          title: editData.title,
          description: editData.description,
          updatedAt: new Date().toISOString()
        } : todo
    ));
    })
    setIsTaskUpdating(null);
    setEditingId(null);
    setEditData({
      title: "",
      description: "",
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData({
      title: "",
      description: "",
      context: ""
    });
  };

  // Filter todos based on current filter
  const filteredTodos = todos && todos.length ? todos.filter(todo => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true; // "all" filter
  }) : [];

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted));
  };

  // Get context badge color
  const getContextColor = (context) => {
    switch(context.toLowerCase()) {
      case 'work':
        return 'bg-blue-900 text-blue-300';
      case 'personal':
        return 'bg-green-900 text-green-300';
      case 'learning':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  if(!loading)return (
    <Protected authentication={true}>
    <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950 text-white sm:p-6 p-2 relative overflow-hidden">
      {/* Animated Stars */}
      {stars.map(star => (
        <div
          key={`star-${star.id}`}
          className="absolute bg-white rounded-full opacity-70 animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `-5%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.size > 2 ? 0.9 : 0.7,
            animation: `fallingStar ${star.duration}s linear ${star.delay}s infinite`,
          }}
        />
      ))}

      {/* Floating Planets */}
      {planets.map(planet => (
        <div
          key={`planet-${planet.id}`}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${planet.left}%`,
            top: `${planet.top}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            backgroundColor: planet.color,
            boxShadow: `0 0 ${planet.size / 2}px ${planet.color}`,
            animation: `floatPlanet ${planet.duration}s ease-in-out ${planet.delay}s infinite alternate`,
            zIndex: "0"
          }}
        />
      ))}

      <Image src={Astro} alt="astronaut" className="absolute float bottom-3 right-3 not-sm:hidden"/>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-2 w-full">
            <Moon className="text-blue-300 mr-2" />
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">NightTask</span>
          </div>
          <p className="text-violet-300">Organize your universe, one task at a time</p>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleAddTodo} className="mb-6 space-y-3 bg-opacity-70 p-4 rounded-lg border border-purple-600 border-opacity-40">
          <div>
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
              placeholder="Task title..."
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
              placeholder="Task description..."
              className="w-full px-4 py-2 rounded-lg  border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              rows="2"
            />
          </div>
          <div className="flex justify-between items-center">
            <select
              value={newTodo.context}
              onChange={(e) => setNewTodo({...newTodo, context: e.target.value})}
              className="px-3 py-2 rounded-lg bg-gray-900 border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="learning">Learning</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-medium hover:from-violet-700 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {isTaskCreating ? <LoaderCircle className="spin"/> :"Add Task"}
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter("all")}
              className={`text-sm ${filter === "all" ? "text-white font-medium" : "text-violet-300 hover:text-white"}`}
            >
              <InboxIcon/>
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`text-sm ${filter === "active" ? "text-white font-medium" : "text-violet-300 hover:text-white"}`}
            >
              <AlignJustify/>
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`text-sm ${filter === "completed" ? "text-white font-medium" : "text-violet-300 hover:text-white"}`}
            >
              <ListCheck/>
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="text-sm text-violet-300 hover:text-white"
          >
            Clear Completed
          </button>
        </div>

        {/* Todo List */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-purple-500 border-opacity-30 rounded-xl overflow-hidden shadow-lg">
          {filteredTodos.length === 0 ? (
            <div className="p-8 text-center text-violet-300">
              {filter === "all" 
                ? "Your task list is empty. Add some tasks to get started!" 
                : filter === "active" 
                  ? "No active tasks. Time to relax!"
                  : "No completed tasks yet. Keep going!"}
            </div>
          ) : (
            <ul className="overflow-y-auto max-h-[30rem] scrollMe">
              {filteredTodos.map(todo => (
                <li 
                  key={todo.id} 
                  className="border-b border-purple-800 last:border-b-0"
                >
                  {editingId === todo.id ? (
                    <div className="p-4 space-y-3">
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        autoFocus
                      />
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({...editData, description: e.target.value})}
                        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                        rows="2"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {isTaskUpdating ? <LoaderCircle className="spin"/> :<button 
                            onClick={saveEdit}
                            className="p-2 text-green-400 hover:text-green-300"
                          >
                            Save
                          </button>}
                          <button 
                            onClick={cancelEdit}
                            className="p-2 text-red-400 hover:text-red-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col">
                      {/* Top row with checkbox, title, and buttons */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {isTaskLoading === todo.id ? <LoaderCircle className="spin"/> : 
                          <button
                            onClick={() => toggleComplete(todo.id)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                              todo.isCompleted 
                                ? "bg-purple-600 border-purple-500" 
                                : "bg-transparent border-purple-400"
                            }`}
                          >
                            {todo.isCompleted && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>}
                          <span className={`font-medium ${todo.isCompleted ? "line-through text-violet-400" : "text-white"}`}>
                            {todo.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditing(todo)}
                            className="p-2 text-blue-400 hover:text-blue-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          { isTaskDeleting === todo.id ? <LoaderCircle className="spin"/> : <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 text-red-400 hover:text-red-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>}
                        </div>
                      </div>

                      {/* Description section */}
                      {todo.description && (
                        <p className={`ml-9 mb-2 text-sm ${todo.isCompleted ? "text-violet-400 opacity-70" : "text-violet-200"}`}>
                          {todo.description}
                        </p>
                      )}

                      {/* Bottom row with context badge and date */}
                      <div className="ml-9 flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${getContextColor(todo.context)}`}>
                          {todo.context}
                        </span>
                        <span className="text-xs text-violet-400">
                          {formatDate(todo.createdAt)}
                        </span>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Todo Counter */}
        <div className="mt-4 text-sm text-violet-300 text-center">
          {todos.filter(todo => !todo.isCompleted).length} task(s) remaining
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fallingStar {
          0% {
            transform: translate(0, -5px) rotate(315deg) scale(1);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-40rem, 40rem) rotate(315deg) scale(0.2);
            opacity: 0.3;
          }
        }
        
        @keyframes floatPlanet {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(30px, 30px) rotate(10deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <Image src={Astro} alt="astronaut" className=" float bottom-3 right-3 sm:hidden"/>
    </div>
    </Protected>
  );
}