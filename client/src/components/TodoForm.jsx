import { useState } from "react";
import axios from "axios";

const TodoForm = props => {
    const [form, setForm] = useState({
        name: "",
        isComplete: false
    });
    const [errors, setErrors] = useState(null);

    const onChangeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    // This just empties the form after you submit
    const formReset = () => {
        setForm({
            name: "",
            isComplete: false
        })
    }

    const formHandler = async e => {
        e.preventDefault();
        // try to add the item, otherwise, get errors
        try {
            const addItem = await axios({
                url: "https://localhost:7257/api/todoitems",
                method: "post",
                data: form,
                contentType: "application/json"
            });
            // Trigger an update for the get all
            props.triggerUpdate();
            // Clears the form
            formReset();
            // Resets errors to null in case there had been some
            setErrors(null);
        } catch (err) {
            // Only Name is capable of getting an error
            // Pull one layer back if you have multiple errors to watch out for
            setErrors(err.response.data.errors.Name);
        }
    }

    return(
        <>
            <h2 className="pt-3">Add a Task</h2>
            <div className="d-flex justify-content-center">
                <form onSubmit={formHandler} className="col-12">
                    <div class="p-2">
                        <label htmlFor="name">Task:</label>
                        <input type="text" name="name" onChange={onChangeHandler} value={form.name} className="form-control"/>
                        <div>
                            {errors ? <span className="text-danger">{errors}</span> : ""}
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="Add Task" className="btn btn-success"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TodoForm;