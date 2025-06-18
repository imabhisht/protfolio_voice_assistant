#!/usr/bin/env python3
"""
Test script for custom instructions system

Run this script to test your custom instructions configuration:
python test_instructions.py
"""

import sys
import os

# Add the current directory to the path so we can import our modules
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_environment_setup():
    """Test environment variable configuration"""
    print("Environment Configuration Test")
    print("=" * 40)
    
    # Test .env file loading
    try:
        from dotenv import load_dotenv
        load_dotenv(dotenv_path=".env")
        print("✓ .env file loading successful")
    except Exception as e:
        print(f"⚠ .env file loading failed: {e}")
    
    # Check environment variables
    env_vars = [
        "INSTRUCTION_PRESET",
        "STRICT_INSTRUCTION_MODE", 
        "ENABLE_INSTRUCTION_REINFORCEMENT",
        "REINFORCEMENT_INTERVAL"
    ]
    
    for var in env_vars:
        value = os.getenv(var)
        if value:
            print(f"✓ {var}: {value}")
        else:
            print(f"⚠ {var}: Not set (using default)")
    
    print()

def test_custom_instructions():
    """Test custom instructions loading"""
    print("Custom Instructions Test")
    print("=" * 40)
    
    try:
        from custom_instructions import (
            CUSTOM_INSTRUCTIONS, 
            INSTRUCTION_PRESETS,
            get_enhanced_instructions,
            get_preset_instructions
        )
        
        # Test basic loading
        print(f"✓ Custom instructions module loaded")
        print(f"✓ Base instructions length: {len(CUSTOM_INSTRUCTIONS)} characters")
        print(f"✓ Available presets: {list(INSTRUCTION_PRESETS.keys())}")
        
        # Test enhanced instructions
        enhanced = get_enhanced_instructions()
        print(f"✓ Enhanced instructions generated: {len(enhanced)} characters")
        
        # Test preset loading
        for preset_name in INSTRUCTION_PRESETS:
            try:
                preset_instructions = get_preset_instructions(preset_name)
                print(f"✓ Preset '{preset_name}': {len(preset_instructions)} characters")
            except Exception as e:
                print(f"✗ Preset '{preset_name}': {e}")
        
    except ImportError as e:
        print(f"✗ Cannot import custom_instructions: {e}")
    except Exception as e:
        print(f"✗ Error testing custom instructions: {e}")
    
    print()

def test_monitoring_system():
    """Test instruction monitoring system"""
    print("Monitoring System Test")
    print("=" * 40)
    
    try:
        from instruction_monitor import instruction_monitor, test_instruction_configuration
        
        print("✓ Monitoring system loaded")
        
        # Test basic functionality
        instruction_monitor.log_session_start("test_participant", "test_preset", "Test instructions")
        instruction_monitor.log_reinforcement_added("test_participant", 10, "Test reinforcement")
        
        stats = instruction_monitor.get_statistics()
        print(f"✓ Monitoring statistics: {stats['total_events']} events recorded")
        
        # Run configuration test
        print("\nRunning configuration validation...")
        test_instruction_configuration()
        
    except ImportError as e:
        print(f"✗ Cannot import monitoring system: {e}")
    except Exception as e:
        print(f"✗ Error testing monitoring system: {e}")
    
    print()

def test_main_integration():
    """Test integration with main agent code"""
    print("Main Agent Integration Test")
    print("=" * 40)
    
    try:
        # Test imports from main.py
        from main import (
            SessionConfig,
            parse_session_config,
            create_initial_chat_context,
            INSTRUCTION_PRESET,
            STRICT_INSTRUCTION_MODE,
            USE_CUSTOM_INSTRUCTIONS
        )
        
        print("✓ Main agent imports successful")
        print(f"✓ Custom instructions enabled: {USE_CUSTOM_INSTRUCTIONS}")
        print(f"✓ Current preset: {INSTRUCTION_PRESET}")
        print(f"✓ Strict mode: {STRICT_INSTRUCTION_MODE}")
        
        # Test session config parsing
        test_config_data = {
            "gemini_api_key": "test_key",
            "instructions": "Test instructions",
            "voice": "puck",
            "temperature": 0.8,
            "max_output_tokens": 2048,
            "modalities": "audio_only",
            "presence_penalty": 0.0,
            "frequency_penalty": 0.0
        }
        
        config = parse_session_config(test_config_data)
        print(f"✓ Session config parsing successful")
        
        # Test chat context creation
        chat_ctx = create_initial_chat_context("Test instructions for chat context")
        print(f"✓ Chat context creation successful: {len(chat_ctx.messages)} messages")
        
    except ImportError as e:
        print(f"✗ Cannot import from main.py: {e}")
    except Exception as e:
        print(f"✗ Error testing main integration: {e}")
    
    print()

def main():
    """Run all tests"""
    print("Custom Instructions System Test Suite")
    print("=" * 50)
    print()
    
    test_environment_setup()
    test_custom_instructions()
    test_monitoring_system()
    test_main_integration()
    
    print("=" * 50)
    print("Test suite completed!")
    print()
    print("Next steps:")
    print("1. Fix any issues shown above")
    print("2. Copy .env.example to .env and configure your preferences")
    print("3. Customize custom_instructions.py for your use case")
    print("4. Start the agent with: python main.py")

if __name__ == "__main__":
    main()
