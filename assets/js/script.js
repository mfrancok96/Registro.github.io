document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPagina);

var contenedor_login_register = document.querySelector(".contenedor__login-register");
var formulario_login = document.querySelector(".formulario__login");
var formulario__register = document.querySelector(".formulario__register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");


function anchoPagina(){
    if (window.innerWidth>850){
        caja_trasera_login.style.display="block";
        caja_trasera_register.style.display="block";
    }else{
        caja_trasera_register.style.display="block";
        caja_trasera_register.style.opacity="1";
        caja_trasera_login.style.display="none";
        formulario_login.style.display="block";
        formulario__register.style.display="none";
        contenedor_login_register.style.letf="0px";
    }
}

anchoPagina();


function iniciarSesion(){
    if(window.innerWidth > 850){
        formulario__register.style.display = "none";
        contenedor_login_register.style.left = "10px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.opacity="1";
        caja_trasera_login.style.opacity = "0";
    }else{
        formulario__register.style.display = "none";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.display="block";
        caja_trasera_login.style.display = "none";
    }
}

function register(){
    if(window.innerWidth > 850){
        formulario__register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity="0";
        caja_trasera_login.style.opacity = "1";
    }else{
        formulario__register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display="none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}


const loginForm = document.querySelector(".formulario__login");
const registerForm = document.querySelector(".formulario__register");
const loginButton = document.getElementById("btn__iniciar-sesion");
const registerButton = document.getElementById("btn__registrarse");
const loginRegisterContainer = document.querySelector(".contenedor__login-register");

// Funciones de cambio de formulario
function showLoginForm() {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    if(window.innerWidth > 850){
        loginRegisterContainer.style.left = "10px";
    }
}

function showRegisterForm() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    if(window.innerWidth > 850){
        loginRegisterContainer.style.left = "410px";
    }
}

// Event listeners para cambiar entre formularios
loginButton.addEventListener("click", showLoginForm);
registerButton.addEventListener("click", showRegisterForm);

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para manejar el registro
function handleRegister(e) {
    e.preventDefault();
    
    const name = registerForm.querySelector("input[placeholder='Nombre completo']").value.trim();
    const email = registerForm.querySelector("input[placeholder='Correo Electronico']").value.trim();
    const username = registerForm.querySelector("input[placeholder='Usuario']").value.trim();
    const password = registerForm.querySelector("input[placeholder='Contraseña']").value;

    if (!name || !email || !username || !password) {
        alert("Por favor, complete todos los campos");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Por favor, ingrese un correo electrónico válido");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    // Obtener usuarios existentes
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el email ya está registrado
    if (users.some(user => user.email === email)) {
        alert("Este correo electrónico ya está registrado");
        return;
    }

    // Guardar nuevo usuario
    const newUser = {
        name,
        email,
        username,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Registro exitoso. Ahora puede iniciar sesión.");
    
    // Limpiar formulario
    registerForm.reset();
    showLoginForm();
}

// Función para manejar el inicio de sesión
function handleLogin(e) {
    e.preventDefault();
    
    const email = loginForm.querySelector("input[placeholder='Correo Electronico']").value.trim();
    const password = loginForm.querySelector("input[placeholder='Contraseña']").value;

    // Validaciones
    if (!email || !password) {
        alert("Por favor, complete todos los campos");
        return;
    }

    // Obtener usuarios
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Guardar sesión actual
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert("¡Bienvenido " + user.name + "!");
        showWelcomePage(user);
    } else {
        alert("Correo electrónico o contraseña incorrectos");
    }
}

// Función para mostrar la página de bienvenida
function showWelcomePage(user) {
    const container = document.querySelector('.contenedor__todo');
    container.innerHTML = `
        <div class="welcome-container" style="text-align: center; padding: 20px; background: rgba(255,255,255,0.9); border-radius: 10px;">
            <h1 style="color: #46a2fd; margin-bottom: 20px;">¡Bienvenido, ${user.name}!</h1>
            <p style="margin-bottom: 20px;">Has iniciado sesión correctamente.</p>
            <button onclick="logout()" style="padding: 10px 20px; background: #46a2fd; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Cerrar sesión
            </button>
        </div>
    `;
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

// Verificar sesión al cargar la página
function checkLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showWelcomePage(currentUser);
    }
}

// Event listeners
registerForm.addEventListener("submit", handleRegister);
loginForm.addEventListener("submit", handleLogin);
window.addEventListener('load', checkLoggedIn);

// Ajustar diseño responsive
function adjustLayout() {
    if (window.innerWidth <= 850) {
        loginRegisterContainer.style.left = "0px";
    }
}

window.addEventListener("resize", adjustLayout);
adjustLayout();