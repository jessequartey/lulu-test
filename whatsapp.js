import { config } from "dotenv";
config();
import qrcode from "qrcode-terminal";

import { Client } from "whatsapp-web.js";

import { HfInference } from "@huggingface/inference";

const client = new Client();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const hf = new HfInference(HF_ACCESS_TOKEN);

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message", async (message) => {
  if (message.body) {
    console.log;
    const usermessage = message.body;
    const { conversation } = await hf.conversational({
      inputs: {
        text: usermessage,
      },
    });

    client.sendMessage(message.from, conversation.generated_responses[0]);
  }
});

client.initialize();
