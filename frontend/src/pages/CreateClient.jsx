import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ClientForm from "../components/ClientForm";

export default function CreateClient() {
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
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
        await api.post("/clients", form);
        alert("Client created successfully");
        navigate("/clients");
    } catch (error) {
        if (error.response?.status === 422) {
        const errors = error.response.data.errors;

        // Convert errors object to readable string
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
      title="Create Client"
      form={form}
      setForm={setForm}
      interests={interests}
      onSubmit={submit}
      submitText="Save Client"
    />
  );
}
