$(document).ready(function () {

  const username = getUserName();
  const userRole = getUserRole();
  
  $("#welcomeMessage").text(`Bienvenido, ${username}`);
  $("#userRole").text(`${userRole}`);

  // Verificar si existe una sesión activa
  const sessionId = checksession();
  if (!sessionId) return;

  // Función para obtener y mostrar usuarios
  getUsers(
    function (users) {
      const tbody = $("#usersTable tbody");
      tbody.empty();

      users.forEach((user) => {
        const row = `
        <tr>
          <td>${user.nombre}</td>
          <td>${user.username}</td>
          <td>${user.rol}</td>
          <td>${user.renta_mensual}</td>
        </tr>`;
        tbody.append(row);
      });

      // Inicializa DataTable (solo una vez)
      if (!$.fn.DataTable.isDataTable("#usersTable")) {
        $("#usersTable").DataTable();
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

        // Limpia los datos de sesión
        localStorage.removeItem("sessionId");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");
        $("#welcomeMessage").text("");

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
