
// validacion de formulario
document.querySelector('form').addEventListener('submit', function (e) {
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
  
    if (!email || !mensaje) {
      alert('Por favor, rellena todos los campos obligatorios.');
      e.preventDefault();
    }
  });
  
  
