
var reader; 
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true; 
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}


function readText(filePath) {
    var output = ""; 
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            displayContents(output);
        };
        reader.readAsText(filePath.files[0]);
    }/

    else { 
        return false;
    }       
    return true;
}   

function dialogMaker(txt) {

/*Need to work this out
finding /n doesn't work right, and made weird substrings
could be that I am too tired to figure out a simple mistake
will hard code, and come back
*/
}   

function workAround(){
    
var  n1=      "Agent";
var  l1=      “Hi, is this *P* speaking?”;

var   n2=     "Player";
var   l2=     “Yeah, who is this?”;

var   n3=     "Agent";
var   l3=     “*P,* hope all is well.  This is *U* from *NAME OF AGENCY*.  We met last week.”;

var   n4=    "Player";
var   l4=    “Oh, right. Yeah.”;

var   n5=     "Agent";
var   l5=     “As I said last week, I’d love to bring you on as part of the *NAME OF AGENCY family.”;

var   n6=     "Player";
var   l6=     “My family and I really liked your proposal.”;

var   n7=     "Agent";
var   l7=     “Let’s meet this week.  I can get to *CITY OF PERSON* tomorrow.”;

var   n8=     "Player";
var   l8=     “Tomorrow afternoon works for my family and me.”;
         
var   n9=     "Agent";
var   l9=     “Great, I’ll book a conference room at my partner’s office for 3pm. I’ll see you tomorrow!”;

 var dialog=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9]];
return dialog;
}