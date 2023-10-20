import { Manifest } from "deno-slack-sdk/mod.ts";
import { Azure } from "./functions/interpret_color.ts";

// Add this created function to the manifest!


/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "Send to Azure",
  description: "A blank template for building Slack apps with Deno",
  icon: "./Azure/assets/azure.png",
  functions: [Azure],
  workflows: [],
  outgoingDomains: ["your logic apps URL"],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
