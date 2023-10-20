import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

// Make sure naming convention corresponds to whatever we put originally 

export const Pipedream = DefineFunction({
  callback_id: "interpret_color_function",
  source_file: "functions/interpret_color.ts",
  title: "Pipedream",
  input_parameters: {
    properties: {
      input_string: {
        type: Schema.types.string,
      },
    },
    required: ["input_string"],
  },
  output_parameters: {
    properties: {
      result: {
        type: Schema.types.string,
      },
    },
    required: ["result"],
  },
});

// Define the URL where you want to send the payload
const endpointURL = "YOUR PIPEDREAM ENDPOINT URL"; // Replace with your actual API endpoint

export default SlackFunction(
  Pipedream,
  async ({ inputs }) => {
    const input_string = inputs.input_string;

    console.log("Input string:", input_string);

    let result;

    switch (input_string) {
      case "orange":
        result = "Orange is the color of ambition";
        break;
      case "green":
        result = "Green is the color of collaboration";
        break;
      case "purple":
        result = "Purple is the color of harmony";
        break;
      default:
        result = "That's not a color I recognize";
    }

    console.log("Result:", result);

    // Prepare the payload to send to the endpoint
    const payload = {
      input_string,
      result,
    };

    console.log("Payload:", payload);

    // Make an HTTP POST request to the endpoint with the payload
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

    // Return the result as part of the function output
    return {
      outputs: {
        input_string,
        result,
      },
    };
  }
);
