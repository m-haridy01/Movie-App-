// ! Loading Screen In The Start
jQuery(function () {
  $(".loading").fadeOut(2000, function () {
    $("body").css({ overflow: "auto" });
  });
});

// ! Close And And Open Side Bar
let closed = true;
let leftWidth = $(".left").innerWidth();
let asideWidth = $("aside").innerWidth();
let rightWidth = $(".right").innerWidth();
$("aside").css("left", `-${leftWidth}px`, 800);
$(".scroller").css("left", `${rightWidth}px`, 800);
$(".o-x").on("click", () => {
  if (closed) {
    $("aside").css("left", `0`);
    $(".scroller").css("left", `${asideWidth}px`, 800);
    $(".close").removeClass("d-none");
    $(".open").addClass("d-none");
    $(".animate li").css("bottom", "0");
    closed = false;
  } else {
    $("aside").css("left", `-${leftWidth}px`, () => {
      $(".animate li").css("bottom", "-150%");
    });
    $(".scroller").css("left", `${rightWidth}px`, 800);
    $(".close").addClass("d-none");
    $(".open").removeClass("d-none");
    $(".animate li").css("bottom", "-150%");
    closed = true;
  }
});

// ! Scroll Follower
let scroller = document.querySelector(".scroller");
document.addEventListener("scroll", (e) => {
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop;
  let currentWidth = `${(scrollTop / height) * 100}%`;
  scroller.style.width = currentWidth;
});

// ! Close SideBar
function closeSideBar() {
  $("aside").css("left", `-${leftWidth}px`);
  $(".scroller").css("left", `${rightWidth}px`, 800);
  $(".close").addClass("d-none");
  $(".open").removeClass("d-none");
  closed = true;
}

// ! To Top Button
$(window).on("scroll", () => {
  if ($(window).scrollTop() > 500) {
    $(".scroll-to-top").fadeIn(500);
  } else {
    $(".scroll-to-top").fadeOut(500);
  }
});
$(".scroll-to-top").on("click", () => {
  $("html").animate({ scrollTop: "0px" }, 1000);
});

// ! Displaying Data With All Sections
test(
  "https://api.themoviedb.org/3/movie/now_playing?api_key=6913ffc952f25e36b31a905375c2bdad"
);
async function test(apiUrl) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTEzZmZjOTUyZjI1ZTM2YjMxYTkwNTM3NWMyYmRhZCIsIm5iZiI6MTc0ODAxODI0NC41MTksInN1YiI6IjY4MzBhNDQ0MTNiOTFhMzdjYTJiNjY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kFhZ_DDoVxhUL3e-qqhlAWQ-V7CAQYKVRrZjuCtArNI",
    },
  };
  $("body").css("overflow", "hidden");
  $(".loading").fadeIn();
  let response = await fetch(apiUrl, options);
  $(".loading").fadeOut(() => $("body").css("overflow", "auto"));
  let data = await response.json();
  let arrData = data.results;
  display(arrData);
  console.log(arrData);
}

function display(arrData) {
  let cartona = "";
  for (let x = 0; x < arrData.length; x++) {
    if (arrData[x].poster_path !== null) {
      cartona += `
        <div data-aos="zoom-in-up" class="col-md-6 col-lg-4 movie text-white">
            <div class="image rounded-3 overflow-hidden position-relative">

                <img src="https://image.tmdb.org/t/p/w500${
                  arrData[x].poster_path
                }" class="w-100 ayhaga d-block rounded-3 " alt="">

                <div class="layer opacity-0 p-2 position-absolute top-0 start-0 end-0 bottom-0 rounded-3">
                <div class="total ps-3">
                    <h2 class="text-center pt-2 ">${arrData[x].title}</h2>
                    <p class=" pt-2">${arrData[x].overview
                      .split(" ", 50)
                      .join(" ")}...</p>
                    <p>Release Date : ${arrData[x].release_date} </p>

                    <div class="rating">
                        <div class="stars mt-4 d-flex gap-2 align-items-center">
                            ${getStars(arrData[x].vote_average)}
                        </div>
                        
                        <div class="circle mt-3">
                            <span>${arrData[x].vote_average.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
        `;
    }
  }

  $("#main-section .row").html(cartona);
  function getStars(vote) {
    let starsHTML = "";
    let rounded = Math.round(vote); // أقرب رقم صحيح

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rounded / 2)) {
        starsHTML += `<i class="fa-solid fa-star text-warning"></i>`;
      } else if (i === Math.ceil(rounded / 2) && vote % 2 !== 0) {
        starsHTML += `<i class="fa-solid fa-star-half-stroke text-warning"></i>`;
      } else {
        starsHTML += `<i class="fa-regular fa-star text-warning"></i>`;
      }
    }

    return starsHTML;
  }

  function tryLeave() {
    $(".movie").on("mouseleave", async () => {
      let totalWidth = $(".total").innerWidth();
      $(".total").css("left", `-${totalWidth}px`);
      setTimeout(() => {
        $(".total").css("left", `0`);
      }, 200);
    });
  }
  tryLeave();
}

