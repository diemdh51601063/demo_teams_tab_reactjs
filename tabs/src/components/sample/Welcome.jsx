import React, { useState } from "react";
import { Image, Menu } from "@fluentui/react-northstar";
import "./Welcome.css";
// import { EditCode } from "./EditCode";
// import { Deploy } from "./Deploy";
// import { Publish } from "./Publish";
// import { AddSSO } from "./AddSSO";

import DemoComponent from "../DemoComponent";
import SmoothfileIndexComponent from "../smoothfile/SmoothfileIndexComponent";

export function Welcome(props) {
  const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  //const steps = ["local", "azure", "publish", "demo", "smoothfile"];
  const steps = ["smoothfile", "demo"];

  const friendlyStepsName = {
    smoothfile: "1.Smoothfile",
    demo: "2.Demo"
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("smoothfile");
  const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });

  return (
    <div className="welcome page">
      {/* <Menu defaultActiveIndex={0} items={items} underlined secondary />
      <div className="sections">
        {selectedMenuItem === "demo" && (
          <div>
            <DemoComponent />
          </div>
        )}

        {selectedMenuItem === "smoothfile" && (
          <div>
            <SmoothfileIndexComponent />
          </div>
        )}
      </div> */}
      <SmoothfileIndexComponent />

    </div>
  );
}
