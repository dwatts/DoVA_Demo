/*setTimeout(function() {
  $('#infoDiv').fadeOut('fast');
}, 3000); // <-- time in milliseconds*/

window.onload = function(){
  
  (function(){
    var counter = 3;
  
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        span = document.getElementById("count");
        span.innerHTML = counter;
      }
      // Display 'counter' wherever you want to display it.
      if (counter === 0) {
          //alert('this is where it happens');
          $('#infoDiv').fadeOut('fast');
          clearInterval(counter);
      }
      
    }, 1000);
      
  })();
    
  }

var map = L.map("map").setView([37.27121011597355, -76.70118517537759], 17);

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

//Add sidebar plugin

var sidebar = L.control.sidebar('sidebar', {
  closeButton: true,
  position: 'left'
});

map.addControl(sidebar);

//Dropdown List Controls

$(document).ready(function(){
  $('#tableSelect').on('change', function(){
    if(this.value == '0') {
      $("#siteInvest").show();
      $("#buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Site Investigator(s)`);
    } else if (this.value == '1') {
      $("#buildPhase").show();
      $("#siteInvest, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Building Phase(s)`);
    } else if (this.value == '2') {
      $("#buildPhaseSection").show();
      $("#siteInvest, #buildPhase, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Building Phase: Section`);
    } else if (this.value == '3') {
      $("#earthfastFound").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Earthfast Foundation`);
    } else if (this.value == '4') {
      $("#masonryFound").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Masonry Foundation (Below Grade)`);
    } else if (this.value == '5') {
      $("#woodPiers").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Wood Piers / Stumps`);
    } else if (this.value == '6') {
      $("#chimney").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #cellar, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Chimney / Hearth`);
    } else if (this.value == '7') {
      $("#cellar").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #roof, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Cellar / Sub-Floor`);
    } else if (this.value == '8') {
      $("#roof").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #shingles, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Roof`);
    } else if (this.value == '9') {
      $("#shingles").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #windows, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Shingles`);
    } else if (this.value == '10') {
      $("#windows").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #dormers, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Windows`);
    } else if (this.value == '11') {
      $("#dormers").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #brick, #miscFinish").hide();
      $('#tableTitle').html(`Dormers`);
    } else if (this.value == '12') {
      $("#brick").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #miscFinish").hide();
      $('#tableTitle').html(`Brick Characteristics`);
    } else if (this.value == '13') {
      $("#miscFinish").show();
      $("#siteInvest, #buildPhase, #buildPhaseSection, #earthfastFound, #masonryFound, #woodPiers, #chimney, #cellar, #roof, #shingles, #windows, #dormers, #brick").hide();
      $('#tableTitle').html(`Miscellaneous Finishes`);
    } else {
      ''
    }
  })
});

//Root Geoserver URL

var rootUrl ='http://ec2-52-204-78-131.compute-1.amazonaws.com:8080/geoserver/wfs';

//0: Investigator Table

var defaultInvestParameters = {
    service: 'WFS',
    version: '1.1.0',
    request: 'GetFeature',
    typeName: 'PostGIS_Data:investigator_table',
    outputFormat: 'application/json',
    format_options:'callback:getJson',
    SrsName:'EPSG:404000'
};

var investParameters = L.Util.extend(defaultInvestParameters);

var investURL = rootUrl + L.Util.getParamString(investParameters);
let investWFSLayer;

var investAjax = $.ajax({
    url:investURL,
    dataType:'json',
    jsonpCallback:'getJson',
    async: false, 
    success: function(response){
       investWFSLayer = L.geoJson(response,{
        });
    }
});

//1: Phase Table

var defaultPhaseParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:buildingphase_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var phaseParameters = L.Util.extend(defaultPhaseParameters);

var phaseURL = rootUrl + L.Util.getParamString(phaseParameters);
let phaseWFSLayer;

var phaseAjax = $.ajax({
  url:phaseURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     phaseWFSLayer = L.geoJson(response,{
      });
  }
});

//2: Phase Section Table

var defaultPhaseSecParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:phasesection_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var phaseSecParameters = L.Util.extend(defaultPhaseSecParameters);

var phaseSecURL = rootUrl + L.Util.getParamString(phaseSecParameters);
let phaseSecWFSLayer;

