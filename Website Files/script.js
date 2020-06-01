gsap.registerPlugin(ScrollToPlugin);

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
const ground1 = document.querySelector('.ground1');

window.addEventListener('resize', () => {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
});

const WINDOW_BREAK_POINT_SIZE = 900;
const controller = new ScrollMagic.Controller();
const SECTION_HEIGHT = 400;
const PIN_DURATION = `${SECTION_HEIGHT * 4}%`;
const NAV_ORB_DURATION = `${SECTION_HEIGHT}%`;
const ANIMATION_SCROLL_DURATION = `${SECTION_HEIGHT / 2}%`;

// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
const nav = document.querySelector('nav');

//Light up navigation orbs when viewing that section
new ScrollMagic.Scene({
  triggerElement: '#home',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-home', 'nav__link--selected')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#about',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-about', 'nav__link--selected')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#portfolio',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-portfolio', 'nav__link--selected')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#contact',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-contact', 'nav__link--selected')
  .addTo(controller);

//Fade out "Scroll" indicator
const scrollHeadingTimeline = gsap.timeline();

scrollHeadingTimeline.to('.nav__scroll-heading', {
  duration: 0.6,
  opacity: 0,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 100,
})
  .setTween(scrollHeadingTimeline)
  .addTo(controller);

//Change opacity of entire nav on hover (on desktop)
if (width >= WINDOW_BREAK_POINT_SIZE) {
  gsap.to(nav, {
    duration: 2,
    opacity: 0.75,
  });

  //trigger functions for mouseover nav
  nav.addEventListener('mouseover', (event) => {
    gsap.to(nav, {
      ease: 'power',
      duration: 0.4,
      opacity: 1,
    });

    //trigger fade-in for info associated with link
    if ([...event.target.classList].includes('nav__link')) {
      fadeInOutElement(event.target, 1);
    }
  });

  //trigger functions for mouseout of nav
  nav.addEventListener('mouseout', (event) => {
    gsap.to(nav, {
      ease: 'power',
      duration: 0.4,
      opacity: 0.5,
    });

    //trigger fade-out for info associated with link
    if ([...event.target.classList].includes('nav__link')) {
      fadeInOutElement(event.target, 0);
    }
  });
} else {
  gsap.to(nav, {
    duration: 2,
    opacity: 1,
  });
}

//Change opacity of nav info on hover (Desktop)
function fadeInOutElement(target, opacity) {
  const linkDescriptor = [...target.classList][1].split('-')[1];
  targetName = `.nav__info-${linkDescriptor}`;
  gsap.to(targetName, {
    duration: 0.4,
    opacity: opacity,
  });
}

//Change opacity of nav info on location (Mobile)
if (width < WINDOW_BREAK_POINT_SIZE) {
  new ScrollMagic.Scene({
    triggerElement: '#home',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-home', 'nav__info--selected')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#about',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-about', 'nav__info--selected')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#portfolio',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-portfolio', 'nav__info--selected')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#contact',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-contact', 'nav__info--selected')
    .addTo(controller);
}

/* //Animate general scrolling of the page 
--- can't get this to work. The browser just locks up instead every time

controller.scrollTo(function (newpos) {
  TweenMax.to(window, 2, { scrollTo: { y: newpos } });
});

nav.addEventListener('click', (event) => {
  let target = event.target;
  if ([...target.classList].includes('nav__link')) {
    let link = target.dataset.link;
    controller.scrollTo(link);
  }
});
 */

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////

//Pin City Container
new ScrollMagic.Scene({
  triggerElement: 'body',
  duration: PIN_DURATION,
  triggerHook: 'onLeave',
})
  .setPin('.city-container', { pushFollowers: false })
  .addTo(controller);

//Fade out Name and Title
const nameAndTitleTimeline = gsap.timeline();

nameAndTitleTimeline.to('.home__name, .home__title', {
  duration: 0.6,
  opacity: 0,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 100,
})
  .setTween(nameAndTitleTimeline)
  .addTo(controller);

// ANIMATE CARS /////////////////////////////////////////////////////////////////////////////////////////////

//Place Cars
gsap.set('.car', {
  yPercent: -50,
  scale: 0.1,
});

// Car 1 /////////////////////////////////////////////////////////////
//Animate car movement
//Move car from 50% left to 50% past the right and then repeats
const carTimelineMoving = new TimelineMax({
  onComplete: () => carTimelineMoving.restart(),
});
carTimelineMoving.to('.car1', {
  ease: 'none',
  duration: width / 50,
  left: '-100%',
});

//Pause car movement, create a new scene to move car left or right depending on position
const carTimelinePause = gsap.timeline();
carTimelinePause.to('.car1', {
  onStart: () => {
    carTimelineMoving.pause();
    let carPosition = document.querySelector('.car1').getBoundingClientRect()
      .left;
    moveCarWithScroll(carPosition);
  },
});
new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(carTimelinePause)
  .addTo(controller);

//Move Car with Mouse Scrolling
//callback function--allows car to move left or righr depending on current position
let scrollingCarScene;
let scrollingCarTimeline;
function moveCarWithScroll(carPosition) {
  scrollingCarTimeline = gsap.timeline();

  scrollingCarTimeline.to('.car1', {
    x: carPosition < width / 2 ? -width * 2.2 : width * 2.2,
    ease: 'none',
    scale: 1,
  });
  scrollingCarScene = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: ANIMATION_SCROLL_DURATION,
    triggerHook: 'onEnter',
  })
    .setTween(scrollingCarTimeline)
    .addTo(controller);
}

//Resume Car Movement
//Destroy scrolling scene, destroy timeline, and begin car movement again
new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 10,
})
  .addTo(controller)
  .on('leave', () => {
    scrollingCarTimeline.kill();
    scrollingCarScene.destroy();
    carTimelineMoving.resume();
  });

