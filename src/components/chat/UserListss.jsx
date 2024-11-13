import PubNub from "pubnub";







//initial call
var pubnub = new Pubnub({
    publishKey: "myPublishKey",
    subscribeKey: "mySubscribeKey",
    userId: "myUniqueUserId"
});

//listener
pubnub.addListener({
    status: (s) => {console.log('Status', s.category) }
});


// add message and presence listeners
subscription.addListener({
    // Messages
    message: (m) => { console.log('Received message', m) },
    // Presence
    presence: (p) => { console.log('Presence event', p) },
});



//received old messages
pubnub.fetchMessages(
    {
      channels: ["chats_guilds.mages_guild"],
      end: '15343325004275466',
      count: 100
    },
    function(status, response) {
      console.log(status, response);
    }
  );


  //check online users
  pubnub.hereNow(
    {
      channels: ["chats.public.release_announcements"]
    },
    function (status, response) {
      console.log(status, response);
    }
  );
  // subscribe to a single channel without presence
pubnub.subscribe({channels: ["chats_inbox.user_1905"]});

// subscribe to multiple channels with presence
pubnub.subscribe({
    channels: [
        "chats_guilds.mages_guild",
        "alerts.system",
        "geolocation.data"
    ],
    withPresence: true
});


// create a subscription from a channel entity
const channel = pubnub.channel('channel_1');
const subscription = channel.subscription();

// Event-specific listeners
subscription.onMessage =  (messageEvent) => { console.log("Message event: ", messageEvent); };
subscription.onPresence =  (presenceEvent) => { console.log("Presence event: ", presenceEvent); };
subscription.onMessage = (messageEvent) => { console.log("Message event: ", messageEvent); };
subscription.onPresence = (presenceEvent) => { console.log("Presence event: ", presenceEvent); };
subscription.onSignal = (signalEvent) => { console.log("Signal event: ", signalEvent); };
subscription.onObjects = (objectsEvent) => { console.log("Objects event: ", objectsEvent); };
subscription.onMessageAction = (messageActionEvent) => { console.log("Message Action event: ", messageActionEvent); };
subscription.onFile = (fileEvent) => { console.log("File event: ", fileEvent); };

// Generic listeners
subscription.addListener({
  // Messages
  message: function (m) {
    const channelName = m.channel; // Channel on which the message was published
    const channelGroup = m.subscription; // Channel group or wildcard subscription match (if exists)
    const pubTT = m.timetoken; // Publish timetoken
    const msg = m.message; // Message payload
    const publisher = m.publisher; // Message publisher
  },
  // Presence
  presence: function (p) {
    const action = p.action; // Can be join, leave, state-change, or timeout
    const channelName = p.channel; // Channel to which the message belongs
    const occupancy = p.occupancy; // Number of users subscribed to the channel
    const state = p.state; // User state
    const channelGroup = p.subscription; //  Channel group or wildcard subscription match, if any
    const publishTime = p.timestamp; // Publish timetoken
    const timetoken = p.timetoken; // Current timetoken
    const uuid = p.uuid; // UUIDs of users who are subscribed to the channel
  },
  // Signals
  signal: function (s) {
    const channelName = s.channel; // Channel to which the signal belongs
    const channelGroup = s.subscription; // Channel group or wildcard subscription match, if any
    const pubTT = s.timetoken; // Publish timetoken
    const msg = s.message; // Payload
    const publisher = s.publisher; // Message publisher
  },
  // App Context
  objects: (objectEvent) => {
    const channel = objectEvent.channel; // Channel to which the event belongs
    const channelGroup = objectEvent.subscription; // Channel group
    const timetoken = objectEvent.timetoken; // Event timetoken
    const publisher = objectEvent.publisher; // UUID that made the call
    const event = objectEvent.event; // Name of the event that occurred
    const type = objectEvent.type; // Type of the event that occurred
    const data = objectEvent.data; // Data from the event that occurred
  },
  // Message Reactions
  messageAction: function (ma) {
    const channelName = ma.channel; // Channel to which the message belongs
    const publisher = ma.publisher; // Message publisher
    const event = ma.event; // Message action added or removed
    const type = ma.data.type; // Message action type
    const value = ma.data.value; // Message action value
    const messageTimetoken = ma.data.messageTimetoken; // Timetoken of the original message
    const actionTimetoken = ma.data.actionTimetoken; // Timetoken of the message reaction
  },
  // File Sharing
  file: function (event) {
    const channelName = event.channel; // Channel to which the file belongs
    const channelGroup = event.subscription; // Channel group or wildcard subscription match (if exists)
    const publisher = event.publisher; // File publisher
    const timetoken = event.timetoken; // Event timetoken

    const message = event.message; // Optional message attached to the file
    const fileId = event.file.id; // File unique id
    const fileName = event.file.name;// File name
    const fileUrl = event.file.url; // File direct URL
  }
});