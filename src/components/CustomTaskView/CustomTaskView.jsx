import React from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { Box, Heading, Separator, Text } from "@twilio-paste/core";

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
      <Heading as="h1" variant="heading10">
        Task Information
      </Heading>
      <Separator orientation="horizontal" />
      <Text>Task SID: {task.taskSid}</Text>
      <Text>Task Status: {task.status}</Text>
      <Text>Task Channel: {task.channelType}</Text>
    </Box>
  );
};

export default withTaskContext(CustomTaskView);
