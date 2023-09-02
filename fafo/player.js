
  $(function() {
    console.log( "ready!" );
    var sound = null;
    $(".sounds").on("change", function() {
      if (sound != null) {
        sound.stop();
        sound.unload();
        sound = null;
      }
      
      sound = new Howl({
          src: ['./audio/'+$(this).val()],
          html5: true
      });
      
      sound.play();
      
    });
  });
  
