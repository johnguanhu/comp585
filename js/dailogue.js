function dialogue1(){
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
	return dial;
}


function dialogue2(){
	var n1 = "Agent";
	var l1 = "It’s time for you to manage your finances. Let’s go ahead and get a bank account set up and possibly get a credit card application on the way too.";

	var n2 = "Player";
	var l2 = "Okay, but is that really necessary though?";

	var n3 = "Agent";
	var l3 = "Having a bank account is an important step in keeping your money safe. A credit card also gives you cash back and helps you build good credit, which is extremely important when you need to make large purchases, rent items, and take out loans.";

	var n4 = "Player";
	var l4 = "Okay, I see. What bank should we go to?"

	var n5 = "Wells Fargo";
	var l5 = "   Minimum Opening Deposit:$50\n   Monthly Service Fee: $10\n   Service fee can be avoided by:\n     10 debit card purchases/payments\n     Qualifying total direct deposits of $500\n     Maintain a $1,500 minimum daily balance\n   Zero Liability Protection\n   Interest Rate: 0.01%";

	var n6 = "BestBank";
	var l6 = "   Minimum Opening Deposit:$500\n   Monthly Service Fee: $0\n   Complementary Overdraft Protection\n   Zero Liability Protection\n   Debi Card Chip Technology\n   Interest Rate: 0.03%\n   Mobile Banking";


	var n7 = "Bank of America";
	var l7 = "   Minimum Opening Deposit:$100\n   Monthly Service Fee: $12\n   Service fee can be avoided by:\n     Student under 23 years old\n     At least one qualifying direct deposit of $250\n     Maintain a $1,500 minimum daily balance\n   Mobile Banking\n   Secure Transfers\n   Interest Rate: 0.01%";

	var n8 = "Chase";
	var l8 = "   Minimum Opening Deposit:$25\n   Monthly Service Fee: $12\n   Service fee can be avoided by:\n     Direct deposits totaling $500\n     Average daily balance of $5,000 or more\n     Maintain a $1,500 minimum daily balance\n   Debit Card Chip Technology\n   Account Alerts and Overdraft Protection\n   Interest Rate: 0.01%";

	var n9 = "1"
	var l9 = "void";

	var n10 = "Agent";
	var l10 = "Based on the packages the banks offer, we should go to Wells Fargo.";

	var n11 = "Player";
	var l11 = "Okay, that sounds good.";

	var n12 = "Agent";
	var l12 = "Great, I’ll see you at Wells Fargo tomorrow. Don’t be late!";

	var n13 = "Money";
	var l13 = "-50";

	var n14 = "Happy";
	var l14 = "-50";

	var n15 = "end";
	var l15 = "Shouldn't matter";

	var n16 = "2"
	var l16 = "void";

	var n17 = "Agent";
	var l17 = "Based on the packages the banks offer, we should go to BestBank.";

	var n18 = "Player";
	var l18 = "That's a huge minimum deposit.";

	var n19 = "Agent";
	var l19 = "That’s alright, we have the money right now and the package that BestBank offers is by far the best choice.";

	var n20 = "Player";
	var l20 = "That's awesome. Thank you so much.";

	var n21 = "Agent";
	var l21 = "That’s my job. Great, I’ll see you at BestBank tomorrow. Don’t be late!";

	var n22 = "Money";
	var l22 = "-500";

	var n23 = "Happy";
	var l23 = "+500";

	var n24 = "end";
	var l24 = "Shouldn't matter";

	var n25 = "3"
	var l25 = "void";

	var n26 = "Agent";
	var l26 = "Based on the packages the banks offer, we should go to Bank of America.";

	var n27 = "Player";
	var l27 = "Okay, that sounds good.";

	var n28 = "Agent";
	var l28 = "Great, I’ll see you at Bank of America tomorrow. Don’t be late!";

	var n29 = "Money";
	var l29 = "-100";

	var n30 = "Happy";
	var l30 = "-50";

	var n31 = "end";
	var l31 = "Shouldn't matter";

	var n32 = "4"
	var l32 = "void";

	var n33 = "Agent";
	var l33 = "Based on the packages the banks offer, we should go to Chase Bank.";

	var n34 = "Player";
	var l34 = "Okay, that sounds good.";

	var n35 = "Agent";
	var l35 = "Great, I’ll see you at Chase Bank tomorrow. Don’t be late!";

	var n36 = "Money";
	var l36 = "-25";

	var n37 = "Happy";
	var l37 = "+50";

	var n38 = "end";
	var l38 = "Shouldn't matter";

	var dial=[[n1,l1],[n2,l2],[n3,l3],[n4,l4],[n5,l5],[n6,l6],[n7,l7],[n8,l8],[n9,l9],[n10,l10],[n11,l11],[n12,l12],[n13,l13],[n14,l14],[n15,l15],[n16,l16],[n17,l17],[n18,l18],[n19,l19],[n20,l20],[n21,l21],[n22,l22],[n23,l23],[n24,l24],[n25,l25],[n26,l26],[n27,l27],[n28,l28],[n29,l29],[n30,l30],[n31,l31],[n32,l32],[n33,l33],[n34,l34],[n35,l35],[n36,l36],[n37,l37],[n38,l38]];

	return dial;
}