import React, { useEffect, useState } from "react";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:8082/api/v1/contact/all");
    const data = await res.json();
    setContacts(data.contacts);
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await fetch(`http://localhost:8082/api/v1/contact/${id}`, {
      method: "DELETE",
    });

    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Messages</h1>

      <div className="space-y-4">
        {contacts.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 bg-white shadow">
            <p>
              <b>Name:</b> {item.name}
            </p>
            <p>
              <b>Email:</b> {item.email}
            </p>
            <p className="mt-2">
              <b>Message:</b> {item.message}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(item.createdAt).toLocaleString()}
            </p>

            <button
              onClick={() => deleteMessage(item._id)}
              className="mt-3 bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContact;
