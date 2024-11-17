import { Actions } from "@twilio/flex-ui";
import { Box, Button } from "@twilio-paste/core";
import React from "react";

const ClickToCallButton = ({ task }) => {
  const customerAddress = task?.attributes?.customerAddress;

  if (!customerAddress) {
    return null;
  }

  // Handle the click-to-call action
  const handleClick = async () => {
    if (customerAddress) {
      await Actions.invokeAction("StartOutboundCall", {
        destination: customerAddress,
        taskAttributes: task?.attributes,
      });
    } else {
      console.error("Customer address is not available in task attributes");
    }
  };

  return (
    <Box padding="space20">
      <Button
        variant="primary"
        size="small"
        padding="space30"
        onClick={handleClick}
      >
        Call {customerAddress}
      </Button>
    </Box>
  );
};

export default ClickToCallButton;
