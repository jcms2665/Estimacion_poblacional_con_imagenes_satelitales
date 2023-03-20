//--------------------------------------------------------------------------------
// Tema:       Capas urbanas y luces nocturnas
// Autor:      Julio Cesar <jcms2665@gmail.com>
// Fecha:      20-03-2023
// Datos:      Shape Edomex: 	users/jcms2665/A_edomex_corregida
//             Landsat 8:	LANDSAT/LC08/C02/T1_TOA
//             Luces nocturnas: NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170501    
// Notas:      El código corre en Googe Earth Engine (GEE) 
//             Este ejemplo es de 2017
//	       Los archivos generados se encuentran en la carpeta de "Datos"
	        

// Contenido

//       1. Puntos de entrenamiento
//       2. Importar datos
//       3. Clasificacion
//       4. Random forest
//       5. Evaluación: matriz de confusión
//	 6. Mapa
//	 7. Luces nocturnas
//	 8. Interfaz para visualizar los datos


//---------------------------------------------------------------------------------------------------------------------------------
//       1. Puntos de entrenamiento

var CN = {"opacity":1,"bands":["B4_median","B3_median","B2_median"],"min":0.03587609194219112,"max":0.222665860876441,"gamma":1},
    UR = 
    /* color: #000000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-99.0418402979969, 19.562295743304823]),
            {
              "clase": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.02656243544807, 19.530750875609524]),
            {
              "clase": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.04287026625862, 19.534148311414555]),
            {
              "clase": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.0487925837635, 19.525654587913113]),
            {
              "clase": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.05050919753303, 19.523227727744707]),
            {
              "clase": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.05042336684456, 19.520234550006187]),
            {
              "clase": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.03720544081916, 19.518616593011856]),
            {
              "clase": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.06449959975471, 19.53212603680659]),
            {
              "clase": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.03136895400276, 19.51796940567913]),
            {
              "clase": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.06973527175178, 19.515542430103064]),
            {
              "clase": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.05754731398811, 19.53285405858258]),
            {
              "clase": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.04261277419319, 19.553560858872814]),
            {
              "clase": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.04089616042366, 19.55865626561772]),
            {
              "clase": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.02630494338264, 19.546281427192888]),
            {
              "clase": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.02398751479377, 19.537383898113635]),
            {
              "clase": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.0224425624012, 19.540376758085237]),
            {
              "clase": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.0209834406971, 19.54345044841116]),
            {
              "clase": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.02922318679084, 19.53972965792756]),
            {
              "clase": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.00767551189684, 19.59491538454827]),
            {
              "clase": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.00063739544176, 19.597907176538364]),
            {
              "clase": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.00570140606187, 19.598958333493147]),
            {
              "clase": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.00939212566637, 19.61480571367598]),
            {
              "clase": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.97641120383773, 19.60053394318391]),
            {
              "clase": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.97967276999984, 19.60144358379125]),
            {
              "clase": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.14767474924265, 19.61004248613808]),
            {
              "clase": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.14946110044657, 19.608546709929946]),
            {
              "clase": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.14926261697947, 19.60795041688755]),
            {
              "clase": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.14838285242259, 19.607925150184382]),
            {
              "clase": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.14751381670176, 19.607899883477256]),
            {
              "clase": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.14732606207072, 19.608460803441503]),
            {
              "clase": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.1515371302241, 19.608799375806477]),
            {
              "clase": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.6460828394682, 19.283842982946247]),
            {
              "clase": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.64737029979536, 19.285787333368468]),
            {
              "clase": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.65063186595746, 19.28351892229801]),
            {
              "clase": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.66273399303266, 19.28327587639101]),
            {
              "clase": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.66384979198286, 19.284734146422267]),
            {
              "clase": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.6625623316557, 19.27638942581203]),
            {
              "clase": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.66084571788618, 19.27606535041692]),
            {
              "clase": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.6581849665434, 19.270393927239038]),
            {
              "clase": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.67972846935102, 19.271447206385805]),
            {
              "clase": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.67011543224164, 19.26820632584264]),
            {
              "clase": 1,
              "system:index": "40"
            })]),
    C2 = 
    /* color: #a5a1a1 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-98.95873573747723, 19.40258884684026]),
            {
              "clase": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95866063562481, 19.403013866134817]),
            {
              "clase": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95846751657574, 19.40326179354382]),
            {
              "clase": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.9580651852235, 19.403185897438338]),
            {
              "clase": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95813492265789, 19.402811476133042]),
            {
              "clase": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.9582797619447, 19.40249271136965]),
            {
              "clase": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95920780626385, 19.402887372413215]),
            {
              "clase": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95765212503521, 19.403848722230435]),
            {
              "clase": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95247856428074, 19.40243877974056]),
            {
              "clase": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95240882684635, 19.402180731531924]),
            {
              "clase": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.9528326158707, 19.401654514308646]),
            {
              "clase": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.9529935484116, 19.401452122615705]),
            {
              "clase": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.95278433610844, 19.4002731859994]),
            {
              "clase": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.9530310993378, 19.400060672910882]),
            {
              "clase": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28809401479191, 19.627565037582187]),
            {
              "clase": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.2873000809235, 19.626797021750473]),
            {
              "clase": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28655979123539, 19.62672628326555]),
            {
              "clase": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.2867958256287, 19.62782777899758]),
            {
              "clase": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.2873537251038, 19.62827241733704]),
            {
              "clase": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28638812985844, 19.628343155141224]),
            {
              "clase": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28587314572758, 19.628262311933906]),
            {
              "clase": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28558346715397, 19.626827338234484]),
            {
              "clase": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28551909413761, 19.627605459366364]),
            {
              "clase": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.2857873150391, 19.62753472123738]),
            {
              "clase": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28602334943241, 19.627514510337676]),
            {
              "clase": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28630229916996, 19.62753472123738]),
            {
              "clase": 2,
              "system:index": "25"
            })]),
    C3 = 
    /* color: #f87815 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-99.27633390065466, 19.623455509062953]),
            {
              "clase": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.27628025647437, 19.623202866219938]),
            {
              "clase": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.27625879880225, 19.624021427589966]),
            {
              "clase": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.27672013875281, 19.62356667178805]),
            {
              "clase": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.27662357922827, 19.62318265477532]),
            {
              "clase": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.27656993504797, 19.622869377058954]),
            {
              "clase": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.2762695276383, 19.62130297931655]),
            {
              "clase": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.2866029564753, 19.580137362537776]),
            {
              "clase": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28691409272103, 19.58032436832916]),
            {
              "clase": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28595922631173, 19.580900546970103]),
            {
              "clase": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28629182022958, 19.58064278309602]),
            {
              "clase": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.28485952061563, 19.580622566304143]),
            {
              "clase": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.27853945777159, 19.581028187665662]),
            {
              "clase": 3,
              "system:index": "12"
            })]),
    C4 = 
    /* color: #1cbb2c */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-99.30962277718861, 19.55844558620853]),
            {
              "clase": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31191874810536, 19.558364707888]),
            {
              "clase": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.25132634143348, 19.426363998573635]),
            {
              "clase": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.25111176471229, 19.425797387323364]),
            {
              "clase": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.25098301867958, 19.425433136190406]),
            {
              "clase": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.25411583880897, 19.42403683261557]),
            {
              "clase": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.25370814303871, 19.424461795843413]),
            {
              "clase": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.25364377002235, 19.423915414346325]),
            {
              "clase": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31329154244044, 19.571749370709984]),
            {
              "clase": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31264781227686, 19.57255808494398]),
            {
              "clase": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31197189560511, 19.5733364685612]),
            {
              "clase": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31086682549098, 19.57413506602706]),
            {
              "clase": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31024455299952, 19.57449898254688]),
            {
              "clase": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31101702919581, 19.5736094073808]),
            {
              "clase": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31198262444117, 19.572962440539072]),
            {
              "clase": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31374850876442, 19.570881629864736]),
            {
              "clase": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.31452098496071, 19.570194215873798]),
            {
              "clase": 4,
              "system:index": "16"
            })]),
    UrbanoVis = {"opacity":1,"bands":["clasificacion"],"palette":["040404"]},
    table = ee.FeatureCollection("users/jcms2665/A_edomex_corregida");


