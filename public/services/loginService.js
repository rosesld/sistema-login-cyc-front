// Realiza autenticación de un usuario mediante una solicitud AJAX al servidor
function loginUser(username, password, onSuccess, onError) {
  $.ajax({
    url: `${API_BASE_URL}/login`, // URL del endpoint de autenticación
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ username, password }),

    success: function (data, textStatus, jqXHR) {
      // Extrae el ID de sesión desde cabecera personalizada del servidor
      const sessionId = jqXHR.getResponseHeader("X-Session-ID");

      // Almacena el ID de sesión en localStorage
      if (sessionId) {
        localStorage.setItem("sessionId", sessionId);
      }
      // Ejecuta función de éxito
      onSuccess(data);
    },
    // Si ocurre un error
    error: function (jqXHR) {
      let error = "Error en la autenticación";
      try {
        // Intenta extraer el mensaje de error desde la respuesta del servidor
        const response = JSON.parse(jqXHR.responseText);
        error = response.error || error;
      } catch (e) {}

      // Ejecuta función de error con el mensaje de error
      onError(error);
    },
  });
}
