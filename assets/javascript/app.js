//==============================================================
//// FIREBASE //////////////////////////////////////////////
//==============================================================
  var config = 
  	{
    apiKey: "AIzaSyAO49cVwfh3VgN-HuK51JPqemid10xtous",
    authDomain: "choochooscheduler.firebaseapp.com",
    databaseURL: "https://choochooscheduler.firebaseio.com",
    projectId: "choochooscheduler",
    storageBucket: "",
    messagingSenderId: "573556616412"
  	};
  
  firebase.initializeApp(config);
	
	// 1. Link to Firebase
	var trainData = firebase.database();
	console.log("Firebase Data : ")
	console.log(trainData)
	console.log("============================================")
	
//==============================================================
//// ADDING TRAIN //////////////////////////////////////////////
//==============================================================
	$("#addTrain").on("click", function(event)
		{
		event.preventDefault();
		
		// Collect user entered data and assigns as a variable
		var trainName = $("#addName").val().trim();
		var trainDestination = $("#addDestination").val().trim();
		var trainTime = $("#addTime").val().trim();
		var trainFrequency = $("#addFrequency").val().trim();

		// Creates new object to hold the data to push to firebase
		var newTrain = 
			{
			name: trainName,
			destination: trainDestination,
			time: trainTime,
			frequency: trainFrequency,
			}
		
		// Push train object to firebase
		trainData.ref().push(newTrain);
			
			console.log("NEW TRAIN")
			console.log("Train Name: " + newTrain.name + "    ||||    Train Destination: " + newTrain.destination + "    ||||    Train Time: " + newTrain.time + "    ||||    Train Frequency: " + newTrain.frequency);
			console.log("============================================")

		// clear text-boxes
		$("#addName").val("");
		$("#addDestination").val("");
		$("#addTime").val("");
		$("#addFrequency").val("");

		});
		
//==============================================================
//// TABLE DATA ////////////////////////////////////////////////
//==============================================================

	trainData.ref().on("child_added", function(childSnapshot, prevChildKey)
		{

		// Assign firebase variables to snapshots.
		var trainName = childSnapshot.val().name;
		var trainDestination = childSnapshot.val().destination;
		var trainTime = childSnapshot.val().time;
		var trainFrequency = childSnapshot.val().frequency;

		var startTime = moment(trainTime, "hh:mm").subtract(1, "years");
		var currentTime = moment().format("hh:mm");
		
			console.log(trainName)
			console.log("    Train Time : " + trainTime + "         ||||   Train Frequency : " + trainFrequency + "   ||||   Start Time : " + trainTime + "  ||||   Current Time : " +  currentTime);
		
		// Calculate next arrival and minutes away.
		var timeDifference = moment().diff(moment(startTime), "minutes");
		var timeRemainder = timeDifference % trainFrequency ;
		var minutesAway = trainFrequency - timeRemainder;
		var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm a"); 
		
			console.log("    Time Difference : " + timeDifference + "   ||||   Time Remainder : " + timeRemainder + "    ||||   Minutes Away : " + minutesAway + "   ||||   Next Train Arrival : " + nextTrain)
	
		//var minutes = moment(nextTrain, "minutes").fromNow();

			console.log("============================================")
			
		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td class=center>" + trainFrequency + " mins" + "</td><td class=center>" + nextTrain + "</td><td class=center>" + minutesAway + "</td></tr>");
		
		});

//==============================================================
//// CSS ///////////////////////////////////////////////////////
//==============================================================

$("#hide").hide();
$("#add").hide();

	//------------------------------------------------------------ 
//Hide/Show Rules Function
$("#hide").click( function()
	{
  $("#add").hide("slow");
  $("#show").show();
  $("#hide").hide();
  });
  
$("#show").click( function()
	{
  $("#add").show("slow");
  $("#hide").show();
  $("#show").hide();
  });