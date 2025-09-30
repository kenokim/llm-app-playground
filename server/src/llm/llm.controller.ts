import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LlmService } from './llm.service';
import { GenerateTextRequestDto } from './dto/generate-text.dto';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generate(@Body() body: GenerateTextRequestDto) {
    const { prompt, systemInstruction, model, temperature, maxOutputTokens } = body;
    const result = await this.llmService.generateText({
      prompt,
      systemInstruction,
      model,
      temperature,
      maxOutputTokens,
    });
    return result;
  }
}