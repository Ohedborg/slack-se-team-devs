import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const Azure = DefineFunction({
  callback_id: "interpret_color_function",
  source_file: "functions/interpret_color.ts",
  title: "Azure",
  input_parameters: {
    properties: {
      input_string_1: { // Add the first input string
        type: Schema.types.string,
      },
      input_string_2: { // Add the second input string
        type: Schema.types.string,
      },
      input_string_3: { // Add the third input string
        type: Schema.types.string,
      },
    },
    required: ["input_string_1", "input_string_2", "input_string_3"], // Update required inputs
  },
});

const endpointURL = "Your ENDPOINT URL";

export default SlackFunction(
  Azure,
  async ({ inputs }) => {
    const { input_string_1, input_string_2, input_string_3 } = inputs;

    console.log("Input string 1:", input_string_1);
    console.log("Input string 2:", input_string_2);
    console.log("Input string 3:", input_string_3);

    // You can process the input strings here as needed

    // No need to define a 'result' in this case since you don't require any output

    // Prepare the payload to send to the endpoint (if needed)
    const payload = {
      input_string_1,
      input_string_2,
      input_string_3,
    };

    console.log("Payload:", payload);

    // Make an HTTP POST request to the endpoint with the payload (if needed)
    try {
      const response = await fetch(endpointURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Payload sent successfully.");
      } else {
        console.error("Failed to send payload:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error while sending payload:", error);
    }
  }
);
