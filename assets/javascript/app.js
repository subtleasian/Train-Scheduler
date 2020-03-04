  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD8Rccd-Iewu3pcH6yVWm4gSYgR-JeE_eM",
    authDomain: "train-scheduler-dd143.firebaseapp.com",
    databaseURL: "https://train-scheduler-dd143.firebaseio.com",
    projectId: "train-scheduler-dd143",
    storageBucket: "train-scheduler-dd143.appspot.com",
    messagingSenderId: "549505317003",
    appId: "1:549505317003:web:0c4855b8c58f1b21d87c8e",
    measurementId: "G-4KMVYHHTMN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";

  $("#add-train").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();

    firebase.database().ref().push({
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");


  })

  firebase.database().ref().on("child_added",function(snapshot) {
    console.log(snapshot.val());

    var firstTime = snapshot.val().firstTime;
    var arrTime = firstTime.split(":");
    var trainTime = moment().hours(arrTime[0]).minutes(arrTime[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tArrival; 
    var tMinutes;
    

    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
      var diffTimes = moment().diff(trainTime, "minutes");
      var tRemainder = diffTimes % snapshot.val().frequency;
      tMinutes = snapshot.val().frequency - tRemainder;
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }


    var newTr = $("<tr>");
    var trainTd = $("<td>").text(snapshot.val().trainName);
    var destinationTd = $("<td>").text(snapshot.val().destination);
    var frequencyTd = $("<td>").text(snapshot.val().frequency);
    var arrTd = $("<td>").text(tArrival);
    var minAwayTd = $("<td>").text(tMinutes);
    
    newTr.append(trainTd, destinationTd, frequencyTd, arrTd, minAwayTd);
    $("#train-list").append(newTr);

  });