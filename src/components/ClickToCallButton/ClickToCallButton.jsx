import { Actions, Manager } from "@twilio/flex-ui";
import { Box, Button } from "@twilio-paste/core";
import React from "react";

const ClickToCallButton = ({ task }) => {
  const customerAddress = task?.attributes?.customerAddress;

  if (!customerAddress) {
    return null;
  }

  const isUserOnline = () => {
    const manager = Manager.getInstance();
    const workerActivity = manager.workerClient.activity;
    return workerActivity.name === "Available";
  };

  const handleClick = async () => {
    if (isUserOnline()) {
      const taskAttributes = {
        formSubmissionId: task.attributes?.formSubmissionId,
        taskSid: task?.taskSid,
        conversationSid: task?.conversationSid,
        interactionSid: task?.interactionSid,
      };
      await Actions.invokeAction("StartOutboundCall", {
        destination: customerAddress,
        taskAttributes,
      });
    } else {
      alert("ERROR: You must be online to place a call.");
    }
  };

  return (
    <Box padding="space50">
      <Button
        variant="primary"
        size="small"
        padding="space40"
        onClick={handleClick}
      >
        Call {customerAddress}
      </Button>
    </Box>
  );
};

export default ClickToCallButton;
