import React, { useState } from 'react';

let nextId = 1;

const CharacterCreation = ({ onCharacterCreated }) => {
  const [name, setName] = useState('');
  const [appearance, setAppearance] = useState({
    hair: 'default',
    top: 'default',
    pants: 'default',
    shoes: 'default',
    face: 'default'
  });
  const [preference, setPreference] = useState('car');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const handleAppearanceChange = (part, value) => {
    setAppearance(prevAppearance => ({...prevAppearance, [part]: value }));
  };

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };

  const handleCreateCharacter = () => {
    if (!name) {
      alert('Please enter a name for the character');
      return;
    }
    const character = { 
      id: nextId++,
      name,
      appearance, 
      preference,
      backgroundColor,
      x: Math.random() * 400,
      y: Math.random() * 400,
      money: 0
    };
    onCharacterCreated(character);
  };

  return (
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '10px', 
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <h2>Create Character</h2>
      <div>
        <label>Name: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter character name"
        />
      </div>
      {Object.entries(appearance).map(([part, value]) => (
        <div key={part}>
          <label>{part.charAt(0).toUpperCase() + part.slice(1)}: </label>
          <select 
            value={value} 
            onChange={(e) => handleAppearanceChange(part, e.target.value)}
          >
            <option value="default">Default</option>
            <option value="style1">Style 1</option>
            <option value="style2">Style 2</option>
          </select>
        </div>
      ))}
      <div>
        <label>Preference: </label>
        <select value={preference} onChange={handlePreferenceChange}>
          <option value="car">Car</option>
          <option value="house">House</option>
        </select>
      </div>
      <div>
        <label>Background Color: </label>
        <input 
          type="color" 
          value={backgroundColor} 
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
      <button onClick={handleCreateCharacter}>Create</button>
    </div>
  );
};

export default CharacterCreation;
