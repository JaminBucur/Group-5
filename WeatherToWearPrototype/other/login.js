// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('login-form');
//     const loginMessage = document.getElementById('login-message');

//     loginForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         fetch('/home/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ Username: username, Password: password })
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.status === 'success') {
//                 loginMessage.style.color = 'green';
//                 loginMessage.textContent = 'Logged in';
//                 // Optionally redirect the user to another page after successful login
//                 // window.location.href = '/home'; // Change '/home' to the desired page URL
//             } else {
//                 loginMessage.style.color = 'red';
//                 loginMessage.textContent = 'Incorrect username or password';
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             loginMessage.style.color = 'red';
//             loginMessage.textContent = 'Error occurred while logging in';
//         });
//     });
// });

