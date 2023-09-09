//<<<<<<<<<  navbar  >>>>>>>>>>>>>>>>>// 
var description
var releaseDate
var rate
var title
var stars
var move
trend()
var slide=$('.sideNav').outerWidth();
console.log(slide);

$('.slider').click(function(){
if(($('.nav').css('left'))== '0px')
{
var slide=$('.sideNav').outerWidth();
    $('li').slideToggle(900)
    $('.nav').animate({left:-`${slide}`},500)

$('.change').removeClass('fa-solid fa-xmark');
$('.change').addClass('fa-solid fa-bars')
}

else {
 $('.nav').animate({left:'0rem'},500);
 $('li').slideToggle(900)
$('.change').removeClass('fa-solid fa-bars');
$('.change').addClass('fa-solid fa-xmark');
}
}
)
starsNumber(9.33)

//<<<<<<<<<<<<<<<<<<<<fetching API>>>>>>>>>>//


async function getAPI(x){
var response= await fetch (`https://api.themoviedb.org/3/movie/${x}?api_key=6bcb0e7ece26f6b359ab3e67305a61ef`)
resp=await response.json()
results=resp.results
console.log(results);
await display(results)
}
async function trend(){
  var response= await fetch (`https://api.themoviedb.org/3/trending/all/day?api_key=6bcb0e7ece26f6b359ab3e67305a61ef`)
  resp=await response.json()
  results=resp.results
  console.log(results);
  await display(results)
}


$('.nowPlaying').click(async function(){getAPI('now_playing')})
$('.popular').click(async function(){getAPI('popular')})
$('.topRated').click(async function (){getAPI('top_rated')})
$('.upcoming').click(async function (){getAPI('upcoming')})
$('.trending').click(async function (){trend()})
//<<<<<<<<<<<<<<<<<<display function>>>>>>>>>>//


async function display(x){
var content=''
for(var i=0 ; i< x.length ; i++){
    var movieName= x[i].title
    if(movieName==undefined){
      movieName=x[i].name
    }
    var imageLink=x[i].poster_path
    var image
    if(imageLink==null){
      image='js/not found.png'
      console.log(imageLink);
    }
    else{image='https://image.tmdb.org/t/p/w500'+`${imageLink}`}
    dataCollector(results[i])
    content+=`
    <div class="col-md-4 inner">
        <div onmouseleave='moveRight(this)' class="item rounded-2">
        <img class="itemImg" src="${image}"alt="poster">
        <div class="description d-flex flex-wrap w-100 h-100 ">
          <h2 class="name w-100 text-center">${movieName}</h2>
          <p class='overview w-100'>${description}</p>
        <div class="moreDet">
          <h3 class="date my-3 fw-bolder">Release Date :<span class="fw-lighter">${releaseDate}</span></h3>
          <span class="stars w-100"><i class=${stars}</i></span>
          <h5 class="my-4"><span class="rateNum w-100">${rate}</span></h5>
        </div>
        </div>
        </div>
      </div>`
}
$('.show').html(content)
  


}
function moveRight(){
  move= $('.description').outerWidth()
  if($('.description').css('left')=='0px'){
  $('.description').animate({left:`-${move}px`,opacity:0.1},300,
  async function(){$(this).animate({opacity:'0'},10,
  async function(){
    $(this).animate({left:'0px'},500,
    async function(){$(this).animate({left:'0px',opacity:1})
  }
  )
})
  })
}
}


//<<<<<<<<<< search function >>>>>>>>>>>>>>>//
$('.searchInput').keyup(async function () {
  let search=$('.searchInput').val()
  response= await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=6bcb0e7ece26f6b359ab3e67305a61ef&language=en-US&include_adult=false`)
resp=await response.json()
let results=await resp.results
await display(results)
}
);


// <<<<<<<<<<<<data functions >>>>>>>>>>>>>//

async function dataCollector(x){
     title =x.title
    console.log(title);
     releaseDate=x.release_date
     if(releaseDate==undefined){
      releaseDate=x.first_air_date
     }
    console.log(releaseDate);
     rate=(x.vote_average).toFixed(1)
    console.log(rate);
     description=x.overview
    cutOverview()
    starsNumber(rate)
  }



function starsNumber(vote){
   stars=''
  let around=Math.round(vote)
  let starNum
  if(around==0 || around <1){
    starNum=0
    stars+=`<i class="fa-solid fa-star start-100 text-muted fs-2"></i>`
  }
else if(around>1 && around %2 ==0){

  starNum=around/2
  for(i=1; i<=starNum ;i++)
  stars+=`<i class="fa-solid fa-star start-100 text-warning fs-2"></i>`
}
  else{starNum= (around-1)/2;
  for(i=1; i<=starNum ;i++){  
    stars+=`<i class="fa-solid fa-star start-100 text-warning fs-2"></i>`
  }
  stars+=`<i class="fa-solid fa-star-half-stroke start-100 text-warning fs-2"></i>`
}
return stars
}

function cutOverview(){
  if(description.length>250)
  description=description.slice(0,250)
console.log('islam was here');
}



// $('.item').mouseleave(async function(){
//   let move= $('.description').outerWidth()
//   console.log(move);
//   if($('.description').css('left')=='0px'){
//   $('.description').animate({left:`-${move}px`,opacity:1},500,
//   async function(){$('.description').animate({opacity:'0'},10,
//   async function(){
//     $('.description').animate({left:'0px'},500,
//     async function(){$('.description').animate({left:'0px',opacity:1})
//   }
//   )
// })
//   })
// }
// })

