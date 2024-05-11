import * as React from "react";
import { createRoot } from "react-dom/client";
import { SearchBar } from "./search.jsx";
import { ItemList } from "./itemList.jsx";
import { Modal } from "./modal.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

let storage = JSON.parse(localStorage.getItem("to-read-items")) || [];

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [toReadItems, setToReadItems] = React.useState(storage);

  return (
    <div>
      <SearchBar onClick={openModal} />
      <ItemList toReadItems={toReadItems} />
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
    }
    setToReadItems([...toReadItems, item]);
  }
}

function save() {
  localStorage.setItem("to-read-items", JSON.stringify(storage));
}
