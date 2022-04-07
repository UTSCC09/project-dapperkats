import { gql, useLazyQuery } from "@apollo/client";
import { List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { FollowedUser } from '../FollowedUser/FollowedUser'

const getFollowingQuery = gql`
    query ($username: String) {
        getFollowing(username: $username) {
            username
        }
    }
`


export function Following(props) {
    const { username } = props
    const [following, setFollowing] = useState([]);

    const [getFollowing] = useLazyQuery(getFollowingQuery, {
        variables: {
            username: username
        },
        onCompleted: async (data) => {
            console.log(data);
            if (data.getFollowing) {
                setFollowing(data.getFollowing)
            }
        }
    })

    const callGetFollowing = () => {
        getFollowing();
    }


    useEffect(() => {
        getFollowing();
    }, [])

    return (
        <div>
            <List>
                {following.map((user) => (
                    <ListItem key={`user-id-${user.username}`} divider>
                        <div style={{ height: '50vh' }}>
                            <FollowedUser username={user.username} loggedInUser={username} getFollowing={callGetFollowing} />
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}