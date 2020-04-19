var streamersLive = [];

console.log("I am running");

function searchStreamers() {
  var streamerList = ["twistedxvs", "mrdolphin", "papadreadhead", "wolfiebosz", "syk_zero", "TPG_Spectre"];
  //"twistedxvs", "mrdolphin", "papadreadhead", "wolfiebosz", "syk_zero"
  for (var i = 0; i < streamerList.length; i++) {
    request(streamerList[i]);
  }
}

function request(streamer) {
  var queryURL = "https://api.twitch.tv/helix/streams/?user_login=" + streamer;

  $.ajax({
    url: queryURL,
    type: "GET",
    headers: {
      "Client-ID": "addyourownID"
    }
  }).then(function (response) {
    console.log(response);
    streamersLive.push(response.data[0].user_name);
  })
}

function isLive(streamerName) {
  if (streamersLive.length >= 1) {
    var embed = new Twitch.Embed("twitch-embed", {
      channel: streamerName,
      layout: "video",
      height: 600,
      width: "100%",
      setVolume: ".30",
      autoplay: false
    })
  } else {
    console.log("streamer name is " + streamerName);
    var embed = new Twitch.Embed("twitch-embed", {
      channel: "monstercat",
      layout: "video",
      height: 600,
      width: "100%",
      setVolume: ".30",
      autoplay: false
    })
  }
}
searchStreamers();
setTimeout(function () { isLive(streamersLive[0]) }, 1000);