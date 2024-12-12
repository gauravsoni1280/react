import { useState } from "react";
import { UseTodo } from "../context";

function TodoForm() {
    const { createTodo } = UseTodo();
    const [mess, setMess] = useState('');

    const todoCreator = (e) => {
        e.preventDefault();
        if (mess.length > 0) {
            createTodo({ todo: mess });
            setMess('');
        }

    }

    return (
        <form className="flex" onSubmit={todoCreator}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e) => setMess(e.target.value)}
                value={mess}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0" >
                Add
            </button>
        </form>
    );
}

export default TodoForm;

