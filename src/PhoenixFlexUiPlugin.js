import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";
import CustomTaskView from "./components/CustomTaskView/CustomTaskView";

const PLUGIN_NAME = "PhoenixFlexUiPlugin";

export default class PhoenixFlexUiPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    console.log("flex", { flex });

    // manager.strings.TaskInfoPanelContent = `
    //   <h1>CUSTOMER CONTEXT</h1>
    //   <p>Customer name / phone number: {{task.attributes.name}}</p>
    //   <h1>TASK CONTEXT</h1>
    //   <h2>Task type</h2>
    //   <p>{{task.attributes.title}}</p>
    //   <p>{{task.title}}</p>
    //   <h2>Task created on</h2>
    //   <p>{{task.dateCreated}}</p>
    //   <h2>Task priority</h2>
    //   <p>{{task.priority}}</p>
    //   <h2>Task queue</h2>
    //   <p>{{task.taskQueueName}}</p>
    //   <hr />
    //   `;

    manager.strings.TaskExtraInfo =
      "Time since last update: {{helper.durationSinceUpdate}}";

    flex.TaskInfoPanel.Content.add(
      <CustomTaskView key="PhoenixFlexUiPlugin-component" />,
    );

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      console.log({ task });
      console.log(task?.attributes?.conference);
      console.log(task?.attributes?.conversations);

      let url = "https://localhost:8888/search";
      if (task && task.attributes) {
        const queryParams = new URLSearchParams(task.attributes).toString();
        url += `?${queryParams}`;
      }

      return url;
    };
  }
}
