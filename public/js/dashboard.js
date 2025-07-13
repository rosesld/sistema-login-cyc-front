$(document).ready(function () {

// Verificar si existe una sesión activa
const sessionId = checksession();
if (!sessionId) return;

// Función para obtener y mostrar usuarios
getUsers(
  function (users) {

    const container = $("#usersContainer");
    container.empty();

    if (users.length === 0) {
      container.append("<p>No hay usuarios registrados.</p>");
    } else {
      // Itera sobre los usuarios y los muestra en el contenedor
      users.forEach( user => {
        container.append(`
          <div class="user">
              <p><strong>Username:</strong> ${user.username}</p>
              <p><strong>Rol:</strong> ${user.rol}</p>
              <p><strong>Renta mensual:</strong> ${user.renta_mensual}</p>
              <hr/>
          </div>
          `);
      });
    }
  },
  // En caso de error muestra un mensaje
  function (error) {
    $("#usersContainer").html(`<p class="error">${error}</p>`);
  }
);

/** Función para cerrar sesión */
  $("#logoutBtn").click(function () {
    logoutUser(
      // si el cierre de sesión es exitoso, redirige al login
      function () {
        alert("Sesión cerrada correctamente");
        window.location.href = "login.html";
      },
      // si hay un error, muestra un mensaje
      function (error) {
        $("#error").text(error).show();
      }
    );
  });
});
