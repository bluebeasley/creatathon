
//Submit data when enter key is pressed
$('#user_name').keydown(function(e) {
	var name = $('#user_name').val();
    if (e.which == 13 && name.length > 0) { //catch Enter key
    	//POST request to API to create a new visitor entry in the database
      $.ajax({
        method: "POST",
        url: "./api/visitors",
        contentType: "application/json",
        data: JSON.stringify({name: name })
      })
      .done(function(data) {
          if(data && data.name){
            if(data._id) {
              $('#header').html($.i18n('added_to_database', AntiXSS.sanitizeInput(data.name)));
            } else {
              $('#header').html($.i18n('hello', AntiXSS.sanitizeInput(data.name))); 
              $('header').css('background-color', '#00A6FB');
              $('h1').css('color', 'white');
              $('#content').css('display', 'block');
            }
          } else {
              $('#header').html(AntiXSS.sanitizeInput(data));
          }
          $('#nameInput').hide();
          getNames();
      });
    }
});

//Retrieve all the visitors from the database
function getNames(){
  $.get("./api/visitors")
      .done(function(data) {
          if(data.length > 0) {
            data.forEach(function(element, index) {
              data[index] = AntiXSS.sanitizeInput(element)
            });
            $('#databaseNames').html($.i18n('database_contents') + JSON.stringify(data));
          }
      });
  }

  //Call getNames on page load.
  getNames();

  function basic() {
    $('#content').css('display', 'none');
    $('#basic').css('display', 'block')
  }
  
  function home_basic() {
    $('#content').css('display', 'block');
    $('#basic').css('display', 'none')
  }

  function pets() {
    $('#content').css('display', 'none');
    $('#pets').css('display', 'block')
  }

  function home_pets() {
    $('#content').css('display', 'block');
    $('#pets').css('display', 'none')
  }

  function earthquake() {
    $('#content').css('display', 'none');
    $('#earthquake').css('display', 'block')
  }

  function home_earthquake() {
    $('#content').css('display', 'block');
    $('#earthquake').css('display', 'none')
  }
  function flooding() {
    $('#content').css('display', 'none');
    $('#flooding').css('display', 'block')
  }

  function home_flooding() {
    $('#content').css('display', 'block');
    $('#flooding').css('display', 'none')
  }

$(document).ready(function() {
    
    $(document).on('change', 'input[type="checkbox"]', updateProgress);
    
    $("#progressbar").progressbar({
        value: 0,
        max: 100
    });        
});

function updateProgress() {
    var numAll = $('input[type="checkbox"]').length;
    var numChecked = $('input[type="checkbox"]:checked').length;
    
    if (numAll > 0) {
        var perc = (numChecked / numAll) * 100;
        $("#progressbar").progressbar("value", perc);
    }
}