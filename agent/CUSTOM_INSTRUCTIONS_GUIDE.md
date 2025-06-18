# Custom Instructions Guide

This enhanced agent system allows you to provide custom instructions that the AI will strictly adhere to during conversations. The agent is designed to stay in character and maintain consistency with your defined role and behavior.

## Features

- **Strict Instruction Adherence**: The agent will stick to your custom instructions and avoid breaking character
- **Automatic Reinforcement**: Periodic reminders help maintain consistency during long conversations
- **Flexible Configuration**: Multiple ways to configure instructions (file-based, environment variables, or web interface)
- **Preset Templates**: Pre-built instruction templates for common use cases

## Quick Start

### Method 1: Custom Instructions File

1. Edit the `custom_instructions.py` file in the agent directory
2. Modify the `CUSTOM_INSTRUCTIONS` variable with your desired behavior
3. Optionally customize `BEHAVIORAL_CONSTRAINTS` and `EXPERTISE_AREAS`
4. Restart the agent

Example:
```python
CUSTOM_INSTRUCTIONS = """
You are a friendly cooking assistant who specializes in healthy recipes.
You should always suggest nutritious alternatives and provide cooking tips.
Stay focused on cooking, nutrition, and kitchen techniques.
"""
```

### Method 2: Environment Variables

1. Copy `.env.example` to `.env`
2. Set your preferred configuration:
   ```
   INSTRUCTION_PRESET=custom
   STRICT_INSTRUCTION_MODE=true
   CUSTOM_INSTRUCTIONS="Your custom instructions here..."
   ```
3. Restart the agent

### Method 3: Use Built-in Presets

Set the preset in your `.env` file:
```
INSTRUCTION_PRESET=technical_assistant    # For programming help
INSTRUCTION_PRESET=code_reviewer         # For code review
INSTRUCTION_PRESET=debugging_expert      # For debugging help
```

## Configuration Options

### Environment Variables

- `INSTRUCTION_PRESET`: Which preset to use (technical_assistant, code_reviewer, debugging_expert, custom)
- `STRICT_INSTRUCTION_MODE`: Enable strict adherence enforcement (true/false)
- `ENABLE_INSTRUCTION_REINFORCEMENT`: Periodic reminders during long conversations (true/false)
- `REINFORCEMENT_INTERVAL`: How often to add reminders (number of messages)

### Custom Instructions Structure

When creating custom instructions, include:

1. **Role Definition**: What the agent is (e.g., "You are a cooking expert...")
2. **Personality**: How it should behave (friendly, professional, etc.)
3. **Expertise Areas**: What topics it should focus on
4. **Behavioral Guidelines**: How it should respond to different situations

## Best Practices

### Writing Effective Instructions

1. **Be Specific**: Clearly define the agent's role and expertise
2. **Set Boundaries**: Specify what the agent should NOT do
3. **Define Personality**: Describe the tone and style of responses
4. **Include Examples**: Show how the agent should respond in specific situations

Example of well-structured instructions:
```python
CUSTOM_INSTRUCTIONS = """
You are Dr. Sarah, a pediatric nutritionist with 15 years of experience.

PERSONALITY:
- Warm, caring, and patient with parents
- Professional but approachable
- Always prioritize child safety and health

EXPERTISE:
- Child nutrition from infancy to adolescence
- Food allergies and intolerances in children
- Healthy meal planning for families
- Addressing picky eating behaviors

RESPONSE STYLE:
- Provide evidence-based advice
- Ask clarifying questions about the child's age, preferences, and any health conditions
- Offer practical, actionable suggestions
- When unsure, recommend consulting with a healthcare provider

BOUNDARIES:
- Do not provide medical diagnoses
- Do not recommend specific medications
- Redirect non-nutrition topics back to child nutrition
- Always emphasize the importance of consulting Healthcare providers for serious concerns
"""
```

### Common Use Cases

1. **Technical Expert**: Programming, software development, specific technologies
2. **Domain Specialist**: Medical, legal, financial advice (with appropriate disclaimers)
3. **Character Role-Play**: Historical figures, fictional characters
4. **Educational Tutor**: Subject-specific teaching and explanations
5. **Creative Assistant**: Writing, brainstorming, creative projects

## Troubleshooting

### Agent Not Following Instructions

1. Check that your instructions are specific and clear
2. Enable `STRICT_INSTRUCTION_MODE=true`
3. Reduce the `REINFORCEMENT_INTERVAL` for more frequent reminders
4. Make sure your instructions don't conflict with each other

### Instructions Not Loading

1. Check the `custom_instructions.py` file for syntax errors
2. Verify your `.env` file configuration
3. Check the agent logs for error messages
4. Ensure the file paths are correct

### Agent Responses Too Restrictive

1. Set `STRICT_INSTRUCTION_MODE=false` for more flexibility
2. Adjust your behavioral constraints to be less restrictive
3. Include more diverse topics in your expertise areas

## Example Configurations

### Cooking Assistant
```python
CUSTOM_INSTRUCTIONS = """
You are Chef Marco, an experienced Italian chef who loves teaching home cooking.
Focus on Italian cuisine, cooking techniques, and helping people make delicious meals at home.
Always suggest ingredients substitutions for dietary restrictions.
"""
```

### Fitness Coach
```python
CUSTOM_INSTRUCTIONS = """
You are Alex, a certified personal trainer specializing in home workouts.
Help people create exercise routines, provide form guidance, and motivate them to stay active.
Always prioritize safety and suggest modifications for different fitness levels.
"""
```

### Language Tutor
```python
CUSTOM_INSTRUCTIONS = """
You are María, a native Spanish speaker from Mexico who teaches Spanish to beginners.
Conduct lessons primarily in English but incorporate Spanish words and phrases gradually.
Focus on practical conversation skills and cultural context.
"""
```

## Integration with Web Interface

The web interface will automatically use your custom instructions when:
1. The `custom_instructions.py` file is properly configured
2. Environment variables are set correctly
3. The agent is restarted after changes

Users can still modify instructions through the web interface, but your custom settings provide the default behavior.

## Security Considerations

- Never include sensitive information in instruction files
- Be careful with role-playing scenarios that might provide inappropriate advice
- Always include appropriate disclaimers for professional advice
- Test your instructions thoroughly before deployment

## Support

If you encounter issues:
1. Check the agent logs for error messages
2. Verify your configuration files
3. Test with simpler instructions first
4. Ensure all dependencies are properly installed
