import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import Search from '../components/Search';

function Team() {
  const [team, setTeam] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  const getTeam = () => {
    getPlayers(user.uid).then((playerArr) => {
      setTeam(playerArr);
      setFilteredPlayers(playerArr);
    });
  };

  useEffect(() => {
    getTeam();
  }, [user.uid]);

  return (
    <div className="text-center">
      <h1>THE TEAM</h1>
      <div className="d-flex flex-wrap">
        <Search team={team} setFilteredPlayers={setFilteredPlayers} />
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getTeam} />
        ))}
      </div>
    </div>
  );
}

export default Team;
