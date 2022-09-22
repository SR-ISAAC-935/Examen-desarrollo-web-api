const view = 'https://api.themoviedb.org/3/discover/movie?api_key=d6889f19e27d5abe0299ed736d15f60c&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0&language=es-Es';
const tv='https://api.themoviedb.org/3/discover/tv?api_key=d6889f19e27d5abe0299ed736d15f60c&sort_by=popularity.desc&language=es-Es';
const IMG_URL='https://image.tmdb.org/t/p/w500'
const generos = 'https://api.themoviedb.org/3/genre/tv/list?api_key=d6889f19e27d5abe0299ed736d15f60c&language=es-Es';
const main = document.getElementById('main');
const chose= document.getElementById('yolo');
getMovie(view);
//getTv(tv);
getCategories(generos);


function getMovie(url) {
  fetch(url).then(res => res.json()).then(data => 
    {
      
      showMovies(data.results);
    }
    );
}
function getTv(url) {
  fetch(url).then(res => res.json()).then(data => 
    {
      
      showtvs(data.results);
    }
    );
}
function getCategories(url) {
    fetch(url).then(res => res.json()).then(data => 
      {
       console.log(data.genres);
        categories(data.genres);
      }
      );
  }


  document.getElementById('btnpeli').onclick = function() {
    getMovie(view);
  }
  document.getElementById('btnTVSeries').onclick = function() {
    getTv(tv);
  }

function categories(data)
{
      select = document.getElementById("yolo");
      for(i of data){
          option = document.createElement("option");
          option.value = i.id;
          option.text = i.name;
          select.options.add(option);
      }
    }
  const Select= document.getElementById("yolo")
  Select.addEventListener("click",()=>{console.log("test"); Dircategory()})
    
  async  function  Dircategory(){  
    const chosenoptions=await document.getElementById("yolo").options[Select.selectedIndex].value;
    console.log(chosenoptions);
    var GenresMovies= view+'&with_genres='+chosenoptions;
    getMovie(GenresMovies);
  }
function showMovies(data) 
{
    main.innerHTML='';

    data.forEach(movie =>{
        const {title, poster_path, vote_average, release_date } = movie;
        const movieElements = document.createElement('div');
        movieElements.classList.add('movie');
        movieElements.innerHTML = `
      <img src="${IMG_URL+poster_path}" alt="${title}">

      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
  
      <div class="overview">

        <h3>${release_date}<h3>

      </div>
    </div>
    `
    main.appendChild(movieElements);
      })
  }

  function showtvs(data) 
{
    main.innerHTML='';

    data.forEach(movie =>{
        const {name, poster_path, vote_average, original_name } = movie;
        const movieElements = document.createElement('div');
        movieElements.classList.add('movie');
        movieElements.innerHTML = `
      <img src="${IMG_URL+poster_path}" alt="${name}">

      <div class="movie-info">
        <h3>${name}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
  
      <div class="overview">

        <h3>${original_name}<h3>

      </div>
    </div>
    `
    main.appendChild(movieElements);
      })
  }

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  }
  else if (vote >= 5) {
    return 'pink';
  }
  else {
    return 'red';
  }
}