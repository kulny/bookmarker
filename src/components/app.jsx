import * as React from "react";
import { createRoot } from "react-dom/client";
import { SearchBar } from "./search.jsx";
import {ItemList } from "./itemList.jsx" 
import { Modal } from "./modal.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

let storage = JSON.parse(localStorage.getItem('to-read-items')) || [];

function App() {
    const [showModal, setShowModal] = React.useState(false);

    
  return (
    <div>
        <SearchBar onClick={openModal} />
      <ItemList toReadItems={storage} />
      {showModal ? <Modal onCancel={closeModal} onAddItem={addToReadItem} /> : null}
    </div>
  );

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function addToReadItem(item, isNew = false) {
    console.log('add read item')
    console.log(item)
    if (isNew) {
        storage.push(item);
    }
  }
}

function save() {
    localStorage.setItem('to-read-items', JSON.stringify(storage));
}