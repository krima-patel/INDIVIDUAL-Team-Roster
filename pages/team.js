import React, { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

function Team() {
  const [team, setTeam] = useState([]);
  const { user } = useAuth();
  const getTeam = () => {
    getPlayers(user.uid).then(setTeam);
  };

  useEffect(() => {
    getTeam();
  }, [user.uid]);

  return (
    <div className="text-center">
      <h1>THE TEAM</h1>
      <div className="d-flex flex-wrap">
        {team.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getTeam} />
        ))}
      </div>
    </div>
  );
}

export default Team;
