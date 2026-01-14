import { useState } from "react";
import { Link } from "react-router-dom";

export default function ClientForm({
  title,
  form,
  setForm,
  interests,
  onSubmit,
  submitText,
  disableEmail = false,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleInterest = (id) => {
    const current = form.interests || [];
    setForm({
      ...form,
      interests: current.includes(id)
        ? current.filter(i => i !== id)
        : [...current, id],
    });
  };

  // 🔴 UI VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!form.first_name) {
      newErrors.first_name = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(form.first_name)) {
      newErrors.first_name = "First name should contain only alphabets";
    }

    if (!form.last_name) {
      newErrors.last_name = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(form.last_name)) {
      newErrors.last_name = "Last name should contain only alphabets";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (form.contact_no && !/^\d{10}$/.test(form.contact_no)) {
      newErrors.contact_no = "Contact number must be 10 digits";
    }

    if (!form.interests || form.interests.length === 0) {
      newErrors.interests = "Please select at least one interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(e);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-6">{title}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <input
            name="first_name"
            value={form.first_name || ""}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full border px-4 py-2 rounded"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            name="last_name"
            value={form.last_name || ""}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="w-full border px-4 py-2 rounded"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={disableEmail}
            className="w-full border px-4 py-2 rounded disabled:bg-gray-100"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contact No */}
        <div>
          <input
            name="contact_no"
            value={form.contact_no || ""}
            onChange={handleChange}
            placeholder="Contact No"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.contact_no && (
            <p className="text-red-500 text-sm mt-1">{errors.contact_no}</p>
          )}
        </div>

        {/* Birthday */}
        <input
          type="date"
          name="birthday"
          value={form.birthday || ""}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        {/* Interests */}
        <div>
          <p className="font-semibold mb-2">Interests</p>
          <div className="grid grid-cols-2 gap-2">
            {interests.map(i => (
              <label key={i.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(form.interests || []).includes(i.id)}
                  onChange={() => toggleInterest(i.id)}
                />
                {i.name}
              </label>
            ))}
          </div>
          {errors.interests && (
            <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
          )}
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {submitText}
        </button>

        <Link
          to="/clients"
          className="block text-center w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
        >
          Back To List
        </Link>
      </form>
    </div>
  );
}
