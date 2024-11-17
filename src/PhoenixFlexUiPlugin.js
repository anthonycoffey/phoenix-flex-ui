import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import CustomTaskView from "./components/CustomTaskView/CustomTaskView";

import { CustomizationProvider } from "@twilio-paste/core/customization";

const PLUGIN_NAME = "PhoenixFlex";

export default class PhoenixFlexUiPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    manager.strings.TaskExtraInfo =
      "Time since last update: {{helper.durationSinceUpdate}}";

    flex.TaskInfoPanel.Content.replace(
      <CustomTaskView key="PhoenixFlexUiPlugin-component" />,
    );

    // flex.TaskInfoPanel.Content.add(
    //   <ClickToCallButton key="click-to-call-button" />,
    //   {},
    // );

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      console.log({ task });
      console.log("conference", task?.attributes?.conference);
      console.log("conversations", task?.attributes?.conversations);

      // let url = "https://feature-twilio-flex--phoenix-ui.netlify.app/search";
      let url = "https://localhost:8888/search";
      if (task && task.attributes) {
        const queryParams = new URLSearchParams(task.attributes).toString();
        url += `?${queryParams}`;
      }
      console.log("debug url", { url });
      return url;
    };
  }
}
