import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import TodoForm from "./form";

const TodoApp = () => {
  const Todos = [
    { id: uuidv4(), todo: 'title2', isCompleted: true, createdAt: new Date().toISOString() },
    { id: uuidv4(), todo: 'title3', isCompleted: false, createdAt: new Date().toISOString() }
  ];
  const [todos, setTodos] = useState(Todos);
  const [newTodo, setNewTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const inputRef = useRef();
  
  const handleChange = (e) => {
    let search = e.target.value
    const target = todos.filter(x =>
        x.todo.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    if(target.length>0){
        setSearchResult([...target])
    }
    else{
        setSearchResult([])
    }
    const { value } = e.target;
    setNewTodo((prevState) => (prevState = value));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const findDuplicate = todos.find(el => el.todo === newTodo);
    if(findDuplicate){
        alert("Data is duplicate");
        inputRef.current.focus();
    }
    else{
        if (isEdit) {
            const objIndex = todos.findIndex((obj => obj.id == editId));
            todos[objIndex].todo = newTodo;
            setTodos((prevState) => (prevState = todos));
            setNewTodo("");
            setEditId("");
            setIsEdit(false);
            inputRef.current.focus();
        } else {
            todos.push({ id: uuidv4(), todo: newTodo, isCompleted: false,createdAt: new Date().toISOString() })
            setTodos((prevState) => (prevState = todos));
            setNewTodo("");
           
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

  const handleDelete = (id) => {
    if(todos.length <= 1){
        alert("Valid todo cannot be zero");
    }else{
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
    }
  };

  const handleEdit = (id) => {
    const item = todos.find((todo) => todo.id === id);
    setNewTodo(item.todo);
    setIsEdit(true);
    setEditId(item.id);
    inputRef.current.focus();
  };

  const handleCheck = (todo, id) => {
    const objIndex = todos.findIndex((obj => obj.id == id));

    if (todos[objIndex].isCompleted) {
      const newArr = todos.slice();
      newArr.splice(objIndex, 1, { id, todo, isCompleted: false });
      setTodos((prevState) => (prevState = newArr));
    } else {
      const newArr = todos.slice();
      newArr.splice(objIndex, 1, { id, todo, isCompleted: true });
      setTodos((prevState) => (prevState = newArr));
    }
  };


  const TaskLists = todos.map((item) => {
    return (
      <li
        className="list col-12 row"
        key={item.id}
      >
        <div className="col-8">{item.isCompleted ? <s> {item.todo}</s> : item.todo}</div>
        <div className=" col-4">
        <button
            title="Delete"
            className=" btn float-right"
            onClick={() => handleDelete(item.id)}
          >
            <i className="fas fa-trash" />
          </button>
          <button
            title="Edit"
            className=" btn float-right"
            onClick={() => handleEdit(item.id)}
          >
            <i className="fas fa-edit" />
          </button>
          {item.isCompleted? 
             <button
             title="Mark as imcomplete"
             className=" btn float-right"
             onClick={() => handleCheck(item.todo, item.id)}
           >
             <i className="fas fa-times" />
           </button>  
           :
           <button
             title="Mark as complete"
             className=" btn float-right"
             onClick={() => handleCheck(item.todo, item.id)}
           >
             <i className="fas fa-check" />
           </button>  
        }
          
        </div>
      </li>
    );
  });
  return (
    <div className="wrapper">
      <header>Todo App</header>
        <TodoForm
          onSubmit={handleSubmit}
          value={newTodo}
          onChange={handleChange}
          onClick={!isEdit ? handleClear : handleCancel}
          isEdit={isEdit}
          reference={inputRef}
          searchResult={searchResult}
        />
  
          {todos.length > 0 ? (
            TaskLists
          ) : (
            <span className="no-task">
              <i className="fas fa-tasks" />
              <span className="no-task-p">Add tasks above</span>
            </span>
          )}
      </div>
  );
};

export default TodoApp;