import React, { useState } from 'react';
import CharacterCreation from './CharacterCreation';
import Map from './Map';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [houses, setHouses] = useState([]);
  const [cars, setCars] = useState([]);
  const [showCharacterCreation, setShowCharacterCreation] = useState(true);

  const handleCharacterCreated = (character) => {
    setCharacters(prevCharacters => [...prevCharacters, character]);
    setShowCharacterCreation(false);
  };

  const handleCreateHouse = () => {
    setHouses(prevHouses => [...prevHouses, { 
      id: Date.now(),
      x: Math.random() * 400, 
      y: Math.random() * 400, 
      occupied: false 
    }]);
  };

  const handleCreateCar = () => {
    setCars(prevCars => [...prevCars, { 
      id: Date.now(),
      x: Math.random() * 400, 
      y: Math.random() * 400, 
      occupied: false 
    }]);
  };

  const handleClearAll = () => {
    setCharacters([]);
    setHouses([]);
    setCars([]);
  };

  return (
    <div>
      {showCharacterCreation && (
        <CharacterCreation onCharacterCreated={handleCharacterCreated} />
      )}
      <Map 
        characters={characters} 
        setCharacters={setCharacters}
        houses={houses} 
        setHouses={setHouses}
        cars={cars} 
        setCars={setCars}
      />
      <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <button onClick={() => setShowCharacterCreation(true)}>Create Character</button>
        <button onClick={handleCreateHouse}>Create House</button>
        <button onClick={handleCreateCar}>Create Car</button>
        <button onClick={handleClearAll}>Clear All</button>
      </div>
    </div>
  );
};

export default App;