$(".Playing").on("click", () => {
  test(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=6913ffc952f25e36b31a905375c2bdad"
  );
  closeSideBar();
});

$(".Popular").on("click", () => {
  test("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1");
  closeSideBar();
});

$(".Rated").on("click", () => {
  test("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1");
  closeSideBar();
});

$(".Trending").on("click", () => {
  test(
    "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );
  closeSideBar();
});

$(".UpComing").on("click", () => {
  test("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1");
  closeSideBar();
});

$("#searchInput input").on("input", function () {
  if (this.value != "") {
    test(
      `https://api.themoviedb.org/3/search/movie?query=${this.value}&include_adult=false&language=en-US&page=1`
    );
    closeSideBar();
  }
  if (this.value == "") {
    test(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=6913ffc952f25e36b31a905375c2bdad`
    );
    closeSideBar();
  }
});

// ! =============================================================  Start Contact  ======================================================= !

// $(".contact").on("click", () => {
//   closeSideBar();
// });

// let inputs = document.querySelectorAll(" #contact input");
// for (let i = 0; i < inputs.length; i++) {
//   inputs[i].addEventListener("input", function () {
//     validOrNot();
//   });
// }

// validOrNot();
// function validOrNot() {
//   if (
//     validName() &&
//     validEmail() &&
//     validPhone() &&
//     validAge() &&
//     validPassword() &&
//     validRepassword()
//   ) {
//     !submitTrack();
//     $("#submitBtn").addClass("me-auto");
//     $("#submitBtn").css("cursor", "pointer");
//   } else {
//     $("#submitBtn").css("cursor", "not-allowed");
//     submitTrack();
//   }
// }

// $("#submitBtn").on("click", () => {
//   $("#submitBtn").addClass("me-auto");
//   for (let i = 0; i < inputs.length; i++) {
//     inputs[i].value = "";
//     inputs[i].classList.remove("is-valid");
//   }
//   Toastify({
//     text: "Registration successful",
//     duration: 2000,
//     gravity: "top",
//     position: "right",
//     style: {
//       background: "linear-gradient(to right, #00b09b, #96c93d)",
//       width: "fit-content",
//       padding: "10px",
//       position: "fixed",
//       right: "30px",
//       top: "30px",
//       transition: "0.5s",
//     },
//   }).showToast();
//   validOrNot();
// });

// ! Move Btn If Not Valid  Function
// let isLeft = true;
// $("#submitBtn").addClass("me-auto");
// function submitTrack() {
//   $("#submitBtn").on("mouseenter", () => {
//     if (isLeft) {
//       $("#submitBtn").removeClass("me-auto");
//       $("#submitBtn").addClass("ms-auto");
//       isLeft = false;
//     } else {
//       $("#submitBtn").removeClass("ms-auto");
//       $("#submitBtn").addClass("me-auto");
//       isLeft = true;
//     }
//   });
// }

// ! Valid Name Function
// function validName() {
//   const regex = /^[A-Za-z]{3,}$/;
//   let txt = $("#userName").val();
//   if (regex.test(txt)) {
//     $("#userName").addClass("is-valid");
//     $("#userName").removeClass("is-invalid");
//     $("#userName").css("border-bottom-color", "#e7b00c");
//     return true;
//   } else {
//     $("#userName").removeClass("is-valid");
//     $("#userName").addClass("is-invalid");
//     $("#userName").css("border-bottom-color", "red");
//     return false;
//   }
// }

// ! Valid Email Function
// function validEmail() {
//   const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
//   let txt = $("#userEmail").val();
//   if (regex.test(txt)) {
//     $("#userEmail").addClass("is-valid");
//     $("#userEmail").removeClass("is-invalid");
//     $("#userEmail").css("border-bottom-color", "#e7b00c");

//     return true;
//   } else {
//     $("#userEmail").removeClass("is-valid");
//     $("#userEmail").addClass("is-invalid");
//     $("#userEmail").css("border-bottom-color", "red");

//     return false;
//   }
// }

// ! Valid Phone Function
// function validPhone() {
//   const regex = /^01[0125][0-9]{8}$/;
//   let txt = $("#userPhone").val();
//   if (regex.test(txt)) {
//     $("#userPhone").addClass("is-valid");
//     $("#userPhone").removeClass("is-invalid");
//     $("#userPhone").css("border-bottom-color", "#e7b00c");

//     return true;
//   } else {
//     $("#userPhone").removeClass("is-valid");
//     $("#userPhone").addClass("is-invalid");
//     $("#userPhone").css("border-bottom-color", "red");
//     return false;
//   }
// }

// ! Valid Age Function
// function validAge() {
//   const regex = /^(1[6-9]|[2-9][0-9])$/;
//   let txt = $("#userAge").val();
//   if (regex.test(txt)) {
//     $("#userAge").addClass("is-valid");
//     $("#userAge").removeClass("is-invalid");
//     $("#userAge").css("border-bottom-color", "#e7b00c");
//     return true;
//   } else {
//     $("#userAge").removeClass("is-valid");
//     $("#userAge").addClass("is-invalid");
//     $("#userAge").css("border-bottom-color", "red");
//     return false;
//   }
// }

let correctPassword;
// ! Valid Password Function
// function validPassword() {
//   const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//   let txt = $("#userPassword").val();
//   if (regex.test(txt)) {
//     $("#userPassword").addClass("is-valid");
//     $("#userPassword").removeClass("is-invalid");
//     $("#userPassword").css("border-bottom-color", "#e7b00c");
//     correctPassword = txt;
//     return true;
//   } else {
//     $("#userPassword").removeClass("is-valid");
//     $("#userPassword").addClass("is-invalid");
//     $("#userPassword").css("border-bottom-color", "red");
//     return false;
//   }
// }

// $("#userPassword").on("focus", () => {
//   console.log("hey");
//   $(".seen").css({ transform: " translateY(-30px) ", opacity: " 1 " });
//   $(".seen .see").on("mousedown", () => {
//     $(".seen .see").addClass("d-none");
//     $(".seen .unsee").removeClass("d-none");
//     $("#userPassword").attr("type", "text");
//   });

//   $(".seen .unsee").on("mousedown", () => {
//     $(".seen .unsee").addClass("d-none");
//     $(".seen .see").removeClass("d-none");
//     $("#userPassword").attr("type", "password");
//   });
// });

// $("#userPassword").on("blur", () => {
//   console.log("bye");
//   $(".seen").css({ transform: " translateY(25px) ", opacity: " 0 " });
// });

// ! Valid Password Function
// function validRepassword() {
//   let txt = $("#Repassword").val();
//   if (txt === correctPassword) {
//     $("#Repassword").addClass("is-valid");
//     $("#Repassword").removeClass("is-invalid");
//     $("#Repassword").css("border-bottom-color", "#e7b00c");
//     return true;
//   } else {
//     $("#Repassword").removeClass("is-valid");
//     $("#Repassword").addClass("is-invalid");
//     $("#Repassword").css("border-bottom-color", "red");
//     return false;
//   }
// }

// ! =============================================================  End Contact  ======================================================= !
