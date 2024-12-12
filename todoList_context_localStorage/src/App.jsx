import { useEffect, useState } from 'react';
import { UseTodo, TodoContext } from './context';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import Toast from './components/Toast';

function App() {

  const id = Date.now();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const createTodo = (todo) => {
    setTodos((prev) => [...prev, { id: id, ...todo }]);
    setErrorMessage("Todo created successfully!");
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((todoData) => {
      if (todoData.id === id) {
        return { ...todoData, ...todo };
      }
      return todoData;
    }));
    setErrorMessage("Todo Updated successfully!");
  };


  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todoData) => todoData.id !== id));
    setErrorMessage("Todo deleted successfully!");
  };


  const toggleStatus = (id) => {
    setTodos((prev) =>
      prev.map((todoData) => {
        if (todoData.id === id) {
          return { ...todoData, completed: !todoData.completed };
        }
        return todoData;
      })
    );
    setErrorMessage("Todo status updated successfully!");
  };

  useEffect(() => {
    if (errorMessage) {
      setToastMessage(errorMessage);
      setIsToastOpen(true);
    }
  }, [errorMessage]);

  const hideToast = () => {
    setIsToastOpen(false);
  };

  return (
    <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo, toggleStatus, errorMessage, setErrorMessage }}>
      <Toast message={toastMessage} isOpen={isToastOpen} onClose={hideToast} />
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3 ">
            <div className="flex flex-wrap gap-y-3 w-full max-w-2xl">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  )
}

export default App
