import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";

const DemoFlash = () => {
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const [flashCard, setFlashCard] = useState({});

  useEffect(() => {
    setFlashCard(flashCard);
  }, [flashCard]);

  function editCard(e, title) {
    e.preventDefault();
    
    // Get the card data
    const cardData = flashCard[title];
    
    // Set the title input
    setTitle(title);
     
    // Set the editIndex to the current title
    setEditIndex(title);
    
    // Scroll to the top of the page where the input fields are
    window.scrollTo(0, 0);
  }

  function deleteCard(e) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (!isConfirmed) return;
    e.preventDefault();
    e.target.parentElement.parentElement.remove();
  }

const handleAddCard = () => {
  if (title !== "" && definition !== "") {
    if (editIndex !== null) {
      // Update existing card
      flashCard[title] = [definition];
      setEditIndex(null);
    } else {
      // Add new card
      setFlashCard((prevCards) => ({
        ...prevCards,
        [title]: [definition],
      }));
    }
    setTitle("");
    setDefinition("");
  }
};
  const handleAddDefinition = () => {
    if (title !== "" && definition !== "") {
      try {
        flashCard[title].push(definition);
        setEditIndex(null);
        setTitle("");
        setDefinition("");
        setEditIndex(null);
      } catch (error) {
        console.error("Failed to add definition", error);
        alert("Failed to add definition. Please try again.");
      }
    } else {
      alert("Enter the definition");
    }
  };


  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  const account = new Account(client);
  const handleRegister = async () => {
    navigate('/register')
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">🧠BrainFlash</h1>
        {/* <h1 className="text-sm text-white">To Save your flashcards permanently register yourself and Login</h1> */}
        <div className="flex gap-4">
        <button  onClick={() => navigate('/register')} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Register
        </button>
        <button onClick={() => navigate('/login')} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Login
        </button>
        <button onClick={() => navigate('/')} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Home
        </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-200 mb-8">
            Card Creator
          </h2>

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
                {editIndex !== null ? "Update Card" : "Add Card"}
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
          <div className="flex flex-wrap justify-evenly gap-y-5">
            {Object.entries(flashCard).map(([key, valueArray]) => (
              <div key={key} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-purple-500 mb-2">
                  {key}
                </h2>
                <ul className="list-disc list-inside text-white mb-4">
                  {valueArray.map((def, defIndex) => (
                    <li key={defIndex}>{def}</li>
                  ))}
                </ul>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={(e)=>{editCard(e,key )}}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={deleteCard}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
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

export default DemoFlash;