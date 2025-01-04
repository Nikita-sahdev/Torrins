/*********************************** WRITTEN BY SHIKHAR *********************************************/
function showElement(id, isFlex = '') {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'block';
    }
    if (element && isFlex) {
        element.style.display = isFlex;
    }
}

function hideElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = 'none';
    }
}
// window.$(document).ready(function() {
//     loadSubscriberSection()
// });
/********************************************************************************/


// (function () {
//     var docEl = $(document);
//     nav = $("nav");
//     lst = 0;
  
//     docEl.on("scroll", function () {
//       var cst = $(this).scrollTop();
  
//       if (cst > lst) nav.addClass("hidden");
//       else nav.removeClass("hidden");
//       lst = cst;
//     });
//   })();
  
  window.$('.instrument-slider-container').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1000,
      dots: false,
      cssEase: 'linear',
      autoplay: {
        delay: 1000,
      },
      lazyLoad: 'ondemand',
      centerMode: true,
      variableWidth: true,
      nextArrow: '.next_arrow',
      prevArrow: '.previous_arrow',
      infinite: true,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            arrows: false,

          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            arrows: false,
            touchThreshold: 100


          }
        }
      ]
    });

  var swiper = new Swiper(".instructor-slider", {
    slidesPerView: 1,
    spaceBetween: 10,

    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".right",
        prevEl: ".left",
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        940: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 40,
        },
        1366: {
            slidesPerView: 6,
            spaceBetween: 40,
        },
    },
});
  

  
  function showSidebar() {
    const sidenav = document.querySelector("#sidenav");
    sidenav.style.display = `block`;
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0);
  }
  
  function hideSidebar() {
    const sidenav = document.querySelector("#sidenav");
    sidenav.style.display = "none";
    document.body.style.overflow = 'visible'
    window.scrollTo(0, 0);
  }
  
  gsap.from(".personalised", {
    opacity: 0,
    scale: 0.5,
    // width: "1035px",
    duration: 1,
    scrollTrigger: {
      trigger: ".personalised",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  // var time2 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: `.master-sec`,
  //     start: `top top`,
  //     end: `50%`,
  //     scrub: 1,
  //     scroller: "body",
  //     pin: true,
  //   },
  // });
  
  // console.clear();
  // var textPath = document.querySelector("#text-path");
  // var textContainer = document.querySelector("#text-container");
  // var path = document.querySelector(textPath.getAttribute("href"));
  // var pathLength = path.getTotalLength();
  // console.log(pathLength);
  
  // function updateTextPathOffset(offset) {
  //   textPath.setAttribute("startOffset", offset);
  // }
  
  // updateTextPathOffset(pathLength);
  
  // var count = 0;
  // var oldScrollY = window.scrollY;
  // function onScroll(str) {
  //   requestAnimationFrame(function () {
  //     var rect = textContainer.getBoundingClientRect();
  //     var scrollPercent = rect.y / window.innerHeight;
  //     updateTextPathOffset(count);
  //     if (window.scrollY > 786) {
  //       if (oldScrollY > window.scrollY) {
  //         if (count < 4) {
  //           count = count + 4;
  //         }
  //       } else {
  //         if (count > -630) {
  //           count = count - 4;
  //         }
  //       }
  //     } else {
  //       // count = scrollPercent * 1 * pathLength * 1
  //     }
  //      if(count < -540){
  //       document.getElementById('piano').style.display = 'none'
  //       document.getElementById('guitar-img').style.display = 'none'
  //       document.getElementById('bass').style.display = 'block'
  //       document.getElementById('piano-txt').style.display = 'none'
  //       document.getElementById('guitar-txt').style.display = 'none'
  //       document.getElementById('bass-txt').style.display = 'flex'
  //     }
  
  //     else if (count < -285) {
  //      document.getElementById('piano').style.display = 'block'
  //      document.getElementById('guitar-img').style.display = 'none'
  //      document.getElementById('bass').style.display = 'none'
  //      document.getElementById('piano-txt').style.display = 'flex'
  //      document.getElementById('guitar-txt').style.display = 'none'
  //      document.getElementById('bass-txt').style.display = 'none'
  //     }
  
  //     else{
  //       document.getElementById('piano').style.display = 'none'
  //       document.getElementById('guitar-img').style.display = 'block'
  //       document.getElementById('bass').style.display = 'none'
  //       document.getElementById('piano-txt').style.display = 'none'
  //       document.getElementById('guitar-txt').style.display = 'flex'
  //       document.getElementById('bass-txt').style.display = 'none'
  //     }
  //     oldScrollY = window.scrollY;
  //   });
  // }
  // window.addEventListener("scroll", onScroll);
  
  gsap.from("nav a ,img , .nav-right", {
    opacity: 0,
    y: -60,
    duration: 1.5,
    strigger: 1,
  });
  
  gsap.from(".banner-txt", {
    opacity: 0,
    x: -100,
    duration: 1,
    delay: 1,
  });
  
  gsap.from(".zero-hero", {
    opacity: 0,
    y: 80,
    duration: 1,
    scrollTrigger: {
      trigger: ".zero-hero",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  
  // var subs1 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: `#sub1`,
  //     start: `top top`,
  //     end: `50%`,
  //     scrub: 1,
  //     scroller: "body",
  //     pin: true,
  //   },
  // });
  
  // gsap.from(".text-section1", {
  //   y: 200,
  //   duration: 0.7,
  //   scrollTrigger: {
  //     trigger: "#sub1",
  //     scroller: "body",
  //     start: "top 0%",
  //   },
  // });
  
  // gsap.to(".text-section1", {
  //   y: '-270px',
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: ".text-section1",
  //     scroller: "body",
  //     start: "top 80%",
  //   },
  // });
  
  // gsap.to("#mid", {
  //   y: '-93%',
  //   opacity: 10,
  //   duration: 1.5,
  //   scrollTrigger: {
  //     trigger: ".text-section1",
  //     scroller: "body",
  //     start: "top 80%",
  //   },
  // });
  
  
  
  // var subs2 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: `#sub22`,
  //     start: `top top`,
  //     end: `50%`,
  //     scrub: 1,
  //     scroller: "body",
  //     pin: true,
  //   },
  // });
  
  // gsap.from(".text-section2", {
  //   y: 200,
  //   duration: 0.7,
  //   scrollTrigger: {
  //     trigger: "#sub22",
  //     scroller: "body",
  //     start: "top 0%",
  //   },
  // });
  
  // gsap.to(".text-section2", {
  //   y: '-270px',
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: ".text-section2",
  //     scroller: "body",
  //     start: "top 80%",
  //   },
  // });
  
  // gsap.to("#mid2", {
  //   y: '-93%',
  //   opacity: 10,
  //   duration: 1.5,
  //   scrollTrigger: {
  //     trigger: ".text-section2",
  //     scroller: "body",
  //     start: "top 80%",
  //   },
  // });
  
  // var subs3 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: `#sub3`,
  //     start: `top top`,
  //     end: `50%`,
  //     scrub: 1,
  //     scroller: "body",
  //     pin: true,
  //   },
  // });
  
  // gsap.from(".text-section3", {
  //   y: 200,
  //   duration: 0.7,
  //   scrollTrigger: {
  //     trigger: "#sub3",
  //     scroller: "body",
  //     start: "top 0%",
  //   },
  // });
  
  // gsap.to(".text-section3", {
  //   y: '-270px',
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: ".text-section3",
  //     scroller: "body",
  //     start: "top 80%",
  //   },
  // });
  
  // gsap.to("#mid3", {
  //   y: '-93%',
  //   opacity: 10,
  //   duration: 1.5,
  //   scrollTrigger: {
  //     trigger: ".text-section3",
  //     scroller: "body",
  //     start: "top 80%",
  //   },
  // });
  
  // gsap.from(".Challenges", {
  //   opacity: 0,
  //   y: 60,
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: ".Challenges",
  //     scroller: "body",
  //     start: "top 60%",
  //   },
  // });
  
  // gsap.from(".Challenges .left", {
  //   opacity: 0,
  //   x: -60,
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: ".Challenges",
  //     scroller: "body",
  //     start: "top 60%",
  //   },
  // });
  
  // gsap.from(".Challenges .left .overlayer", {
  //   opacity: 0,
  //   y: 60,
  //   delay: 0.5,
  //   yoyo: true,
  //   duration: 0.5,
  //   scrollTrigger: {
  //     trigger: ".Challenges",
  //     scroller: "body",
  //     start: "top 60%",
  //   },
  // });
  
  // gsap.from(".Challenges .right", {
  //   opacity: 0,
  //   x: 60,
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: ".Challenges",
  //     scroller: "body",
  //     start: "top 60%",
  //   },
  // });
  
  gsap.from(".sticky-sec", {
    y: 200,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".stickydiv",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  gsap.to(".sticky-sec", {
    opacity: 0,
    x: "-180%",
    duration: 1,
    scrollTrigger: {
      trigger: ".stickydiv",
      scroller: "body",
      start: "top -1400px",
  
    },
  });
  
  gsap.from("#playing .left", {
    opacity: 0,
    y: 150,
    duration: 1,
    scrollTrigger: {
      trigger: "#playing",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  gsap.from("#playing .right", {
    opacity: 0,
    y: 150,
    duration: 1,
    scrollTrigger: {
      trigger: "#playing",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  gsap.from(".loop-sec .left", {
    opacity: 0,
    y: 150,
    duration: 1,
    scrollTrigger: {
      trigger: ".loop-sec",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  gsap.from(".loop-sec .right", {
    opacity: 0,
    y: 150,
    duration: 1,
    scrollTrigger: {
      trigger: ".loop-sec",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  gsap.from(".lesson-sec .left", {
    opacity: 0,
    y: 150,
    duration: 1,
    scrollTrigger: {
      trigger: ".lesson-sec",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  gsap.from(".lesson-sec .right", {
    opacity: 0,
    y: 150,
    duration: 1,
    scrollTrigger: {
      trigger: ".lesson-sec",
      scroller: "body",
      start: "top 60%",
    },
  });
  
  
  
  gsap.registerPlugin(ScrollTrigger); {
    const process = document.querySelector(".process");
    if (typeof process != "undefined" && process != null) {
      let sections = gsap.utils.toArray(".process__item");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 2),
        ease: "none",
        scrollTrigger: {
          trigger: ".process",
          scroller: "body",
          scrub: 3,
          // pin: true,
          // snap: 1 / (sections.length - 1),
          end: () => "+=" + document.querySelector(".process")?.offsetWidth,
        },
      });
    }
  }
  
  
  
//   $('.nav-link').on('click', function () {
//     $('.nav-link').removeClass('active')
//     $(this).addClass('active')
  
//   })


