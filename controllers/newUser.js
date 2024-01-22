import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import database from '../database.js';
import xss from 'xss';

export default (req, res) => {
  const verifEmail = (email) => {
    const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return Regex.test(email);
  };

  const newId = v4();

  const newUser = {
    login: xss(req.body.login),
    mdp: req.body.mdp,
    pseudo: xss(req.body.pseudo),
  };

  if (!verifEmail(newUser.login)) {
    return res.status(400).send('L\'e-mail n\'est pas dans un format valide.');
  }
  console.log(newUser)
  bcrypt.hash(newUser.mdp, 10, (error, hash) => {
    if (error) {
      console.error('Erreur lors du hachage du mot de passe', error);
      return res.status(500).send({ error: 'Erreur serveur lors du hachage du mot de passe.' });
    }
console.log(hash)

    database(
      'INSERT INTO User (id, login, mdp, pseudo) VALUES (?, ?, ?, ?)',
      [newId, newUser.login, hash, newUser.pseudo],
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send({ error: 'Erreur serveur' });
        }
console.log(result)
        res.redirect('/login');
      }
    );
  });
};