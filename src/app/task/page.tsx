'use client'
import React, { useState } from 'react'

type Task = {
    text: string;
    completed: boolean;
};

type Filter = "all" | "completed" | "incomplete";

const page = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>("");

    const [filter, setFilter] = useState<Filter>("all");

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim() === "") {
            alert("لطفا یه تسک وارد کن!");
            return;
        }
        setTasks([...tasks, { text: task.trim(), completed: false }]);
        setTask("");
    };

    const handleDeleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleToggleComplete = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
        setEditingText(tasks[index].text);
    };

    const handleSaveEdit = (index: number) => {
        if (editingText.trim() === "") {
            alert("متن نمیشه خالی باشه!");
            return;
        }

        const updatedTasks = [...tasks];
        updatedTasks[index].text = editingText;
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditingText("");
    };


    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true; // اگه فیلتر همه بود
    });

    const handleClearCompleted = () => {
        const incompleteTasks = tasks.filter((task) => !task.completed);
        setTasks(incompleteTasks);
        //فقط کارهای انجام نشده رو نگه میداره
    }

    const handleClearAll = () => {
        setTasks([]);
    };

    //progress bar
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="max-w-md mx-auto mt-10 p-4 retro-border rounded-xl bg-yellow-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4 text-pink-700">🌟 Todo List رترو 🌟</h1>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="تسک جدید..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="flex-1 retro-input p-2 rounded-lg border-2 border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                    onClick={handleAddTask}
                    className="retro-button bg-pink-300 hover:bg-pink-400 px-4 py-2 rounded-lg"
                >
                    افزودن
                </button>
            </div>

            <div className="flex justify-between mb-4">
                <button
                    onClick={() => setFilter("all")}
                    className={`retro-button px-3 py-1 rounded-lg ${filter === "all" ? "bg-blue-400" : "bg-blue-200"}`}
                >
                    همه
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`retro-button px-3 py-1 rounded-lg ${filter === "completed" ? "bg-green-400" : "bg-green-200"}`}
                >
                    انجام شده
                </button>
                <button
                    onClick={() => setFilter("incomplete")}
                    className={`retro-button px-3 py-1 rounded-lg ${filter === "incomplete" ? "bg-yellow-400" : "bg-yellow-200"}`}
                >
                    انجام نشده
                </button>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 mb-6 overflow-hidden retro-border">
                <div
                    className="h-full bg-green-400 text-xs font-bold text-center text-white transition-all duration-500"
                    style={{ width: `${progress}%` }}
                >
                    {Math.round(progress)}%
                </div>
            </div>

            <ul className="space-y-3 mb-4">
                {filteredTasks.map((item, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-3 bg-white rounded-lg shadow retro-border"
                    >
                        {editingIndex === index ? (
                            <>
                                <input
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="retro-input flex-1 p-2 border-2 border-yellow-400 rounded-lg mr-2"
                                />
                                <button
                                    onClick={() => handleSaveEdit(index)}
                                    className="retro-button bg-green-300 hover:bg-green-400 px-3 py-1 rounded-lg"
                                >
                                    ذخیره
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    className={`flex-1 ${item.completed ? "line-through text-gray-400" : "text-gray-800"
                                        }`}
                                >
                                    {item.text}
                                </span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleToggleComplete(index)}
                                        className="retro-button bg-blue-300 hover:bg-blue-400 px-3 py-1 rounded-lg"
                                    >
                                        {item.completed ? "برگردان" : "انجام"}
                                    </button>
                                    <button
                                        onClick={() => startEditing(index)}
                                        className="retro-button bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded-lg"
                                    >
                                        ویرایش
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(index)}
                                        className="retro-button bg-red-300 hover:bg-red-400 px-3 py-1 rounded-lg"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <div className="flex justify-between">
                <button
                    onClick={handleClearCompleted}
                    className="retro-button bg-purple-300 hover:bg-purple-400 px-4 py-2 rounded-lg"
                >
                    حذف تسک‌های انجام شده
                </button>
                <button
                    onClick={handleClearAll}
                    className="retro-button bg-red-300 hover:bg-red-400 px-4 py-2 rounded-lg"
                >
                    پاک کردن همه
                </button>
            </div>
        </div>
    )
}

export default page