//---------------------------------------------------------------------------------------------------------------------------------
//       2. Importar datos

var 
    EdoMex = ee.FeatureCollection('users/jcms2665/A_edomex_corregida_dis'),
    EdoMexZonas = ee.FeatureCollection('users/jcms2665/A_edomex_corregidao'),
    MDE = ee.Image("USGS/SRTMGL1_003").clip(EdoMex).rename('MDE'),
    mpioNom =  "Edo. de México",
    inicio, final, PC = 1,
    ini= '2013-01-01', fin = '2013-12-31', agregar = Map.addLayer;

    
var inicio = ee.Date(ini), final = ee.Date(fin),
    centrar = EdoMex; Map.centerObject(centrar, 9);

var maskL8 = function(image) {
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(1 << 4).eq(0);
  return image.updateMask(mask);
};

    
var panSharpenL8 = function(image) {
  var rgb = image.select('B4', 'B3', 'B2');
  var pan = image.select('B8');
  var huesat = rgb.rgbToHsv().select('hue', 'saturation');
  var upres = ee.Image.cat(huesat, pan).hsvToRgb();
  return image.addBands(upres);
};

var L8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
         .filterBounds(centrar)
         .filterDate(inicio, final)
         .filterMetadata('CLOUD_COVER', 'less_than', PC)
         .map(maskL8)
         .map(panSharpenL8);
         
