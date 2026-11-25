
/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});

// Close menu after selecting a section

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================
   MENU CATEGORY FILTER
===================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to selected button

        button.classList.add("active");

        // Get selected category

        const selectedCategory = button.dataset.category;

        // Filter food cards

        foodCards.forEach(card => {

            const foodCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === foodCategory
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


/* =====================================
   TABLE RESERVATION FORM
===================================== */

const bookingForm = document.getElementById("bookingForm");

const bookingMessage = document.getElementById("bookingMessage");

const dateInput = document.getElementById("date");

// Set today's date as minimum booking date

function getLocalDate() {

    const today = new Date();

    const offset = today.getTimezoneOffset();

    return new Date(today.getTime() - offset * 60000)
        .toISOString()
        .split("T")[0];

}

dateInput.min = getLocalDate();


// Handle reservation form

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get customer details

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const date = dateInput.value;

    const time = document.getElementById("time").value;

    const guests = document.getElementById("guests").value;

    const requests = document.getElementById("requests").value.trim();


    // Validate date

    if (date < getLocalDate()) {

        bookingMessage.textContent =
            "Please select a valid date.";

        return;

    }


    // Validate restaurant opening hours

    if (time < "11:00" || time > "23:00") {

        bookingMessage.textContent =
            "Our restaurant is open between 11 AM and 11 PM.";

        return;

    }


    // Generate reservation ID

    const bookingId =
        "TT" + Date.now().toString().slice(-6);


    // Create booking object

    const booking = {

        id: bookingId,

        name: name,

        email: email,

        date: date,

        time: time,

        guests: guests,

        requests: requests

    };


    // Save booking in browser Local Storage

    let bookings = JSON.parse(
        localStorage.getItem("tadkaBookings")
    ) || [];

    bookings.push(booking);

    localStorage.setItem(
        "tadkaBookings",
        JSON.stringify(bookings)
    );


    // Display confirmation

    bookingMessage.textContent =
        `Thank you, ${name}! Your booking request is saved. Reservation ID: ${bookingId}.`;

    bookingMessage.style.color = "#173D2C";


    // Reset form

    bookingForm.reset();

    dateInput.min = getLocalDate();

});


/* =====================================
   FOOTER COPYRIGHT YEAR
===================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();

