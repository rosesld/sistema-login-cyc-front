function checksession(redirect = true) {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    Swal.fire({
      icon: "warning",
      title: "Sesión no activa",
      text: "No hay sesión activa. Por favor inicia sesión nuevamente.",
      confirmButtonText: "Ir al login",
    }).then(() => {
      window.location.href = "login.html";
    });
    return null;
  }

  return sessionId;
}

function getUserName() {
  return localStorage.getItem("username") || "Usuario";
}

function getUserRole() {
  return localStorage.getItem("rol") || "Invitado";
}
