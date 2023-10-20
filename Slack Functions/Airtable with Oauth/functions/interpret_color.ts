import { DefineFunction, Schema, FunctionRuntimeParameters, SlackFunction } from "deno-slack-sdk/mod.ts";

// Define the input type
interface InputParameters {
  input_string_1: string;
  input_string_2: string;
  oauth2Token: Schema.slack.types.OAuth2; // Add OAuth2 token parameter
}



// Define the function type
type AirtableFunctionType = (
  parameters: FunctionRuntimeParameters<InputParameters>
) => Promise<void>;

export const Airtable = DefineFunction({
  callback_id: "interpret_color_function",
  source_file: "functions/interpret_color.ts",
  title: "Airtable",
  input_parameters: {
    properties: {
      input_string_1: {
        type: Schema.types.string,
      },
      input_string_2: {
        type: Schema.types.string,
      },
      // Add OAuth2 support
      oauth2Token: {
        type: Schema.slack.types.oauth2,
        oauth2_provider_key: "airtable", // Replace with your actual provider key
      },
    },
    required: ["input_string_1", "input_string_2", "oauth2Token"],
  },
});

const AIRTABLE_API_KEY = "YOUR API KEY HERE";
const BASE_ID = "YOUR BASE ID HERE";
const TABLE_NAME = "YOUR TABLE NAME HERE";

export const airtableFunction: SlackFunction<AirtableFunctionType> = async ({ inputs }) => {
  const { input_string_1, input_string_2, oauth2Token } = inputs;

  // Use the OAuth2 token as needed
  // Example: const accessToken = oauth2Token.access_token;

  const accessToken = oauth2Token.access_token;
  
  const data = {
    "Name": input_string_1,
    "Email": input_string_2,
  };

  const airtableURL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  try {
    const response = await fetch(airtableURL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
        // Add the OAuth2 token to the headers if needed
        // Example: "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fields: data }),
    });

    if (response.ok) {
      console.log("Data sent to Airtable successfully.");
    } else {
      console.error("Failed to send data to Airtable:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error while sending data to Airtable:", error);
  }
};

export default airtableFunction;
