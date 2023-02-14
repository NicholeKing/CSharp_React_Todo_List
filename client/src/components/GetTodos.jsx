import { useEffect, useState } from "react";
import axios from 'axios';
import TodoForm from "./TodoForm";

const GetTodos = props => {
    const [allTasks, setAllTasks] = useState(null);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        axios.get("https://localhost:7257/api/todoitems")
            .then(res => setAllTasks(res.data))
    }, [update])
    
    const triggerUpdate = () => {
        setUpdate(!update);
    }

    const onChangeHandler = async item => {
        item.isComplete = !item.isComplete;
        try {
            const updateItem = await axios({
                url: `https://localhost:7257/api/todoitems/update/${item.id}`,
                method: "post",
                data: item,
                ContentType: "application/json"
            });
            // Need to update our list with the proper information
            setUpdate(!update);
        } catch (err)
        {
            console.log(err);
        }
    }

    const deleteItem = async id => {
        try {
            const removeitem = await axios({
                url: `https://localhost:7257/api/todoitems/delete/${id}`,
                method: "post",
                ContentType: "application/json"
            });
            setUpdate(!update);
        } catch (err)
        {
            console.log(err);
        }
    }
    
    return(
        <>
        <h1>My Todo List</h1>
        {
            allTasks ? allTasks.map((item, i) => <div key={i}>
                <h4 className={item.isComplete ? "success" : "todo"}>
                    <span className="m-2">{item.name}</span>
                    <input type="checkbox" name="isComplete" checked={item.isComplete} onChange={() => onChangeHandler(item)}/> 
                    <button className="btn btn-warning mx-3" onClick={() => deleteItem(item.id)}>Delete</button>
                </h4>
            </div>)
            : <h3>Loading...</h3>
        }
        <TodoForm triggerUpdate={triggerUpdate}/>
        </>
    );
}

export default GetTodos;