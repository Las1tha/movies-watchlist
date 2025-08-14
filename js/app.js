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
  const statusRadios = document.getElementByName('status');
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
  
  
  