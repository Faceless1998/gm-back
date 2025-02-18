import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditApartmentForm = ({ apartment, onSave }) => {
    const [formData, setFormData] = useState({
        block: apartment.block || "",
        floor: apartment.floor || "",
        room_number: apartment.room_number || "",
        price: apartment.price || "",
        space: apartment.space || "",
        balcony: apartment.balcony || false,
        apartment_condition: apartment.apartment_condition || "",
        rooms: apartment.rooms || "",
        bedroom: apartment.bedroom || "",
        bathroom: apartment.bathroom || "",
    });
    
    // State for the list of floors for the selected block
    const [floors, setFloors] = useState([]);
    const [blockSelected, setBlockSelected] = useState(false);
    
    // Sample data to simulate block and floor relationship (you can replace this with data from the server)
    const blockData = {
        A: [1, 2, 3, 4],
        B: [1, 2, 3],
        C: [1, 2],
    };

    const handleBlockSelect = (block) => {
        setFormData({ ...formData, block, floor: "" }); // Reset floor when block changes
        setFloors(blockData[block]);
        setBlockSelected(true); // Show the floor selection
    };

    const handleFloorSelect = (floor) => {
        setFormData({ ...formData, floor });
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/apartments/${apartment._id}`, formData);
            onSave(); // Callback to notify parent component of save
        } catch (error) {
            console.error("Error updating apartment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            {/* Block Selection */}
            <div className="block-selection">
                <label>Block:</label>
                <div className="block-options">
                    {['A', 'B', 'C'].map((block) => (
                        <div 
                            key={block} 
                            className={`block ${formData.block === block ? 'selected' : ''}`} 
                            onClick={() => handleBlockSelect(block)}
                        >
                            {block}
                        </div>
                    ))}
                </div>
            </div>

            {/* Floor Selection */}
            {blockSelected && (
                <div className="floor-selection">
                    <label>Floor:</label>
                    <div className="floor-options">
                        {floors.map((floor) => (
                            <div
                                key={floor}
                                className={`floor ${formData.floor === floor ? 'selected' : ''}`}
                                onClick={() => handleFloorSelect(floor)}
                            >
                                {floor}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Apartment Details Form */}
            {formData.floor && (
                <>
                    <label>Room Number:</label>
                    <input type="number" name="room_number" value={formData.room_number} onChange={handleChange} required />

                    <label>Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />

                    <label>Space (m²):</label>
                    <input type="number" name="space" value={formData.space} onChange={handleChange} required />

                    <label>Balcony:</label>
                    <input type="checkbox" name="balcony" checked={formData.balcony} onChange={handleChange} />

                    <label>Apartment Condition:</label>
                    <select name="apartment_condition" value={formData.apartment_condition} onChange={handleChange} required>
                        <option value="Black frame">Black frame</option>
                        <option value="White frame">White frame</option>
                        <option value="Green frame">Green frame</option>
                    </select>

                    <label>Rooms:</label>
                    <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} required />

                    <label>Bedroom:</label>
                    <input type="number" name="bedroom" value={formData.bedroom} onChange={handleChange} required />

                    <label>Bathroom:</label>
                    <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} required />

                    <button type="submit">Save</button>
                </>
            )}
        </form>
    );
};

export default EditApartmentForm;
