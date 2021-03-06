import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';

function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(()=> {
		const getTasks = async() => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		}
		getTasks();
	},[])
	
	//to fetch the tasks from server
	const fetchTasks = async() => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json();
		return data;
	}

	//to fetch task
	const fetchTask = async(id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`)
		const data = await res.json();
		return data;
	}

	//add task
	const addTask = async(task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method : `POST`,
			headers : {
				'Content-type':'application/json'
			},
			body : JSON.stringify(task)
		})
		const data = await res.json();
		setTasks([...tasks, data]);
		// const id = Math.floor(Math.random() * 1000) + 1
		// const newTask = { id, ...task };
		// setTasks([...tasks, newTask]);
		// console.log(newTask);

	}
	//Delete task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method:`DELETE`
		})
		setTasks(tasks.filter((task) => (
			task.id !== id
		)))

	}

	//toggle reminder
	const toggleReminder = async(id) => {
		
		const taskTOToggle = await fetchTask(id)
		const updtdTask = {...taskTOToggle, 
				reminder: !taskTOToggle.reminder}
		
		const res = await fetch(`http://localhost:5000/tasks/${id}`,{
			method:'PUT',
			headers : {
				'Content-type':'application/json'
			},
			body: JSON.stringify(updtdTask)
		})
		const data = await res.json();

		setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
	}


	return (
		<div className="container">

			<Header title='Task Tracker'
				onAdd={() => setShowAddTask(!showAddTask)} 
				showAdd= {showAddTask}
				/>
			{ showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? <Tasks
				tasks={tasks}
				onDelete={deleteTask}
				onToggle={toggleReminder} /> : 'No Tasks to show'}
		</div>
	);
}

export default App;
