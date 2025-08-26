import React, { useState } from 'react';

const initialContact = {
  phone: '+1 (844) 777-4287',
  email: 'info@meinhaus.ca',
  social: {
    instagram: 'https://instagram.com/meinhaus',
    facebook: 'https://facebook.com/meinhaus'
  }
};

const ContactManagement = () => {
  const [contact, setContact] = useState(initialContact);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (field) => {
    setEditingField(field);
    setEditValue(field === 'social' ? contact.social : contact[field]);
  };

  const handleSave = () => {
    if (editingField === 'social') {
      setContact({
        ...contact,
        social: editValue
      });
    } else {
      setContact({
        ...contact,
        [editingField]: editValue
      });
    }
    setEditingField(null);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Info Management</h2>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-3 font-semibold text-gray-700 rounded-l-xl">Field</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Value</th>
              <th className="text-center px-6 py-3 font-semibold text-gray-700 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white shadow rounded-xl">
              <td className="px-6 py-4 font-medium">Contact Number</td>
              <td className="px-6 py-4">{contact.phone}</td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                  onClick={() => handleEdit('phone')}
                  title="Edit"
                >
                  <span role="img" aria-label="edit">Edit</span>
                </button>
              </td>
            </tr>
            <tr className="bg-white shadow rounded-xl">
              <td className="px-6 py-4 font-medium">Email Address</td>
              <td className="px-6 py-4">{contact.email}</td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                  onClick={() => handleEdit('email')}
                  title="Edit"
                >
                  <span role="img" aria-label="edit">Edit</span>
                </button>
              </td>
            </tr>
            <tr className="bg-white shadow rounded-xl">
              <td className="px-6 py-4 font-medium">Social Media</td>
              <td className="px-6 py-4">
                <div>
                  <span className="font-semibold">Instagram:</span>
                  <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">{contact.social.instagram}</a>
                </div>
                <div>
                  <span className="font-semibold">Facebook:</span>
                  <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 underline">{contact.social.facebook}</a>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                  onClick={() => handleEdit('social')}
                  title="Edit"
                >
                  <span role="img" aria-label="edit">Edit</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Edit Modal */}
        {editingField && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-6">
                Edit {editingField === 'phone' ? 'Contact Number' : editingField === 'email' ? 'Email Address' : 'Social Media Links'}
              </h3>
              {editingField === 'social' ? (
                <>
                  <label className="block mb-2 font-medium">Instagram Link</label>
                  <input
                    type="text"
                    className="w-full border p-2 mb-4 rounded"
                    value={editValue.instagram}
                    onChange={e => setEditValue({ ...editValue, instagram: e.target.value })}
                  />
                  <label className="block mb-2 font-medium">Facebook Link</label>
                  <input
                    type="text"
                    className="w-full border p-2 mb-4 rounded"
                    value={editValue.facebook}
                    onChange={e => setEditValue({ ...editValue, facebook: e.target.value })}
                  />
                </>
              ) : (
                <input
                  type="text"
                  className="w-full border p-2 mb-4 rounded"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
              )}
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setEditingField(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManagement;