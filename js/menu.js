// Obtener nombre usuario logeado

//Obtenemos el usuario de sessionStorage que contiene los datos
var userData = JSON.parse(sessionStorage.getItem('users'));

//Accedemos al username del usuario
var logerName = userData.username;
var usernameElement = document.getElementById("username");
usernameElement.innerText = logerName;

(function(){
    // Selecciona todos los elementos con la clase 'menu__item--show' y los guarda en una lista
    const listElements = document.querySelectorAll('.menu__item--show');

    // Selecciona el elemento con la clase 'menu__links' y lo guarda en una variable
    const list = document.querySelector('.menu__links');

    // Selecciona el elemento con la clase 'menu__hamburguer' y lo guarda en una variable
    const menu = document.querySelector('.menu__hamburguer');

    // Función que se ejecuta al hacer clic en los elementos de la lista
    const addClick = ()=>{
        listElements.forEach(element =>{
            // Agrega un event listener al hacer clic en cada elemento
            element.addEventListener('click', ()=>{
                // Obtiene el submenú del elemento clicado
                let subMenu = element.children[1];

                // Inicializa la variable de altura en 0
                let height = 0;

                // Alterna la clase 'menu__item--active' en el elemento clicado
                element.classList.toggle('menu__item--active');

                // Si la altura del submenú es 0, significa que está cerrado
                if(subMenu.clientHeight === 0){
                    // Obtiene la altura total del submenú
                    height = subMenu.scrollHeight;
                }

                // Establece la altura del submenú en base a la altura calculada
                subMenu.style.height = `${height}px`;
            });
        });
    }

    // Función que elimina el estilo de altura de los elementos de la lista
    const deleteStyleHeight = ()=>{
        listElements.forEach(element=>{
            // Si el elemento tiene un atributo de estilo
            if(element.children[1].getAttribute('style')){
                // Elimina el atributo de estilo
                element.children[1].removeAttribute('style');

                // Remueve la clase 'menu__item--active' del elemento
                element.classList.remove('menu__item--active');
            }
        });
    }

    // Evento que se dispara al cambiar el tamaño de la ventana
    window.addEventListener('resize', ()=>{
        // Si el ancho de la ventana es mayor a 800px
        if(window.innerWidth > 800){
            // Elimina el estilo de altura de los elementos de la lista
            deleteStyleHeight();

            // Si el elemento de la lista tiene la clase 'menu__links--show'
            if(list.classList.contains('menu__links--show')){
                // Remueve la clase 'menu__links--show' del elemento
                list.classList.remove('menu__links--show');
            }
        }else{
            // Agrega el evento de clic a los elementos de la lista
            addClick();
        }
    });

    // Si el ancho de la ventana es menor o igual a 800px
    if(window.innerWidth <= 800){
        // Agrega el evento de clic a los elementos de la lista
        addClick();
    }

    // Agrega un event listener al hacer clic en el menú hamburguesa para alternar la clase 'menu__links--show' en el elemento de la lista
    menu.addEventListener('click', ()=> list.classList.toggle('menu__links--show'));
})();