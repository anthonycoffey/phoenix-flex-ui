import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import CustomTaskList from "./components/CustomTaskList/CustomTaskList";

const PLUGIN_NAME = "PhoenixFlexUiPlugin";

export default class PhoenixFlexUiPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    console.log("flex", { flex });
    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(
      <CustomTaskList key="PhoenixFlexUiPlugin-component" />,
      options,
    );

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      console.log("task", { task });
      return task
        ? `https://b867d2a3e4b2.ngrok.app/search?q=${task.attributes.name}`
        : "https://b867d2a3e4b2.ngrok.app";
    };
  }
}
