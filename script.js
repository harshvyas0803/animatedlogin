document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector(".bn5");
    const logo = document.querySelector(".logo img");
    const loginLeft = document.querySelector(".left-section");
    const loginRight = document.querySelector(".right-section");

    
    const newImage = document.createElement('img');
    newImage.src = "/right-content.png";  
    newImage.classList.add('new-image');  
    newImage.style.display = "none"; // Hide it  
    newImage.style.position = "absolute"; // Ensure absolute positioning  
    newImage.style.top = "50%";
    newImage.style.borderRadius = "20px";
    newImage.style.left = "50%";
    newImage.style.transform = "translate(-50%, -50%)"; // Center the image
    document.body.appendChild(newImage); // Append 

    // Function to reset page  
    function resetPage() {
        usernameInput.value = "";
        passwordInput.value = "";
        gsap.to(loginLeft, { opacity: 1, y: 0, ease: "power1.out" });
        gsap.to(loginRight, { opacity: 1, scale: 1, ease: "power1.out" });
        gsap.set(logo, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(newImage, { display: "none" }); // Hide the new image again
    }

    //  welcome toast
    function showWelcomeToast() {
        Toastify({
            text: "Welcome to Celebrare!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            borderRadius: "500px",
            stopOnFocus: true,
            className: "custom-toast"
        }).showToast();
    }

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (usernameInput.value.trim() === "" || passwordInput.value.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }

        loginButton.textContent = "Logging in...";
        loginButton.style.pointerEvents = "none";

      
        const rightRect = loginRight.getBoundingClientRect();
        newImage.style.width = `${rightRect.width}px`;
        newImage.style.height = `${rightRect.height}px`;

        const centerXLogo = (window.innerWidth / 2) - (logo.offsetWidth / 2);
        const centerYLogo = (window.innerHeight / 2) - (logo.offsetHeight / 2);

        const timeline = gsap.timeline();

     
        timeline.to(loginLeft, { duration: 1, opacity: 0, y: 50, ease: "power1.out" }, 0)
            .to(loginRight, { duration: 1, scale: 1.1, ease: "power1.out" }, 0)
            .to(loginRight, { duration: 1, opacity: 0, scale: 0, ease: "power1.out" }, ">");

        
        timeline.to(logo, {
            duration: 1.5,
            x: centerXLogo - logo.offsetLeft,
            y: centerYLogo - logo.offsetTop,
            rotation: 360,
            ease: "power2.out"
        }, ">")
        .to(logo, { duration: 2, opacity: 0, ease: "power1.out" }, ">+2"); // Hold for 2 seconds then fade out

       
        timeline.set(newImage, { display: "block", scale: 0, opacity: 0 })
            .to(newImage, { duration: 1, scale: 1, opacity: 1, ease: "power1.out" }, ">");

        //   Logo fades in again and moves back, new image slides to the right
        timeline.to(logo, { duration: 1, opacity: 1, scale: 1, ease: "power1.out" }, ">")
            .to(logo, {
                duration: 1,
                x: 0, y: 0,
                ease: "power1.out"
            }, ">")
            .to(newImage, {
                duration: 1.5,
                x: 1, 
                ease: "power1.out"
            }, ">");

        //   Show welcome toast
        timeline.call(showWelcomeToast, null, ">");

        //  Fade left section back in
        timeline.to(loginLeft, { duration: 1.5, opacity: 1, y: 0, ease: "power1.out" }, ">");

        //   7: Call resetPage to clear inputs after all animations are done
        timeline.call(resetPage, null, ">");

        setTimeout(() => {
            loginButton.textContent = "Login";
            loginButton.style.pointerEvents = "auto";
        }, 13000);  
    });
});
