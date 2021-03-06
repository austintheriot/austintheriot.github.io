gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Draggable)

let width = document.documentElement.clientWidth || window.innerWidth
const WINDOW_BREAK_POINT_SIZE = 900
const LARGE_IPAD_SIZE = 1300
const DARK_COLOR = 'rgb(0, 3, 20)'
const LIGHT_COLOR = 'rgb(246, 243, 248)'
const LIGHT_LAVENDER = 'rgb(198, 198, 198)'
const DARK_LAVENDER = 'rgb(143, 143, 164)'
const POP_COLOR = 'rgb(255, 214, 92)'

//only pin city container on desktop
function pinCityContainerFunction() {
  ScrollTrigger.create({
    trigger: '#home',
    end: 'bottom bottom',
    pin: '.city-container',
    pinSpacing: false,
  })
}

//section heading animations
const headings = document.querySelectorAll('.headings')
headings.forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: '+=250px bottom',
      toggleActions: 'play none none none',
    },
    yPercent: 50,
    opacity: 0,
  })
})

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////

const generalButtons = document.querySelectorAll('.button')
generalButtons.forEach((el) => {
  el.addEventListener('mouseenter', buttonMouseEnterHandler)
  el.addEventListener('mouseleave', buttonMouseLeaveHandler)
})

//General Button Animations
function buttonMouseEnterHandler(event) {
  gsap.to(event.target, {
    duration: 0.4,
    color: LIGHT_COLOR,
    backgroundColor: DARK_COLOR,
  })
}

function buttonMouseLeaveHandler(event) {
  gsap.to(event.target, {
    duration: 0.4,
    color: DARK_COLOR,
    backgroundColor: LIGHT_COLOR,
  })
}

//Hire me button animations
const seeMyWorkButton = document.querySelector('.see-my-work-button')

//place button
gsap.set('.see-my-work-button, .scroll-down, .scroll-down-arrow', {
  xPercent: -50,
  yPercent: -50,
})

//add general button animations
seeMyWorkButton.addEventListener('mouseenter', buttonMouseEnterHandler)

seeMyWorkButton.addEventListener('mouseleave', buttonMouseLeaveHandler)

//animations specific to smaller screen sizes
function seeWorkMouseEnterHandler() {
  gsap.to('.building-lights', {
    ease: 'power4.out',
    duration: 2,
    opacity: 1,
  })
}

function seeWorkMouseLeaveHandler() {
  gsap.to('.building-lights', {
    ease: 'power4.out',
    duration: 2,
    opacity: 0,
  })
}

//animate scroll down indication
const scrollMoveAmount = 10
gsap
  .timeline({
    scrollTrigger: {
      trigger: '#home',
      end: '50% top',
      toggleActions: 'play pause resume pause',
    },
    delay: 2,
    repeat: -1,
  })
  .to('.scroll-indicator', {
    y: scrollMoveAmount,
  })
  .to('.scroll-indicator', {
    y: 0,
  })
  .to('.scroll-indicator', {
    y: scrollMoveAmount,
  })
  .to('.scroll-indicator', {
    y: 0,
  })
  .to('.scroll-indicator', {
    duration: 2,
    y: 0,
  })

//Fade out Name, Title, Scroll title, and "Hire Me" button
function fadeOutHomeItemsFunction() {
  gsap
    .timeline({
      scrollTrigger: {
        triggerElement: '#home',
        start: '100 top',
        toggleActions: 'play play play reverse',
      },
    })
    .to(
      `.home__name, 
    .home__title, 
    .nav__scroll-heading, 
    .see-my-work-button, 
    .scroll-down,
    .scroll-down-arrow`,
      {
        duration: 0,
        pointerEvents: 'auto',
      }
    )
    .to(
      `.home__name, 
    .home__title, 
    .nav__scroll-heading, 
    .see-my-work-button, 
    .scroll-down,
    .scroll-down-arrow`,
      {
        ease: 'power2.inOut',
        duration: 0.6,
        opacity: 0,
      }
    )
    .to(
      `.home__name, 
    .home__title, 
    .see-my-work-button,
    .scroll-down,
    .scroll-down-arrow`,
      {
        duration: 0,
        pointerEvents: 'none',
      }
    )
}

