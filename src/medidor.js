function calcularAmor() {
    const btn = document.getElementById("btn-medidor");
    const resultadoDiv = document.getElementById("resultado-medidor");
    const numeroAmor = document.getElementById("numero-amor");
    const mensajeColapso = document.getElementById("mensaje-colapso");

    btn.disabled = true;
    btn.innerText = "Procesando datos...";
    resultadoDiv.style.display = "block";
    
    let amor = 0;

    const intervalo = setInterval(() => {
      
        amor += Math.floor(Math.random() * 150) + 50; 
        
        numeroAmor.innerText = amor + "%";

       
        if(amor > 100) {
        
            let escala = 1 + (amor / 20000); 
            numeroAmor.style.transform = `scale(${escala})`;
            numeroAmor.style.color = "#cc0000"; 
        }

        if(amor > 15000) {
            clearInterval(intervalo);
            numeroAmor.innerText = "+99999%";

            numeroAmor.style.animation = "latido 0.1s infinite"; 
            
         
            mensajeColapso.style.display = "block";
            btn.innerText = "Sistema colapsado 💀";

            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, 40); 
}