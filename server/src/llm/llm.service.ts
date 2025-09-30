import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

type GenerateTextParams = {
  prompt: string;
  systemInstruction?: string;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
};

@Injectable()
export class LlmService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      // eslint-disable-next-line no-console
      console.warn('GEMINI_API_KEY is not set. Set it in your .env file.');
    }
  }

  async generateText(params: GenerateTextParams) {
    try {
      const { prompt, systemInstruction, model, temperature, maxOutputTokens } = params;

      const genAI = new GoogleGenerativeAI(this.apiKey);
      const modelName = model || 'gemini-1.5-flash';
      const modelInstance = genAI.getGenerativeModel({
        model: modelName,
        ...(systemInstruction ? { systemInstruction } : {}),
      });

      const result = await modelInstance.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }]}],
        generationConfig: {
          temperature: temperature ?? 0.7,
          maxOutputTokens: maxOutputTokens ?? 1024,
        },
      });

      const text = result.response.text();
      return {
        model: modelName,
        output: text,
      };
    } catch (error) {
      throw new InternalServerErrorException('Gemini generation failed');
    }
  }
}


