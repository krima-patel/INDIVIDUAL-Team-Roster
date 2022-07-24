import React from 'react';
import { PropTypes } from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';

export default function PlayerCard({
  playerObj, onUpdate,
}) {
  const deletePlayer = () => {
    if (window.confirm(`Are you sure you want to remove ${playerObj.name} from this team?!`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{playerObj.name}</Card.Title>
          <Card.Img variant="top" src={playerObj.image} />
          <Card.Subtitle className="mb-2 text-muted">{playerObj.position}</Card.Subtitle>
          <Link href={`/edit/${playerObj.firebaseKey}`} passHref>
            <Button variant="info">Edit</Button>
          </Link>
          <Button variant="danger" onClick={deletePlayer} className="m-2">Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
