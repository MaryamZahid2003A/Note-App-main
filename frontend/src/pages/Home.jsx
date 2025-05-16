import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import NoteCard from '../components/NoteCard';

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const filtered = notes.filter(
      note =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredNotes(filtered);
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModel = () => {
    setModalOpen(false);
    setCurrentNote(null);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post("http://localhost:5000/api/note/add", {
        title,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.error("Error while adding note:", error.response?.data || error.message);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/note/${id}`, {
        title,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.error("Error while editing note:", error.response?.data || error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.data.success) {
        alert('Note deleted successfully');
        fetchNotes();
      }
    } catch (error) {
      console.error("Error while deleting note:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-violet-100 via-white to-pink-100">
      <Navbar setQuery={setQuery} />

      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Your Notes</h1>
          <p className="text-gray-500 mt-2">Organize your thoughts effortlessly.</p>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={onEdit}
                deleteNote={deleteNote}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-600 font-medium">No Notes Found</h2>
            <p className="text-sm text-gray-400 mt-2">Try adding a new note or modifying your search.</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white text-3xl font-bold leading-none rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition duration-300"
        aria-label="Add Note"
      >
        +
      </button>

      {isModalOpen && (
        <NoteModal
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
}

export default Home;
