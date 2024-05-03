import React from "react";

interface RoomDetailProps {
  room: {
    id: number;
    name: string;
    description: string;
    // Add more properties as needed
  };
}

const RoomDetail: React.FC<RoomDetailProps> = ({ room }) => {
  return (
    <div>
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      {/* Add more JSX elements to display additional room details */}
    </div>
  );
};

export default RoomDetail;
