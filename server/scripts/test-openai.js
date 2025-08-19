import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import openaiService from '../services/openaiService.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serverDir = dirname(__dirname);
dotenv.config({ path: join(serverDir, '.env') });

async function testOpenAIService() {
  console.log('🧪 Testing OpenAI Service...\n');

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...');
    const connectionTest = await openaiService.testConnection();
    if (!connectionTest) {
      throw new Error('Connection test failed');
    }
    console.log('✅ Connection test passed\n');

    // Test 2: Generate simple content
    console.log('2️⃣ Testing simple content generation...');
    const simpleContent = await openaiService.generateContent(
      'Write a brief paragraph about AI automation in the energy sector.',
      { model: 'gpt-4o-mini', max_tokens: 200 }
    );
    console.log('Generated content:', simpleContent.content.substring(0, 100) + '...');
    console.log('✅ Simple content generation passed\n');

    // Test 3: Generate blog content
    console.log('3️⃣ Testing blog content generation...');
    const blogContent = await openaiService.generateBlogContent(
      'AI-powered predictive maintenance for energy equipment',
      'morning'
    );
    console.log('Blog content length:', blogContent.content.length, 'characters');
    console.log('✅ Blog content generation passed\n');

    // Test 4: Generate use case content (JSON)
    console.log('4️⃣ Testing use case content generation...');
    const useCaseContent = await openaiService.generateUseCaseContent(
      'EPC Contractors',
      'RFP Management Chaos',
      'Business Development Manager',
      'Large upcoming bid',
      'Microsoft 365 stack'
    );
    
    const parsedUseCase = JSON.parse(useCaseContent.content);
    console.log('Use case keys:', Object.keys(parsedUseCase));
    console.log('✅ Use case content generation passed\n');

    // Test 5: Generate title
    console.log('5️⃣ Testing title generation...');
    const titleContent = await openaiService.generateTitle('Energy Sector', 'Automation');
    console.log('Generated title:', titleContent.content.trim());
    console.log('✅ Title generation passed\n');

    console.log('🎉 All OpenAI service tests passed successfully!');

  } catch (error) {
    console.error('❌ OpenAI service test failed:', error.message);
    process.exit(1);
  }
}

// Run the test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testOpenAIService();
}

export { testOpenAIService }; 