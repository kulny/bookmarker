import * as React from "react";
import { createRoot } from "react-dom/client";
import { SearchBar } from "./search.jsx";
import { ItemList } from "./itemList.jsx";
import { Modal } from "./modal.jsx";
import "./css/main_out.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

let storage = JSON.parse(localStorage.getItem("to-read-items")) || [];

function App() {
  // modal state
  const [showModal, setShowModal] = React.useState(false);
  const [modalUrl, setModalUrl] = React.useState("");
  const [modalUserTitle, setModalUserTitle] = React.useState("");
  const [modalIsEditing, setModalIsEditing] = React.useState(false);
  const [urlToEdit, setUrlToEdit] = React.useState("");

  // items state
  const [toReadItems, setToReadItems] = React.useState(storage);
  const [toReadItemsFiltered, setToReadItemsFiltered] = React.useState([]);

  // search state
  const [searchActive, setSearchActive] = React.useState(false);
  // TODO on edit, take contextual url and allow editing that item in storage
  // on submit,  edit the existing value in storage, and preserve usage if not editing
  // on submit, check if editing in submit. IF yes, return edited item object, and replace original object (need to keep track of original url).
  // if no, work as before
  // resubmit to ipc for url data scrape

  window.myAPI.onShortcutAddItem(() => {
    openModal();
  });
  window.contextMenuCallbacks.onEditItem((url) => {
    let item = storage.find((item) => {
      return item.url == url;
    });
    openModal();
    setModalIsEditing(true);
    setModalUrl(item.url);
    setModalUserTitle(item.userTitle ?? "");
    setUrlToEdit(url);
  });

  return (
    <div className="app">
      <p className="bg-red-600">test</p>
      <SearchBar onClick={openModal} onSearch={onSearch} />
      <ItemList
        toReadItems={searchActive ? toReadItemsFiltered : toReadItems}
        onDelete={onDelete}
      />
      {showModal ? (
        <Modal
          onCancel={closeModal}
          onAddItem={addOrModifyToReadItem}
          url={modalUrl}
          userTitle={modalUserTitle}
          onChangeUrl={onChangeModalUrl}
          onChangeUserTitle={onChangeModalUserTitle}
          isEditing={modalIsEditing}
        />
      ) : null}
    </div>
  );

  function onSearch(searchVal) {
    setToReadItemsFiltered(
      toReadItems.filter((item) => {
        return (
          item.title.toLowerCase().includes(searchVal) ||
          item.openGraphTitle.toLowerCase().includes(searchVal)
        );
      })
    );
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
    setModalIsEditing(false);
    setModalUrl("");
    setModalUserTitle("");
    setShowModal(false);
  }

  function addOrModifyToReadItem(item) {
    console.log("add or modify");
    if (modalIsEditing) {
      console.log("modal is editing");
      let index = storage.findIndex((item) => {
        return (item.url == urlToEdit);
      });
      console.log('storage before ', storage);
      storage[index] = item;
      console.log('storage after ', storage);
      save();
      setToReadItems([...storage]);
      closeModal();
    } else if (
      !toReadItems.find((e) => {
        return e.url == item.url;
      })
    ) {
      storage.push(item);
      save();
      setToReadItems([...storage]);
      closeModal();
    }
    console.log(storage);
  }

  function onDelete(url) {
    const index = storage.findIndex((item) => {
      return item.url == url;
    });

    storage.splice(index, 1);

    save();
    setToReadItems([...storage]);
  }

  function onChangeModalUserTitle(e) {
    setModalUserTitle(e.target.value);
  }

  function onChangeModalUrl(e) {
    setModalUrl(e.target.value);
  }
}

function save() {
  localStorage.setItem("to-read-items", JSON.stringify(storage));
}
