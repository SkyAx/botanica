$(document).ready(function () {

    var wateringStatus;
    var tempAir;
    var humiAir;
    var tempGround;
    var humiGround;
    var light;

    function getWateringStatus(){
      $.ajax({
        url : '/wateringStatus',
        method: "GET",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          wateringStatus = $.parseJSON(data);
          wateringStatus = wateringStatus.water;
          console.log(wateringStatus);
        }
      }).done(function() {
        if(wateringStatus == "on"){
          $('.watering-status').removeClass('off').addClass('on').text('Полив включен');
        } else if (wateringStatus == "off"){
          $('.watering-status').removeClass('on').addClass('off').text('Полив выключен');
        } else {
          return;
        }
      })
    }


    function initialize() {
      var data = $.getJSON('./tmp/data.json').done(function(data) {
        tempAir = new JustGage({
          id: "tempAir",
          value: data.tempAir,
          min: -50,
          max: 50,
          title: "Температура воздуха, С",
         });

        humiAir = new JustGage({
            id: "humiAir",
            value: data.humiAir,
            min: 0,
            max: 100,
            title: "Влажность воздуха, %"
          });

        tempGround = new JustGage({
            id: "tempGround",
            value: data.tempGround,
            min: 0,
            max: 100,
            title: "Температура почвы, С"
          });

        humiGround = new JustGage({
            id: "humiGround",
            value: data.humiGround,
            min: 0,
            max: 100,
            title: "Влажность почвы, С"
          });

        light = new JustGage({
            id: "light",
            value: data.light,
            min: 0,
            max: 100,
            title: "Уровень освещения, %"
          });
      });
    }

    function getNewData() {
      var data = $.getJSON('./tmp/data.json').done(function(data) {
        tempAir.refresh(data.tempAir);
        humiAir.refresh(data.humiAir);
        tempGround.refresh(data.tempGround);
        humiGround.refresh(data.humiGround);
        light.refresh(data.light);
        console.log('refresh');
      });
    }

    initialize();

    getWateringStatus();

    setInterval(function () {
      getNewData();
    }, 500);

    //
    // setInterval(function() {
    //   getData();
    // },500);

    $('.watering-on').on('click', function() {

      $(this).addClass('loading');

      setTimeout(function() {
        $.ajax({
            url: '/watering',
            method: "POST",
            data: JSON.stringify({watering: true}),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              $('.watering-status').removeClass('off').addClass('on').text('Полив включен');
              $('.watering-on').removeClass('loading');
              console.log('done!');
            }
        });
      }, 500);
    });

    $('.watering-off').on('click', function() {

      $(this).addClass('loading');

      setTimeout(function() {
        $.ajax({
            url: '/watering',
            method: "POST",
            data: JSON.stringify({watering: false}),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              $('.watering-status').removeClass('on').addClass('off').text('Полив выключен');
              $('.watering-off').removeClass('loading');
              console.log('done!');
            }
        });
      }, 300);
    });
});