// Animating HOME SECTION ////////////////////////////////////////////////////////////////////////////////////////
//Placing items before animation//////////////////////////////////////////////////////
//Animate Ground
gsap.set(
  '.ground',
  {
    scaleY: 0.1,
    scaleX: 1.5,
    yPercent: -50,
  },
  '<'
)
//Set Bench,
gsap.set('.bench', {
  scale: 0.02,
  yPercent: -50,
  xPercent: -50,
})
//Set Buildings
gsap.set('.buildings', {
  scale: 1,
  yPercent: -50,
  x: 0,
})
//Set Welcome heading,
gsap.set('.welcome', {
  yPercent: -50,
  opacity: 0,
})
//Set Cars
gsap.set('.car', {
  x: 0,
  left: '125%',
  scale: 0.1,
  yPercent: -50,
})

//home timeline (all city animations (besides the cars) are added to this)
function animateHome() {
  //Animating Home Items///////////////////////////////////////////////////////////////
  //Animation speeds for buildings
  let MOVE_PRIMARY_X = width * 2.2
  let MOVE_PRIMARY_SCALE = 7
  let MOVE_SECONDARY_X = width * 1.2
  let MOVE_SECONDARY_SCALE = 3
  let MOVE_TERTIARY_X = width * 0.5
  let MOVE_TERTIARY_SCALE = 2
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#home',
        start: 'top top', //trigger element & viewport
        scrub: 1, //duration for scrub to catch up to scroll
      },
    })
    // Move Primary Buildings ////////////////////
    //Move Primary Buildings Left
    .to(
      '.move-primary-left',
      {
        x: -MOVE_PRIMARY_X,
        scale: MOVE_PRIMARY_SCALE,
      },
      '<'
    )
    //Move Primary Buildings Right
    .to(
      '.move-primary-right',
      {
        x: MOVE_PRIMARY_X,
        scale: MOVE_PRIMARY_SCALE,
      },
      '<'
    )
    // Move Secondary Buildings ////////////////////
    //Move Secondary Buildings Left
    .to(
      '.move-secondary-left',
      {
        x: -MOVE_SECONDARY_X,
        scale: MOVE_SECONDARY_SCALE,
      },
      '<'
    )
    //Move Secondary Buildings Right
    .to(
      '.move-secondary-right',
      {
        x: MOVE_SECONDARY_X,
        scale: MOVE_SECONDARY_SCALE,
      },
      '<'
    )
    // Move Tertiary Buildings /////////////////////
    //Move Tertiary Buildings Left
    .to(
      '.move-tertiary-left',
      {
        x: -MOVE_TERTIARY_X,
        scale: MOVE_TERTIARY_SCALE,
      },
      '<'
    )
    //Move Tertiary Buildings Right
    .to(
      '.move-tertiary-right',
      {
        x: MOVE_TERTIARY_X,
        scale: MOVE_TERTIARY_SCALE,
      },
      '<'
    )
    //Move Tertiary Buildings Right (Slower)
    .to(
      '.move-tertiary-right-slower',
      {
        x: 0.3,
        scale: MOVE_TERTIARY_SCALE,
        modifiers: {
          x: gsap.utils.unitize((x) => x * width, 'px'),
        },
      },
      '<'
    )
    // Scale Up Background Buildings //////////////
    .to(
      '.background-buildings',
      {
        scale: 1.5,
      },
      '<'
    )
    // Scale Up Ground /////////////////////////////
    .to(
      '.ground',
      {
        ease: 'power.in',
        scaleY: 0.5,
      },
      '<'
    )
    // Scale Up Bench Into Shot ////////////////////
    .to(
      '.bench',
      {
        ease: 'power1.inOut',
        scale: 1,
      },
      '<'
    )
    // Keep Bench In Shot ////////////////////
    .to('.bench', {
      duration: 0.25,
      scale: 1,
    })

  //fade in welcome
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#home',
        start: '50% top', //trigger element & viewport
        toggleActions: 'play reverse play reverse',
      },
    })
    .to('.welcome', {
      duration: 1,
      opacity: 1,
    })
}

