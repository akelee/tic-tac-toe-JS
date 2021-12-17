const shape = document.querySelector('#shape');

shape.addEventListener('mouseenter', () => {
    if(!shape.classList.contains('hover')){
        shape.classList.add('hover')
    }; document.getElementById("shape").innerHTML = "to play"
});

shape.addEventListener('mouseleave', () => {
    if(shape.classList.contains('hover')){
        shape.classList.remove('hover')
    }; document.getElementById("shape").innerHTML = "click"
})


