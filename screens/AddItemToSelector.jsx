import React, { useState } from 'react';

function AddItemToSelector() {
    //setting up defaults for the desired inputs
  const [itemName, setItemName] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [onList, setOnList] = useState(false);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    const newItem = { name: itemName, favourite: isFavourite, onlist: onList };
    setItems([...items, newItem]);

    // Clear the form fields before inviting user input
    setItemName('');
    setIsFavourite(false);
    setOnList(false);
  };

  return (
    <div>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter item name"
      />
      <label>
        Favourite
        <input
          type="checkbox"
          checked={isFavourite}
          onChange={(e) => setIsFavourite(e.target.checked)}
        />
      </label>
      <label>
        On List
        <input
          type="checkbox"
          checked={onList}
          onChange={(e) => setOnList(e.target.checked)}
        />
      </label>
      <button onClick={handleAddItem}>Add Item</button>

    </div>
  );
}

export default AddItemToSelector;
