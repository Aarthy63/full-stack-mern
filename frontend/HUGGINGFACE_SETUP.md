# Hugging Face AI Integration Setup

This guide explains how to set up and configure the Hugging Face AI integration for the e-commerce application.

## Features

The AI integration provides:
- **Style Recommendations**: Personalized fashion advice based on user preferences
- **Size Guide**: AI-powered size recommendations for perfect fit
- **Outfit Matching**: Find perfect combinations for your wardrobe
- **Trend Analysis**: Stay updated with the latest fashion trends
- **Chat Interface**: Interactive AI assistant for fashion queries

## Setup Instructions

### 1. Get Hugging Face API Token

1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account or sign in
3. Go to your profile settings
4. Navigate to "Access Tokens"
5. Create a new token with appropriate permissions
6. Copy the token

### 2. Environment Variables

Create or update your `.env` file in the frontend directory:

```env
VITE_HUGGINGFACE_API_KEY=your_api_token_here
VITE_HUGGINGFACE_MODEL=your_preferred_model_name
```

### 3. Choose a Model

For fashion and general conversation, consider these models:
- **gpt2**: Good for general text generation
- **microsoft/DialoGPT-medium**: Good for conversational AI
- **facebook/blenderbot-400M-distill**: Good for chat applications
- **microsoft/DialoGPT-large**: Better quality but slower

### 4. Update API Configuration

In `src/services/api.js`, uncomment and update the actual API implementation:

```javascript
const response = await fetch(`https://api-inference.huggingface.co/models/${import.meta.env.VITE_HUGGINGFACE_MODEL}`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ inputs: message }),
});
```

### 5. Customize AI Responses

You can customize the AI responses by:
- Modifying the prompt engineering in the API calls
- Adding context about your products and brand
- Implementing response filtering for inappropriate content
- Adding product-specific knowledge

## Usage

### For Users
1. Click the AI Assistant icon (🤖) in the navbar
2. Ask questions about fashion, styling, or products
3. Use quick action buttons for common queries
4. Get personalized recommendations

### For Developers
1. The AI component is located at `src/components/HuggingFaceAI.jsx`
2. API services are in `src/services/api.js`
3. The component integrates with the existing theme system
4. All AI interactions are logged for debugging

## Security Considerations

- Never expose your API key in client-side code
- Implement rate limiting for API calls
- Add input validation and sanitization
- Consider implementing user authentication for AI features
- Monitor API usage and costs

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the token is correct
   - Check if the token has the right permissions
   - Ensure the environment variable is loaded

2. **Model Not Responding**
   - Check if the model is available
   - Verify the model endpoint is correct
   - Some models may be offline or loading

3. **Slow Responses**
   - Consider using a smaller/faster model
   - Implement caching for common queries
   - Add loading states for better UX

### Debug Mode

Enable debug logging by adding to your environment:

```env
VITE_DEBUG_AI=true
```

## Future Enhancements

- **Product Integration**: Connect AI recommendations to actual product inventory
- **User Preferences**: Store and learn from user interactions
- **Image Analysis**: Add visual AI for style recognition
- **Multi-language Support**: Expand to different languages
- **Voice Interface**: Add speech-to-text capabilities

## Support

For issues with the AI integration:
1. Check the browser console for errors
2. Verify API key and model configuration
3. Test the Hugging Face API directly
4. Check the Hugging Face status page

## License

This integration uses Hugging Face's API services. Please review their terms of service and usage policies.
