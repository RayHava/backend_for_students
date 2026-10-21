const { Router } = require('express')
const fs = require('fs')
const path = require('path')

const router = Router();
const DB_PATH = path.join(__dirname, '..', 'database', 'users.json');

const readUsers = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const saveUsers = (users) =>
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));


router.get('/', (req, res) => {
  const users = readUsers();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body,
  };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  users[userIndex] = { id: parseInt(req.params.id), ...req.body };
  saveUsers(users);
  res.json(users[userIndex]);
});

router.delete('/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  const deletedUser = users.splice(userIndex, 1);
  saveUsers(users);
  res.json(deletedUser[0]);
});



module.exports = router;