var bandas2 = ['B2_median', 'B3_median', 'B4_median', 'B5_median', 'B6_median', 'B7_median'];

var corteL9Reduce = L8.reduce(ee.Reducer.median())
                .clip(centrar)      
                .select(bandas2);
         
//---------------------------------------------------------------------------------------------------------------------------------
//       3. Clasificacion

var ndvi = corteL9Reduce.expression(
                            '(B5 - B4) / ( B5 + B4)', {
                              'B5': corteL9Reduce.select('B5_median'),
                              'B4': corteL9Reduce.select('B4_median')}).rename('NDVI');

                          var gndvi = corteL9Reduce.expression(
                            '(B5 - B3) / ( B5 + B3)', {
                              'B5': corteL9Reduce.select('B5_median'),
                              'B3': corteL9Reduce.select('B3_median')}).rename('GNDVI');
                            
                            var evi = corteL9Reduce.expression(
                            '(B5 - B4) / ( B5 + B4)', {
                              'B5': corteL9Reduce.select('B5_median'),
                              'B4': corteL9Reduce.select('B4_median'),
                              'B2': corteL9Reduce.select('B2_median')}).rename('EVI');
                            
                            var avi = corteL9Reduce.expression(
                            'pow((B5 * (1 - B4)) * (B5 - B4), 1/3)' , {
                              'B5': corteL9Reduce.select('B5_median'),
                              'B4': corteL9Reduce.select('B4_median')}).rename('AVI');
                            
                            var ndmi = corteL9Reduce.expression(
                            '(B5 - B6) / ( B6 + B6)', {
                              'B5': corteL9Reduce.select('B5_median'),
                              'B6': corteL9Reduce.select('B6_median')}).rename('NDMI');
                           
                            var savi = corteL9Reduce.expression(
                            '((B5 - B4) / ( B5 + B4 + 0.5)) * 1.5', {
                              'B5': corteL9Reduce.select('B5_median'),
                              'B4': corteL9Reduce.select('B4_median')}).rename('SAVI');
                            
                            var msi = corteL9Reduce.expression(
                            '(B6 / B5)', {
                              'B6': corteL9Reduce.select('B6_median'),
                              'B5': corteL9Reduce.select('B5_median')}).rename('MSI');
                            
                            var bsi = corteL9Reduce.expression(
                            '((B6 + B4) - ( B5 + B2)) / ((B6 + B4) + ( B5 + B2))', {
                              'B6': corteL9Reduce.select('B6_median'),
                              'B5': corteL9Reduce.select('B5_median'),
                              'B4': corteL9Reduce.select('B4_median'),
                              'B2': corteL9Reduce.select('B2_median')}).rename('BSI');
                          
                          var vari = corteL9Reduce.expression(
                            '(B3 - B4) / (B3 + B4 - B2)', {
                              'B4': corteL9Reduce.select('B4_median'),
                              'B3': corteL9Reduce.select('B3_median'),
                              'B2': corteL9Reduce.select('B2_median')}).rename('VARI');

                          var R = corteL9Reduce.select('B4_median').rename('Rojo'),  
                              G = corteL9Reduce.select('B3_median').rename('Verde'), 
                              B = corteL9Reduce.select('B2_median').rename('Azul');
                              
                          var NGRDI = corteL9Reduce.expression(
                            '( G - R ) / ( G + R )',{
                              'R': R, 
                              'G': G, 
                              'B': B}).rename('NGRDI');
                              
                          var GLI= corteL9Reduce.expression(
                            '((G - R) + (G - G))/((2*G)+R+B)',{
                              'G': G,
                              'R': R,
                              'B': B}).rename('GLI');
                            
                            var VDVI = corteL9Reduce.expression(
                              '( (2*G) - R - B ) / ( (2 * G) + R + B )',{
                                'R': R, 
                                'G': G, 
                                'B': B}).rename('VDVI');
                              
                            var ndwi = corteL9Reduce.expression(
                              '(B3 - B5) / (B3 + B5)',{
                                'B3': corteL9Reduce.select('B3_median'),
                                'B5': corteL9Reduce.select('B5_median')}).rename('NDWI');
                              
