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

    flex.TaskInfoPanel.Content.replace(
      <CustomTaskView key="PhoenixFlexUiPlugin-component" />,
    );

    manager.strings.TaskExtraInfo =
      "Time since last update: {{helper.durationSinceUpdate}}";

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      let url = "https://phoenix-ui.netlify.app/search";
      if (task && task.attributes) {
        const queryParams = new URLSearchParams(task.attributes).toString();
        url += `?${queryParams}`;
      }
      console.log("debug url", { url });
      return url;
    };
  }
}
