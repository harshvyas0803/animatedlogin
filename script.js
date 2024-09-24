document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector(".bn5");
    const logo = document.querySelector(".logo img");
    const loginLeft = document.querySelector(".left-section");
    const loginRight = document.querySelector(".right-section");
    const enrollButton = document.querySelector(".bn39");
    const enrollTooltip = document.querySelector(".enroll-tooltip");

    // When the mouse hovers over the enroll button, show the tooltip
    enrollButton.addEventListener("mouseover", function () {
        enrollTooltip.style.display = "block"; // Show the tooltip
    });

    // When the mouse leaves the enroll button, hide the tooltip
    enrollButton.addEventListener("mouseout", function () {
        enrollTooltip.style.display = "none"; // Hide the tooltip
    });

    // This function shows a welcome message after logging in
    function showWelcomeToast() {
        Toastify({
            text: "Welcome to Celebrare!",
            duration: 3000, // How long the toast shows up
            gravity: "top", // Where the toast appears
            position: "center", // Center it up
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Nice gradient background
            borderRadius: "500px", // Round corners
            stopOnFocus: true, // Keeps the toast on hover
            className: "custom-toast"
        }).showToast();
    }

    // Reset the form and some elements when needed
    function resetPage() {
        // Clear the input fields
        usernameInput.value = "";
        passwordInput.value = "";

        // Bring back everything smoothly
        gsap.to(loginLeft, { duration: 1, opacity: 1, y: 0, ease: "power1.out" });
        gsap.to(loginRight, { duration: 1, scale: 1, opacity: 1, ease: "power1.out" });
        gsap.set(logo, { opacity: 1, x: 0, y: 0, scale: 1 }); // Make sure logo is back to normal
    }

    // Make sure the logo is fully visible at the start
    gsap.set(logo, { opacity: 1 });

    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // Stop form submission

        // Check if inputs are filled, otherwise alert the user
        if (usernameInput.value.trim() === "" || passwordInput.value.trim() === "") {
            alert("Please fill in all fields."); // Simple alert for empty fields
            return;
        }

        // Change the button text to show we're logging in
        loginButton.textContent = "Logging in...";
        loginButton.style.pointerEvents = "none"; // Disable button to avoid multiple clicks

        const centerXLogo = (window.innerWidth / 2) - (logo.offsetWidth / 2);
        const centerYLogo = (window.innerHeight / 2) - (logo.offsetHeight / 2);

        const timeline = gsap.timeline();

        // Step 1: Fade out the left side, enlarge the right side and fade it out
        timeline.to(loginLeft, { 
            duration: 1.5, 
            opacity: 0, 
            y: 50, // Fade down
            ease: "power1.out" 
        }, 0) // Start immediately
        .to(loginRight, {
            duration: 1.5,
            scale: 1.1, // Make the right side a bit bigger
            ease: "power1.out"
        }, 0)  
        .to(loginRight, {
            duration: 1.5,
            opacity: 0,
            scale: 0,  // Fade it out completely
            ease: "power1.out"
        }, ">");  

        // Move the logo to the center with a spin and hold it there
        timeline.to(logo, {
            duration: 1.5,
            x: centerXLogo - logo.offsetLeft,
            y: centerYLogo - logo.offsetTop,
            rotation: 360, // Spin it
            ease: "power2.out"
        }, 0)
        .to(logo, {
            duration: 2, // Keep it here for 2 seconds
        }, ">");

        // Step 3: Make the right section pop from the center
        timeline.set(loginRight, { 
            scale: 0, 
            opacity: 0, 
            x: window.innerWidth / 2, // Start at center
            y: window.innerHeight / 2 // Start at center
        }) // Reset it

        .to(loginRight, {
            duration: 1,
            scale: 1, // Bring it back to normal size
            opacity: 1,
            x: 0,  // Move it back to its original position
            y: 0,  
            ease: "power1.out"
        }, ">");

        // Step 4: Logo pops from center
        timeline.set(logo, { scale: 0, opacity: 0 }) // Reset logo
        .to(logo, {
            duration: 1,
            scale: 1,
            opacity: 1, // Fade it in
            ease: "power1.out"
        }, ">");

        // Step 5: Show the welcome toast
        timeline.call(showWelcomeToast, null, ">");

        // Step 6: Move everything back to where it belongs
        timeline.to(logo, {
            duration: 1.5,
            x: 0, // Move logo back to original position
            y: 0,
            ease: "power1.out"
        }, ">")
        .to(loginRight, {
            duration: 1.5,
            scale: 1,
            opacity: 1, // Bring the right side back
            ease: "power1.out"
        }, ">");

        // Step 7: Fade back in the left section and reset everything
        timeline.to(loginLeft, {
            duration: 1.5,
            opacity: 1, // Bring left side back
            y: 0, // Reset position
            ease: "power1.out"
        }, ">");

        // Reset the button and clear inputs after a delay
        setTimeout(() => {
            loginButton.textContent = "Login"; // Change text back
            loginButton.style.pointerEvents = "auto"; // Re-enable button
            resetPage(); // Clear the form and reset elements
        }, 13000);  // Wait for everything to finish before resetting
    });
});

