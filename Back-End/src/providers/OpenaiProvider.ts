import { defineProvider } from './Application'
import ConfigProvider from './ConfigProvider'
import OpenAI from "openai"

export default defineProvider([
  ConfigProvider,
], async (context) => {
  
  const openai = new OpenAI({
    apiKey: "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",
  });
//  const completions = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         store: true,
//         messages: [
//           {"role": "user", 
//           "content": "write a haiku about ai"},
//         ],
//       });
//       console.log(completions)
//       console.log(completions.choices)

  return { openai }
})