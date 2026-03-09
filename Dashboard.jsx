import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { userInfo } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch notes (owned + collaborated)
  const fetchNotes = async () => {
    if (!userInfo) return;
    try {
      const url = search
        ? `http://localhost:5000/api/notes/search?query=${search}`
        : "http://localhost:5000/api/notes";
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userInfo, search]);

  // Delete note (owner only)
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert(error.response?.data?.message || "Failed to delete note");
    }
  };

  // Create new note
  const createNote = () => {
    const tempNote = {
      _id: "temp-" + Date.now(),
      title: "",
      content: "",
      owner: userInfo._id,
      collaborators: [],
    };
    navigate(`/note/${tempNote._id}`, {
      state: { note: tempNote, isNew: true },
    });
  };

  if (!userInfo)
    return (
      <div className="p-8 text-center text-lg">
        Please log in to view your notes.
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">

      {/* Search & Create Section */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4 sm:gap-6 p-6 bg-white rounded-xl shadow-md">
        
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-4 w-full sm:w-80 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Create Note Button */}
        <button
          onClick={createNote}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md font-semibold transition transform hover:scale-105 w-full sm:w-auto"
        >
          + Create Note
        </button>

      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note._id} className="p-2 flex flex-col gap-2">
            <NoteCard note={note} />

            {/* Owner only delete button */}
            {note.owner._id === userInfo._id && (
              <button
                onClick={() => deleteNote(note._id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm shadow-md"
              >
                Delete
              </button>
            )}

            {/* Collaborator label */}
            {note.owner._id !== userInfo._id && (
              <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 text-sm rounded">
                Collaborator
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;