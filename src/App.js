import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Canvas from "./Components/Canvas";
import Modal from "./Components/Modal";
import { saveAs } from "file-saver";
import './App.css';

function App() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState([]);

  //for fetching the state from the local storage
  useEffect(()=>{
    const savedComponents = JSON.parse(localStorage.getItem("components"));
    if(savedComponents){
      setComponents(savedComponents);
    }
  },[]);

  //for saving the sate into the local storage
  const saveToLocalStorage = (data) => {
    localStorage.setItem("components", JSON.stringify(data));
  }

  //for adding new component into the canvas
  const addComponent = (type,x,y) => {
    const newComponent = {
      id: Date.now(),
      type,
      x,
      y,
      config: { x,y, text: "", fontSize: 16, fontWeight: "normal" },
    };

    setComponents((prevComponents)=>{
      const updatedComponents = [...prevComponents, newComponent];
      saveToLocalStorage(updatedComponents);
      return updatedComponents;
    });

    setSelectedComponent(newComponent);
    setModalConfig(newComponent.config);
    setShowModal(true);
  };

  //for updating the component
  const updateComponent = (id,config) => {
    setComponents((prevComponents) => {
        const updatedComponents = prevComponents.map((comp)=>
        comp.id === id
        ? {...comp, config: { ...comp.config, ...config}}
        : comp
      );
      saveToLocalStorage(updatedComponents);
      return updatedComponents;
    });
    setShowModal(false);
  }

  //for deleting the component
  const deleteComponent = (id) => {
    setComponents((prevComponents)=>{
      const updatedComponents = prevComponents.filter((comp) => comp.id !== id);
      saveToLocalStorage(updatedComponents);
      return updatedComponents;
    });
  };

  const handleDrop = (type,x,y) =>{
    if(type !== "reposition"){
      addComponent(type,x,y);
    }
  }

  const handleEdit = (component) =>{
    setSelectedComponent(component);
    setModalConfig(component.config);
    setShowModal(true);
  };

  const handleDrag = (id, newX, newY) => {
    setComponents((prevComponents)=>{
      const updatedComponents = prevComponents.map((comp)=>
        comp.id === id? {...comp,x: newX, y: newY} : comp
      );
      saveToLocalStorage(updatedComponents);
      return updatedComponents;
    })
  }

  const handleSaveChanges = (id, updatedConfig) => {
    updateComponent(id, updatedConfig);
  }

  // for exporting the data into json format
  const exportPageConfig = () => {
    const jsonData = JSON.stringify(components);
    const blob = new Blob([jsonData], {type: "application/json"});
    saveAs(blob, "page_config.json");
  };

  return (
    <div className="App">
      <Canvas
        components = {components}
        onDrop = {handleDrop}
        onSelect = {setSelectedComponent}
        onDelete = {deleteComponent}
        onEdit = {handleEdit}
        onDrag = {handleDrag}
      />
      {showModal && selectedComponent && (
        <Modal 
          component = {selectedComponent}
          config = {modalConfig}
          onSave = {handleSaveChanges}
          onClose = {()=> setShowModal(false)}
        />
      )}
      <Sidebar onAdd={addComponent} exportPageConfig={exportPageConfig} />
    </div>
  );
}

export default App;
