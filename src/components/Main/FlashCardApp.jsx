import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account, Databases, ID, Query } from "appwrite";

const FlashCardApp = () => {
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [flashCard, setFlashCard] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  // Initialize Appwrite
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your Appwrite Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

  const account = new Account(client);
  const databases = new Databases(client);
  const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Use a unique collection ID for flashcards

  // Function to save flashcard data
  const saveFlashCardData = async (title, definitions) => {
    try {
      const documentId = "unique()";
      await databases.createDocument(databaseId, collectionId, documentId, {
        userId: userId,
        Title: title,
        Definitions: definitions,
      });
      console.log("Flashcard data saved successfully");
    } catch (error) {
      console.error("Failed to save flashcard data", error);
    }
  };

  // Function to load flashcard data
  const loadFlashCardData = async () => {
    if (!userId) return;

    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("userId", userId),
      ]);
      const loadedFlashCards = response.documents.reduce((acc, doc) => {
        acc[doc.$id] = {
          title: doc.Title,
          definitions: Array.isArray(doc.Definitions)
            ? doc.Definitions
            : [doc.Definitions],
        };
        return acc;
      }, {});
      setFlashCard(loadedFlashCards);
    } catch (error) {
      console.error("Failed to load flashcard data", error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        loadFlashCardData(); // Load flashcard data when user is set
      } catch (error) {
        console.error("Failed to get user data", error);
        navigate("/login");
      }
    };

    fetchUserId();
  }, [navigate, account]);

  function editCard(e, cardId) {
    const card = flashCard[cardId];
    setTitle(card.title);
    setDefinition(""); // Clear the definition input when editing
    setEditIndex(Object.keys(flashCard).indexOf(cardId));
  }

  const deleteCard = async (cardId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (!isConfirmed) return;

    try {
      await databases.deleteDocument(databaseId, collectionId, cardId);
      setFlashCard((prevCards) => {
        const updatedCards = { ...prevCards };
        delete updatedCards[cardId];
        return updatedCards;
      });
      console.log("Card deleted successfully");
    } catch (error) {
      console.error("Failed to delete card", error);
      alert("Failed to delete card. Please try again.");
    }
  };

  const handleAddCard = async () => {
    if (title !== "" && definition !== "") {
      try {
        if (editIndex === null) {
          // Adding a new card
          const newDocId = await saveFlashCardData(title, [definition]);
          setFlashCard((prev) => ({
            ...prev,
            [newDocId]: { title, definitions: [definition] },
          }));
        } else {
          // Updating an existing card
          const cardId = Object.keys(flashCard)[editIndex];
          await databases.updateDocument(databaseId, collectionId, cardId, {
            Title: title,
            Definitions: [definition],
          });
          setFlashCard((prev) => ({
            ...prev,
            [cardId]: {
              ...prev[cardId],
              title: title,
              definitions: [definition],
            },
          }));
          setEditIndex(null);
        }
        setTitle("");
        setDefinition("");
      } catch (error) {
        console.error("Failed to add/update card", error);
        alert("Failed to add/update card. Please try again.");
      }
    } else {
      alert("Enter the title and definition");
    }
  };

  const handleAddDefinition = async () => {
    if (title !== "" && definition !== "") {
      try {
        const cardId = Object.keys(flashCard)[editIndex];
        await databases.updateDocument(databaseId, collectionId, cardId, {
          Definitions: [...flashCard[cardId].definitions, definition],
        });
        setFlashCard((prev) => ({
          ...prev,
          [cardId]: {
            ...prev[cardId],
            Definitions: [...prev[cardId].definitions, definition],
          },
        }));
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

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logging out
    try {
      await account.deleteSession("current");
      console.log("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false); // Set loading to false after logout attempt
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">🧠BrainFlash</h1>
        {/* <h1 className="text-3xl font-bold text-purple-500">Welcome! User</h1> */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Logout"
          )}
        </button>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-200 mb-8">
            Card Creator
          </h2>

          {/* Input Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <input
              id="titleInput"
              type="text"
              placeholder="Enter card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              id="definitionInput"
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
            {Object.entries(flashCard).map(([cardId, card]) => (
              <div
                key={cardId}
                className="bg-gray-800 p-6 rounded-lg w-80 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-purple-500 mb-2">
                  {card.title}
                </h2>
                <ul className="list-disc list-inside text-white mb-4">
                  {card.definitions.map((def, defIndex) => (
                    <li key={defIndex}>{def}</li>
                  ))}
                </ul>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={(e) => editCard(e, cardId)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCard(cardId)}
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

export default FlashCardApp;
