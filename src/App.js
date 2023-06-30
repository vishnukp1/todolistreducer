import React, { useReducer } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initialState = {
  newItem: "",
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setItems":
      return { ...state, newItem: action.payload };
    case "Add-items":
      if (!state.newItem) {
        alert("enter an item");
        return state;
      }
      const item = {id: Math.floor(Math.random() * 10000),
        value: state.newItem,
      };
      return { ...state, items:[...state.items, item], newItem: "" };
    case "Delete items":
      const newArray = state.items.filter((item) => item.id !== action.payload);
      return { ...state, items: newArray };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function additem() {
    dispatch({ type: "Add-items" });
  }

  function deleteItem(id) {
    dispatch({ type: "Delete items", payload: id });
  }

  return (
    <div className="App">
      <div className="div1">
        <h1 className="heading">ToDOlist</h1>
        <input type="text" className="input1" placeholder="add items.." value={state.newItem} onChange={(e) =>dispatch({ type: "setItems", payload: e.target.value })}/>
        <Button variant="secondary" onClick={additem}>Add items</Button>

        {state.items.map((item) => {
          return (
            <div className="list" key={item.id}>
              {item.value}
              <Button className="btn1" variant="secondary" onClick={() => deleteItem(item.id)}>Delete</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;