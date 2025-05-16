import React, { useEffect, useState } from 'react';

function NoteModal({ closeModel, addNote, currentNote, editNote }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-100 w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
          {currentNote ? 'Edit Note' : 'Add New Note'}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            rows={4}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          ></textarea>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
            >
              {currentNote ? 'Update Note' : 'Add Note'}
            </button>

            <button
              type="button"
              onClick={closeModel}
              className="text-gray-600 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
