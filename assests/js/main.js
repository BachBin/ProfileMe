// Menu Show 
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Show nè
//Tồn tại
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}
/* Hidden Menu */
if(navClose){
    navClose.addEventListener('click',() => {
        navMenu.classList.remove('show-menu')
    })
}
// Remove Menu Mobile
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')    
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Accordion Skills
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass == 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}
skillsHeader.forEach((el)=>{
    el.addEventListener('click',toggleSkills)
})
// QUALIFICATION TABS
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click',()=>{
        const target  = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab=> {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})
// Active Services Des
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')

}

modalBtns.forEach((modalBtns, i) => {
    modalBtns.addEventListener('click', ()=>{
        modal(i)
    })
})
modalCloses.forEach((modalCloses)=>{
    modalCloses.addEventListener('click',()=>{
        modalViews.forEach((modalViews)=>{
            modalViews.classList.remove('active-modal')
        })
    })
})

// PORTFOLIO SWIPER
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true, 
    },    
  });
//MY TEAM SWIPER
let swiperMyteam = new Swiper('.myteam__container', {    
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true, 
    },   
    breakpoints:{
        568:{
            slidesPerView: 2,

        }
    } 
  });

// SCROLL SECTIONS ACTIVE LINK
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

//CHANGE BACKGROUND HEADER
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
//SHOW BACK TO TOP
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
//Dark Light Theme
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'


const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'


if (selectedTheme) {
  
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}


themeButton.addEventListener('click', () => {
    
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Send Mail
function sendMail(params){
    var namevl = document.getElementById("name").value;
    var emailvl = document.getElementById("email").value;
    var titlevl = document.getElementById("title").value;
    var msgvl = document.getElementById("message").value;
    
    if(namevl==''||emailvl==''||titlevl==''||msgvl==''){        
        showErrorToast("Vui lòng điền hết các trường, cảm ơn bạn")
        return false;
    }

    var tempParams = {
        name: namevl,
        email: emailvl,
        title: titlevl,
        message: msgvl,
    };    
    
    emailjs.send('service_225omp3','template_92kow4c',tempParams)
    .then((result)=>{
        // Clear Input
        ClearInput();        
        showSuccessToast('Tin nhắn đã được gửi, cảm ơn bạn');
    }, (error)=>{
        showErrorToast(error.text);
    });
}
function ClearInput(){
    document.getElementById("name").value ='',
    document.getElementById("email").value ='',
    document.getElementById("title").value ='',
    document.getElementById("message").value =''
}

// Show Toast
function toast({
    title = '', 
    message = '', 
    type = '', 
    duration = 3000
    }) {
    const main = document.getElementById('toast')
    if(main) {
        const toast = document.createElement('div')
        // Remove Toast
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast)
        }, duration + 1000); 
        // Remove Toast On Close
        toast.onclick = function(e) {
            if(e.target.closest('.toast__close')){
                main.removeChild(toast)
                clearTimeout(autoRemoveId)
            }
        }
        const icons = {
            success: 'fas fa-check-circle',
            warn: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle'
        };
        const icon = icons[type];
        const delay = (duration/1000).toFixed(2);

        toast.classList.add('toast',`toast--${type}`)
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = ` 
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__msg">${message}.</p>
        </div>
        <div class="toast__close">
            <i class="far fa-window-close"></i>
        </div>
        `;
        main.appendChild(toast);      
        
    }
}
function showSuccessToast(msg) {
    toast({
        title: 'Success',
        message: msg,
        type: 'success',
        duration: 5000
    });
}
function showWarnToast(msg) {
    toast({
        title: 'Warning',
        message: msg,
        type: 'warn',
        duration: 5000
    });
}
function showErrorToast(msg) {
    toast({
        title: 'Error',
        message: msg,
        type: 'error',
        duration: 5000
    });
}
// Auto Slide
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },        
  });

//Validate


function ValidatorName() {
    const nameVali = document.getElementById('name')
    const namecheck = nameVali.value.trim()
    var parent = nameVali.parentElement;
    var msgerror = parent.querySelector('.form-message');
    if(namecheck===''||namecheck===null){        
        parent.classList.add('invalid');        
        msgerror.innerHTML = 'Vui lòng nhập trường này.';        
        return false;
    }
    else{
        parent.classList.remove('invalid');
        msgerror.innerHTML = '';        
        return false;
    } 
}
function ValidatorEmail() {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailVali = document.getElementById('email')
    const emailcheck = emailVali.value.trim()
    var parent = emailVali.parentElement;
    var msgerror = parent.querySelector('.form-message');
    if(emailcheck===''||emailcheck===null){        
        parent.classList.add('invalid');        
        msgerror.innerHTML = 'Vui lòng nhập trường này.';
        return false;
    }
    else{
        if(regex.test(emailcheck)===false){
            parent.classList.add('invalid');        
            msgerror.innerHTML = 'Vui lòng nhập đúng Email.';
            return false;
        }        
        parent.classList.remove('invalid');
        msgerror.innerHTML = '';
        return false;
    } 
}

function ValidatorTitle() {
    const titleVali = document.getElementById('title')
    const titlecheck = titleVali.value.trim()
    var parent = titleVali.parentElement;
    var msgerror = parent.querySelector('.form-message');
    if(titlecheck===''||titlecheck===null){        
        parent.classList.add('invalid');        
        msgerror.innerHTML = 'Vui lòng nhập trường này.';
        return false;
    }
    else{
        parent.classList.remove('invalid');
        msgerror.innerHTML = '';
        return false;
    } 
}

function ValidatorMessage() {
    const messageVali = document.getElementById('message')
    const messagecheck = messageVali.value.trim()
    var parent = messageVali.parentElement;
    var msgerror = parent.querySelector('.form-message');
    if(messagecheck===''||messagecheck===null){        
        parent.classList.add('invalid');        
        msgerror.innerHTML = 'Vui lòng nhập trường này.';
        return false;
    }
    else{
        parent.classList.remove('invalid');
        msgerror.innerHTML = '';
        return false;
    } 
}


