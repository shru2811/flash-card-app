import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Edit3, Upload, Image } from "lucide-react";
import image from '../../assets/landing.png'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <div className="text-xl font-bold">🧠 BrainFlash</div>
        {/* <nav className="space-x-4">
          <a  className="hover:text-purple-400">How it works</a>
          <a href="#about" className="hover:text-purple-400">About</a>
          <a href="#price" className="hover:text-purple-400">Price</a>
          <a href="#features" className="hover:text-purple-400">Features</a>
        </nav> */}
        <div className="flex gap-4">
        <button  onClick={() => navigate('/register')} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          REGISTER
        </button>
        <button onClick={() => navigate('/login')} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          LOGIN
        </button>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="flex justify-between items-center py-16">
          <div className="w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-purple-500 text-6xl">BrainFlash</span> is built to help you
            </h1>
            <p className="mb-6">
            Organize, Learn, and Memorize Effortlessly. <br/>
            Create multi-definition flashcards for any topic and boost your learning potential.
            </p>
            <div className="space-x-4">
              <button onClick={() => navigate('/register')} className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">
                Get Started
              </button>
              <a href="#how-it-works" className="border border-purple-600 text-purple-600 px-6 py-3 rounded-md hover:bg-purple-600 hover:text-white">
                More
              </a>
            </div>
          </div>
          <div className="w-1/2">
            
            <div className="">
              <img src={image} className=""/>
              
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-16">
          <h2 className="text-3xl font-bold mb-8">How it works</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <Edit3 className="text-purple-500 mb-4" size={32} />
              <h3 className="text-3xl font-semibold mb-2 text-purple-500">Create a Topic</h3>
              <p className="mt-4 text-white">Start by naming your study area (e.g., "Biology 101", "Spanish Verbs")</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Upload className="text-teal-500 mb-4" size={32} />
              <h3 className="text-3xl font-semibold mb-2 text-teal-500">Add Flashcards</h3>
              <p className="mt-4 text-white">Create cards with multiple definitions or concepts under each topic</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Image className="text-blue-500 mb-4" size={32} />
              <h3 className="text-3xl font-semibold mb-2 text-blue-500">Study and Review</h3>
              <p className="mt-4 text-white">Flip through your cards, testing your knowledge on each definition</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 text-center">
        <p>&copy; 2024 BrainFlash. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
