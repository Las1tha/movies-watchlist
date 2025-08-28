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
const database = firebase.database();

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

const stars = document.querySelectorAll('.rating-stars i');

let isEditing=false;
let currentMovieId=null;

//initialize the app
function init() {
  movieForm.addEventListener('submit', handleFormSubmit);
  loadMovies();

  stars.forEach(star => {
    star.addEventListener('click', handleStarClick);
    star.addEventListener('mouseover', handleStarHover);
    star.addEventListener('mouseout', handleStarOut);
  });
}

//handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const year = yearInput.value;
  const director = directorInput.value.trim();
  const genre = genreInput.value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const rating = ratingInput.value;
  const notes = notesInput.value.trim();

  if (!title) {
    alert('Please enter a movie title');
    return;
  }
  const movieData = {
    title,
    year: year || null,
    director: director || null,
    genre,
    status,
    rating: rating ? parseInt(rating) : 0,
    notes: notes || null,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,

  };

  database.ref('movies').push(movieData)
    .then(() => {
      showAlert('Movie added successfully', 'success');
      movieForm.reset();
    })
    .catch(error => {
      showAlert('Error in Adding movie' + error.message, 'error');
    });
}

function loadMovies() {
  database.ref('movies').on('value', (snapshot) => {
    const movies = [];
    let watchlist = 0;
    let watched = 0;

    snapshot.forEach((childSnapshot) => {
      const movie = {
        id: childSnapshot.key,
        ...childSnapshot.val()
      };
      movies.push(movie);

      if (movie.status === 'watchlist') {
        watchlist++;
      } else if (movie.status === 'watched') {
        watched++;
      }
    })
    totalMovies.textContent = movies.length;
    watchlistCount.textContent = watchlist;
    watchedCount.textContent = watched;

    displayMovies(movies);
  });
}

function displayMovies(movies) {
  if (movies.length === 0) {
    moviesList.innerHTML = `
       <div class ="empty-state">
       <i class="fas fa-film"></i>
       <h3> No movies found</h3>
       <p>Add your first movie to get started</p>
       </div>
       `;
    return;
  }
  moviesList.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.dataset.id = movie.id;

    // create star rating list
    let starHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= movie.rating) {
        starHtml += '<i class="fas fa-star"></i>';
      } else {
        starHtml += '<i class="far fa-star"></i>';
      }
    }


    movieCard.innerHTML = `
      <div class="movie-poster" style="background-image: url('../assets/poster.jpg')">
          <span class="movie-status ${movie.status}">
          ${movie.status}
          </span>
      
      </div>
      <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <div class="movie-meta">
      <span>${movie.year}</span>
      <span>${movie.genre}</span>
      </div>
      <div class = "movie-rating">${starHtml}</div>
      ${movie.notes ? `<p class="movie-notes">${movie.notes}</p>` : ''}
      </div>
      <div class="movie-actions">
       <button class="btn-edit" data-id="${movie.id}">
        <i class="fas fa-edit"></i>
       </button>
       <button class="btn-delete" data-id="${movie.id}">
        <i class="fas fa-trash"></i>
       </button>
      </div>
      `;
    moviesList.appendChild(movieCard);
  });
  document.querySelectorAll('.btn-edit').forEach(btn =>{
    btn.addEventListener('click',haddleEditMovie);  
    });
  document.querySelectorAll('.btn-delete').forEach(btn =>{
    btn.addEventListener('click',haddleDeleteMovie);  
    });
}
function haddleEditMovie(e){
  const movieId=e.currentTarget.dataset.id;

  database.ref(`movies/${movieId}`).once('value')
  .then(snapshot =>{
        const movie=snapshot.val();

        movieIdInput.value=movieId;
        titleInput.value=movie.title||'';
        yearInput.value=movie.year||'';
        directorInput.value=movie.director||'';
        genreInput.value=movie.genre||'Action';   

        document.querySelector(`input[name="status"][value="${movie.status}"]`).checked=true;
        //set rating
        ratingInput.value = movie.rating|| 0;
        updateStarRating(movie.rating|| 0);

        notesInput.value=movie.notes||'';

        saveBtn.textContent='Update Movie';
  })
  .catch(error =>{
    showAlert('Error Loading movie :' + error.message, 'error');
  });
}
function haddleDeleteMovie(e){
  if(!confirm('Are you sure want to delete this movie?')){
    return;
  }
  const movieId=e.currentTarget.dataset.id;
   database.ref(`movies/${movieId}`).remove()
   .then(() => {
    showAlert('Movie deleted successfully!', 'success');
   })
   .catch(error => {
    showAlert('Error deleting movie:' + error.message, 'error');
   });
}

//helping function
function showAlert(message, type) {
  alert(`${type.toUpperCase()}: ${message}`)

}

//star rating functionalities
function handleStarClick(e) {
  const rating = parseInt(e.target.dataset.rating);
  ratingInput.value = rating;
  updateStarRating(rating);
}

function handleStarHover(e) {
  const rating = parseInt(e.target.dataset.rating);
  hilightStars(rating);
}
function handleStarOut() {
  const currentRating = parseInt(ratingInput.value);
  hilightStars(currentRating);
}

function hilightStars(cont) {
  stars.forEach((star, index) => {
    if (index < cont) {
      star.classList.add('active');

    } else {
      star.classList.remove('active');

    }
  });

}
function updateStarRating(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
      star.classList.remove('far');
      star.classList.add('fas');
    } else {
      star.classList.remove('active');
      star.classList.remove('fas');
      star.classList.add('far');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
