import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ component, config, onSave, onClose }) {
    const [localConfig, setLocalConfig] = useState(config);

    useEffect(()=>{
        setLocalConfig(config);
    },[config]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLocalConfig((prevConfig) => ({
            ...prevConfig,
            [name]:
            name === "x" || name === "y" || name === "fontSize"
            ? parseInt(value)
            : value,
        }));
    };

    const handleSubmit = () => {
        onSave(component.id, localConfig);
      };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-header">Configure {component.type}</h2>
        <form className="modal-content">
          <div className="modal-field">
            <label>
              X:
              <input
                type="number"
                name="x"
                value={localConfig.x || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-field">
            <label>
              Y:
              <input
                type="number"
                name="y"
                value={localConfig.y || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-field">
            <label>
              Text:
              <input
                type="text"
                name="text"
                value={localConfig.text || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-field">
            <label>
              Font Size (px):
              <input
                type="number"
                name="fontSize"
                value={localConfig.fontSize || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modal-field">
            <label>
              Font Weight:
              <select
                name="fontWeight"
                value={localConfig.fontWeight || "normal"}
                onChange={handleChange}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="bolder">Bolder</option>
                <option value="lighter">Lighter</option>
              </select>
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal