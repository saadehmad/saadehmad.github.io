
function countdown (obj) {
  (function (obj) {
    var countdownObj = {
      countdown: document.getElementById('countdown'),
      timer: false,
      timerInterval: undefined,

      elementsObj: {
        preText: undefined,
        postText: undefined
      },

      updateTimer: function updateTimer(dueDate){
        var time = dueDate - new Date();
        return {
          'days': Math.floor( time/(1000*60*60*24) ),
          'hours': Math.floor( (time/(1000*60*60)) % 24 ),
          'minutes': Math.floor( (time/1000/60) % 60 ),
          'seconds': Math.floor( (time/1000) % 60 ),
          'total' : time
        };
      },

      // it will animate the clock according to annimation
      animateClock: function animateClock(div, animation){
        switch (animation) {
          case 'fade':
            fade(div);
            break;
          default:
            // go on
        }
      },

      // I did it wrong, I need to set timerInterval in class or make
      // a supporting varibale to check interval is running
      startTimer: function startTimer(id, dueDate, animation){
        countdownObj.timerInterval = setInterval(function(){
          countdownObj.timer = true;
          var clock = document.getElementById(id);
          var timer = countdownObj.updateTimer(dueDate);

          clock.innerHTML = '<div><span>' + timer.days + '</span></div>'
                          + '<div><span>' + timer.hours + '</span></div>'
                          + '<div><span>' + timer.minutes + '</span></div>'
                          + '<div><span>' + timer.seconds + '</span></div>';

          //animations
          var divs = clock.getElementsByTagName("div");

          // countdown background color
          for (var i = 0; i < 4; i++) {
            setAttributes(divs[i], {
              "style": {
                "background": obj.countdownBackgroundColor,
                "color": obj.timeFontColor
              }
            });
          }
          countdownObj.animateClock(divs[3], animation);
          if(timer.seconds == 59) countdownObj.animateClock(divs[2], animation);
          if(timer.minutes == 59 && timer.seconds == 59) countdownObj.animateClock(divs[1], animation);
          if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) countdownObj.animateClock(divs[0], animation);

          //check for end of timer
          if(timer.total < 1){
            clearInterval(countdownObj.timerInterval);
            clock.innerHTML = '<div><span>00</span></div>\
                              <div><span>00</span></div>\
                              <div><span>00</span></div>\
                              <div><span>00</span></div>';
          }


        }, 1000);
      },

      renderPreText: function preText () {
        var preText = countdownObj.elementsObj.preText;
        console.log(preText);
        preText.innerHTML = obj.preText;
        setAttributes(preText, {
          "style": {
            "padding-top": "15px",
            "padding-bottom": "25px",
            "font-size": "21px",
            "color": "#f1f1f1",
            "text-align": "center"
          }
        });
      },

      renderPostText: function renderPostText () {
        var postText = countdownObj.elementsObj.postText;
        postText.innerHTML = obj.postText;
        
        setAttributes(postText, {
          "style": {
            "margin-top": "62px",
            "padding-bottom": "15px",
            "font-size": "21px",
            "color": "#f1f1f1",
            "text-align": "center"
          }
        });
      },

      renderPreGraphics: function renderPreGraphics () {
        /*var countdown = countdownObj.countdown,
            preGraphics = document.createElement('img');
        preGraphics.src = obj.preGraphics;
        countdown.insertBefore(preGraphics, countdown.firstChild);
        setAttributes(preGraphics, {
          "style": {
            "width": "25px",
            "height": "100%",
            "float": "left"
          }
        });*/
      },

      renderPostGraphics: function renderPostGraphics () {
        
      }
    }


    // supporting functions
    function setUpStyles (obj) {
      var countdown = countdownObj.countdown,
          label = document.getElementById('label'),
          clock = document.getElementById('clock'),
          countBackground = clock.getElementsByTagName('div');

      // background color
      setAttributes(countdown, {
        "style": {
          "background": obj.backgroudcolor
        }
      });

      // label color
      setAttributes(label, {
        "style": {
          "color": obj.labelColor
        }
      });
    }

    // helper function for for styling element multiple times
    function setAttributes (ele, attrs) {
        for (var idx in attrs) {
            if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
                for (var prop in attrs[idx]){ele.style[prop] = attrs[idx][prop];}
            } else if (idx === 'html') {
                ele.innerHTML = attrs[idx];
            } else {
                ele.setAttribute(idx, attrs[idx]);
            }
        }
    };

    // it will create elements neccesary to make countown
    function makingElements () {
      var preText = document.getElementById('countdownPreText'),
          postText = document.getElementById('countdownPostText'),
          countdown = countdownObj.countdown;

      console.log(countdown); 
      if (preText && postText) {
        countdownObj.elementsObj.preText = preText;
        countdownObj.elementsObj.postText = postText;
        return true;
      }

      var preText = document.createElement('div'),
          postText = document.createElement('div');
      preText.id = 'countdownPreText';
      postText.id = 'countdownPostText';
      countdown.insertBefore(preText, countdown.firstChild);
      countdown.appendChild(postText);
      countdownObj.elementsObj.preText = preText;
      countdownObj.elementsObj.postText = postText;
    }

    function fade (div) {
      var span = div.getElementsByTagName('span');
      span = span[0];

      // setting CSS
      setAttributes(span, {
        "style": {
          "opacity": 1,
          "transition": "opacity 0.5s"
        }
      });

      span.style.opacity = 0;
      setTimeout(function(){
        span.style.opacity = 1;
      },350);

    }

    // clearining the interval before chaning time
    function clearInterval () {
      if (countdownObj.timer) {
        console.log(countdownObj.timer);
      }
    }

    (function () {
      var dueDate = new Date(obj.dueDate());
      setTimeout(function () {
      }, 5000);
      clearInterval();
      setUpStyles(obj);
      makingElements();
      countdownObj.renderPreText();
      countdownObj.renderPostText();
      countdownObj.renderPreGraphics();
      countdownObj.renderPostGraphics();
      countdownObj.startTimer("clock", dueDate, 'fade');
    })();

  })(obj);
}