// Animating CARS ////////////////////////////////////////////////////////////////////////////////////////
let animateCars = gsap.timeline()
function animateCarsFunction(action) {
  //animate cars automatically
  animateCars.kill()
  animateCars = gsap
    .timeline({
      repeat: -1, //restarts indefinitely
      scrollTrigger: {
        triggerElement: '#home',
        start: '-1 top',
        end: '9 top',
        toggleActions: `play ${action} resume none`,
      },
    })
    .to('.car', {
      ease: 'none',
      duration: 10 / (Math.random() * 0.5 + 0.75),
      left: '-25%',
      stagger: 3,
      delay: 1, //allow scrub to catch up
    })
}

function animateCarScroll(selector) {
  gsap
    .timeline({
      scrollTrigger: {
        triggerElement: '#home',
        start: '10 top',
        scrub: 1,
      },
    })
    .to(selector, {
      scale: 1,
      x: 1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          let location = document
            .querySelector(selector)
            .getBoundingClientRect().left
          let modifier = location < width / 2 ? -width * 7 : width * 7
          return x * modifier
        }, 'px'),
      },
    })
}

// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////

function speedUpAboutAnimation() {
  aboutInfoContainer.style.cursor = `url('../images/fast-forward.svg'), pointer`
  aboutAnimations.timeScale(5)
}

function normalSpeedAboutAnimation() {
  aboutInfoContainer.style.cursor = `pointer`
  aboutAnimations.timeScale(1)
}

//allow speed up/slow down on mousedown/touch start
const aboutInfoContainer = document.querySelector('.about__container main')
aboutInfoContainer.addEventListener('mousedown', speedUpAboutAnimation)
aboutInfoContainer.addEventListener('mouseup', normalSpeedAboutAnimation)
aboutInfoContainer.addEventListener('touchstart', speedUpAboutAnimation, {
  passive: true,
})
aboutInfoContainer.addEventListener('touchend', normalSpeedAboutAnimation)

//Animate Text Slides //////////////////////////////////////////////////
//initialize border locations

gsap.set('.border-top', {
  transformOrigin: 'left',
  scaleX: 0,
})
gsap.set('.border-right', {
  transformOrigin: 'top',
  scaleY: 0,
})
gsap.set('.border-bottom', {
  transformOrigin: 'right',
  scaleX: 0,
})
gsap.set('.border-left', {
  transformOrigin: 'bottom',
  scaleY: 0,
})
gsap.set('.about__info', {
  opacity: 0,
})

