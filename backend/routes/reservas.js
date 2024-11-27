const express = require('express');
const router = express.Router();
const reservasData = require('../data/reservas');
const salasData = require('../data/salas');

// Obtener todas las reservas
router.get('/', (req, res) => {
  res.json(reservasData);
});

// Crear una nueva reserva
router.post('/', (req, res) => {
  const { sala_id, nombre_reservante, fecha_inicio, fecha_fin } = req.body;
  
  const sala = salasData.find(s => s.id == sala_id);
  
  if (!sala || sala.estado === 'inactivo') {
    return res.status(400).send('La sala no está disponible o está inactiva');
  }

  // Verificar si hay reservas solapadas
  const solapada = reservasData.some(reserva => 
    reserva.sala_id === sala_id && 
    ((fecha_inicio >= reserva.fecha_inicio && fecha_inicio < reserva.fecha_fin) || 
    (fecha_fin > reserva.fecha_inicio && fecha_fin <= reserva.fecha_fin))
  );

  if (solapada) {
    return res.status(400).send('Las fechas de reserva se solapan con otra reserva');
  }

  const nuevaReserva = { 
    id: reservasData.length + 1, 
    sala_id, 
    nombre_reservante, 
    fecha_inicio, 
    fecha_fin 
  };
  reservasData.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
});

// Editar una reserva
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { sala_id, nombre_reservante, fecha_inicio, fecha_fin } = req.body;
  let reserva = reservasData.find(r => r.id == id);
  
  if (!reserva) return res.status(404).send('Reserva no encontrada');
  
  // Actualizar la reserva
  reserva.sala_id = sala_id || reserva.sala_id;
  reserva.nombre_reservante = nombre_reservante || reserva.nombre_reservante;
  reserva.fecha_inicio = fecha_inicio || reserva.fecha_inicio;
  reserva.fecha_fin = fecha_fin || reserva.fecha_fin;

  res.json(reserva);
});

// Eliminar una reserva
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = reservasData.findIndex(r => r.id == id);
  
  if (index === -1) return res.status(404).send('Reserva no encontrada');
  
  reservasData.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
