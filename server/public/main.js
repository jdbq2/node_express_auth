console.log("Hello WOrld");

const authButton = document.getElementById("login_button");

authButton.addEventListener("click", () => {
    window.location.href = "/api/auth/google";
});
