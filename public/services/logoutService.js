// Cierra la sesión del usuario envia una solicitud AJAX al servidor
function logoutUser(onSuccess, onError) {
    // Obtiene el ID de sesión almacenado en localStorage
    const sessionId = checksession(false);

    if (!sessionId) {
        onError("No hay sesión activa. Inicia sesión nuevamente.");
        return;
    }

    // Envia una solicitud POST al endpoint para cerrar sesión
    $.ajax({
        url: `${API_BASE_URL}/logout`, // URL del endpoint de cierre de sesión
        type: "POST",
        headers: {
            "X-Session-ID": sessionId   // Incluye el ID de sesión en el header
        },
        // Si la solicitud es exitosa
        success: function (data) {
            // Elimina el ID de sesión de localStorage
            localStorage.removeItem("sessionId");

            // Ejecuta la función de éxito
            onSuccess(data);
        },

        // Si ocurre un error en la solicitud
        error: function (jqXHR) {
            const error = "Error al cerrar sesión";
            try {
                // Intenta extraer el mensaje de error desde la respuesta del servidor
                const response = JSON.parse(jqXHR.responseText);
                error = response.error || error;
            } catch (e) {}

            // Ejecuta la función de error con el mensaje de error
            onError(error);
        }
    });
}