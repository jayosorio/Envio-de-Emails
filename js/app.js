document.addEventListener('DOMContentLoaded', function() { // DOMContentLoaded ejecuta cuando cargue todo el html
    
    // objeto vacio para validar boton enviar cuando pasen las validaciones
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionamos los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // asignamos eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', e => {
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');  

            resetFormulario();

            // crear alerta mensaje enviado
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sn', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === '') { // funcion que se le asigna a todos los eventos
            mostrarAlerta(`El campo ${e.target.id} es obligario`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        } 

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // asignar valores al objeto vacio
        email[e.target.name] = e.target.value.trim()//.tolowerCase();
        
        // comprobar el objeto de email
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // generar alerta en el HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // Inyectar el error al formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        // comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ // este codigo se conoce como una expresion regular 
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
         if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
         }
         btnSubmit.classList.remove('opacity-50');
         btnSubmit.disabled = false;
    }

    function resetFormulario() {       
        // reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }

});    
       
              
// EVENTO BLUR = A CUANDO SALES DE UN INPUT
// evento input se dispara cuando estamos escribiendo o validacion en tiempo real 
// trim() es especial para formularios ya q elimina espacios en blanco
// appendChild agrega un nuevo elemento a lo ya existente
// parentElement es el elemento padre
// expresion regular es un codigo de ese tipo que busca un patron en una cadena de texto o en una serie de numeros
