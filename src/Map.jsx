import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const CharacterIcon = ({ color }) => (
  <svg width="30" height="50" viewBox="0 0 30 50">
    <path d="M15 0 L30 25 L22.5 25 L22.5 50 L7.5 50 L7.5 25 L0 25 Z" fill={color} />
    <circle cx="15" cy="10" r="5" fill="black" />
  </svg>
);

const Map = ({ characters, setCharacters, houses, setHouses, cars, setCars }) => {
  const findNearestTarget = (character, targets) => {
    return targets
      .filter(t => !t.occupied || t.occupiedBy === character.id)
      .reduce((nearest, target) => {
        const distance = Math.sqrt(
          Math.pow(target.x - character.x, 2) + Math.pow(target.y - character.y, 2)
        );
        return (!nearest || distance < nearest.distance) ? { target, distance } : nearest;
      }, null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCharacters(prevCharacters => 
        prevCharacters.map(character => {
          const targets = character.preference === 'house' ? houses : cars;
          const nearest = findNearestTarget(character, targets);

          if (nearest) {
            const { target, distance } = nearest;
            if (distance < 5) {
              // Character has reached the target
              if (!target.occupied) {
                if (character.preference === 'house') {
                  setHouses(prevHouses => prevHouses.map(h => 
                    h.id === target.id ? {...h, occupied: true, occupiedBy: character.id} : h
                  ));
                } else {
                  setCars(prevCars => prevCars.map(c => 
                    c.id === target.id ? {...c, occupied: true, occupiedBy: character.id} : c
                  ));
                }
                return {...character, x: target.x, y: target.y, inTarget: true};
              }
              // If target is occupied, character stays put
              return character;
            }

            // Move character towards target
            const dx = target.x - character.x;
            const dy = target.y - character.y;
            return {
              ...character,
              x: character.x + (dx / distance) * 5,
              y: character.y + (dy / distance) * 5,
              inTarget: false
            };
          }
          return character;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [characters, houses, cars]);

  useEffect(() => {
    const moneyInterval = setInterval(() => {
      setCharacters(prevCharacters => 
        prevCharacters.map(character => {
          if (character.inTarget) {
            return {
              ...character,
              money: character.money + (character.preference === 'house' ? 100 : 20)
            };
          }
          return character;
        })
      );
    }, 1000);

    return () => clearInterval(moneyInterval);
  }, []);

  const handleDrag = (index, type) => (e, data) => {
    if (type === 'house') {
      setHouses(prevHouses => prevHouses.map((house, i) => 
        i === index ? {...house, x: data.x, y: data.y, occupied: false, occupiedBy: null} : house
      ));
    } else if (type === 'car') {
      setCars(prevCars => prevCars.map((car, i) => 
        i === index ? {...car, x: data.x, y: data.y, occupied: false, occupiedBy: null} : car
      ));
    }
  };

  return (
    <div style={{ width: '100%', height: '500px', border: '1px solid black', position: 'relative' }}>
      {characters.map((character) => (
        <div key={character.id} style={{ position: 'absolute', left: character.x, top: character.y }}>
          <CharacterIcon color={character.backgroundColor} />
          <div style={{ 
            position: 'absolute', 
            top: '50px', 
            left: '0', 
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            padding: '2px',
            fontSize: '12px',
            whiteSpace: 'nowrap'
          }}>
            {character.name}: ${character.money}
          </div>
        </div>
      ))}
      {houses.map((house, index) => (
        <Draggable
          key={house.id}
          position={{ x: house.x, y: house.y }}
          onDrag={handleDrag(index, 'house')}
        >
          <div style={{ position: 'absolute', cursor: 'move' }}>
            <svg width="50" height="50">
              <rect width="50" height="50" fill="blue" />
              <text x="25" y="30" textAnchor="middle" fill="white">House</text>
            </svg>
          </div>
        </Draggable>
      ))}
      {cars.map((car, index) => (
        <Draggable
          key={car.id}
          position={{ x: car.x, y: car.y }}
          onDrag={handleDrag(index, 'car')}
        >
          <div style={{ position: 'absolute', cursor: 'move' }}>
            <svg width="30" height="20">
              <rect width="30" height="20" fill="red" />
              <text x="15" y="15" textAnchor="middle" fill="white" fontSize="10">Car</text>
            </svg>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default Map;
