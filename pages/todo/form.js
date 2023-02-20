import React from "react";

const TodoForm = (props) => {
  return (
    <div className="wrapper m-2 ">
      <form className="TodoForm" onSubmit={props.onSubmit}>
        <div className="row"> 
        <div className="col-7">
        <input
          className="form-input inputField"
          type="text"
          placeholder="Input your Job"
          autoComplete="off"
          value={props.value}
          onChange={props.onChange}
          ref={props.reference}
          required
        />
        {props.value.length > 0 ? (
          props.searchResult.length > 0 ? (
            <ul className="recommend">
              {props.searchResult.map(({ id, todo }) => (
                <li key={id} >
                    <p>{todo}</p>
                </li>
              ))}
            </ul>
          )
        :
        <p>No result, create new one instead!</p>
        ): null
      }
        </div>
        <div className=" col-5">
          <button className="form-btn btn btn-success col-5 m-1" type="submit">
            {!props.isEdit ? "Add" : "Edit"}
          </button>
          <button className="form-btn btn btn-warning col-5 m-1" type="button" onFocus={props.onClick}>
            {!props.isEdit ? "Clear" : "Cancel"}
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;