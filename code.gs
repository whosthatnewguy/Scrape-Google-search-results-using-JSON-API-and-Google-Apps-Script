function gSearch(){
  var CSE = ""; //custom key
  var KEY = ""; //custom key
  var api = "https://www.googleapis.com/customsearch/v1?key=" + KEY + "&cx=" + CSE + "&q=" + encodeURIComponent("cat");
  
try {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName("Sheet1");
  var range = s.getRange(1,1);
    var response = UrlFetchApp.fetch(api, {
      muteHttpExceptions: true
    });

    if (response.getResponseCode() == 200) {

      var content = JSON.parse(response);

      // Did the search return any results?
      if (content.searchInformation.totalResults > 0) {

        var count = content.items.length;

        for (var i = 0; i < count; i++) {

          // Save the page title, description and hyperlink
          
          Logger.log(content.items[i].title);
          Logger.log(content.items[i].snippet);
          Logger.log(content.items[i].link);
          range.setValues(content.items[i].title)
        }
      }
    }
  } catch (f) {
    Logger.log(f.toString());
  }

}
