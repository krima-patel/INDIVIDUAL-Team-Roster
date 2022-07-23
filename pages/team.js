import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
    <div className="text-center my-4">
      <Link href="/player/new" passHref>
        <Button>Add A Player</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {team.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getTeam} />
        ))}
      </div>
    </div>
  );
}

export default Team;
