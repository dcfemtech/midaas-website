var dataSet = {};

function callMidaas(ageGroup, year){
  var EPurl = "https://api.commerce.gov/midaas/distribution?";
    EPurl += "year=" + year;
    // EPurl += "&sex=" + gender;
    EPurl += "&agegroup=" + ageGroup;
    EPurl += "&callbackname=JSON_CALLBACK";
    EPurl += "&api_key=YvcIGwzbGiud9JcHl0gPnVJXH5B4s7b5fXOkOVuq";

  $.getJSON(EPurl, {
    format: "json"
  })
  .done(function(data){
    data["age-group"] = ageGroup;
    dataSet[year] = data;
  })
}

var genders = ["female", "male"];
var ageGroups = ["18-24", "25-34", "35-44", "45-54", "55-64", "65%2B"];
var years = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"];

for (var j = 0; j < years.length; j ++){
  dataSet[years[j]] = []
  for (var i = 0; i < ageGroups.length; i ++){
    callMidaas(ageGroups[i], years[j]);
  }
}
