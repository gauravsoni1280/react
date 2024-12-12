import { createContext, useContext } from "react";

// created the context
export const TodoContext = createContext({
    todos: [
        {
            id:1,
            todo:"demo todo",
            completed:false
        }
    ],
    createTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleStatus: (id) => { },
    errorMessage: '',
    setErrorMessage: () => {}
});

// Custom Hook for consuming the context
export const UseTodo = () => {
    return useContext(TodoContext);
};