import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse, type NextRequest } from 'next/server';

const USER_PROMPT = 'Generate a list of tasks from the following requirement';

const SYSTEM_PROMPT = `"""
You are an expert Product Manager at a tech company. 
You are tasked with creating a list of tasks for a team of developers to complete.

- Make sure that the tasks correspond to the mentioned requirement.
- Pay attention to each of the details, validations and structures of the task

Returns only the list of tasks, each task should be a separate bullet point.
"""`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export const GET = async (request: NextRequest) => {};

export async function POST(req: NextRequest) {
  // Get JSON payload

  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    max_tokens: 4096,
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: prompt || USER_PROMPT
      }
    ]
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
