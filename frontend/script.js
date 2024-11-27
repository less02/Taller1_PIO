// Funciones para interactuar con la API
const apiUrl = 'http://localhost:3000/api';

// Obtener salas y reservas
async function fetchSalas() {
    try {
      const response = await fetch(`${apiUrl}/salas`);
      console.log(response);  // Ver la respuesta completa
      if (!response.ok) throw new Error('Error al obtener salas');
      const salas = await response.json();
      console.log(salas);  // Ver el cuerpo de la respuesta
      return salas;
    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar las salas.');
      return [];
    }
  }
  

async function fetchReservas() {
  try {
    const response = await fetch(`${apiUrl}/reservas`);
    if (!response.ok) throw new Error('Error al obtener reservas');
    return await response.json();
  } catch (error) {
    console.error(error);
    alert('No se pudieron cargar las reservas.');
    return [];
  }
}

// Mostrar la lista en la interfaz (generalizada)
async function displayData(type) {
  let data = [];
  if (type === 'salas') {
    data = await fetchSalas();
  } else if (type === 'reservas') {
    data = await fetchReservas();
  }

  const listElement = document.getElementById(`${type}-list`);
  listElement.innerHTML = '';
  data.forEach(item => {
    const listItem = document.createElement('li');
    if (type === 'salas') {
      listItem.textContent = `${item.nombre} - Capacidad: ${item.capacidad} - Estado: ${item.estado}`;
    } else if (type === 'reservas') {
      listItem.textContent = `${item.nombre_reservante} - Sala ${item.sala_id} - Desde ${item.fecha_inicio} hasta ${item.fecha_fin}`;
    }
    listElement.appendChild(listItem);
  });
}

// Manejo del formulario de salas
document.getElementById('add-sala-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre = document.getElementById('sala-nombre').value;
  const capacidad = document.getElementById('sala-capacidad').value;
  const estado = document.getElementById('sala-estado').value;

  try {
    const response = await fetch(`${apiUrl}/salas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, capacidad, estado })
    });
    if (!response.ok) throw new Error('Error al agregar sala');
    displayData('salas');
  } catch (error) {
    console.error(error);
    alert('No se pudo agregar la sala.');
  }
});

// Manejo del formulario de reservas
document.getElementById('add-reserva-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre_reservante = document.getElementById('reservante-nombre').value;
  const fecha_inicio = document.getElementById('reserva-fecha-inicio').value;
  const fecha_fin = document.getElementById('reserva-fecha-fin').value;
  const sala_id = document.getElementById('reserva-sala-id').value;

  try {
    const response = await fetch(`${apiUrl}/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sala_id, nombre_reservante, fecha_inicio, fecha_fin })
    });
    if (!response.ok) throw new Error('Error al agregar reserva');
    displayData('reservas');
  } catch (error) {
    console.error(error);
    alert('No se pudo agregar la reserva.');
  }
});

// Inicializar la interfaz
(async () => {
  await displayData('salas');
  await displayData('reservas');
})();