const aboutAnimations = gsap
  .timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: '#about',
      toggleActions: 'play reset play reset',
    },
    defaults: {
      duration: 0.6,
    },
  })
  //create labels for border animation
  .addLabel('border-top')
  .addLabel('border-right', 'border-top+=4')
  .addLabel('border-bottom', 'border-right+=4')
  .addLabel('border-left', 'border-bottom+=4')
  //fade in
  .to('.about__info--1', {
    duration: 0,
    zIndex: 200,
  })
  .to('.about__info--1', {
    opacity: 1,
  })
  .to('.about__info--1', {
    duration: 2,
    opacity: 1,
  })
  .to('.about__info--1', {
    opacity: 0,
    zIndex: 0,
  })
  .to('.about__info--1', {
    duration: 0,
    zIndex: 0,
  })
  //border-top animation
  .to(
    '.border-top',
    {
      duration: 4,
      scale: 1,
      borderTopColor: `${DARK_COLOR}`,
    },
    'border-top'
  )
  //fade in
  .to('.about__info--2', {
    duration: 0,
    zIndex: 200,
  })
  .to('.about__info--2', {
    opacity: 1,
  })
  .to('.about__info--2', {
    duration: 2,
    opacity: 1,
  })
  .to('.about__info--2', {
    opacity: 0,
  })
  .to('.about__info--2', {
    duration: 0,
    zIndex: 200,
  })
  //border-right animation
  .to(
    '.border-right',
    {
      duration: 4,
      scale: 1,
      borderRightColor: `${DARK_COLOR}`,
    },
    'border-right'
  )
  //fade in
  .to('.about__info--3', {
    duration: 0,
    zIndex: 200,
  })
  .to('.about__info--3', {
    opacity: 1,
  })
  .to('.about__info--3', {
    duration: 2,
    opacity: 1,
  })
  .to('.about__info--3', {
    opacity: 0,
  })
  .to('.about__info--3', {
    duration: 0,
    zIndex: 0,
  })
  //border-bottom animation
  .to(
    '.border-bottom',
    {
      duration: 4,
      scale: 1,
      borderBottomColor: `${DARK_COLOR}`,
    },
    'border-bottom'
  )
  //change Z-index
  .to('.about__info--4', {
    duration: 0,
    zIndex: 200,
  })
  //fade in
  .to('.about__info--4', {
    opacity: 1,
  })
  //sustain at 1 opacity
  .to('.about__info--4', {
    duration: 6,
    opacity: 1,
  })
  //fade out
  .to('.about__info--4', {
    opacity: 0,
  })
  .addLabel('break-apart', '<')
  //sustain at 0 opacity
  .to('.about__info--4', {
    duration: 2,
    opacity: 0,
  })
  //change Z-index
  .to('.about__info--4', {
    duration: 0,
    zIndex: 0,
  })
  //border-left animation
  .to(
    '.border-left',
    {
      duration: 6,
      scale: 1,
      borderLeftColor: `${DARK_COLOR}`,
    },
    'border-left'
  )
  .to(
    '.border',
    {
      scale: 1.2,
      opacity: 0,
    },
    'break-apart'
  )

//SKILLS///////////////////////////////////////////////////////////
//Make sure bonus info and lights are opacity: 0 to begin with
//make sure clicks are not prevented at start-up
fadeOutInfoAndLights(null, 0) //immediately set the zIndex & opacity

//add slide-in animation to all skill headings
const skills = document.querySelectorAll('.skill-headings')
skills.forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      toggleActions: 'play none complete none',
    },
    opacity: 0,
    xPercent: -50,
  })
})

function fadeOutInfoAndLights(targetInfo, duration) {
  //fade out all non-selected info and lights
  gsap
    .timeline()
    .to(
      `.skills__bonus-info:not(${targetInfo}),
        .construction-building-lights:not(${targetInfo})`,
      {
        duration: duration || 0.4,
        opacity: 0,
      }
    )
    //stop pointer events on non-selected info and lights
    .to(`.skills__bonus-info:not(${targetInfo})`, {
      duration: duration || 0,
      pointerEvents: 'none',
      zIndex: -1000,
    })
}

function fadeInInfoAndLights(bonusInfoAndLights, bonusInfo) {
  //fade in the selected info and lights
  gsap
    .timeline()
    .to(bonusInfoAndLights, {
      duration: 0.4,
      opacity: 1,
    })
    //allow pointer events on the selected one
    .to(bonusInfoAndLights, {
      duration: 0,
      pointerEvents: 'auto',
    })
    .to(bonusInfo, {
      duration: 0,
      zIndex: 100000,
    })
}

//global variables to give to the click listener on the skills section
let bonusInfo
let targetInfo
function fadeInBonusInfo(event) {
  targetInfo = event.target.dataset.bonusTarget
  bonusInfo = `.skills__bonus-info--${targetInfo}`
  lights = `.construction-building-lights--${targetInfo}`
  let bonusInfoAndLights = `${bonusInfo}, ${lights}`
  //fade out all other infos and lights
  fadeOutInfoAndLights(targetInfo)
  //fade in the selected one
  fadeInInfoAndLights(bonusInfoAndLights, bonusInfo)

  bonusInfo = document.querySelector(bonusInfo)
}

