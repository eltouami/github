(function () {
    "use strict";
    console.log("reading js");

    // Get the form and submit button
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.submit-btn');

    // Add event listener to submit button
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Capture all form values
        const flightType = document.querySelector('#flight-type').value;
        const numberOfTravelers = document.querySelector('#number').value;
        const seatType = document.querySelector('#seat-type').value;
        const departureCity = document.querySelector('#departure-city').value;
        const destinationCity = document.querySelector('#destination-city').value;
        const departureDate = document.querySelector('#departure-date').value;
        const arrivalDate = document.querySelector('#arrival-date').value;
        
        // Capture Mad Libs inputs
        const adjective1 = document.querySelector('#adjective1').value; // Feeling
        const noun1 = document.querySelector('#noun1').value; // Security item
        const famousPerson = document.querySelector('#famous-person').value;
        const food = document.querySelector('#food').value;
        const liquid = document.querySelector('#liquid').value;
        const adjective2 = document.querySelector('#adjective2').value; // Descriptive
        const adjective3 = document.querySelector('#adjective3').value; // Vibe
        const pluralNoun = document.querySelector('#plural-noun').value; // Sights

        // check if all required fields are filled
        if (!flightType || !numberOfTravelers || !seatType || !departureCity || !destinationCity || 
            !departureDate || !arrivalDate || !adjective1 || !noun1 || !famousPerson || 
            !food || !liquid || !adjective2 || !adjective3 || !pluralNoun) {
            alert("Please fill out all fields before printing your ticket!");
            return;
        }

        // Create the Mad Libs story
        const madLibsStory = `On ${departureDate}, you arrived at the terminal in ${departureCity} feeling incredibly ${adjective1}. Your trip got off to a rocky start when the security officer asked you to step aside because they found ${noun1} ${noun1} inside your carry-on bag.

        Once you finally boarded, you were shocked to find that you were sitting right next to ${famousPerson}. The flight was quite an experience; the cabin crew served you a tray of steaming ${food} washed down with a cold glass of ${liquid}. Just as you were finishing your meal, the pilot made a very ${adjective2} announcement about the tailwinds pushing you toward your destination.

        You have big plans for when you land in ${destinationCity}! You've heard the atmosphere there is totally ${adjective3}. You plan on spending your time visiting all the local ${pluralNoun}. By the time you fly back on ${arrivalDate}, you'll have enough memories to last a lifetime.`;

        // Create the boarding pass overlay
        createBoardingPass(madLibsStory, departureCity, destinationCity, departureDate, seatType);
    });

    function createBoardingPass(story, from, to, date, seatClass) {
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'boarding-pass-overlay hidden';
        
        // Create boarding pass card
        const boardingPass = document.createElement('div');
        boardingPass.className = 'boarding-pass';
        
        // Generated random flight number and gate, got help from friend for math part
        const flightNumber = 'FL' + Math.floor(Math.random() * 9000 + 1000);
        const gate = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(Math.random() * 50 + 1);
        const seat = Math.floor(Math.random() * 30 + 1) + String.fromCharCode(65 + Math.floor(Math.random() * 6));
        
        boardingPass.innerHTML = `
            <div class="boarding-pass-header">
                <h2>Boarding Pass</h2>
                <div class="boarding-pass-title">BOARDING PASS</div>
            </div>
            <div class="boarding-pass-content">
                <div class="boarding-pass-left">
                    <div class="barcode-placeholder"></div>
                    <div class="barcode-placeholder"></div>
                    <div class="barcode-placeholder"></div>
                    <div class="barcode-placeholder"></div>
                    <div class="barcode-placeholder"></div>
                    <div class="barcode-placeholder"></div>
                    <div class="mad-libs-text">
                        ${story}
                    </div>
                </div>
                <div class="boarding-pass-divider"></div>
                <div class="boarding-pass-right">
                    <div class="qr-code"></div>
                    <div class="flight-details">
                        <p><strong>From:</strong> ${from}</p>
                        <p><strong>To:</strong> ${to}</p>
                        <p><strong>Date:</strong> ${date}</p>
                        <p><strong>Flight:</strong> ${flightNumber}</p>
                        <p><strong>Gate:</strong> ${gate}</p>
                        <p><strong>Seat:</strong> ${seat}</p>
                        <p><strong>Class:</strong> ${seatClass}</p>
                    </div>
                </div>
            </div>
            <button class="close-btn">Close</button>
        `;
        
        overlay.appendChild(boardingPass);
        document.body.appendChild(overlay);
        
        // Show the overlay with a slight delay for animation
        setTimeout(() => {
            overlay.classList.remove('hidden');
            overlay.classList.add('visible');
        }, 10);
        
        // Add close button functionality
        const closeBtn = overlay.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('visible');
            overlay.classList.add('hidden');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        });
        
        // Close on overlay click (outside boarding pass)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeBtn.click();
            }
        });
    }

})();