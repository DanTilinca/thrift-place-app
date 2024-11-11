import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>You need to log in to see your profile.</p>
      )}
    </div>
  );
};

export default Profile;
