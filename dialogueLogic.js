function dialog(dial, ind){

    dialogBool=true;

    index=ind;

//make the parts of the dialog
    var name = game.add.text(100,30, ""); 
    var label = game.add.text(100,100, "");
    var next = game.add.button(100,300, "arrow"); 
  
//trying to kill that extra next
    next.inputEnabled=true;
     if (dial[index][0]=="end") {
        next.destroy();
    }
//on click move through the dialog
    next.onInputDown.add(function(){
        //if this doesn't work, increment the index and 
        //make happiness update first everytime

        if (dial[index][0]=="happy"){
            happyReader=parseInt(dial[index][1]);
            happiness=happiness+happyReader;
            dialog(dial,index+1);
        }
        if (dial[index][0]=="money"){
            moneyReader=parseInt(dial[index][1]);
            money=money+moneyReader;
            dialog(dial, index+1);
        }

        name.text=dial[index][0];
        label.text =dial[index][1];
        index=index+1;

//if hit end destroy all of the parts and run endDialog() 
//THIS IS BUGGY DOES NOT ACTUALLY DESTROY NEXT
// well it probably destroys A next, just not all of the nexts
//well, I fixed it, but I don't know why that fix worked

        if (dial[index][0]=="end") {
            endDialog();
            next.onInputUp.add(function(){
                label.destroy();
                name.destroy();
                next.destroy();
                endDialog();
                
            });
        }
        if (dial[index-1][0]=="end") {
            endDialog();
            next.onInputDown.add(function(){
                label.destroy();
                name.destroy();
                next.destroy();
                endDialog();
                
            });
        }

//runs decisionPoint() if given the choice tag
        if (dial[index][0]=="Choice") {
            next.onInputDown.add(function(){
                label.destroy();
                name.destroy();
                next.destroy();

                decisionPoint(dial, index,next);
            });
        }

        

    
    });


}
//lets pick some things
function decisionPoint( diag, index, next){

//make the parts, long, but couldn't get groups to handle this correctly, will come back to it
    var a=   game.add.text(100,40,diag[index-1][1]);
    var a1=  game.add.button(40,40,'box');
    var b=   game.add.text(100,80,diag[index+0][1]);
    var b1=  game.add.button(40,80,'box');
    var c=   game.add.text(100,120,diag[index+1][1]);
    var c1=  game.add.button(40,120,'box');
    var d=   game.add.text(100,160,diag[index+2][1]);
    var d1=  game.add.button(40,160,'box');
    a1.inputEnabled=true;
    b1.inputEnabled=true;
    c1.inputEnabled=true;
    d1.inputEnabled=true;
    var choice=[a,b,c,d];

    var stor=0;
//on click destroy everything and move to the next function 
    a1.onInputDown.add(function(){
  
        a.destroy();
        b.destroy();
        c.destroy();
        d.destroy();
        a1.destroy();
        b1.destroy();
        c1.destroy();
        d1.destroy();
        clearAndJump(diag,1,index,choice);
    });
    b1.onInputDown.add(function(){

        a.destroy();
        b.destroy();
        c.destroy();
        d.destroy();
        a1.destroy();
        b1.destroy();
        c1.destroy();
        d1.destroy();
        clearAndJump(diag,2,index,choice);
    });
    c1.onInputDown.add(function(){

        a.destroy();
        b.destroy();
        c.destroy();
        d.destroy();
        a1.destroy();
        b1.destroy();
        c1.destroy();
        d1.destroy();
        clearAndJump(diag,3,index,choice);
    });    
    d1.onInputDown.add(function(){

        a.destroy();
        b.destroy();
        c.destroy();
        d.destroy();
        a1.destroy();
        b1.destroy();
        c1.destroy();
        d1.destroy();
        clearAndJump(diag,4,index,choice);
    });



    //this is an attempt at code for an unknown number of choices, but we will decide it must be four
   /* for(var i=index; diag[i][0]="Choice";i++){
        stor=stor+1; 
        alert("here"+ stor);   

    //make the diag boxes
        //var choice=choices.create(100,100+50*i,'box');
        a.text=diag[index][i];
    //make them click to different values
     //   choice.input.onInputDown.add(function (){
     //       clearAndJump(diag, i, index)
     //   });
    //change the text to what I want
    //   choice.text()=diag[i][1];  
    }
    //read the click
        //this probably needs a func that jumps the diag    
 */
}

//this should jump the dialog to the label of the option selected
function clearAndJump(dial, i, index,choice){

  /*  for(var i=0;i<choice.length;i++){
        choice[i].kill();
    }
*/
    storage=-1;
    for (var x=index;x<dial.length;x++){

        var y=parseInt(dial[x][0]);
        if (y==i){
            storage=x+1;
        }
    }
    if (storage==-1){
        alert("There was no further dialog for that option");
        endDialog();
    }
    else{
       dialog(dial, storage);
    }
}

//should reset dialogBool to false and fix the bg
function endDialog(){

    dialogBool=false;
    game.stage.backgroundColor = '#000000';  
    return;

}

//this is a workaround
//user selections don't swap between dialogues, it swaps within dialogues
    var  n1=      "Agent";
    var  l1=      "Hi, is this *P* speaking?";

    var   n2=     "Player";
    var   l2=     "Yeah, who is this?";

    var   n3=     "Agent";
    var   l3=     "*P,* hope all is well.  This is *U* from *NAME OF AGENCY*.  We met last week.";

    var   n4=    "Player";
    var   l4=    "Oh, right. Yeah.";

    //example choices - you can saw whatever you want
    //as it stands, needs to be 4 choice options as it will make 4 options
    //if you click second box, it will jump to next instance of "2" in dialogue where 2 is in name slot
    //Then you push to next spot in array (obviously don't print 2/void) and then continues
    //end tag will cause dialogue to end.
     //if you want to increase money or happiness in dialogue, if the name of the speaker is money & text is a number, it shoudl increment or decrement happiness by specific amount.

    var   n5=     "Choice";
    var   l5=     "1";

    var   n6=     "Choice";
    var   l6=     "2";

    var   n7=     "Choice";
    var   l7=     "3";

    var   n8=     "Choice";
    var   l8=     "4";
    
    var   n9=       "2";
    var   l9=       "void";

    var   n10=     "Player";
    var   l10=     "You picked 2";


    var   n11=     "";
    var   l11=      "";

    var   n12=     "end";
    var   l12=      "Shouldn't matter";
    var dial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9],[n10,l10],[n11,l11],[n12,l12]];
    //end workaround

//these are clearly placeholders for actual dialog
var dial00= dial; 
var dial01= dial;
var dial10= dial;
var dial11= dial;
var here=[["error0","error1"],["error2","error3"]];
var dialTable=[[dial00,dial01],[dial10,dial11]];

function dialogSelecter(hap, mon){
    happ=hap;
    mone=mon;
    if (happ>9){
        happ=9;
    }
    if (mone>9){
        mone=9;
    }
    var x=Math.floor(happ/5);
    var y=Math.floor(mone/5);
    here=dialTable[x][y];
 
    return here;

}



function collisionHandler (obj1, obj2) {
    //FIND OUT WHICH OBJECT IS WHICH


    dude.body.drag.setTo(3000);
    // dude.body.immovable = true;
    // to prevent starting the converstation more than once

    if(!dialogBool){
    //should actually pass this to a dialog picker
        var selected=dialogSelecter(happiness, money);
        dialog(selected, 0);
    }
    game.stage.backgroundColor = '#992d2d';    
}