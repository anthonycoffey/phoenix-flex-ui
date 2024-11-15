import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import CustomTaskView from "./components/CustomTaskView/CustomTaskView";

const PLUGIN_NAME = "PhoenixFlexUiPlugin";

export default class PhoenixFlexUiPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    manager.strings.TaskExtraInfo =
      "Time since last update: {{helper.durationSinceUpdate}}";

    flex.TaskInfoPanel.Content.add(
      <CustomTaskView key="PhoenixFlexUiPlugin-component" />,
    );

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      console.log({ task });
      console.log("conference", task?.attributes?.conference);
      console.log("conversations", task?.attributes?.conversations);

      let url = "https://localhost:8888/search";
      if (task && task.attributes) {
        const queryParams = new URLSearchParams(task.attributes).toString();
        url += `?${queryParams}`;
      }

      return url;
    };
  }
}
