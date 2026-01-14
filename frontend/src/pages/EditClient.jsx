import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ClientForm from "../components/ClientForm";

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_no: "",
    birthday: "",
    interests: [],
  });

  useEffect(() => {
    api.get("/interests").then(res => setInterests(res.data));

    api.get(`/clients/${id}`).then(res => {
      setForm({
        ...res.data.data,
        interests: res.data.data.interests,
      });
    });

  }, [id]);

  const submit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/clients/${id}`, form);
            alert("Client updated successfully");
            navigate("/clients");
        } catch (error) {
            if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            const messages = Object.values(errors)
                .flat()
                .join("\n");

            alert(messages);
            } else {
            alert("Something went wrong. Please try again.");
            }
        }
    };


  return (
    <ClientForm
      title="Edit Client"
      form={form}
      setForm={setForm}
      interests={interests}
      onSubmit={submit}
      submitText="Update Client"
      disableEmail
    />
  );
}
