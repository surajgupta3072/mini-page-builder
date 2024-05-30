import React, { useEffect, useRef, useState } from 'react'
import "./DraggableComponents.css"

function DraggableComponents({component, onSelect, onDelete, onDrag, onEdit }) {
    const { id, type, x, y, config } = component;
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        if(!isDragging) {
            onSelect(id);
            setIsSelected(true);
        }
    };

    useEffect(()=>{
        const element = ref.current;
        element.addEventListener("click", handleSelect);;
        return () => {
            element.removeEventListener("click", handleSelect);
        };

    }, [handleSelect, isDragging]);

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(ref.current && !ref.current.contains(event.target)){
                setIsSelected(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          onEdit(component);
        } else if (e.key === "Delete") {
          onDelete(id);
        }
      };
    
      const handleDragStart = (e) => {
        setIsDragging(true);
        const type = "reposition";
        e.dataTransfer.setData("type", type);
        e.dataTransfer.setData("text/plain", "");
        e.dataTransfer.setDragImage(new Image(), 0, 0);
      };
    
      const handleDragEnd = (e) => {
        setIsDragging(false);
        onDrag(id, e.clientX, e.clientY);
      };
    
      const labelStyles = {
        color: config.color || "#000",
        fontSize: `${config.fontSize}px` || "16px",
        fontWeight: config.fontWeight || "normal",
        fontFamily: "Arial, sans-serif",
      };
    
      const borderStyle = isSelected ? "2px solid red" : "2px solid transparent";

  return (
    <div
      id={`component-${id}`}
      className="DraggableComponent"
      style={{
        top: y,
        left: x,
        position: "absolute",
        border: borderStyle,
        cursor: "move",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onKeyDown={handleKeyDown}
      ref={ref}
      tabIndex={0}
    >
      {type === "Label" && (
        <span style={labelStyles}>{config.text || "Label"}</span>
      )}
      {type === "Input" && (
        <input type="text" value={config.text || ""} style={labelStyles} />
      )}
      {type === "Button" && (
        <button style={labelStyles}>{config.text || "Button"}</button>
      )}
    </div>
  )
}

export default DraggableComponents