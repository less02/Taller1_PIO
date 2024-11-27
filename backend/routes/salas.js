const express = require('express');
const router = express.Router();
const salasData = require('../data/salas'); // Datos en memoria (puedes usar base de datos)
const reservasData = require('../data/reservas'); // Datos en memoria de reservas

// Obtener todas las salas
router.get('/', (req, res) => {
  res.json(salasData);
});

// Crear una nueva sala
router.post('/', (req, res) => {
  const { nombre, capacidad, estado } = req.body;
  const newSala = { id: salasData.length + 1, nombre, capacidad, estado };
  salasData.push(newSala);
  res.status(201).json(newSala);
});

// Editar una sala
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, estado } = req.body;
  let sala = salasData.find(s => s.id == id);
  
  if (!sala) return res.status(404).send('Sala no encontrada');
  
  sala.nombre = nombre || sala.nombre;
  sala.capacidad = capacidad || sala.capacidad;
  sala.estado = estado || sala.estado;
  
  res.json(sala);
});

// Eliminar una sala
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = salasData.findIndex(s => s.id == id);
  
  if (index === -1) return res.status(404).send('Sala no encontrada');
  
  salasData.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
