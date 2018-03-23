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
    loadMap: function(){
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
             //console.log(feature.geometry.properties.cve_ent);
             //var popupContent = "<p>Mza</p>";
             //console.log(layer);
             //console.log(feature);
       var popupContent = "<p>" +feature.geometry.properties.cve_ent+
           feature.geometry.properties.cve_mun+
           feature.geometry.properties.cve_loc+
           feature.geometry.properties.cve_ageb+
           feature.geometry.properties.cve_mza+'</p>';
             
		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
            
		}

		layer.bindPopup(popupContent).on('click', function() { 
            var polygon = L.polygon(layer.feature.geometry.coordinates, {color: 'red'}).addTo(mymap);
            //L.polygon(layer.feature.geometry.coordinates).addTo(mymap);
            mymap.fitBounds(layer.getBounds());
             //selecciona la mza
            
            //feature.geometry.coordinates.toBounds();
            app.methods.sheetFrentes(layer);
        });
        
	}
        
        
      /*  L.CRS.EPSG3857;
     L.geoJSON(frentes, {
		onEachFeature: onEachFeature
	}).addTo(mymap);*/
        
        L.geoJSON(manzanas, {
            onEachFeature: onEachFeatureMza
        }).addTo(mymap);
        
    },
    sheetFrentes: function(mzalayer){
        console.log(mzalayer.feature.geometry.coordinates); 
       
       
        
        
        
        var mza = mzalayer.feature.geometry.properties.cve_ent + mzalayer.feature.geometry.properties.cve_mun + mzalayer.feature.geometry.properties.cve_loc + mzalayer.feature.geometry.properties.cve_ageb + mzalayer.feature.geometry.properties.cve_mza;
        var $$ = Dom7;
        // DOM events for my-sheet sheet
$$('.my-sheet').on('sheet:open', function (e, sheet) {
  console.log('my-sheet open');
});
$$('.my-sheet').on('sheet:opened', function (e, sheet) {
  console.log('my-sheet opened');
});
        // Create dynamic Sheet
var dynamicSheet = app.sheet.create({
  content: '<div class="sheet-modal">'+
              '<div class="toolbar">'+
                '<div class="toolbar-inner">'+
                  '<div class="left"><a class="link sheet-close">'+mza+'</a></div>'+
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
  }
});
         dynamicSheet.open();
        
// Events also can be assigned on instance later
dynamicSheet.on('close', function (sheet) {
  console.log('Sheet close');
});
dynamicSheet.on('closed', function (sheet) {
  console.log('Sheet closed');
});

// Open dynamic sheet
$$('.dynamic-sheet').on('click', function () {
  // Close inline sheet before
  app.sheet.close('.my-sheet');

  // Open dynamic sheet
  dynamicSheet.open();
});
    }
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});
