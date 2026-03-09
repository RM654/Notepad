import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useContext(AuthContext);

  const isNew = location.state?.isNew || false;
  const [note, setNote] = useState(location.state?.note || null);
  const [editorContent, setEditorContent] = useState(note?.content || "");
  const [loading, setLoading] = useState(!isNew);
  const [showEditor, setShowEditor] = useState(true);
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [collaborators, setCollaborators] = useState(note?.collaborators || []);
  const [saved, setSaved] = useState(!isNew); // Track if note is saved to DB

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo, navigate]);

  // Fetch existing note if not new
  useEffect(() => {
    const fetchNote = async () => {
      if (isNew || !userInfo) return;
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        setNote(data);
        setEditorContent(data.content || "");
        setCollaborators(data.collaborators || []);
        setSaved(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, isNew, userInfo]);

  // Save note (POST if new, PUT if existing)
  const saveNote = async () => {
    if (!note) return;
    try {
      let savedNote;
      if (isNew) {
        const { data } = await axios.post(
          `http://localhost:5000/api/notes`,
          { title: note.title, content: editorContent },
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        savedNote = data;
        setNote(savedNote);
        setSaved(true);
        alert("Note created! Now you can add collaborators.");
      } else {
        const { data } = await axios.put(
          `http://localhost:5000/api/notes/${note._id}`,
          { title: note.title, content: editorContent },
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        savedNote = data;
        setNote(savedNote);
        alert("Note updated!");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note");
    }
  };

  // Add collaborator (only if note is saved)
  const addCollaborator = async () => {
    if (!saved) {
      alert("Please save the note before adding collaborators.");
      return;
    }
    if (!collaboratorEmail) return;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/notes/${note._id}/collaborators`,
        { email: collaboratorEmail },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setCollaborators(data.collaborators);
      setCollaboratorEmail("");
      alert("Collaborator added!");
    } catch (error) {
      console.error("Error adding collaborator:", error);
      alert(error.response?.data?.message || "Failed to add collaborator");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!note) return <div className="p-6">Note not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => { setShowEditor(false); navigate("/"); }}
        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        ← Back to Dashboard
      </button>

      {/* Note title */}
      <input
        type="text"
        className="border p-2 w-full mb-4 rounded"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        placeholder="Note title"
      />

      {/* Rich text editor */}
      {showEditor && (
        <RichTextEditor
          key={note._id}
          value={editorContent}
          setValue={setEditorContent}
        />
      )}

      {/* Collaborator section */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Collaborators</h3>

        <div className="flex mb-2 space-x-2">
          <input
            type="email"
            placeholder="Enter collaborator email"
            className="border p-2 flex-1 rounded"
            value={collaboratorEmail}
            onChange={(e) => setCollaboratorEmail(e.target.value)}
          />
          <button
            onClick={addCollaborator}
            className={`px-4 py-2 rounded text-white ${saved ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!saved}
          >
            Add
          </button>
        </div>

        {/* Display collaborators */}
        <div className="flex flex-wrap gap-2">
          {collaborators.map((c) => (
            <span key={c._id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
              {c.name} ({c.email})
            </span>
          ))}
        </div>
      </div>

      {/* Save button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        onClick={saveNote}
      >
        {isNew && !saved ? "Save Note" : "Update Note"}
      </button>
    </div>
  );
}

export default NotePage;