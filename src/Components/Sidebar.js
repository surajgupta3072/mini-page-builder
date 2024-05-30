import React from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import "./Sidebar.css";
import { CiExport } from "react-icons/ci";

function Sidebar({ onAdd, exportPageConfig }) {
  const components = ["Label", "Input", "Button"];

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain", "");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("type", type);
  };

  return (
    <div className="Sidebar">
      <div>
        <span>BLOCKS</span>
        <div>
          {components.map((comp) => (
            <div
              key={comp}
              draggable
              onDragStart={(e) => handleDragStart(e, comp)}
            >
              <PiDotsSixVerticalBold style={{ marginRight: 10 }} />
              {comp}
            </div>
          ))}
        </div>
      </div>

      <button className="exportButton" onClick={exportPageConfig}>
        <CiExport style={{ marginRight: 10 }} />
        Export Page Configuration
      </button>
    </div>
  );
}

export default Sidebar;