var phaseSecAjax = $.ajax({
  url:phaseSecURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     phaseSecWFSLayer = L.geoJson(response,{
      });
  }
});

//3: Earthfast Foundation Table

var defaultEarthfastParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:earthfound_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var earthfastParameters = L.Util.extend(defaultEarthfastParameters);

var earthfastURL = rootUrl + L.Util.getParamString(earthfastParameters);
let earthfastWFSLayer;

var earthfastAjax = $.ajax({
  url:earthfastURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     earthfastWFSLayer = L.geoJson(response,{
      });
  }
});

//4: Masonry Foundation Table

var defaultMasFoundParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:masonfound_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var masFoundParameters = L.Util.extend(defaultMasFoundParameters);

var masFoundURL = rootUrl + L.Util.getParamString(masFoundParameters);
let masFoundWFSLayer;

var masFoundAjax = $.ajax({
  url:masFoundURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     masFoundWFSLayer = L.geoJson(response,{
      });
  }
});

//5: Wood Piers / Stumps Table

var defaultWoodPiersParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:piers_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var woodPiersParameters = L.Util.extend(defaultWoodPiersParameters);

var woodPiersURL = rootUrl + L.Util.getParamString(woodPiersParameters);
let woodPiersWFSLayer;

var woodPiersAjax = $.ajax({
  url:woodPiersURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     woodPiersWFSLayer = L.geoJson(response,{
      });
  }
});

//6: Chimney Hearth

var defaultChimneyParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: '	PostGIS_Data:chimney_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var chimneyParameters = L.Util.extend(defaultChimneyParameters);

var chimneyURL = rootUrl + L.Util.getParamString(chimneyParameters);
let chimneyWFSLayer;

var chimneyAjax = $.ajax({
  url:chimneyURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     chimneyWFSLayer = L.geoJson(response,{
      });
  }
});

//7: Cellar / Sub-floor

var defaultCellarParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:cellar_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var cellarParameters = L.Util.extend(defaultCellarParameters);

var cellarURL = rootUrl + L.Util.getParamString(cellarParameters);
let cellarWFSLayer;

var cellarAjax = $.ajax({
  url:cellarURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     cellarWFSLayer = L.geoJson(response,{
      });
  }
});

//8: Roof

var defaultRoofParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:roof_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var roofParameters = L.Util.extend(defaultRoofParameters);

var roofURL = rootUrl + L.Util.getParamString(roofParameters);
let roofWFSLayer;

var roofAjax = $.ajax({
  url:roofURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     roofWFSLayer = L.geoJson(response,{
      });
  }
});

//9: Shingles

var defaultShingleParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:shingle_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var shingleParameters = L.Util.extend(defaultShingleParameters);

var shingleURL = rootUrl + L.Util.getParamString(shingleParameters);
let shingleWFSLayer;

var shingleAjax = $.ajax({
  url:shingleURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     shingleWFSLayer = L.geoJson(response,{
      });
  }
});

//10: Windows

var defaultWindowParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:window_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var windowParameters = L.Util.extend(defaultWindowParameters);

var windowURL = rootUrl + L.Util.getParamString(windowParameters);
let windowWFSLayer;

var windowAjax = $.ajax({
  url:windowURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     windowWFSLayer = L.geoJson(response,{
      });
  }
});

//11: Dormers

var defaultDormerParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:dormer_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var dormerParameters = L.Util.extend(defaultDormerParameters);

var dormerURL = rootUrl + L.Util.getParamString(dormerParameters);
let dormerWFSLayer;

var dormerAjax = $.ajax({
  url:dormerURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     dormerWFSLayer = L.geoJson(response,{
      });
  }
});

//12: Bricks

var defaultBrickParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:brick_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var brickParameters = L.Util.extend(defaultBrickParameters);

var brickURL = rootUrl + L.Util.getParamString(brickParameters);
let brickWFSLayer;

var brickAjax = $.ajax({
  url:brickURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     brickWFSLayer = L.geoJson(response,{
      });
  }
});

//13: Miscellaneous Finishes

var defaultMiscParameters = {
  service: 'WFS',
  version: '1.1.0',
  request: 'GetFeature',
  typeName: 'PostGIS_Data:miscfinish_table',
  outputFormat: 'application/json',
  format_options:'callback:getJson',
  SrsName:'EPSG:404000'
};

