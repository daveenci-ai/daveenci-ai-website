# Services Documentation

This directory contains service modules for external API integrations.

## OpenAI Service (`openaiService.js`)

A comprehensive service for integrating with OpenAI's API for content generation.

### Setup

1. **Environment Variable**: Add your OpenAI API key to your `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. **Install Dependencies**: The service uses the `openai` package and `node-fetch`:
   ```bash
   npm install openai node-fetch
   ```

### Available Methods

#### `generateContent(prompt, options)`
General-purpose content generation method.

**Parameters:**
- `prompt` (string): The text prompt for content generation
- `options` (object): Configuration options
  - `model` (string): OpenAI model to use (default: 'gpt-4o-mini')
  - `temperature` (number): Creativity level 0-1 (default: 0.7)
  - `max_tokens` (number): Maximum response length (default: 4000)
  - `response_format` (object): For JSON responses (optional)

**Returns:** Object with `content`, `usage`, and `model` properties.

#### `generateBlogContent(topic, timeSlot, options)`
Specialized method for generating blog posts optimized for the energy sector.

**Parameters:**
- `topic` (string): Blog post topic
- `timeSlot` (string): Time context (morning, afternoon, evening)
- `options` (object): Additional configuration options

#### `generateUseCaseContent(companyType, painPoint, decisionMaker, buyingTrigger, techEnvironment, options)`
Generates structured use case content in JSON format.

**Parameters:**
- `companyType` (string): Type of energy company
- `painPoint` (string): Business challenge
- `decisionMaker` (string): Target decision maker role
- `buyingTrigger` (string): What drives the need for solution
- `techEnvironment` (string): Existing technology stack
- `options` (object): Additional configuration options

#### `generateTitle(industry, category, options)`
Creates SEO-optimized titles for content.

#### `testConnection()`
Tests the OpenAI API connection and service functionality.

### Usage Examples

```javascript
import openaiService from './services/openaiService.js';

// Basic content generation
const result = await openaiService.generateContent(
  'Write about AI automation in energy sector',
  { model: 'gpt-4o-mini', temperature: 0.6 }
);

// Blog content generation
const blogPost = await openaiService.generateBlogContent(
  'Predictive Maintenance for Energy Equipment',
  'morning'
);

// Use case generation
const useCase = await openaiService.generateUseCaseContent(
  'EPC Contractors',
  'RFP Management Chaos',
  'Business Development Manager',
  'Large upcoming bid',
  'Microsoft 365 stack'
);

// Title generation
const title = await openaiService.generateTitle('Energy Sector', 'Automation');

// Test connection
const isConnected = await openaiService.testConnection();
```

### Testing

Run the test suite to verify the service is working correctly:

```bash
npm run test-openai
```

### Error Handling

The service includes comprehensive error handling:
- API connection errors
- Invalid response formats
- Missing environment variables
- Rate limiting

### Models Available

The service defaults to `gpt-4o-mini` for cost efficiency, but supports all OpenAI models:
- `gpt-4o-mini` (default) - Fast and cost-effective
- `gpt-4o` - More capable, higher cost
- `gpt-4-turbo` - Balance of speed and capability
- `gpt-3.5-turbo` - Legacy model, lower cost

### Best Practices

1. **Environment Variables**: Always use environment variables for API keys
2. **Error Handling**: Wrap service calls in try-catch blocks
3. **Token Limits**: Monitor usage and adjust max_tokens based on needs
4. **Rate Limiting**: Be aware of OpenAI's rate limits for your plan
5. **Cost Management**: Use appropriate models for your use case

## Gemini Service (`geminiService.js`)

Integration with Google's Gemini AI for content generation and automation.

### Environment Variables
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Usage
The Gemini service is primarily used in the blog and use case automation scripts for content generation with fallback support. 