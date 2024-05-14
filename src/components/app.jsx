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
  const [toReadItemsFiltered, setToReadItemsFiltered] = React.useState([]);
  const [searchActive, setSearchActive] = React.useState(false);

  window.myAPI.onShortcutAddItem(()=> {
    console.log('test main to renderer');
    openModal();
  });

  return (
    <div className="app">
      <SearchBar onClick={openModal} onSearch={onSearch} />
      <ItemList toReadItems={searchActive ? toReadItemsFiltered : toReadItems} onDelete={onDelete}/>
      {showModal ? (
        <Modal onCancel={closeModal} onAddItem={addToReadItem} />
      ) : null}
    </div>
  );

  function onSearch(searchVal) {
    console.log(searchVal);
   setToReadItemsFiltered( toReadItems.filter((item) => {
      console.log('title is ', item.title);
      console.log('ogtitle is ', item.openGraphTitle);
      return (item.title.toLowerCase().includes(searchVal) || item.openGraphTitle.toLowerCase().includes(searchVal));
    }));
    console.log(toReadItemsFiltered);
    if (searchVal == "") {
      setSearchActive(false);
    } else {
      setSearchActive(true);
    }
  }

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
    console.log(storage, 'storage vals');
    const index = storage.findIndex((item)=>{
      return item.url == url;
    })
console.log('tried to delete ', index, ' = ', url);

    storage.splice(index, 1);

    save();
    setToReadItems([...storage]);
  }
}

function save() {
  localStorage.setItem("to-read-items", JSON.stringify(storage));
}
