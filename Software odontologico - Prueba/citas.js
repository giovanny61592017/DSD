
fetch('https://desplieguebackend-production.up.railway.app/citas/listCita', {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Hubo un error:', error);
  });