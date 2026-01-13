import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadPatient() {
    setLoading(true);
    try {
      // ✅ correct base path (your backend routes are /api/patients/)
      const res = await api.get(`/api/patients/${id}/`);
      setPatient(res.data);
    } catch (err) {
      console.log("PATIENT DETAIL ERROR:", err?.response?.data || err);
      alert(
        "❌ Failed to load patient details:\n" +
          JSON.stringify(err?.response?.data || err?.message || err, null, 2)
      );
      navigate("/patients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <p>Loading patient...</p>;
  if (!patient) return null;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate("/patients")}>← Back</button>

      <h2 style={{ marginTop: 14 }}>
        {patient.first_name} {patient.last_name}
      </h2>

      <div style={{ marginTop: 10, lineHeight: 1.8 }}>
        <div>
          <b>Phone:</b> {patient.phone || "-"}
        </div>
        <div>
          <b>Sex:</b> {patient.sex || "-"}
        </div>
        <div>
          <b>Date of birth:</b> {patient.date_of_birth || "-"}
        </div>
        <div>
          <b>Address:</b> {patient.address || "-"}
        </div>
        <div>
          <b>Patient code:</b> {patient.patient_code || "-"}
        </div>
      </div>
    </div>
  );
}
