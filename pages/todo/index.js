import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

import TodoForm from "./form";

const TodoApp = () => {
    // const Todos = [
    //   { id: uuidv4(), todo: 'title2', isCompleted: true, createdAt: new Date().toISOString() },
    //   { id: uuidv4(), todo: 'title3', isCompleted: false, createdAt: new Date().toISOString() }
    // ];
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const URL = '/api/todo';

    const inputRef = useRef();

    useEffect(() => {
      fetchTodo();
    }, []);

    const fetchTodo = async() => {
        await axios
            .get(URL)
            .then(res => {
                setTodos(res.data.data);
            })
            .catch(err => console.log(err));
    };

    const addTodo = async(todo) => {
      await axios
            .post(URL, todo)
            .then(() => {
              setTodos([...todos, todo]);
              setNewTodo("");
            })
            .catch(err => {
              console.log(err)
            });
  };

  const deleteTodo = async(id) => {
    await axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const newTodo = todos.filter(x => x.id !== id);
        setTodos(newTodo);
      })
      .catch(err => {
        console.log(err)
      });
  };

  const updateTodo = async(id,updatedTodo,newTodo) => {
    await axios
    .put(`${URL}/${id}`, updatedTodo)
    .then(() => {
      const newTodo_data = todos.map(x => {
        if (x.id === id) {
          x.todo = newTodo;
        }
        return x;
      });
      setTodos(newTodo_data);
      setNewTodo("");
      setEditId("");
      inputRef.current.focus();
    }
    )
    .catch(err => {
      console.log(err);
    });
  }

  const updateCompleted = async(id,updatedTodo, newIsCompleted) => {
    await axios
    .put(`${URL}/${id}`, updatedTodo)
    .then(() => {
      const newTodo_data = todos.map(x => {
        if (x.id === id) {
          x.isCompleted = newIsCompleted;
        }
        return x;
      });
      setTodos(newTodo_data);
      setNewTodo("");
      setEditId("");
      inputRef.current.focus();
    }
    )
    .catch(err => {
      console.log(err);
    });
  }

    const handleChange = (e) => {
        let search = e.target.value
        const target = todos.filter(x =>
            x.todo.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
        if (target.length > 0) {
            setSearchResult([...target])
        } else {
            setSearchResult([])
        }
        const { value } = e.target;
        setNewTodo((prevState) => (prevState = value));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const findDuplicate = todos.find(x => x.todo === newTodo);
        if (findDuplicate) {
            alert("Data is duplicate");
            inputRef.current.focus();
        } else {
            if (isEdit) {
              const todo_data = todos.find(x => x.id === editId);
              const updatedTodo = {
                ...todo_data,
                todo: newTodo
              };

              updateTodo(editId,updatedTodo, newTodo)
                // const objIndex = todos.findIndex((obj => obj.id == editId));
                // todos[objIndex].todo = newTodo;
                // setTodos((prevState) => (prevState = todos));
                // setNewTodo("");
                // setEditId("");
                // setIsEdit(false);
                // inputRef.current.focus();
            } else {
              let todo = { id: uuidv4(), todo: newTodo, isCompleted: false, createdAt: new Date().toISOString() }
              addTodo(todo);
                // todos.push({ id: uuidv4(), todo: newTodo, isCompleted: false, createdAt: new Date().toISOString() })
                // setTodos((prevState) => (prevState = todos));
                // setNewTodo("");

            }
        }
    };

    const handleClear = () => {
        inputRef.current.value = "";
        inputRef.current.focus();
    };

    const handleCancel = () => {
        setIsEdit(false);
        setNewTodo("");
        setEditId("");
        inputRef.current.focus();
    };

    const handleDelete = async(id) => {
        if (todos.length <= 1) {
            alert("Valid todo cannot be zero");
        } else {
          deleteTodo(id);
    }
    };

    const handleEdit = (id) => {
        const item = todos.find((todo) => todo.id === id);
        setNewTodo(item.todo);
        setIsEdit(true);
        setEditId(item.id);
        inputRef.current.focus();
    };

    const handleCheck = async (todo, id) => {
        const objIndex = todos.findIndex((obj => obj.id == id));
        let new_isCompleted = true
        if (todos[objIndex].isCompleted) {
          new_isCompleted = false
        } 
        const todo_data = todos.find(x => x.id === id);
        const updatedTodo = {
          ...todo_data,
          isCompleted: new_isCompleted
        };
        updateCompleted(id,updatedTodo,new_isCompleted)
    };


    const TaskLists = todos.map((item) => {
        return ( <li className = "list col-12 row"
            key = { item.id }>
            <div className = "col-8"> 
            {
                item.isCompleted ? <s> { item.todo } </s> : item.todo}</div >
                <div className = " col-4">
                <button
                title = "Delete"
                className = " btn float-right"
                onClick = {
                    () => handleDelete(item.id)
                } >
                <i className = "fas fa-trash"/>
                </button> 
                <button
                title = "Edit"
                className = " btn float-right"
                onClick = {
                    () => handleEdit(item.id)
                } >
                <i className = "fas fa-edit"/>
                </button> {
                item.isCompleted ?
                <button
                title = "Mark as imcomplete"
                className = " btn float-right"
                onClick = {
                    () => handleCheck(item.todo, item.id)
                } >
                <i className = "fas fa-times"/>
                </button>  : <button
                title = "Mark as complete"
                className = " btn float-right"
                onClick = {
                    () => handleCheck(item.todo, item.id)
                } >
                <i className = "fas fa-check"/>
                </button>  
            }

            </div> 
            </li >
        );
    });
    return ( <div className = "wrapper" >
        <header> Todo App </header> 
        <TodoForm onSubmit = { handleSubmit }
        value = { newTodo }
        onChange = { handleChange }
        onClick = {!isEdit ? handleClear : handleCancel }
        isEdit = { isEdit }
        reference = { inputRef }
        searchResult = { searchResult }
        />

        {
            todos.length > 0 ? (
                TaskLists
            ) : ( <span className = "no-task">
                <i className = "fas fa-tasks"/>
                <span className = "no-task-p" > Add tasks above </span> 
                </span >
            )
        } </div>
    );
};

export default TodoApp;