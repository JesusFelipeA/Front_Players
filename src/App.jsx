import { useEffect, useState } from "react";
import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "./api/playerService";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    ranking: "",
    fullName: "",
    team: "",
    position: "",
    age: "",
    drtg: "",
  });

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = () => {
    getPlayers().then((res) => setPlayers(res.data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePlayer = async () => {
    try {
      const playerToSend = {
        ...form,
        ranking: Number(form.ranking),
        age: Number(form.age),
        drtg: Number(form.drtg),
      };

      if (editingId) {
        await updatePlayer(editingId, playerToSend); // ✅ UPDATE
      } else {
        await createPlayer(playerToSend); // ✅ CREATE
      }

      loadPlayers();
      resetForm();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const removePlayer = (id) => {
    deletePlayer(id).then(() => loadPlayers());
  };

  const editPlayer = (player) => {
    setForm({
      ranking: player.ranking || "",
      fullName: player.fullName || "",
      team: player.team || "",
      position: player.position || "",
      age: player.age || "",
      drtg: player.drtg || "",
    });

    setEditingId(player.id);
  };

  const resetForm = () => {
    setForm({
      ranking: "",
      fullName: "",
      team: "",
      position: "",
      age: "",
      drtg: "",
    });
    setEditingId(null);
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          Players
          <span className="page-title-dot" />
        </h1>
        <p className="page-subtitle">Gestiona el registro de jugadores</p>
      </div>

      {/* Form */}
      <div className="form-card">
        <div className="form-card-header">
          <div>
            <div className="form-card-title">
              {editingId ? "Editar jugador" : "Nuevo jugador"}
            </div>
            <div className="form-card-subtitle">
              Completa los datos del jugador
            </div>
          </div>
        </div>

        <div className="form-body">
          <div className="field-row">
            <div className="field">
              <label className="field-label">Nombre completo</label>
              <input
                className="field-input"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="field-label">Equipo</label>
              <input
                className="field-input"
                name="team"
                value={form.team}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label className="field-label">Posición</label>
              <input
                className="field-input"
                name="position"
                value={form.position}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="field-label">Edad</label>
              <input
                className="field-input"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label className="field-label">Ranking</label>
              <input
                className="field-input"
                name="ranking"
                type="number"
                value={form.ranking}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="field-label">DRTG</label>
              <input
                className="field-input"
                name="drtg"
                type="number"
                value={form.drtg}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="submit-btn" onClick={savePlayer}>
            {editingId ? "Actualizar jugador" : "Guardar jugador"}
          </button>

          {editingId && (
            <button className="cancel-btn" onClick={resetForm}>
              Cancelar edición
            </button>
          )}
        </div>
      </div>

      {/* Lista */}
      <div className="cards">
        {players.map((p) => (
          <div className="card" key={p.id}>
            <div className="card-info">
              <span className="card-name">{p.fullName}</span>
              <span className="card-details">
                {p.team} · {p.position}
              </span>

              <div className="card-stats">
                <span>Edad: {p.age}</span>
                <span>Ranking: {p.ranking}</span>
                <span>DRTG: {p.drtg}</span>
              </div>
            </div>

            <div className="card-actions">
              <button onClick={() => editPlayer(p)}>✏️</button>
              <button onClick={() => removePlayer(p.id)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;