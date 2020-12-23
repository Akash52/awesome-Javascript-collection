var BASE_URL = "https://raw.githubusercontent.com/anilrayamajhi/padControllers/master/sounds/sounds";

$('body').on("keypress", function(e) {
  e.preventDefault();
  e = e || window.event;
  var audio = new Audio(`${BASE_URL}/${e.keyCode}.wav`);
  audio.play();
  $(`#pad-${e.keyCode}`).fadeOut(20).fadeIn(20);
});

$('body').on("click", '.key-pad', function(e) {
  e = e || window.event;
  var id = $(this).attr('id');
  var keyCode = id.split("-")[1];
  var audio = new Audio(`${BASE_URL}/${keyCode}.wav`);
  audio.play();
  $(`#pad-${keyCode}`).fadeOut(20).fadeIn(20);
});

var sounds = {};

$('body').on('click', '[id^=play-loop-]', function(e){

  var thisSelector = $(this);
  var sample = thisSelector.attr('id');
  var selectedLoop = $(`#select_preset`).val();
  console.log('selectedLoop: ' + selectedLoop);

  if(!thisSelector.hasClass('disabled')){
    var audio = new Audio(`${selectedLoop}`);
    audio.volume = 0.7;
    audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);

    audio.play();
    sounds["preset"] = audio;
  }
  thisSelector.addClass('disabled');
})

$('body').on('click', '[id^=stop-loop-]', function(e){
  var sound = $(this).data('type');

  $(`#play-loop-preset`).removeClass('disabled');

  var audio = sounds["preset"];

  audio.pause();
})
