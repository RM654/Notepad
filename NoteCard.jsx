import { Link } from "react-router-dom";

function NoteCard({ note }) {
  return (
    <Link to={`/note/${note._id}`}>
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-4 border border-gray-200 w-52 h-44 hover:shadow-lg transition-all">
        
        <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
          {note.title || "Untitled Note"}
        </h2>

        <p className="text-gray-600 text-sm mb-2 truncate">
          Owner: {note.owner?.name}
        </p>

        {note.collaborators?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {note.collaborators.map((c) => (
              <span
                key={c._id}
                className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium"
              >
                {c.name}
              </span>
            ))}
          </div>
        )}

      </div>
    </Link>
  );
}

export default NoteCard;