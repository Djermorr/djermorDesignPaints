import './styles/reset.css'
import './styles/style.css'
  // core version + navigation, pagination modules:
    import Swiper, { Navigation, Pagination } from 'swiper';
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  // init Swiper:
  const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
const progressContainer = document.querySelector(".progressContainer");
const progressbar = document.querySelector(".progress");

const changeProgress = (progress) => {
  progressbar.style.width = `${progress}%`;
};

const address = document.querySelector("#address");

/* change progress after 1 second (only for showcase) */
setTimeout(() => changeProgress(22), 450);
setTimeout(() => changeProgress(45), 900);
setTimeout(() => changeProgress(86), 1350);
setTimeout(() => changeProgress(98), 1700);
setTimeout(() => changeProgress(100), 2000);

async function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/4.613841,51.272509.json?access_token=pk.eyJ1Ijoicm9iYmV2ZCIsImEiOiJjbGVta2RlbzgwbWFiM3dzNHJwZnZpd29qIn0.3dIqb4NcEPAU7s0hW0NC5w`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const addressData = data.features[0].place_name;
    address.innerHTML = `${addressData}`;
    console.log(addressData)
    progressContainer.style.display = "none"; // hide progress bar
  } catch (error) {
    console.log(error);
  }
}

navigator.geolocation.getCurrentPosition(success);