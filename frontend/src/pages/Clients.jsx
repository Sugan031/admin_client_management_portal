import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [links, setLinks] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchClients = (url = "/clients") => {
    api.get(url).then(res => {
      setClients(res.data.data);
      setLinks(res.data.meta.links);
      setPerPage(res.data.meta.per_page);
      setTotal(res.data.meta.total);
    });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    await api.delete(`/clients/${id}`);
    fetchClients();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">My Clients</h2>
        <Link
          to="/clients/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Client
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Interests</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c, index) => (
              <tr key={c.id} className="border-t">
                {/* SI Number */}
                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  {c.first_name} {c.last_name}
                </td>

                <td className="p-3">{c.email}</td>

                <td className="p-3">
                  {c.interests.join(", ")}
                </td>

                <td className="p-3 flex gap-2">
                  {/* Edit */}
                  <Link
                    to={`/clients/${c.id}/edit`}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 gap-2">
        {perPage && total > perPage && links.map((link, index) => (
          <button
            key={index}
            disabled={!link.url}
            onClick={() => fetchClients(link.url.replace("http://localhost:8000/api", ""))}
            className={`px-3 py-1 rounded ${
              link.active
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
  );
}