// Car 2 /////////////////////////////////////////////////////////////
//Animate car movement
//Move car from 50% left to 50% past the right and then repeats
const carTimelineMoving2 = new TimelineMax({
  onComplete: () => carTimelineMoving2.restart(),
});
carTimelineMoving2.to('.car2', {
  ease: 'none',
  duration: width / 50,
  left: '-100%',
  delay: 4,
});

//Pause car movement, create a new scene to move car left or right depending on position
const carTimelinePause2 = gsap.timeline();
carTimelinePause2.to('.car2', {
  onStart: () => {
    carTimelineMoving2.pause();
    let carPosition = document.querySelector('.car2').getBoundingClientRect()
      .left;
    moveCarWithScroll2(carPosition);
  },
});
new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(carTimelinePause2)
  .addTo(controller);

//Move Car with Mouse Scrolling
//callback function--allows car to move left or righr depending on current position
let scrollingCarScene2;
let scrollingCarTimeline2;
function moveCarWithScroll2(carPosition) {
  scrollingCarTimeline2 = gsap.timeline();

  scrollingCarTimeline2.to('.car2', {
    x: carPosition < width / 2 ? -width * 2.2 : width * 2.2,
    ease: 'none',
    scale: 1,
  });
  scrollingCarScene2 = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: ANIMATION_SCROLL_DURATION,
    triggerHook: 'onEnter',
  })
    .setTween(scrollingCarTimeline2)
    .addTo(controller);
}

//Resume Car Movement
//Destroy scrolling scene and begin car movement again
new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 10,
})
  .addTo(controller)
  .on('leave', () => {
    scrollingCarTimeline2.kill();
    scrollingCarScene2.destroy();
    carTimelineMoving2.resume();
  });

// Animating HOME SECTION ////////////////////////////////////////////////////////////////////////////////////////
const home = gsap.timeline();

//Placing items before animation//////////////////////////////////////////////////////
//Animate Ground
gsap.set(
  '.ground',
  {
    yPercent: -50,
    scaleY: 0.1,
    scaleX: 1.5,
  },
  '<'
);
//Center buildings Completely
gsap.set(
  '.buildings',
  {
    yPercent: -50,
  },
  '<'
);
//Set Bench,
gsap.set('.bench', {
  yPercent: -50,
  xPercent: -50,
  scale: 0.02,
});

//Animating Home Items///////////////////////////////////////////////////////////////
//Animation speeds for buildings
const MOVE_PRIMARY_X = () => width * 2.2;
const MOVE_PRIMARY_SCALE = 7;
const MOVE_SECONDARY_X = () => width * 1.2;
const MOVE_SECONDARY_SCALE = 3;
const MOVE_TERTIARY_X = () => width * 0.5;
const MOVE_TERTIARY_SCALE = 2;
// Move Primary Buildings ////////////////////
home
  //Move Primary Buildings Left
  .to(
    '.move-primary-left',
    {
      x: -MOVE_PRIMARY_X(),
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
      x: -MOVE_SECONDARY_X(),
      scale: MOVE_SECONDARY_SCALE,
    },
    '<'
  )
  //Move Secondary Buildings Right
  .to(
    '.move-secondary-right',
    {
      x: MOVE_SECONDARY_X(),
      scale: MOVE_SECONDARY_SCALE,
    },
    '<'
  )
  // Move Tertiary Buildings /////////////////////
  //Move Tertiary Buildings Left
  .to(
    '.move-tertiary-left',
    {
      x: -MOVE_TERTIARY_X(),
      scale: MOVE_TERTIARY_SCALE,
    },
    '<'
  )
  //Move Tertiary Buildings Right
  .to(
    '.move-tertiary-right',
    {
      x: MOVE_TERTIARY_X(),
      scale: MOVE_TERTIARY_SCALE,
    },
    '<'
  )
  //Move Tertiary Buildings Right (Slower)
  .to(
    '.move-tertiary-right-slower',
    {
      x: width * 0.3,
      scale: MOVE_TERTIARY_SCALE,
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
      scale: 1,
      ease: 'power.in',
    },
    '<'
  );

//Add Home animation to controller
new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(home)
  .addTo(controller);

// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
