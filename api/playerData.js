import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createPlayer = (newPlayerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, newPlayerObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, body)
        .then(() => {
          getPlayers(newPlayerObj.uid).then(resolve);
        });
    }).catch(reject);
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(() => {
      getPlayers().then((playersArray) => resolve(playersArray)).catch((error) => reject(error));
    });
});

const updatePlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/players/${playerObj.firebaseKey}.json`, playerObj)
    .then(() => getPlayers(playerObj.uid).then(resolve))
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
  getSinglePlayer,
  deleteSinglePlayer,
  updatePlayer,
};
