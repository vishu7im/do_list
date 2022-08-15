import React, { useEffect, useState } from "react";
import "./style.css";
import Todoitem from "./Todoitem";

export default function Todo() {
  const getlocalstoage = () => {
    let mydata = localStorage.getItem("DATA");
    if (mydata) {
      return JSON.parse(mydata);
    } else {
      return [];
    }
  };

  const [inputdata, setinputdata] = useState();
  const [item, setitem] = useState(getlocalstoage());
  const [Toogal, setToogal] = useState(false);
  const [editId, seteditId] = useState(null);

  const additem = () => {
    if (!inputdata) {
      alert("fill somthing");
    } else if (inputdata && Toogal === true) {
      setitem(
        item.map((element) => {
          if (element === item[editId]) {
            return [inputdata];
          } else {
            return element;
          }
        })
      );
      setinputdata("");
      setToogal(false);
      seteditId(null);
    }
  
    else {
      setitem([...item, inputdata]);
      setinputdata("");
    }
  };

  //   fro deleting the item

  const delitem = (i) => {
    let items = item.filter((e) => {
      return e !== item[i];
    });
    setitem(items);
  };
  //seting localstorage
  useEffect(() => {
    localStorage.setItem("DATA", JSON.stringify(item));
  }, [item]);

  // for editing the item

  const edit = (index) => {
    let element = item.find((e) => {
      return e === item[index];
    });
    setinputdata(element);
    setToogal(true);
    seteditId(index);
    console.log(item[index]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(e) => {
                setinputdata(e.target.value);
              }}
            />
            {Toogal === true ? (
              <i
                className="far fa-edit add-btn"
                onClick={() => {
                  additem(item);
                }}
              ></i>
            ) : (
              <i
                className="fa fa-plus add-btn"
                onClick={() => {
                  additem(inputdata);
                }}
              ></i>
            )}
          </div>
          {/* show our items  */}
          {item.length > 0
            ? item.map((item, index) => {
                return (
                  <Todoitem
                    item={item}
                    i={index}
                    key={index}
                    del={delitem}
                    edit={edit}
                  />
                );
              })
            : " "}

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => {
                setitem([]);
              }}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
