/* Botón abrir y cerrar de menú hamburguesa */

const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");

function toggleMenu(){
    menu.classList.toggle("menu_opened");
}

openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

/* conexión entre secciones de la página y el menú */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry =>{
        const id = entry.target.getAttribute("id");
        const menuLink = document.querySelector(`.menu a[href="#${id}"]`);

        if (entry.isIntersecting) {
            document.querySelector(".menu a.selected").classList.remove("selected");
            menuLink.classList.add("selected");
        } 
    })
}, {rootMargin: "-50% 0px -50% 0px"})

menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", function() {
        menu.classList.remove("menu_opened");
    })

    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target){
        observer.observe(target);
    }

})

/* Formulario Contacto */

const $form = document.querySelector('#form');

$form.addEventListener('submit', handleSubmit);

async function handleSubmit(event){
    event.preventDefault();
    var response = grecaptcha.getResponse();
    if (response.length == 0){
        swal('Mensaje no enviado','Por favor indica que no eres un robot','error');
        return false;
    }
    else{
        const form = new FormData(this);
        const response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers:{
                'Accept': 'application/json'
            } 
        });
        if (response.ok){
            this.reset();
            swal('Mensaje enviado','Gracias por contactarme','success');
        }
    }
}
