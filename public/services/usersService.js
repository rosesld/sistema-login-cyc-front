// Obtiene la lista de usuarios visibles para el usuario autenticado
function getUsers(onSuccces, onError) {
  // Obtiene el ID de sesión almacenado en localStorage
  const sessionId = checksession(false);

  // Verifica si hay una sesión activa
  if (!sessionId) {
    onError("No hay sesión activa. Inicia sesión nuevamente.");
    return;
  }

  // Realiza una solicitud AJAX para obtener la lista de usuarios
  $.ajax({
    url: `${API_BASE_URL}/users`, // URL del endpoint para obtener usuarios
    type: "GET",
    headers: {
      "X-Session-ID": sessionId,
    },
    // Si la solicitud es exitosa
    success: function (data) {
      onSuccces(data);
    },

    // Si ocurre un error en la solicitud
    error: function (jqXHR) {
      let error = "Error al obtener los usuarios";
      try {
        // Intenta extraer el mensaje de error desde la respuesta del servidor
        const response = JSON.parse(jqXHR.responseText);
        error = response.error || error;
      } catch (e) {
        console.error("Error al parsear JSON de error:", e);
      }

      // Ejecuta la función de error con el mensaje de error
      onError(error);
    },
  });
}
