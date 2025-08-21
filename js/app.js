//firebase configerations
const firebaseConfig = {
    apiKey: "AIzaSyA-k2BXoKuS_cr2MTWCigx26KYVhP6VFBM",
    authDomain: "movies-watchlist-9432e.firebaseapp.com",
    databaseURL: "https://movies-watchlist-9432e-default-rtdb.firebaseio.com",
    projectId: "movies-watchlist-9432e",
    storageBucket: "movies-watchlist-9432e.firebasestorage.app",
    messagingSenderId: "322824214797",
    appId: "1:322824214797:web:f05a0262d40ce87fdcf844"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  //Dom Element
  const movieForm = document.getElementById('movieForm');
  const movieIdInput = document.getElementById('movieId');
  const titleInput = document.getElementById('title');
  const yearInput = document.getElementById('year');
  const directorInput = document.getElementById('director');
  const genreInput = document.getElementById('genre');
  const statusRadios = document.getElementsByName('status');
  const ratingInput = document.getElementById('rating');
  const notesInput = document.getElementById('notes');
  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const searchInput = document.getElementById('searchInput');
  const filterStatus = document.getElementById('filterStatus');
  const filterGenre = document.getElementById('filterGenre');
  const moviesList = document.getElementById('moviesList');
  const totalMovies = document.getElementById('totalMovies');
  const watchlistCount = document.getElementById('watchlistCount');
  const watchedCount = document.getElementById('watchedCount');
  
  const stars= document.querySelectorAll('.rating-stars i');

  //initialize the app
  function init(){
    stars.forEach(star =>{
           star.addEventListener('click',handleStarClick);
           star.addEventListener('mouseover',handleStarHover);
           star.addEventListener('mouseout',handleStarOut);
    });
  }
  
  //star rating functionalities
  function handleStarClick(e){
    const rating = parseInt(e.target.dataset.rating);
    ratingInput.value = rating;
    updateStarRating(rating);
  }

  function handleStarHover(e){
      const rating = parseInt(e.target.dataset.rating);
      hilightStars(rating);
  }
  function handleStarOut(){
    const currentRating = parseInt(ratingInput.value);
    hilightStars(currentRating);
  }

  function hilightStars(cont){
    stars.forEach((star,index)=>{
      if(index<cont){
        star.classList.add('active');
        
      }else{
        star.classList.remove('active');
        
      }
    });

  }
  function updateStarRating(rating){
    stars.forEach((star,index)=>{
      if(index<rating){
        star.classList.add('active');
        star.classList.remove('far');
        star.classList.add('fas');
      }else{
        star.classList.remove('active');
        star.classList.remove('fas');
        star.classList.add('far');
      }
    }); 
  }

document.addEventListener('DOMContentLoaded', init);
