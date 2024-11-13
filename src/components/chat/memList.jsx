import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const pubnub = new PubNub({
        publishKey: 'pub-c-eafa8c74-d8e8-4b72-b5fe-8e83c98886ff',
        subscribeKey: 'sub-c-1dd0a08c-ec68-45a5-a759-40baff5d89b5',
    });

    useEffect(() => {
        pubnub.hereNow({
            channels: ['channel_name'],
            includeUUIDs: true,
            includeState: true,
        },
        (status, response) => {
            if (!status.error) {
                const members = response.channels['channel_name'].occupants;
                setMembers(members);
            } else {
                console.error(status.errorData);
            }
        });
    }, []);

    return (
        <div>
            <h2>Member List</h2>
            <ul>
                {members.map(member => (
                    <li key={member.uuid}>
                        {member.uuid}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberList;