var slope = ee.Terrain.slope(MDE).rename('SLOPE');

var bandas = ['B2_median', 'B3_median', 'B4_median', 'B5_median', 'B6_median', 'B7_median','NDVI', 'GNDVI', 'EVI', 'AVI', 'NDMI', 'SAVI', 'MSI', 'BSI', 'VARI', 'NDWI','MDE', 'SLOPE', 'NGRDI', 'GLI', 'VDVI',];

var im = ee.Image([corteL9Reduce, ndvi, gndvi, evi, avi, ndmi, savi, msi, bsi, vari, ndwi, MDE, slope, NGRDI, GLI, VDVI]); //Map.addLayer(im, {}, 'im');

var pts_entrenar = UR.merge(C2).merge(C3).merge(C4);

//Se aplicó un análisis multivariado de conponentes principales para las variables que sobres estimaban para obtener los componentes de cada una
var Urbano1 = [0.330,0.368,0.352,0.415,0.444,0.386,0.083, 0.06,0.151,0.257,-0.033,0.075,1.069,-0.033, 0.043, -0.06, 2282, 2.704, 0.023, 0.012, 0.039],
    Urbano2 = [0.139,0.133,0.165,0.215,0.238,0.182,0.132,0.235,0.107,0.208,-0.051,0.085,1.107,-0.051,-0.198,-0.235, 2308, 1.352,-0.106,-0.056,-0.065],
    Urbano3 = [0.285,0.255,0.259,0.319,0.196,0.104,0.103,0.112,0.103,0.242, 0.315,0.083,0.614,-0.141, -0.02,-0.112, 2514,     0,-0.009,-0.004,-0.033],
    Veg1 =    [0.093, 0.08,0.077,0.155,0.152,0.101,0.338, 0.32,0.338,0.224, 0.009,0.161,0.981, -0.04, 0.051, -0.32, 2568,18.151, 0.021,  0.01,-0.03],
    Veg2 =    [0.092,0.078,0.07,0.169,0.119,0.071,0.418,0.37,0.418,0.251,0.213,0.203,0.701,-0.162,0.15,-0.37,2785,31.592,0.057,0.027,-0.017],
    Veg3 =    [0.091,0.08,0.063,0.203,0.107,0.056,0.528,0.433,0.528,0.299,0.453,0.275,0.525,-0.269,0.34,-0.433,2754,7.379,0.124,0.057,0.024],
    Suelo =   [0.147,0.164,0.204,0.33,0.38,0.277,0.236,0.335,0.236,0.321,-0.065,0.183,1.15,0.1,-0.178,-0.335,2780,8.963,-0.107,-0.058,-0.033],
    Suelo2 =  [0.129,0.126,0.149,0.26,0.319,0.224,0.271,0.347,0.271,0.291,-0.092,0.183,1.224,0.092,-0.158,-0.347,2254,4.343,-0.084,-0.044,-0.049];

var miembros = ee.Array([Urbano1, Urbano2, Urbano3, Veg1, Veg2, Veg3, Suelo, Suelo2]);
var inverso = ee.Image(miembros.matrixPseudoInverse().transpose());
var valentrada = im.select(bandas).toArray().toArray(1);
var unmixed = inverso.matrixMultiply(valentrada);

var clases = unmixed.arrayProject([0]).arrayFlatten([['Urbano1', 'Urbano2', 'Urbano3', 'Veg1', 'Veg2', 'Veg3', 'Suelo', 'Suelo2']]);
var bandas2 = ['B2_median', 'B3_median', 'B4_median', 'B5_median', 'B7_median','NDVI', 'GNDVI', 'EVI', 'AVI', 'NDMI', 'SAVI', 'MSI', 'BSI', 'VARI', 'NDWI','MDE', 'SLOPE', 'NGRDI', 'GLI', 'VDVI', 'Urbano1', 'Urbano2', 'Urbano3', 'Veg1', 'Veg2', 'Veg3', 'Suelo', 'Suelo2']
var clasRF = ee.Image([im, clases])

