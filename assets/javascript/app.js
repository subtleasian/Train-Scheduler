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

  $("#add-train").on("click", function() {
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();

    firebase.database().ref().push({
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
      // dataAdded: firebase.database.ServerValue.TIMESTAMP
    })

  })

  firebase.database().ref().on("value",function(snapshot) {
    console.log(snapshot.val());
    var newTr = $("<tr>");
    var trainTd = $("<td>").text(snapshot.val().trainName);
    var destinationTd = $("<td>").text(snapshot.val().destination);
    var frequencyTd = $("<td>").text(snapshot.val().frequency);

    // add Td for Next Arrival
    // add Td for minutes away
    
    newTr.append(trainTd, destinationTd, frequencyTd);
    $("#train-list").append(newTr);

  });