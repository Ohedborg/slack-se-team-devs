import { Manifest } from "deno-slack-sdk/mod.ts";
import { Pipedream } from "./functions/interpret_color.ts";

// Add this created function to the manifest!


/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "Pipedream",
  description: "Send something to pipedream",
  icon: "assets/default_new_app_icon.png",
  functions: [Pipedream],
  workflows: [],
  outgoingDomains: ["Your Pipedream endpoint URL"],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