var miscParameters = L.Util.extend(defaultMiscParameters);

var miscURL = rootUrl + L.Util.getParamString(miscParameters);
let miscWFSLayer;

var miscAjax = $.ajax({
  url:miscURL,
  dataType:'json',
  jsonpCallback:'getJson',
  async: false, 
  success: function(response){
     miscWFSLayer = L.geoJson(response,{
      });
  }
});

//Add Building Sites (footprints w/ geometry)

var defaultParameters = {
    service: 'WFS',
    version: '1.1.0',
    request: 'GetFeature',
    typeName: 'PostGIS_Data:sites',
    outputFormat: 'application/json',
    format_options:'callback:getJson',
    SrsName:'EPSG:4326'
};

var parameters = L.Util.extend(defaultParameters);

var URL = rootUrl + L.Util.getParamString(parameters);
let WFSLayer;

let style = {
  stroke: true,
    color: 'black',
    weight: 1,
    fillColor:'efefef',
    fillOpacity:0.2
}

var ajax = $.ajax({
    url:URL,
    dataType:'json',
    jsonpCallback:'getJson',
    async: false, 
    success: function(response){
       WFSLayer = L.geoJson(response,{
            style:function(feature){
                return {
                    stroke: true,
                    color: 'black',
                    weight: 1,
                    fillColor:'efefef',
                    fillOpacity:0.2
                };
            },
            onEachFeature: function (feature, layer){
                
                //Original for loop - reference///

                /*for (var i = 0; i < investAjax.responseJSON.features.length; i++) {
                  if (feature.properties.siteid === investAjax.responseJSON.features[i].properties.site_id) {
                    for (var key in investAjax.responseJSON.features[i].properties) {
                      feature.properties[key] = investAjax.responseJSON.features[i].properties[key];
                    }
                  }
                }*/

                //0: Investigator Table///

                let investHTML = '';

                function invest_Loop() {
                  investHTML = '';
                  let counter = 0;
                  for (var i = 0; i < investAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === investAjax.responseJSON.features[i].properties.site_id) {
                        counter += 1;

                        investHTML += `<table><tr><td><b>Investigator ${counter}</b></td></tr></table>
                        
                        <table><tr><td><b>Name: </b></td><td>${investAjax.responseJSON.features[i].properties.investigator}</td></tr><tr><td><b>Institution: </b></td><td>${investAjax.responseJSON.features[i].properties.institution}</td></tr><tr><td><b>Project: </b></td><td>${investAjax.responseJSON.features[i].properties.project}</td></tr><tr><td><b>Start Year: </b></td><td>${investAjax.responseJSON.features[i].properties.start_year}</td></tr><tr><td><b>End Year: </b></td><td>${investAjax.responseJSON.features[i].properties.end_year}</td></tr><tr><td><b>Nature of Investigation: </b></td><td>${investAjax.responseJSON.features[i].properties.nature_invest}</td></tr><tr><td><b>Biographical Notes on Investigators: </b></td><td>${investAjax.responseJSON.features[i].properties.biog_invest}</td></tr><tr><td><b>Notes: </b></td><td>${investAjax.responseJSON.features[i].properties.notes}</td></tr><tr><td><b>Bibliography: </b></td><td>${investAjax.responseJSON.features[i].properties.bibliography}</td></tr></table>`;
                    }
                  }

                  if (investHTML === '') {
                    investHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};
                };

                //1: Building Phase Table///

                let buildPhaseHTML = '';

                function build_Phase_Loop() {
                  buildPhaseHTML = '';
                  for (var i = 0; i < phaseAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === phaseAjax.responseJSON.features[i].properties.site_id) {
                      buildPhaseHTML += `<table><tr><td><b>Building Phase: ${phaseAjax.responseJSON.features[i].properties.building_phase}</td></tr></table>
                      
                      <table><tr><td><b>Phase Name: </b></td><td>${phaseAjax.responseJSON.features[i].properties.phse_name}</td></tr><tr><td><b>Occupant / Owner: </b></td><td>${phaseAjax.responseJSON.features[i].properties.occ_own}</td></tr><tr><td><b>Occupant / Owner Title: </b></td><td>${phaseAjax.responseJSON.features[i].properties.occ_title_etc}</td></tr></table>
                      
                      <table><tr><td><b>Phase Start: </b></td><td>${phaseAjax.responseJSON.features[i].properties.phse_start}</td><td><b>Phase Start Span:</b></td><td>${phaseAjax.responseJSON.features[i].properties.phse_start_span}</td></tr><tr><td><b>Phase End:</b></td><td>${phaseAjax.responseJSON.features[i].properties.phse_end}</td><td><b>Phase End Span:</b></td><td>${phaseAjax.responseJSON.features[i].properties.phse_end_span}</td></tr></table>
                      `;
                    }
                  }

                  if (buildPhaseHTML === '') {
                    buildPhaseHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};
                };



                //2: Building Phase Section Table///

                let buildPhaseSecHTML = '';

                function build_Phase_Sec_Loop() {
                  buildPhaseSecHTML = '';
                  for (var i = 0; i < phaseSecAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === phaseSecAjax.responseJSON.features[i].properties.site_id) {
                      buildPhaseSecHTML += `<table><tr><td><b>Building Phase: ${phaseSecAjax.responseJSON.features[i].properties.building_phase} | Section: ${phaseSecAjax.responseJSON.features[i].properties.section_num}</td></tr></table>
                      
                      <table><tr><td><b>Section Name: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.section_nme}</td></tr><tr><td><b>Section Type: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.section_typ}</td></tr><tr><td><b>Section Number of Stories: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.section_num_stories}</td></tr><tr><td><b>Section Width: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.section_wdth}</td></tr><tr><td><b>Section Length: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.section_lngth}</td></tr><tr><td><b>Foundation Type: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.found_type}</td></tr><tr><td><b>Wall (Structure): </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.wall_structure}</td></tr><tr><td><b>Garret: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.garret}</td></tr><tr><td><b>Hearth Count, Ground Floor: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.hrth_cnt_grnd_flr}</td></tr><tr><td><b>Sub-Floor Pit Count: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.sb_flr_pit_cnt}</td></tr><tr><td><b>Cellar Count: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.cellar_cnt}</td></tr><tr><td><b>Number of Rooms in Section: </b></td><td>${phaseSecAjax.responseJSON.features[i].properties.num_rms_section}</td></tr></table>`;
                    }
                  }

                  if (buildPhaseSecHTML === '') {
                    buildPhaseSecHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};
                };

                //3: Earthfast Foundation Table///

                let earthfastHTML = '';
                
                function earthfast_Loop() {
                  earthfastHTML = '';
                  for (var i = 0; i < earthfastAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === earthfastAjax.responseJSON.features[i].properties.site_id) {
                        earthfastHTML += `<table><tr><td><b>Associated Building Phase: </b>${earthfastAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Section: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.section}</td></tr><tr><td><b>Degree Post Alignment: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.dgree_pst_align}</td></tr><tr><td><b>Manner of Framing: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.mnnr_frme}</td></tr><tr><td><b>Principal Post Shape: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.prnc_pst_shp}</td></tr><tr><td><b>Post Dimensions: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.pst_dimensions}</td></tr><tr><td><b>Post Measuring Unit: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.pst_meas_unit}</td></tr><tr><td><b>Posthole Profile: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.psthle_prfile}</td></tr><tr><td><b>Assembly Type: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.assemb_typ}</td></tr><tr><td><b>Principle Posthole Orientation: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.prnc_psthle_orient}</td></tr><tr><td><b>Bottom of Posts Burned?: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.post_burned}</td></tr><tr><td><b>Masonry between Posts?: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.masonry_psts}</td></tr><tr><td><b>Earthfast Studs?: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.earthfst_stds}</td></tr><tr><td><b>Paired Posts?: </b></td><td>${earthfastAjax.responseJSON.features[i].properties.paired_psts}</td></tr><tr><td><b>Angled Posts: Outside Building? </b></td><td>${earthfastAjax.responseJSON.features[i].properties.angld_psts_outside}</td></tr><tr><td><b>Angled Posts: Inside Building? </b></td><td>${earthfastAjax.responseJSON.features[i].properties.angld_psts_inside}</td></tr></table>
                        
                        <table><tr><td><b>Bay 1 Dimensions:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_1_dim}</td><td><b>Bay 1 Location:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_1_loc}</td></tr><tr><td><b>Bay 2 Dimensions:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_2_dim}</td><td><b>Bay 2 Location:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_2_loc}</td></tr><tr><td><b>Bay 3 Dimensions:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_3_dim}</td><td><b>Bay 3 Location:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_3_loc}</td></tr><tr><td><b>Bay 4 Dimensions:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_4_dim}</td><td><b>Bay 4 Location:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_4_loc}</td></tr><tr><td><b>Bay 5 Dimensions:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_5_dim}</td><td><b>Bay 5 Location:</b></td><td>${earthfastAjax.responseJSON.features[i].properties.bay_5_loc}</td></tr><table>`;
                    }
                  }

                  if (earthfastHTML === '') {
                    earthfastHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //4: Masonry Table///

                let masFoundHTML = '';
                
                function masFound_Loop() {
                  masFoundHTML = '';
                  for (var i = 0; i < masFoundAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === masFoundAjax.responseJSON.features[i].properties.site_id) {
                        masFoundHTML += `<table><tr><td><b>Associated Building Phase: </b>${masFoundAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Section: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.section}</td></tr><tr><td><b>Stone: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.stone}</td></tr><tr><td><b>Stone Type: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.stn_typ}</td></tr><tr><td><b>Stone Foundation Thickness: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.stn_fnd_thcknss}</td></tr><tr><td><b>Measurement Unit: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.stn_fnd_meas_unit}</td></tr></table>
                        
                        <table><tr><td><b>Brick: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.brick}</td></tr><tr><td><b>Brick Foundation Thickness: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.brk_fnd_thcknss}</td></tr><tr><td><b>Measurement Unit: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.brk_fnd_meas_unit}</td></tr><tr><td><b>Length: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.brk_fnd_dim_lgth}</td></tr><tr><td><b>Width: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.brk_fnd_dim_wdth}</td></tr><tr><td><b>Height: </b></td><td>${masFoundAjax.responseJSON.features[i].properties.brk_fnd_dim_hght}</td></tr></table>`;
                    }
                  }

                  if (masFoundHTML === '') {
                    masFoundHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //5: Masonry Table///

                let woodPiersHTML = '';
                
                function woodPiers_Loop() {
                  woodPiersHTML = '';
                  for (var i = 0; i < woodPiersAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === woodPiersAjax.responseJSON.features[i].properties.site_id) {
                        woodPiersHTML += `<table><tr><td><b>Associated Building Phase: </b>${woodPiersAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Section: </b></td><td>${woodPiersAjax.responseJSON.features[i].properties.section}</td></tr><tr><td><b>Wood Piers: </b></td><td>${woodPiersAjax.responseJSON.features[i].properties.wood_piers}</td></tr><tr><td><b>Material: </b></td><td>${woodPiersAjax.responseJSON.features[i].properties.material}</td></tr><tr><td><b>Notes: </b></td><td>${woodPiersAjax.responseJSON.features[i].properties.notes}</td></tr></table>`;
                    }
                  }

                  if (woodPiersHTML === '') {
                    woodPiersHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //6: Chimney Table///

                let chimneyHTML = '';
                
                function chimney_Loop() {
                  chimneyHTML = '';
                  for (var i = 0; i < chimneyAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === chimneyAjax.responseJSON.features[i].properties.site_id) {
                        chimneyHTML += `<table><tr><td><b>Associated Building Phase: </b>${chimneyAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Section: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.section}</td></tr><tr><td><b>Shared: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.shared}</td></tr><tr><td><b>Shared Section Name: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.shared_sect_nme}</td></tr><tr><td><b>Chimney Type: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.chimney_typ}</td></tr><tr><td><b>Chimney Location: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.chimney_loc}</td></tr><tr><td><b>Chimney Material: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.chimney_mat}</td></tr><tr><td><b>Hearth Material: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.hearth_mat}</td></tr><tr><td><b>Firebox Lining: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.firebox_lin}</td></tr><tr><td><b>Outside Dimensions: Length: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.outside_dim_lgth}</td></tr><tr><td><b>Outside Dimensions: Width: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.outside_dim_wdth}</td></tr><tr><td><b>Interior Firebox: Length: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.int_firebox_lgth}</td></tr><td><b>Interior Firebox: Width: </b></td><td>${chimneyAjax.responseJSON.features[i].properties.int_firebox_wdth}</td></tr></table>`;
                    }
                  }

                  if (chimneyHTML === '') {
                    chimneyHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //7: Cellar Table///

                let cellarHTML = '';
                
                function cellar_Loop() {
                  cellarHTML = '';
                  for (var i = 0; i < cellarAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === cellarAjax.responseJSON.features[i].properties.site_id) {
                        cellarHTML += `<table><tr><td><b>Associated Building Phase: </b>${cellarAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Section: </b></td><td>${cellarAjax.responseJSON.features[i].properties.section}</td></tr><tr><td><b>Feature Number or Name: </b></td><td>${cellarAjax.responseJSON.features[i].properties.feat_name}</td></tr><tr><td><b>Cellar / Sub-Floor Type: </b></td><td>${cellarAjax.responseJSON.features[i].properties.cell_subflr_type}</td></tr><tr><td><b>Cellar / Sub-Floor Lining: </b></td><td>${cellarAjax.responseJSON.features[i].properties.cell_subflr_lin}</td></tr><tr><td><b>Sub-Floor Distance from Hearth: </b></td><td>${cellarAjax.responseJSON.features[i].properties.subflr_dist_hrth}</td></tr><tr><td><b>Measuring Unit: </b></td><td>${cellarAjax.responseJSON.features[i].properties.subflr_meas_unit}</td></tr><tr><td><b>Cellar / Sub-Floor Dimensions: Length: </b></td><td>${cellarAjax.responseJSON.features[i].properties.cell_subflr_dim_lgth}</td></tr><tr><td><b>Cellar / Sub-Floor Dimensions: Width: </b></td><td>${cellarAjax.responseJSON.features[i].properties.cell_subflr_dim_wdth}</td></tr><tr><td><b>Cellar / Sub-Floor Dimensions: Depth: </b></td><td>${cellarAjax.responseJSON.features[i].properties.cell_subflr_dim_dpth}</td></tr></table>`;
                    }
                  }

                  if (cellarHTML === '') {
                    cellarHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //8: Roof Table///

                let roofHTML = '';
                
                function roof_Loop() {
                  roofHTML = '';
                  for (var i = 0; i < roofAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === roofAjax.responseJSON.features[i].properties.site_id) {
                        roofHTML += `<table><tr><td><b>Associated Building Phase: </b>${roofAjax.responseJSON.features[i].properties.assoc_phase}</td></tr></table>
                        
                        <table><tr><td><b>Roof Material: </b></td><td>${roofAjax.responseJSON.features[i].properties.roof_mat}</td></tr><tr><td><b>Roof Form: </b></td><td>${roofAjax.responseJSON.features[i].properties.roof_form}</td></tr><tr><td><b>Roof Truss Type: </b></td><td>${roofAjax.responseJSON.features[i].properties.roof_trss_typ}</td></tr><tr><td><b>False Plate Type: </b></td><td>${roofAjax.responseJSON.features[i].properties.false_plate_typ}</td></tr></table>`;
                    }
                  }

                  if (roofHTML === '') {
                    roofHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //9: Shingles Table///

                let shinglesHTML = '';
                
                function shingles_Loop() {
                  shinglesHTML = '';
                  for (var i = 0; i < shingleAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === shingleAjax.responseJSON.features[i].properties.site_id) {
                        shinglesHTML += `<table><tr><td><b>Associated Building Phase: </b>${shingleAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Shingle Quality: </b></td><td>${shingleAjax.responseJSON.features[i].properties.quality}</td></tr><tr><td><b>Butt Shape: </b></td><td>${shingleAjax.responseJSON.features[i].properties.butt_shp}</td></tr><tr><td><b>Shingle Type: </b></td><td>${shingleAjax.responseJSON.features[i].properties.shng_typ}</td></tr><tr><td><b>Paint: </b></td><td>${shingleAjax.responseJSON.features[i].properties.paint}</td></tr><tr><td><b>Butt Thickness: </b></td><td>${shingleAjax.responseJSON.features[i].properties.butt_thick}</td></tr><tr><td><b>Length: </b></td><td>${shingleAjax.responseJSON.features[i].properties.lngth}</td></tr><tr><td><b>Width: </b></td><td>${shingleAjax.responseJSON.features[i].properties.width}</td></tr><tr><td><b>Exposure: </b></td><td>${shingleAjax.responseJSON.features[i].properties.exposure}</td></tr><tr><td><b>Nail: </b></td><td>${shingleAjax.responseJSON.features[i].properties.nail}</td></tr><tr><td><b>Wood Species: </b></td><td>${shingleAjax.responseJSON.features[i].properties.specie}</td></tr><tr><td><b>Shingle Preparation: </b></td><td>${shingleAjax.responseJSON.features[i].properties.prep}</td></tr></table>`;
                    }
                  }

                  if (shinglesHTML === '') {
                    shinglesHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //10: Windows Table///

                let windowsHTML = '';
                
                function windows_Loop() {
                  windowsHTML = '';
                  for (var i = 0; i < windowAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === windowAjax.responseJSON.features[i].properties.site_id) {
                        windowsHTML += `<table><tr><td><b>Associated Building Phase: </b>${windowAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Window Type: </b></td><td>${windowAjax.responseJSON.features[i].properties.window_typ}</td></tr><tr><td><b>Notes: </b></td><td>${windowAjax.responseJSON.features[i].properties.notes}</td></tr></table>`;
                    }
                  }

                  if (windowsHTML === '') {
                    windowsHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //11: Dormers Table///

                let dormerHTML = '';
                
                function dormers_Loop() {
                  dormerHTML = '';
                  for (var i = 0; i < dormerAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === dormerAjax.responseJSON.features[i].properties.site_id) {
                        dormerHTML += `<table><tr><td><b>Associated Building Phase: </b>${dormerAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Dormer Type: </b></td><td>${dormerAjax.responseJSON.features[i].properties.dormer_typ}</td></tr><tr><td><b>Notes: </b></td><td>${dormerAjax.responseJSON.features[i].properties.notes}</td></tr></table>`;
                    }
                  }

                  if (dormerHTML === '') {
                    dormerHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //12: Brick Table///

                let brickHTML = '';
                
                function brick_Loop() {
                  brickHTML = '';
                  for (var i = 0; i < brickAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === brickAjax.responseJSON.features[i].properties.site_id) {
                        brickHTML += `<table><tr><td><b>Associated Building Phase: </b>${brickAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Location: </b></td><td>${brickAjax.responseJSON.features[i].properties.brick_loc}</td></tr><tr><td><b>Stretcher: </b></td><td>${brickAjax.responseJSON.features[i].properties.stretcher}</td></tr><tr><td><b>Stretcher Range: </b></td><td>${brickAjax.responseJSON.features[i].properties.stretch_rnge}</td></tr><tr><td><b>Header: </b></td><td>${brickAjax.responseJSON.features[i].properties.header_size}</td></tr><tr><td><b>Header Range: </b></td><td>${brickAjax.responseJSON.features[i].properties.header_rnge}</td></tr><tr><td><b>Height: </b></td><td>${brickAjax.responseJSON.features[i].properties.height}</td></tr><tr><td><b>Height Range: </b></td><td>${brickAjax.responseJSON.features[i].properties.height_rnge}</td></tr><tr><td><b>Bed Joint Size: </b></td><td>${brickAjax.responseJSON.features[i].properties.bd_jnt_sze}</td></tr><tr><td><b>Head Joint Size: </b></td><td>${brickAjax.responseJSON.features[i].properties.hd_jnt_sze}</td></tr><tr><td><b>Height of Four Course: </b></td><td>${brickAjax.responseJSON.features[i].properties.hgt_four_crse}</td></tr><tr><td><b>Finish of Joint: </b></td><td>${brickAjax.responseJSON.features[i].properties.jnt_finish}</td></tr><tr><td><b>Bonding: </b></td><td>${brickAjax.responseJSON.features[i].properties.bonding}</td></tr><tr><td><b>Brick Color: </b></td><td>${brickAjax.responseJSON.features[i].properties.color}</td></tr><tr><td><b>Mortar Type: </b></td><td>${brickAjax.responseJSON.features[i].properties.mrtr_type}</td></tr></table>`;
                    }
                  }

                  if (brickHTML === '') {
                    brickHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                //13: Brick Table///

                let miscHTML = '';
                
                function misc_Loop() {
                  miscHTML = '';
                  for (var i = 0; i < miscAjax.responseJSON.features.length; i++) {
                    if (feature.properties.siteid === miscAjax.responseJSON.features[i].properties.site_id) {
                        miscHTML += `<table><tr><td><b>Associated Building Phase: </b>${miscAjax.responseJSON.features[i].properties.assoc_phse}</td></tr></table>
                        
                        <table><tr><td><b>Floor Material, Cellar: </b></td><td>${miscAjax.responseJSON.features[i].properties.flr_mat_cellar}</td></tr><tr><td><b>Floor Material, Ground Floor: </b></td><td>${miscAjax.responseJSON.features[i].properties.flr_mat_grndflr}</td></tr><tr><td><b>Cupola: </b></td><td>${miscAjax.responseJSON.features[i].properties.cupola}</td></tr><tr><td><b>Cornice: </b></td><td>${miscAjax.responseJSON.features[i].properties.cornice}</td></tr><tr><td><b>Profile / Type: </b></td><td>${miscAjax.responseJSON.features[i].properties.prof_type}</td></tr></table>`;
                    }
                  }

                  if (miscHTML === '') {
                    miscHTML += `<table><tr><td>No records yet entered</td></tr></table>`
                  } else {};

                };

                /*let instVar = 'Not determined';

                if (feature.properties.institution == null) {
                  testVar = 'Not determined';
                } else {
                  testVar = feature.properties.institution;
                };*/

                let highlight = {
                  weight: 3,
                  color: '#41f4d9',
                  dashArray: '',
                  fillColor: '#84e8d9',
                  fillOpacity: 0.5
                };

                layer.on("click", function(e) {
                  WFSLayer.setStyle(style);
                  layer.setStyle(highlight);
                });
                

                function textPopulate () {
                  $('#siteNameText').html(`${feature.properties.blding_nme}`);
                  $('#siteAddText').html(`${feature.properties.address}`);
                  $('#cityStateText').html(`${feature.properties.city_vicinity}, ${feature.properties.stte}`)
                  $('#evidenceText').html(`Principal Evidence Type: ${feature.properties.prncpl_evid_type}`)
                }

                layer.bindPopup(function () {
                    invest_Loop();
                    build_Phase_Loop();
                    build_Phase_Sec_Loop();
                    earthfast_Loop();
                    masFound_Loop();
                    woodPiers_Loop();
                    chimney_Loop();
                    cellar_Loop();
                    roof_Loop();
                    dormers_Loop();
                    shingles_Loop();
                    windows_Loop();
                    brick_Loop();
                    misc_Loop();
                    textPopulate();
                    sidebar.show();
                    document.getElementById('investDiv').innerHTML = `${investHTML}`
                    document.getElementById('phaseDiv').innerHTML = `${buildPhaseHTML}`
                    document.getElementById('phaseSecDiv').innerHTML = `${buildPhaseSecHTML}`
                    document.getElementById('earthfastDiv').innerHTML = `${earthfastHTML}`
                    document.getElementById('masFoundDiv').innerHTML = `${masFoundHTML}`
                    document.getElementById('woodPiersDiv').innerHTML = `${woodPiersHTML}`
                    document.getElementById('chimneyDiv').innerHTML = `${chimneyHTML}`
                    document.getElementById('cellarDiv').innerHTML = `${cellarHTML}`
                    document.getElementById('roofDiv').innerHTML = `${roofHTML}`
                    document.getElementById('shinglesDiv').innerHTML = `${shinglesHTML}`
                    document.getElementById('windowsDiv').innerHTML = `${windowsHTML}`
                    document.getElementById('dormersDiv').innerHTML = `${dormerHTML}`
                    document.getElementById('brickDiv').innerHTML = `${brickHTML}`
                    document.getElementById('miscDiv').innerHTML = `${miscHTML}`
                    /*return L.Util.template(
                      content, layer.feature.properties, 
                    );*/
                });
            }
        }).addTo(map);

        

        map.on('click', function (e) {
          WFSLayer.setStyle(style)
          sidebar.hide();
        ;})

        sidebar.on('hidden', function () {
          WFSLayer.setStyle(style);
        })

    }

});