//---------------------------------------------------------------------------------------------------------------------------------
//       4. Random forest
var entrenamiento = clasRF.select(bandas2).sampleRegions({
                                collection: pts_entrenar,
                                properties: ['clase'],
                                scale: 15,
                                geometries: true});                  
                              
                              	var clasificador = ee.Classifier.smileRandomForest({numberOfTrees: 500}).train({
                                  features: entrenamiento,
                                  classProperty: 'clase',
                                  inputProperties: bandas2});
				var RF = clasRF.select(bandas2).classify(clasificador).rename('clasificacion');
                                              
var VisRF = {"opacity":1,"bands":["clasificacion"],"min":1,"max":4,"palette":["red","orange","orange","orange"]};


var zones = RF.eq(1);
zones = zones.updateMask(zones.neq(0));

//---------------------------------------------------------------------------------------------------------------------------------
//       5. Evaluación: matriz de confusión

var samples=entrenamiento.randomColumn('rand');


var trainingdata=samples.filter(ee.Filter.lt('rand',0.7));
var validatingdata=samples.filter(ee.Filter.gte('rand',0.7));

var classifier1 = ee.Classifier.smileCart().train({
  features: trainingdata,
  classProperty: 'clase',
  inputProperties: bandas2
});


var confusionmatrix=ee.ConfusionMatrix(validatingdata.classify(classifier1).errorMatrix({
  actual:'clase',
  predicted:'classification'
}));
print('Matriz de confusion',confusionmatrix);
print('Precision',confusionmatrix.accuracy());


//---------------------------------------------------------------------------------------------------------------------------------
//	 6. Mapa

var images=ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA').filter(ee.Filter.date("2019-01-01","2019-12-31"))
                          .filterBounds(table)
                          .filter(ee.Filter.lt('CLOUD_COVER',5));
var median=images.median();

var mexico=median.clip(table);

var vizParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 0.5,
};

Map.centerObject(table,8);


//---------------------------------------------------------------------------------------------------------------------------------
//	 6. Mapa
var nighttime=ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20170501").select('avg_rad').clip(table);

var nighttimeVis = {min: 0.0, max: 60.0};
//Map.setCenter(-99.26, 19.60, 9);


//--------------------------------------------------------------------------
//	 8. Interfaz para visualizar los datos

Map.setOptions('ROADMAP');
Map.centerObject(table,8);

Map.style().set('cursor', 'crosshair');

var delitos = ui.Map.Layer(mexico, vizParams, 'Landsat8',true);
var ext2000 = ui.Map.Layer(RF, VisRF, 'Zonas urbanas (rojo)',false);
var ext2010 = ui.Map.Layer(nighttime, nighttimeVis, 'Luces nocturnas',false);

Map.add(delitos);
Map.add(ext2000);
Map.add(ext2010);



// Paneles

// 8.1 Encabezado
var header = ui.Label('Estado de México', 
            {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});

// 8.2 Texto
var text = ui.Label(
  'Esta herramienta permite visualizar las capas (variables) para el análisis',
    {fontSize: '15px'});


// 8.3 Se unen el encabezado y el texto
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
  
// 8.4 Se crea otro panel abajo 
var intro = ui.Panel([
  ui.Label({
    value: '___________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Selecciona las capas para mostrar',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);

// 8.5 Se unen los paneles
panel.add(intro)

// 8.6 Mandar el panel a la interfaz, se usa: ui.root.
ui.root.insert(1,panel)

// 8.7 Construir Casillas de Verificación

var extCheck = ui.Checkbox('Zonas urbanas (rojo)').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('Luces nocturnas').setValue(false);// 
var extCheckDelitos = ui.Checkbox('Landsat8').setValue(true);// 

// 8.8 Se agregan al panel
panel.add(extCheck2)
      .add(extCheck)
      .add(extCheckDelitos)

// 8.9 Funciones para activar/desactivar las capas
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  ext2000.setShown(checked)
  })
}
doCheckbox();

var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  ext2010.setShown(checked)
  })
}
doCheckbox2();

var doCheckbox3 = function() {
  extCheckDelitos.onChange(function(checked){
  delitos.setShown(checked)
  })
}
doCheckbox3();


  