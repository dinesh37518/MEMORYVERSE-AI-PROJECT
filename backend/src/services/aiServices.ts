import { generateGeminiChatResponse } from '../ai/chat/geminiChat';
import { generatePortfolioData } from '../ai/portfolio/portfolioGenerator';
import { analyzeResumeData } from '../ai/resume/resumeAnalyzer';
import { generateCareerInsightsData } from '../ai/career/careerInsights';

export class AIService {
  static async handleChat(prompt: string, contextData: any, customPrompt?: string): Promise<string> {
    return await generateGeminiChatResponse(prompt, contextData, customPrompt);
  }

  static async generatePortfolio(reqData: any) {
    return await generatePortfolioData(reqData);
  }

  static analyzeResume(reqData: any) {
    return analyzeResumeData(reqData);
  }

  static generateCareerInsights(reqData: any) {
    return generateCareerInsightsData(reqData);
  }
}