//fade out non-selected bonus info and fade in selected bonus info on mouseenter
skills.forEach((el) => {
  el.addEventListener('mouseenter', fadeInBonusInfo)
})

// Close open bonus info on click or touch
const skillsSection = document.querySelector('#skills')
skillsSection.addEventListener('click', (event) => closeBonusInfo(event))
skillsSection.addEventListener('touch', (event) => closeBonusInfo(event))

function closeBonusInfo(event) {
  let classListArray = [...event.target.classList]
  if (
    (event.target === skillsSection ||
      classListArray.includes('construction-building') ||
      classListArray.includes('construction-building-lights') ||
      classListArray.includes('skills__bonus-info-container')) &&
    event.target !== bonusInfo
  ) {
    fadeOutInfoAndLights(targetInfo)
  }
}

//PORTFOLIO///////////////////////////////////////////////////////////
const SLIDE_DELAY = 2
const SLIDE_DURATION = 0.3

const slidesInner = document.querySelector('.slides-inner')
const slidesContainer = document.querySelector('.slides-container')
const slides = document.querySelectorAll('.slide')
const proxy = document.createElement('div') //placeholder div for dragging--the proxy tells us how far we've dragged
const numSlides = slides.length
let slideAnimation = gsap.to({}, { duration: 0 }) //placeholder (to kill before undefined)
let slideWidth
let wrapWidth

//initialize slides horizontally
for (let i = 0; i < numSlides; i++) {
  gsap.set(slides[i], {
    xPercent: i * 100,
  })
}
//initialize proxy at 0 movement
gsap.set(proxy, { x: 0 })

function snapX(x) {
  return Math.round(x / slideWidth) * slideWidth
}

//calls the auto play function after a delay
const timer = gsap.delayedCall(SLIDE_DELAY, autoPlay)

//moves all slides over by 100% -- starts out paused
const animation = gsap.to(slides, {
  duration: 1,
  xPercent: '+=' + numSlides * 100, //move over the width of the slide
  ease: 'none',
  paused: true,
  repeat: -1,
  modifiers: {
    //wraps positive and negative values to the limit (fancy modulo)
    //offset to the left by one using wrap (so 10 starts out on the left)
    xPercent: gsap.utils.wrap(-100, (numSlides - 1) * 100),
  },
})

//restart timer
//kill the current slideAnimation. Reassign it to a new animation
function animateSlides(direction) {
  if (previewClosed) {
    timer.restart(true)
    slideAnimation.kill()
  }

  //reads the proxy's position from being dragged
  //snap x position to the closest slide
  let x = snapX(gsap.getProperty(proxy, 'x') + direction * slideWidth)

  slideAnimation = gsap.to(proxy, {
    duration: SLIDE_DURATION,
    x: x,
    onUpdate: updateProgress,
  })
}

//when the outermost container is dragged, drag the proxy (basically nothing)
//stop slideAnimation
//updates the drag animation?
const draggable = Draggable.create(proxy, {
  trigger: '.slides-container',
  type: 'x',
  onPress: updateDraggable,
  onDrag: updateProgress,
})

//updates the the draggable's x/y properties to reflect the target element's current position
function updateDraggable() {
  slideAnimation.kill()
  this.update()
}

//update the slide animation to reflect the movement of the draggable
function updateProgress() {
  animation.progress(
    gsap.utils.wrap(0, 1, gsap.getProperty(proxy, 'x') / wrapWidth)
  )
}

function autoPlay() {
  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
  } else {
    animateSlides(-1)
  }
}

