import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import React, { useEffect, useState } from "react";
import users from "./data/users/users.json";

import "./index.css";
import ModeratedChat from "./moderated-chat";


const hash = document.location.hash.split("?")[1];
const params = new URLSearchParams(hash);
const uuid = params.get("uuid");

const pubnubKeys = {
    publishKey: params.get("pubkey") || (process.env.REACT_APP_PUB_KEY),
    subscribeKey: params.get("subkey") || (process.env.REACT_APP_SUB_KEY),
};
const pubnub = new PubNub({
    ...pubnubKeys,
    userId: uuid || users[0].id,
    fileUploadPublishRetryLimit: 0,
    autoNetworkDetection: true,
    restore: true,
});

let pamEnabled = false;
pubnub.addListener({
    status: function (status) {
        if (status.category === "PNAccessDeniedCategory") {
            pamEnabled = true;
        }
    },
    presence: function(p) {
        // handle presence
        var action = p.action;
        var channelName = p.channel; // The channel to which the message was published
        var occupancy = p.occupancy; // Number of users subscribed to the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are subscribed to the channel
    },
});



const PamError = () => {
    return (
        <div className="pubnub-error">
            <h1>Warning! PubNub access manager enabled.</h1>
            <p>
                It looks like you have access manager enabled on your PubNub keyset. This sample app is not
                adapted to work with PAM by default.
            </p>
            <p>
                You can either disable PAM in the{" "}
                <a href="https://dashboard.pubnub.com/">PubNub Admin Portal</a> or add custom code to grant
                all necessary permissions by yourself. Please referer to the{" "}
                <a href="https://www.pubnub.com/docs/chat/components/react/access-manager">
                    Chat Component docs
                </a>{" "}
                for more information.
            </p>
        </div>
    );
};

const KeysError = () => {
    return (
        <div className="pubnub-error">
            <h1>A PubNub account is required.</h1>
            <p>
                Visit the PubNub dashboard to create an account or login:
                <br />
                <a href="https://dashboard.pubnub.com/">https://dashboard.pubnub.com/</a>
                <br />
                Create a new app or locate your app in the dashboard. Enable the Presence, Files, Objects,
                and Storage features using a region of your choosing. For Objects, ensure the following are
                enabled:
            </p>
            <ul>
                <li>User Metadata Events</li>
                <li>Channel Metadata Events</li>
                <li>Membership Events</li>
            </ul>
            <p>Copy and paste your publish key and subscribe key into: </p>
            <pre>.env</pre>
            <p>before continuing.</p>
            <br />
        </div>
    );
};

const ChatWrapper = () => {

    useEffect(() => {
        // Setup new PubNub user
        pubnub.objects.getUUIDMetadata({}, (status) => {
            if (status.error) {
                pubnub.objects.setUUIDMetadata({
                    data: users[0],
                    uuid,
                });
            }
        })
    }, [])

    return (
        pubnubKeys.publishKey?.length && pubnubKeys.subscribeKey?.length ? (
            pamEnabled ? (
                <PamError />
            ) : (
                <PubNubProvider client={pubnub}>
                    <ModeratedChat />
                </PubNubProvider>
            )
        ) : (
            <KeysError />
        )
    )
}

export default ChatWrapper