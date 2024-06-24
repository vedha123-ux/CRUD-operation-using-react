
import React, { useState} from 'react';
import './DataTable.css';
import DataDetails from './DataDetails';

const DataTable = () => {
  const initialData = [
    { id: 1, name: 'Dell Laptop', price: 10000 },
    { id: 2, name: 'Acer Laptop', price: 20000 },
    
  ];

  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState({ id: null, name: '', price: '' });
  const [editing, setEditing] = useState(false);
  const [viewing, setViewing] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setData([...data, { id: data.length + 1, name: formData.name, price: parseFloat(formData.price) }]);
    setFormData({ id: null, name: '', price: '' });
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === formData.id ? { ...item, name: formData.name, price: parseFloat(formData.price) } : item
    );
    setData(updatedData);
    setEditing(false);
    setFormData({ id: null, name: '', price: '' });
  };

  const handleEdit = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setEditing(true);
    setFormData({ id: selectedItem.id, name: selectedItem.name, price: selectedItem.price.toString() });
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleView = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setSelectedItem(selectedItem);
    setViewing(true);
  };

  const handleCloseDetails = () => {
    setViewing(false);
    setSelectedItem(null);
  };

  return (
    <div className="dataTableContainer">
      <table className="dataTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => handleView(item.id)}>View</button>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewing && (
        <div className="modalBackdrop">
          <div className="modalContent">
            <DataDetails item={selectedItem} onClose={handleCloseDetails} />
          </div>
        </div>
      )}

      <div className="formContainer">
        {editing ? (
          <div className="editForm">
            <h2>Edit Item</h2>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="formInput"
            />
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="formInput"
            />
            <button onClick={handleUpdate} className="formButton">Update</button>
          </div>
        ) : (
          <div className="addForm">
            <h2>Add New Item</h2>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="formInput"
            />
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="formInput"
            />
            <button onClick={handleAdd} className="formButton">Add</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
