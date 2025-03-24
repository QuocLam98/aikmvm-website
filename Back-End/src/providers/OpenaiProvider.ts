import { defineProvider } from './Application'
import ConfigProvider from './ConfigProvider'
import OpenAI from "openai"

export default defineProvider([
  ConfigProvider,
], async (context) => {
  
  const openai = new OpenAI({
    apiKey: context.service.config.OPENAI_KEY,
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