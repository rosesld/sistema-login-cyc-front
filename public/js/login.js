$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();

    // Obtener valores del formulario y limpia espacios
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    $("#error").hide().text("");

    // LLama a la función de login
    loginUser(
      username,
      password,

      // En caso de éxito, da un mensaje de bienvenida y redirige al dashboard
      function (data) {
        alert(`Bienvenido, ${data.username}`);
        window.location.href = "dashboard.html";
      },

      // En caso de error, muestra un mensaje
      function (error) {
        $("#error").text(error).show();
      }
    );
  });
});
