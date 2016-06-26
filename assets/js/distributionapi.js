var dataSet = [];

function callMidaas(gender, ageGroup){
  var EPurl = "https://api.commerce.gov/midaas/distribution?";
    EPurl += "year=2005";
    EPurl += "&sex=" + gender;
    EPurl += "&agegroup=" + ageGroup;
    EPurl += "&callbackname=JSON_CALLBACK";
    EPurl += "&api_key=YvcIGwzbGiud9JcHl0gPnVJXH5B4s7b5fXOkOVuq";

  $.getJSON(EPurl, {
    format: "json"
  })
  .done(function(data){
    demographic = gender + " " + ageGroup;
    keyVal = {demographic : demographic, distribution: data}
    dataSet.push(keyVal)
  })
}

var genders = ["female", "male"];
var ageGroups = ["18-24", "25-34", "35-44", "45-54", "55-64", "65%2B"]

for (var i = 0; i < ageGroups.length; i ++){
  callMidaas("female", ageGroups[i]);
  callMidaas("male", ageGroups[i]);
}
