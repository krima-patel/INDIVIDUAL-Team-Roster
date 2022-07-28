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
      <Search className="search-bar" team={team} setFilteredPlayers={setFilteredPlayers} />
      <div className="playercards-layout">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getTeam} />
        ))}
      </div>
    </div>
  );
}

export default Team;
