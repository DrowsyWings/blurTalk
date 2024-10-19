import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import Post from "../PostPage/Post";
import Comment from "../Comments/Comment";
import Poll from "../PollPage/Poll";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${id}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    getUser();

    const getPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/user/${id}`
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();

    const getComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/comments/user/${id}`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    getComments();

    const getPolls = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/polls/user/${id}`
        );
        setPolls(response.data.polls);
      } catch (error) {
        console.error(error);
      }
    };

    getPolls();
  }, [id, navigate]);

  return (
    <Box className="mx-auto max-w-7xl w-full">
      <Box className="bg-[#1A1A35] rounded-lg p-6 mb-6 text-white">
        <h2 className="text-2xl font-bold mb-4">{user?.username}'s Profile</h2>
        <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Comments</Tab>
            <Tab>Polls</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </TabPanel>
            <TabPanel>
              {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </TabPanel>
            <TabPanel>
              {polls.map((poll) => (
                <Poll key={poll._id} poll={poll} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Profile;
