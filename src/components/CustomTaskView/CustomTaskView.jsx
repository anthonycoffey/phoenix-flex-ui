import React from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { Box, Heading, Separator, Text } from "@twilio-paste/core";
import ClickToCallButton from "../ClickToCallButton/ClickToCallButton";

const CustomTaskView = ({ task }) => {
  if (!task) {
    return (
      <Box padding="space60">
        <Text>No task data available.</Text>
      </Box>
    );
  }

  return (
    <Box padding="space60">
      <Heading as="h2" variant="heading10">
        Task Information
      </Heading>
      <Separator orientation="horizontal" />
      <Text>Task Channel: {task.channel || task.channelType}</Text>
      <Text>Task SID: {task.taskSid}</Text>
      <Text>Task Status: {task.status}</Text>
      <Separator orientation="horizontal" />
      <ClickToCallButton task={task} />
    </Box>
  );
};

export default withTaskContext(CustomTaskView);
