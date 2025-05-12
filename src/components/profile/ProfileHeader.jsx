// components/profile/ProfileHeader.js
export default function ProfileHeader({ name, uid }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-1 text-gray-400">
        <p>Name: <span className="text-white">{name}</span></p>
        <p>UID: <span className="text-white">{uid}</span></p>
      </div>
    </div>
  );
}