//pause carousel on mouse hover or scroll--resume when mouse leaves
slidesContainer.addEventListener('mouseenter', () => {
  timer.pause()
})
slidesContainer.addEventListener('mouseleave', () => {
  if (previewClosed) {
    timer.restart(true)
  }
})
slidesContainer.addEventListener(
  'toouchstart',
  () => {
    timer.pause()
  },
  {
    passive: true,
  }
)
slidesContainer.addEventListener('touchmove', () => {
  timer.pause()
})

const projectTitles = document.querySelectorAll('.project-title')
const projectTitleContainers = document.querySelectorAll(
  '.project-title-container'
)

function titleMouseEnterHandler(event) {
  gsap.to(event.target.parentElement, {
    duration: 0.2,
    backgroundColor: DARK_COLOR,
    color: LIGHT_COLOR,
  })
}

function titleMouseLeaveHandler(event) {
  gsap.to(event.target.parentElement, {
    duration: 0.2,
    backgroundColor: LIGHT_COLOR,
    color: DARK_COLOR,
  })
}

projectTitles.forEach((el) => {
  el.addEventListener('mouseenter', titleMouseEnterHandler)
  el.addEventListener('mouseleave', titleMouseLeaveHandler)
})

// Project Previews ///////////////////////////////////////////////
function disableScroll() {
  document.querySelector('body').style.overflow = 'hidden'
}

function enableScroll() {
  document.querySelector('body').style.overflow = 'visible'
}

let previewClosed = true
function showPreview(el) {
  let previewTarget = el.dataset.preview

  //begin loading assets (lazy loading the images for each preview)
  let previewTargetImages = document.querySelectorAll(
    `${previewTarget} [data-src-preview]`
  )
  previewTargetImages.forEach((el) => {
    el.src = el.dataset.srcPreview
  })
  console.log(`loading ${previewTargetImages.length} imgs`)

  //make preview visible
  gsap.set(`${el.dataset.preview}, ${el.dataset.preview} *`, {
    visibility: 'visible',
  })
  gsap.set('.background', {
    visibility: 'visible',
  })

  disableScroll()
  timer.kill()

  //Invert picture when clicked
  let projectImg = el.parentElement.previousElementSibling
  if (!projectImg.dataset.srcChanged) {
    //change img src to dark image
    let newProjectImgSrc = projectImg.src.split('.svg').join('') + '--dark.svg'
    projectImg.src = newProjectImgSrc

    //adjust GSAP animations
    //remove previous animations
    el.removeEventListener('mouseenter', titleMouseEnterHandler)
    el.removeEventListener('mouseleave', titleMouseLeaveHandler)

    //set new default colors
    gsap.set(el.parentElement, {
      color: DARK_COLOR,
    })
    gsap.set(el.parentElement, {
      backgroundColor: 'rgb(226, 225, 230)',
    })

    //assign new animations
    el.addEventListener('mouseenter', (event) => {
      gsap.to(event.target.parentElement, {
        duration: 0.2,
        backgroundColor: DARK_COLOR,
        color: LIGHT_COLOR,
      })
    })
    el.addEventListener('mouseleave', (event) => {
      gsap.to(event.target.parentElement, {
        duration: 0.2,
        backgroundColor: 'rgb(226, 225, 230)',
        color: DARK_COLOR,
      })
    })

    //prevent further modifications to img src
    projectImg.dataset.srcChanged = true
  }

  previewClosed = false
}

function closePreviews() {
  gsap.set('.project-previews-container, .project-previews-container *', {
    visibility: 'hidden',
  })
  enableScroll()
  timer.restart(true)
  previewClosed = true
}

//display preview on click of the title or about section
const titleButtons = document.querySelectorAll('.project-title')
titleButtons.forEach((el) => {
  el.addEventListener('click', showPreview.bind(this, el))
  el.addEventListener('touchstart', showPreview.bind(this, el), {
    passive: true,
  })
})

