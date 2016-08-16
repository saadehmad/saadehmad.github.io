'use strict';
//  Author: ThemeREX.com
// 
//  This file is reserved for changes made by the user.
//  Your scripts should be placed here so you can be sure
//  it won't disappear after update
// 

(function($) {

    // Your custom scripts here
    /*
	   this will help us when we submit the modal box to give the right
	   form for graphics timer
    */

    // pre-text and post-text will be hide
    $("#preTextInput").hide();
    $("#postTextInput").hide();

    var whichImage;

    // eventlisteners for modal box
    document.getElementById('done-image').addEventListener('click', graphicsSelector);
    document.getElementById('loading-image').addEventListener('click', graphicsSelector);
    document.getElementById('protector-image').addEventListener('click', graphicsSelector);
    // document.getElementById('modal-close').addEventListener('click', removeGraphicsSel);
    // document.getElementById('submit-graphics').addEventListener('click', submitGraphics);

    // it will apply graphics-selector class and remove it
    function graphicsSelector (evt) {
	   var graphics;
	   removeGraphicsSel();
	   whichImage = evt.path[1].id.toString();
	   graphics = '#' + whichImage;
	   $(graphics).addClass('graphics-selector');
    }

    // remove graphics-selector class
    function removeGraphicsSel () {
	    var arr = ['done-image', 'loading-image', 'protector-image'];
	    var graphics = arr.filter(function (graphics) {
		   var graphics = '#' + graphics;
		   return $(graphics).hasClass('graphics-selector');
	    });
	    var countdownId = '#' + graphics[0];
	    $(countdownId).removeClass('graphics-selector');
   } 

    // submit modal box for correct graphics timer
    function submitSelector () {
	   console.log(whichImage);
	   window.location = 'file:///home/saadehmad/Projects/DealBuilder/Countdowns/index.html?' + whichImage;
    }

    $('#isPreTextChecked').click(function() {
        $("#preTextInput").toggle(this.checked);
    });

    $('#isPostTextChecked').click(function() {
        $("#postTextInput").toggle(this.checked);
    });

    var obj = {
      backgroudcolor: "#000000",
      labelColor: "green",
      timeFontColor: "blue",
      date: "August 14, 2017",
      time: "01:01:01",
      dueDate: function () {
        return new Date(this.date + ' ' + this.time);
      },
      countdownBackgroundColor: "pink",
      preText: "Pakistan's",
      postText: "Independence Day",
      preGraphics: "assets/img/pre-and-post-graphics/boxes.jpg",
      postGraphics: "/assets/img/pre-and-post-graphics/boxes.jpg"
    }
    
    countdown(obj);

    $("button").on('click',function(e){
        e.preventDefault();
        //ajax code here
    });

    //this will stop the submit of the form but allow the native HTML5 validation (which is what i believe you are after)
    $("#builderForm").on('submit',function(e){
        e.preventDefault();
        //ajax code here
    });

    $('#dueDate').change(function () {
        var date = $('#dueDate').val();
        if (date.length < 10) {
            return;
        }
        obj.date = date;
        countdown(obj);
        // console.log(innerText);  
    });


})(jQuery);



// dueDate: new Date("August 14, 2016 01:01:01" );