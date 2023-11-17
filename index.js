import { config } from "dotenv";
config();

import { HfInference } from "@huggingface/inference";

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

// You can also omit "model" to use the recommended model for the task
const { generated_text } = await inference.conversational({
  inputs: {
    text: "What is the best city for honey moon?",
  },
});

console.log(generated_text);
