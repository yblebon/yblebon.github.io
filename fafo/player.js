$(function() {
    console.log( "Player JS loaded");
    var sound = null;
    $(".sounds").on("change", function() {
      if (sound != null) {
        console.log("stopping current sound, status: "+sound.state());
        sound.stop();
        sound.unload();
        sound = null;
      }
      
      let soundSelected = $(this).find('option:selected');
      console.log("sound selected: "+soundSelected.text());
      
      if (soundSelected.val() === "")  {
        return
      }
      
      let soundExt = soundSelected.val().split('.').pop();
      console.log("sound extension: "+soundExt)
      console.log("sound extension support: " + Howler.codecs(soundExt));
      
      sound = new Howl({
          src: [soundSelected.val()],
          html5: true,
          onload: function() {
          	console.log("loading sound ...");
          },
          onplay: function(id) {
          	console.log("playing sound ...");
            $( "#sound-gif" ).show( "slow", function() {
                console.log("showing sound gif");
            });
            
          },
          onstop: function(id) {
          	console.log("stopping sound ...");
            $( "#sound-gif" ).show( "hide", function() {
                console.log("hiding sound gif");
            });
            
          },
          onplayerror: function() {
          	console.log("error playing sound");
            Howler.unload();
          },
          onloaderror: function() {
          	console.log("error loading sound");
            Howler.unload();
          }
          
      });
      
      sound.play();
      
    });
  });
