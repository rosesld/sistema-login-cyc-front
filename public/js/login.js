$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    // Obtener valores del formulario y limpia espacios
    const username = $("#username").val().trim().toLowerCase();
    const password = $("#password").val().trim().toLowerCase();

    $("#error").hide().text("");

    // LLama a la función de login
    loginUser(
      username,
      password,

      // En caso de éxito, da un mensaje de bienvenida y redirige al dashboard
      function (data) {
        // Guarda los datos de sesión en localStorage
        localStorage.setItem("username", data.username);
        localStorage.setItem("rol", data.rol);

        Swal.fire({
          title: `¡Bienvenido(a), ${data.username}!`,
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          window.location.href = "views/dashboard.html";
        });
      },

      // En caso de error, muestra un mensaje
      function (error) {
        $("#error").text(error).show();
      }
    );
  });
});
