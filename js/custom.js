
function assignBodyClassnames()
{
  var classTemp = "body ";
  /*if(App.embedded === "true"){
    classTemp = classTemp + " embedded";
      if(ENV.device.iOS){
        classTemp = classTemp + " iosembedded";
      }
  }
  else{
    classTemp = classTemp + " webapp";
  }*/
  if(ENV.screen.small){
    classTemp = classTemp + " smallScreen";
    if(Object.keys(App).indexOf("classSmall") >= 0){
        document.getElementsByTagName("html")[0].className =
         document.getElementsByTagName("html")[0].className + " " + App.classSmall;
    }
  }
  else{
    classTemp = classTemp + " bigScreen";
    /*if(Object.keys(App).indexOf("classBig") >= 0){
        document.getElementsByTagName("html")[0].className =
         document.getElementsByTagName("html")[0].className + " " + App.classBig;
    }*/
  }

  if(ENV.device.touchSupport){
    classTemp = classTemp + " touchSupport";
  }
  else{
    classTemp = classTemp + " web";
  }
    getElementObject("body").className = classTemp;
}


var ENV = {
  /* identify if any of the popular devices*/
  device : {
    iOS : false,
    android : false,
    iPad : false,
    touchSupport: true 
  },      
  
  screen: {
    orientation:null,
    small: null,
    height:null,
    width: null
  },
  
  /* for responsive parts */
  
  zoom: 100,        
  embedded: false,        
  embedType: "ios",        
  
  setup: function(){
    var agent = navigator.userAgent.toLowerCase();

    if( agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1) {
      ENV.device.iOS = true;
      ENV.device.android = false;
      ENV.device.iPad = false;
      ENV.device.touchSupport = true;
    }

    else if( agent.indexOf('ipad') != -1) {
      ENV.device.iOS = false;
      ENV.device.android = false;
      ENV.device.iPad = true;
      ENV.device.touchSupport = true;
    }

    else if( agent.indexOf('android') != -1) {
      ENV.device.iOS = false;
      ENV.device.android = true;
      ENV.device.iPad = false;
      ENV.device.touchSupport = true;
    }  
    else{
      ENV.device.iOS = false;
      ENV.device.android = false;
      ENV.device.iPad = false;
      ENV.device.touchSupport = false;
    }
    
    
    
    if(ENV.device.android){
      ENV.screen.height = window.innerHeight;
      ENV.screen.width = window.innerWidth;
    }
    else{
      ENV.screen.height = $(window).height();
      ENV.screen.width = $(window).width();
    }
    var realHeight;
    var realWidth;

    var aspectRatio = ENV.screen.width / ENV.screen.height;


    if (aspectRatio > 1){
      ENV.screen.orientation = "landscape";
    }
    else{
      ENV.screen.orientation = "portrait";
    } 

    if(ENV.device.touchSupport){
      if (ENV.screen.width < 640 || ENV.screen.height < 480){
        ENV.screen.small = true;
      }
      else{
        ENV.screen.small = false;
      }
    }
    else{
      ENV.screen.small = false;
    } 
  }
}    

function getElementObject( name ) {
return getElementObject.cache[ name ] = getElementObject.cache[ name ] ||
document.getElementById( name ); }
   getElementObject.cache = {};


function bootUp()
{
  ENV.setup();
  assignBodyClassnames();
  if(!ENV.device.touchSupport){
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('.docs-content').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  }
}
