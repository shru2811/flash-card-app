import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FlashCardApp = () => {
  const [title, setTitle] = useState('');
  const [definition, setDefinition] = useState('');
  const [flashCards, setFlashCards] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
const navigate = useNavigate();

  const handleAddCard = () => {
    if (title && definition) {
      if (editIndex !== null) {
        // Update existing card
        const updatedCards = [...flashCards];
        updatedCards[editIndex] = { title, definitions: [definition] };
        setFlashCards(updatedCards);
        setEditIndex(null);
      } else {
        // Add new card
        setFlashCards([...flashCards, { title, definitions: [definition] }]);
      }
      setTitle('');
      setDefinition('');
    }
  };

  const handleAddDefinition = () => {
    if (definition && editIndex !== null) {
      const updatedCards = [...flashCards];
      updatedCards[editIndex].definitions.push(definition);
      setFlashCards(updatedCards);
      setDefinition('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(flashCards[index].title);
    setDefinition('');
  };

  const handleDelete = (index) => {
    const updatedCards = flashCards.filter((_, i) => i !== index);
    setFlashCards(updatedCards);
    setEditIndex(null);
    setTitle('');
    setDefinition('');
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-500">BrainFlash</h1>
        <button
          onClick={()=>navigate('/')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-500 mb-8">Card Creator</h2>
          
          {/* Input Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <input
              type="text"
              placeholder="Enter card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Enter definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between">
              <button
                onClick={handleAddCard}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {editIndex !== null ? 'Update Card' : 'Add Card'}
              </button>
              <button
                onClick={handleAddDefinition}
                disabled={editIndex === null}
                className="px-4 py-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Definition
              </button>
            </div>
          </div>

          {/* Flash Cards List */}
          <div className="space-y-4">
            {flashCards.map((card, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-purple-500 mb-2">{card.title}</h2>
                <ul className="list-disc list-inside text-white mb-4">
                  {card.definitions.map((def, defIndex) => (
                    <li key={defIndex}>{def}</li>
                  ))}
                </ul>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCardApp;