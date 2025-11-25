export default function Page() {
  return (
    <div
      style={{
        padding: 40,
        fontFamily: "system-ui",
        maxWidth: 800,
        margin: "0 auto",
        backgroundColor: "#1a1a2e",
        minHeight: "100vh",
        color: "#eaeaea",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 20, color: "#e94560" }}>Code Snippet Manager - MERN Stack</h1>
      <p style={{ marginBottom: 20, lineHeight: 1.6 }}>
        This is a traditional MERN stack application with 3 folders: frontend, backend, and database.
      </p>
      <p style={{ marginBottom: 20, lineHeight: 1.6 }}>
        Click the three dots in the top right corner and select{" "}
        <strong style={{ color: "#e94560" }}>Download ZIP</strong> to get all files.
      </p>
      <h2 style={{ fontSize: 20, marginBottom: 15, color: "#8be9fd" }}>How to Run:</h2>
      <ol style={{ lineHeight: 2, paddingLeft: 20 }}>
        <li>Extract the ZIP file</li>
        <li>Start MongoDB on your machine</li>
        <li>
          Open terminal in backend folder:{" "}
          <code style={{ backgroundColor: "#0f3460", padding: "2px 8px", borderRadius: 4 }}>
            cd backend && npm install && npm start
          </code>
        </li>
        <li>
          Open another terminal in frontend folder:{" "}
          <code style={{ backgroundColor: "#0f3460", padding: "2px 8px", borderRadius: 4 }}>
            cd frontend && npm install && npm start
          </code>
        </li>
        <li>
          Open browser at{" "}
          <code style={{ backgroundColor: "#0f3460", padding: "2px 8px", borderRadius: 4 }}>http://localhost:3000</code>
        </li>
      </ol>
      <h2 style={{ fontSize: 20, marginTop: 30, marginBottom: 15, color: "#8be9fd" }}>Folder Structure:</h2>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li>
          <strong>frontend/</strong> - React app with class components and styled-components
        </li>
        <li>
          <strong>backend/</strong> - Express.js API server with routes
        </li>
        <li>
          <strong>database/</strong> - MongoDB models (Snippet, Collection, User)
        </li>
      </ul>
      <h2 style={{ fontSize: 20, marginTop: 30, marginBottom: 15, color: "#8be9fd" }}>Features:</h2>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li>Save code snippets with syntax highlighting</li>
        <li>Multiple language support (17 languages)</li>
        <li>Tag-based organization</li>
        <li>Public/private snippet visibility</li>
        <li>Fork and modify others public snippets</li>
        <li>Search with filters (language, tags, visibility)</li>
        <li>Code execution preview for JavaScript</li>
        <li>Collections/folders for organization</li>
      </ul>
    </div>
  )
}
