let headerMenu = document.querySelector(`#headerMenu`);
let headerLinks = document.querySelectorAll(`#headerMenu li`);
let headerBurger = document.querySelector(`#headerBurger`);
let bodyPage = document.querySelector(`#bodyPage`);
for(let headerLink of headerLinks){
    headerLink.addEventListener(`click`, function(){
        headerMenu.classList.remove(`active`);
        headerBurger.classList.remove(`active`);
        bodyPage.classList.remove(`lock`);
    });
}

$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock'); 
    });
});

const anchors = document.querySelectorAll('a[href^="#"]')
for(let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault()
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}