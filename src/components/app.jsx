import * as React from "react";
import { createRoot } from "react-dom/client";
import { SearchBar } from "./search.jsx";
import { ItemList } from "./itemList.jsx";
import { Modal } from "./modal.jsx";
import './css/main.css'

const root = createRoot(document.getElementById("root"));
root.render(<App />);

let storage = JSON.parse(localStorage.getItem("to-read-items")) || [];



function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [toReadItems, setToReadItems] = React.useState(storage);

  window.myAPI.onShortcutAddItem(()=> {
    console.log('test main to renderer');
    openModal();
  });

  return (
    <div className="app">
      <SearchBar onClick={openModal} />
      <ItemList toReadItems={toReadItems} onDelete={onDelete}/>
      {showModal ? (
        <Modal onCancel={closeModal} onAddItem={addToReadItem} />
      ) : null}
    </div>
  );

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function addToReadItem(item) {
    if (
      !toReadItems.find((e) => {
        e.url == item.url;
      })
    ) {
      storage.push(item);
      save();
      setToReadItems([...storage]);
    }
    console.log(toReadItems, 'before add new item')
    console.log(item);
    
  }

  function onDelete(url) {
    const index = storage.findIndex((item)=>{
      item.url == url;
    })

    storage.splice(index, 1);

    save();
    setToReadItems([...storage]);
  }
}

function save() {
  localStorage.setItem("to-read-items", JSON.stringify(storage));
}
