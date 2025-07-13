function checksession(redirect = true) {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    alert("No hay sesión activa. Inicia sesión nuevamente.");
    window.location.href = "login.html";
    return null;
  }

  return sessionId;
}
