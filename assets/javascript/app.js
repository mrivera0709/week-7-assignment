
	// Initialize Firebase
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
	
	console.log(trainData);

	// 2. Button for adding Trains
	$("#addTrain").on("click", function()
		{

		// Grabs user input and assign to variables
		var trainName = $("#addName").val().trim();
		var trainDestination = $("#addDestination").val().trim();
		var trainTime = $("#addTime").val().trim();
		var trainFrequency = $("#addFrequency").val().trim();

		// Test for variables entered
		console.log("Train Name: " + trainName);
		console.log("Train Destination: " + trainDestination);
		console.log("Train Time: " + trainTime);
		console.log("Train Frequency: " + trainFrequency);

		// Creates local "temporary" object for holding train data
		// Will push this to firebase
		var newTrain = 
			{
			name: trainName,
			destination: trainDestination,
			time: trainTime,
			frequency: trainFrequency,
			}
		
		console.log(newTrain);
		
		// pushing trainInfo to Firebase
		$(trainData).push(newTrain);
		console.log(trainData);

		// clear text-boxes
		$("#addName").val("");
		$("#addDestination").val("");
		$("#addTime").val("");
		$("#addFrequency").val("");

		// Prevents page from refreshing
		return false;
		});

	trainData.ref().on("value", function(childSnapshot, prevChildKey)
		{

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTime = childSnapshot.val().time;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTime), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTime), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

		});

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