//hide preview on click of the clsoe button or background div
const xButtons = document.querySelectorAll('.x-button')
xButtons.forEach((el) => {
  el.addEventListener('click', closePreviews)
})
const projectPreviewsBackground = document
  .querySelector('.background')
  .addEventListener('click', closePreviews)

//WINDOW RESIZING, etc.//////////////////////////////////////////////////////////////////
window.addEventListener('resize', resize)

/* Logic Begind Interactions Based On Screen-Size: 
Small screens are assumed to be small until proven otherwise. 
Allow all animations to be enabled or disabled based on largest known screen size. 
EXCEPT: City zomm-in/zoom-out animation only available if screen
is large when page is FIRST opened (to prevent massive document-flow issues 
  when switching from animation interaction one to the other)

Small- and medium-size screens adapt to changing width but not height.
This is to prevent jittery effects on iPhones and iPads when the browser resizes itself.

If, however, they are proven to be a desktop, then the height will automatically adjust.
*/

function freezeVHSize() {
  document.documentElement.style.setProperty('--full-height', '100%')
  document.documentElement.style.setProperty(
    '--full-height',
    window.innerHeight + 'px'
  )
}

function enableVHResizing() {
  document.documentElement.style.setProperty('--full-height', '100vh')
}

/* Based on INTIAL screen size */
let largestKnownScreenWidth
let previousScreenWidth
if (width < WINDOW_BREAK_POINT_SIZE) {
  largestKnownScreenWidth = 'small'
  freezeVHSize()
  animateCarsFunction('play')
} else if (width < LARGE_IPAD_SIZE) {
  largestKnownScreenWidth = 'medium'
  freezeVHSize()
  animateCarsFunction('play')
} else {
  largestKnownScreenWidth = 'large'
  enableVHResizing()

  //Enable city animations only on desktop from the outset
  document.querySelector('#home').style.height =
    'calc(var(--full-height, 100vh) * 4)'
  pinCityContainerFunction()
  fadeOutHomeItemsFunction()
  animateCarsFunction('pause')
  animateCarScroll('.car1')
  animateCarScroll('.car2')
  animateHome()
}

/* Based on DYNAMIC screen size */
function resize() {
  width = document.documentElement.clientWidth || window.innerWidth

  /* Largest known width ////////////////////////// */
  if (
    width > WINDOW_BREAK_POINT_SIZE &&
    width < LARGE_IPAD_SIZE &&
    largestKnownScreenWidth !== 'large'
  ) {
    largestKnownScreenWidth = 'medium'
  } else if (width > LARGE_IPAD_SIZE) {
    largestKnownScreenWidth = 'large'
  }

  /* iPhones and iPads only */
  if (largestKnownScreenWidth !== 'large') {
    gsap.to('.building-lights', {
      ease: 'power4.out',
      duration: 3,
      opacity: 1,
    })
  }

  /* Desktop only */
  if (largestKnownScreenWidth === 'large') {
    enableVHResizing()

    //light up buildings on see my work button hover
    seeMyWorkButton.addEventListener('mouseenter', seeWorkMouseEnterHandler)
    seeMyWorkButton.addEventListener('mouseleave', seeWorkMouseLeaveHandler)
    gsap.to('.building-lights', {
      ease: 'power4.out',
      duration: 3,
      opacity: 0,
    })
  }

  //Carousel/Slider info:
  let norm = gsap.getProperty(proxy, 'x') / wrapWidth || 0

  slideWidth = slides[0].offsetWidth
  wrapWidth = slideWidth * numSlides

  gsap.set(proxy, {
    x: norm * wrapWidth,
  })

  gsap.set(slidesInner, {
    width: Math.min(wrapWidth - slideWidth, width),
  })
  gsap.set(slidesContainer, {
    width: Math.min(wrapWidth - slideWidth, width),
  })

  animateSlides(0)
  slideAnimation.progress(1)
}

resize() //immediately resize window to calibrate

//unhide the CSS (so that it doesn't flicker before things are fully placed)
gsap.to(':root', {
  visibility: 'visible',
})
