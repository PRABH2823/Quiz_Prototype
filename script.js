const uploadAvatar = document.getElementById('uploadAvatar');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userDescription = document.getElementById('userDescription');
const saveProfile = document.getElementById('saveProfile');
const changePassword = document.getElementById('changePassword');
const passwordPopup = document.getElementById('passwordPopup');
const closePopup = document.querySelector('.close');
const submitPassword = document.getElementById('submitPassword');
const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');

const hardcodedPassword = "admin123";

document.addEventListener('DOMContentLoaded', () => {
    userAvatar.src = localStorage.getItem('userAvatar') || userAvatar.src;
    userName.value = localStorage.getItem('userName') || "";
    userEmail.value = localStorage.getItem('userEmail') || "";
    userDescription.value = localStorage.getItem('userDescription') || "";
});

uploadAvatar.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        userAvatar.src = e.target.result;
        localStorage.setItem('userAvatar', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
});

saveProfile.addEventListener('click', () => {
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('userEmail', userEmail.value);
    localStorage.setItem('userDescription', userDescription.value);
    alert('Profile saved successfully!');
});

changePassword.addEventListener('click', () => passwordPopup.style.display = 'block');
closePopup.addEventListener('click', () => passwordPopup.style.display = 'none');

submitPassword.addEventListener('click', () => {
    if (oldPassword.value === hardcodedPassword) {
        alert('Password changed successfully!');
        passwordPopup.style.display = 'none';
    } else {
        alert('Incorrect old password!');
    }
});

document.getElementById('changePassword').addEventListener('click', () => {
  document.getElementById('passwordPopup').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('passwordPopup').style.display = 'none';
});

document.getElementById('cancelPassword').addEventListener('click', () => {
  document.getElementById('passwordPopup').style.display = 'none';
});

