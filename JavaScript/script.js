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

const progress = document.querySelector(`.progress`);
window.addEventListener(`scroll`, progressBar);
function progressBar(e) {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;
    progress.style.width = per + `%`;
}

$(window).scroll(function(){
  let scrolled = $(window).scrollTop();
  if(scrolled > 100) { 
      $(`#back_to_top`).addClass(`active`);
  } else{
      $(`#back_to_top`).removeClass(`active`);
  }
});

$(`#back_to_top`).click(function(){
  $(`body,html`).animate({scrollTop: 0}, 1000) 
});

let animItems = document.querySelectorAll(`.anim-items`);
if(animItems.length > 0){
  window.addEventListener(`scroll`, animoOnScroll);
  function animoOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if(animItemHeight > window.innerHeight){
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((scrollY > animItemOffset - animItemPoint && scrollY < (animItemOffset) + animItemHeight)){
        animItem.classList.add(`animated`);
      } else{
        if(!animItem.classList.contains(`anim-no-hide`)){
          animItem.classList.remove(`animated`);
        }
       
      }
    }
  }
  function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
  setTimeout(() => {
    animoOnScroll();
  }, 500);
}

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
  scrollController.scrollPosition = window.scrollY;
  document.body.style.cssText = `
      overflow: visible;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px;
      `;
  },
  enabledScroll() {
      document.body.style.cssText = '';
      window.scroll({top: scrollController.scrollPosition})
  },
}


const modalController = ({modal, btnOpen, btnClose, time = 500}) => { 
  const buttonElems = document.querySelectorAll(btnOpen); 
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText= `
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: opacity ${time}ms ease-in-out;  
  `   
  const closeModal = event => {
  const target = event.target;
      if (
          target === modalElem || 
          target.closest(btnClose) ||
          event.code === 'Escape'
          ) {
          modalElem.style.opacity = 0;
          setTimeout(() => {
              modalElem.style.visibility = 'hidden';
              scrollController.enabledScroll();
          }, time); 
          window.removeEventListener('keydown', closeModal);
      }
  }
  const openModal = () => {
      modalElem.style.visibility = 'visible';
      modalElem.style.opacity = 1;
      window.addEventListener('keydown', closeModal);
      scrollController.disabledScroll();
  }
  buttonElems.forEach(btn => {
      btn.addEventListener('click', openModal);
  });
  modalElem.addEventListener('click', closeModal);
};
modalController({
  modal: '.modal',
  btnOpen: '.section__button',
  btnClose: '.modal__close',	
});
