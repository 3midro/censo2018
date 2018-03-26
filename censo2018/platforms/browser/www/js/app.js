// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  sheet: {
    closeByBackdropClick: false,
  },
    popup: {
    closeByBackdropClick: false,
  },
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    loadMap_working: function(){
        //console.log(frentes);
        var mymap = L.map('mapid').setView([21.8680951,-102.2715957], 15);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
        
        function onEachFeature(feature, layer) {
       var popupContent = "<p> Vialidad: " +feature.properties.nomvial+'<br> </p>';

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}

		layer.bindPopup(popupContent).on('click', function() { 
     
        });
        
	}
        
        
         function onEachFeatureMza(feature, layer) {
            
       var popupContent = "<p>" +feature.properties.cve_ent+
           feature.properties.cve_mun+
           feature.properties.cve_loc+
           feature.properties.cve_ageb+
           feature.properties.cve_mza+'</p>';
             
		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
            
		}

		layer.bindPopup(popupContent).on('click', function() { 
            mymap.fitBounds(layer.getBounds());
            app.methods.sheetFrentes(layer);
        });
        
	}
        
       var myStyle = {
            "color": "#ff7800",
            "weight": 0.5,
            "opacity": 0.65
        }; 
        L.CRS.EPSG3857;
     L.geoJSON(frentes, {
         style:myStyle,
		onEachFeature: onEachFeature
	}).addTo(mymap);
        
      /*  L.geoJSON(manzanas, {
            onEachFeature: onEachFeatureMza
        }).addTo(mymap);*/
        
    },
    loadMap: function(){
        var map = new L.map('mapid'),
        layerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        layerAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        layer = new L.TileLayer(layerUrl, {maxZoom: 19, attribution: layerAttribution, subdomains: 'abcd', id:'mapbox.streets'}),

     
            data = frentes,
      defaultStyle = {
        opacity: 0.7,
        weight: 3,
        color: '#4575b4',
        radius: 10
      },
      selectStyle = {
        opacity: 0.9,
        weight: 3,
        color: '#ff7800',
        radius: 10
      },

      geojson = L.geoJson(data, {
        style: function() { return defaultStyle; },
        pointToLayer: function(geojson, latLng) {
          return L.circleMarker(latLng, defaultStyle);
        }
      }),
      featureSelect = L.featureSelect({
        featureGroup: geojson,
        selectSize: [16, 16]
      });

  map.setView([21.8680951,-102.2715957], 17).addLayer(layer);

  geojson.addTo(map);

  featureSelect.addTo(map);
      

  function setStyle(layers, style) {
    var i;
    for (i=0; i<layers.length; i++) {
      layers[i].setStyle(style);
    }
  }
  
        

  featureSelect.on('select', function(evt) {
    console.log(evt);
    setStyle(evt.layers, selectStyle);
  });

  featureSelect.on('unselect', function(evt) {
    console.log(evt);
    setStyle(evt.layers, defaultStyle);

  });
        
        map.on('moveend', function () {
   //console.log(featureSelect.layers);
            app.methods.sheetFrentes(featureSelect.layers)
});
        
    },
    sheetFrentes: function(selectedFrentes){
        console.log(Object.keys(selectedFrentes).length); 
        console.log(selectedFrentes);
        var $$ = Dom7;
        if (Object.keys(selectedFrentes).length == 1){
            // Create dynamic Popup
            var dynamicPopup = app.popup.create({
              content: '<div class="popup popup-tablet-fullscreen">'+
                '<div class="navbar"><div class="navbar-inner sliding"><div class="left"><a href="#" class="link popup-close"><i class="icon icon-back"></i><span class="ios-only">Back</span></a></div><div class="title">Formulario Frente</div></div></div>'+          
                '<div class="block">'+
                            '<p>Popup created dynamically.</p>'+
                            '<p><a href="#" class="link popup-close">Close me</a></p>'+
                          '</div>'+
                        '</div>',
              // Events
              on: {
                open: function (popup) {
                  console.log('Popup open');
                },
                opened: function (popup) {
                  console.log('Popup opened');
                },
              }
            });
            dynamicPopup.open();
        }else if (Object.keys(selectedFrentes).length > 1){
            //recorre el arreglo para crear los radio buttons
            var lis='<div class="list media-list"><ul>';
            for (var i in selectedFrentes) {
                console.log(selectedFrentes[i].feature.properties.gid);
                var cve = selectedFrentes[i].feature.properties.cve_ent + selectedFrentes[i].feature.properties.cve_mun + selectedFrentes[i].feature.properties.cve_loc + selectedFrentes[i].feature.properties.cve_ageb + selectedFrentes[i].feature.properties.cve_mza + '  '+ selectedFrentes[i].feature.properties.cve_seg + '  ' + selectedFrentes[i].feature.properties.cve_ft
                var li ='<li><label class="item-radio item-content">'+
                            '<input type="radio" name="demo-media-radio" value="'+selectedFrentes[i].feature.properties.gid+'"  />'+
                            '<i class="icon icon-radio"></i>'+
                            '<div class="item-inner">'+
                            '<div class="item-title-row">'+
                            '<div class="item-title">'+selectedFrentes[i].feature.properties.tipovial+'</div>'+
                            '<div class="item-after">'+selectedFrentes[i].feature.properties.gid+'</div>'+
                            '</div>'+
                            '<div class="item-subtitle">'+selectedFrentes[i].feature.properties.nomvial+'</div>'+
                            '<div class="item-text">'+cve+'</div>'+
                            '</div>'+
                        '</label></li>'; 
                lis += li;
            }
            lis += '</ul></div>';
            // Create dynamic Sheet
        var dynamicSheet = app.sheet.create({
          content: '<div class="sheet-modal">'+
                      '<div class="toolbar">'+
                        '<div class="toolbar-inner">'+
                          '<div class="left"><a class="link sheet-close">Frentes</a></div>'+
                          '<div class="right">'+
                            '<a class="link sheet-close"><i class="material-icons">close</i></a>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="sheet-modal-inner listFtes">'+
                        '<div class="block">'+ lis +
                        '</div>'+
                      '</div>'+
                    '</div>',
          // Events
          on: {
            open: function (sheet) {
              console.log('Sheet open');
            },
            opened: function (sheet) {
              console.log('Sheet opened');
            },
            close: function (sheet) {
              console.log('Sheet close');
            },
            closed: function (sheet) {
              console.log('Sheet closed');
            }
          }
        });
            dynamicSheet.open();
            //app.dialog.alert('Abrira sheet para 2 o mas frentes');
        }
        return false;
        console.log("aqui ya no");
        
       
        // Create dynamic Sheet
        var dynamicSheet = app.sheet.create({
          content: '<div class="sheet-modal">'+
                      '<div class="toolbar">'+
                        '<div class="toolbar-inner">'+
                          '<div class="left"><a class="link sheet-close">Frentes</a></div>'+
                          '<div class="right">'+
                            '<a class="link sheet-close"><i class="material-icons">close</i></a>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="sheet-modal-inner">'+
                        '<div class="block">'+
                          '<p>Sheet created dynamically.</p>'+
                          '<p><a href="#" class="link sheet-close">Close me</a></p>'+
                        '</div>'+
                      '</div>'+
                    '</div>',
          // Events
          on: {
            open: function (sheet) {
              console.log('Sheet open');
            },
            opened: function (sheet) {
              console.log('Sheet opened');
            },
            close: function (sheet) {
              console.log('Sheet close');
            },
            closed: function (sheet) {
              console.log('Sheet closed');
            }
          }
        });
        
        
        if (Object.keys(selectedFrentes).length == 1){
            app.dialog.alert('Abrira el popup directamente');       
        }else if (Object.keys(selectedFrentes).length > 1){
            dynamicSheet.open();
        }
        
       
        
       


    }
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});
