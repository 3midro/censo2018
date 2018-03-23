<?php
    $fila = 1;
    $features = array();
    
 
if (($gestor = fopen("manzanas_01.csv", "r")) !== FALSE) {
    while (($datos = fgetcsv($gestor, 1000, ",")) !== FALSE) {
        if (array_key_exists(8, $datos)) {
            $latlongs = array();
            //quitar caracteres al inicio y final
                $quitar = array("MULTIPOLYGON", ")))","(((");
                $sinpaja = str_replace($quitar, "", $datos[8]);
            //separa por , (obtiene coords)
                $coords = explode(",", $sinpaja);
            
                foreach ($coords as &$coord) {
                    $latlon = explode(" ",$coord);
                    $latlon[0] = floatval($latlon[0]); $latlon[1] = floatval($latlon[1]);
                    array_push($latlongs, $latlon);
                }
                unset($coord); // rompe la referencia con el último elemento    
            
            $feature = array(
                'type' => 'Feature', 
                'geometry' => array(
                'type' => 'Polygon',
                'coordinates' => array($latlongs),
                    'properties' => array(
                        'gid' => $datos[0],
                        'cve_ent' => $datos[1],
                        'cve_mun' => $datos[2],
                        'cve_loc' => $datos[3],
                        'cve_ageb' => $datos[4],
                        'cve_mza' => $datos[5],
                        'ambito' => $datos[6],
                        'as_text' => $datos[7],
                        'the_geom_geo' => $datos[8],
                        'fila'=> $fila
                //Other fields here, end without a comma
                    )
            ));
                unset($latlongs);
                array_push($features, $feature);
        }
          
       

        
       
        
        $fila++;
    }
    
    //array_shift($features);
     // Return markers as GeoJSON

    $geojson = array(
        'type'      => 'FeatureCollection',
        'features'  => $features
     );

     echo json_encode($geojson);
    fclose($gestor);
}
            
            
  
?>



