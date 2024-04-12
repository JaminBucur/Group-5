// Global variable to store the current closet ID
var currentClosetId = null;

// Function to handle closet selection
function selectCloset(closetId) {
    currentClosetId = closetId;
    console.log('Selected closet:', closetId);
}

// Function to handle closet creation
document.querySelector('#create-closet-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get closet name from input field
    var closetName = document.getElementById('closet-name').value;

    // Send a POST request to create a new closet
    fetch('/closet/createCloset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: closetName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create closet');
        }
        return response.json();
    })
    .then(data => {
        console.log('Closet created:', data);
        fetchClosetsAndDisplay(); // Refresh closet list
    })
    .catch(error => {
        console.error('Error creating closet:', error);
        // Handle error
    });
});

// Function to handle clothing creation
document.querySelector('#add-clothing-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get clothing details from input fields
    var clothingName = document.getElementById('clothing-name').value;
    var clothingType = document.getElementById('clothing-type').value;
    var heatIndex = document.getElementById('heat-index').value;

    // Check if a closet has been selected
    if (!currentClosetId) {
        console.error('Please select a closet.');
        return;
    }

    // Send a POST request to add the clothing
    fetch('/closet/addClothing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: clothingName,
            type: clothingType,
            heatIndex: heatIndex,
            closetId: currentClosetId
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add clothing');
        }
        return response.json();
    })
    .then(data => {
        console.log('Clothing added:', data);
    })
    .catch(error => {
        console.error('Error adding clothing:', error);
    });
});

// Fetch and display closets when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchClosetsAndDisplay();
});




// Function to fetch and display closets
function fetchClosetsAndDisplay() {
    fetch('/closet/getClosets') // Assuming you have an endpoint to retrieve closets
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch closets');
            }
            return response.json();
        })
        .then(data => {
            console.log('Closets fetched:', data); // Verify data received from server
            // Display closets on the HTML page
            displayClosets(data); // Pass the retrieved closets to the displayClosets function
        })
        .catch(error => {
            console.error('Error fetching closets:', error);
            // Handle error
        });
}

// Function to display closets
function displayClosets(closets) {
    var closetList = document.getElementById('closet-list');
    closetList.innerHTML = '';

    closets.forEach(function (closet) {
        var li = document.createElement('li');
        li.className = 'list-group-item mb-4';

        // Create closet name and buttons container
        var closetHeader = document.createElement('div');
        closetHeader.className = 'd-flex justify-content-between align-items-center';

        // Create closet name element
        var closetNameElement = document.createElement('h3');
        closetNameElement.textContent = closet.name;

        // Create buttons container
        var buttonsContainer = document.createElement('div');

        // Create button to delete the closet
        var deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete Closet';
        deleteButton.addEventListener('click', function () {
            var confirmDelete = confirm("Are you sure you want to delete this closet?");
            if (confirmDelete) {
                // TO:DO
            }
        });

        // Create button to add clothing
        var addClothingButton = document.createElement('button');
        addClothingButton.className = 'btn btn-success';
        addClothingButton.textContent = 'Add Clothing';
        addClothingButton.setAttribute('data-bs-toggle', 'modal');
        addClothingButton.setAttribute('data-bs-target', '#addClothingModal');

        // Create button to toggle clothing boxes visibility
        var toggleClosetButton = document.createElement('button');
        toggleClosetButton.className = 'btn btn-primary';
        toggleClosetButton.textContent = ''; // Display "O" as button content
        toggleClosetButton.addEventListener('click', function () {
            var clothingContainers = li.querySelectorAll('.clothing-container');
            clothingContainers.forEach(function (container) {
                container.classList.toggle('d-none'); // Toggle visibility for each container
            });
        });

        // Append buttons to buttons container
        buttonsContainer.appendChild(addClothingButton);
        buttonsContainer.appendChild(deleteButton);
        buttonsContainer.appendChild(toggleClosetButton); // Append the toggle button

        // Append elements to closet header
        closetHeader.appendChild(closetNameElement);
        closetHeader.appendChild(buttonsContainer);

        // Append closet header to list item
        li.appendChild(closetHeader);

        // Create container for clothing items
        var clothingContainer = document.createElement('div');
        clothingContainer.className = 'clothing-container row mt-3'; // Initially hide clothing boxes
        clothingContainer.style.width = '100%'; // Ensure boxes occupy the entire width

        // Append clothing container to list item
        li.appendChild(clothingContainer);

        closetList.appendChild(li);
    });
}

// Add event listener to the "Add Clothing" button in the modal
document.getElementById('confirm-add-clothing-btn').addEventListener('click', function () {
    var clothingName = document.getElementById('clothing-name').value;
    var clothingType = document.getElementById('clothing-type').value;
    var heatIndex = document.getElementById('heat-index').value;
    currentDate = new Date().toJSON().slice(0, 10);

    // Create container for clothing item
    var clothingContainer = document.createElement('div');
    clothingContainer.className = 'card mb-3';
    clothingContainer.style.maxWidth = '18rem';

    // Create card body
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex justify-content-between align-items-center';

    // Add clothing details to card body
    var clothingDetails = document.createElement('p');
    clothingDetails.className = 'card-text';
    clothingDetails.innerHTML = `
        <strong>Name:</strong> ${clothingName}<br>
        <strong>Type:</strong> ${clothingType}<br>
        <strong>Heat Index:</strong> ${heatIndex} <br>
        <strong>Date Added:</strong> ${currentDate}
    `;

    // Create delete button for clothing item
    var deleteClothingButton = document.createElement('button');
    deleteClothingButton.className = 'btn btn-danger';
    deleteClothingButton.innerHTML = '<i class="bi bi-x"></i>'; // Use Bootstrap Icon for "x"
    deleteClothingButton.addEventListener('click', function () {
        var confirmDelete = confirm("Are you sure you want to delete this clothing?");
        if (confirmDelete) {
            clothingContainer.remove(); // Remove the clothing box when the delete button is clicked
        }
    });

    // Append clothing details and delete button to card body
    cardBody.appendChild(clothingDetails);
    cardBody.appendChild(deleteClothingButton);

    // Append card body to clothing container
    clothingContainer.appendChild(cardBody);

    // Append clothing item to closet list
    var closetList = document.getElementById('closet-list');
    var lastCloset = closetList.lastChild;
    var clothingList = lastCloset.querySelector('.clothing-container');
    clothingList.appendChild(clothingContainer);

    // Close the modal
    var modal = bootstrap.Modal.getInstance(document.getElementById('addClothingModal'));
    modal.hide();
});

