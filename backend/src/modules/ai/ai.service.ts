import { Injectable, BadRequestException } from '@nestjs/common';
import { mastra } from '@/mastra';

@Injectable()
export class AiService {
  async getWeatherByCity(city?: string): Promise<string> {
    if (!city) {
      throw new BadRequestException("Missing 'city' query parameter");
    }

    const agent = mastra.getAgent('weatherAgent');
    // Use generateVNext to support V2 models (e.g. Gemini 2.5)
    const result = await agent.generateVNext(
      `What's the weather like in ${city}?`,
    );
    return result.text;
  }
}
