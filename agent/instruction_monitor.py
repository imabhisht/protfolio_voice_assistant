"""
Instruction Monitoring and Testing Utilities

This module provides tools to monitor how well the agent follows custom instructions
and test different instruction configurations.
"""

import logging
import json
from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass, asdict

@dataclass
class InstructionEvent:
    """Log entry for instruction-related events"""
    timestamp: str
    event_type: str  # 'reinforcement_added', 'config_changed', 'off_topic_detected'
    details: Dict
    participant_id: Optional[str] = None

class InstructionMonitor:
    """Monitor and log instruction adherence events"""
    
    def __init__(self, log_file: str = "instruction_adherence.log"):
        self.log_file = log_file
        self.logger = logging.getLogger("instruction_monitor")
        self.events: List[InstructionEvent] = []
        
        # Setup file logging
        handler = logging.FileHandler(log_file)
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    def log_reinforcement_added(self, participant_id: str, message_count: int, instruction_preview: str):
        """Log when instruction reinforcement is added to conversation"""
        event = InstructionEvent(
            timestamp=datetime.now().isoformat(),
            event_type="reinforcement_added",
            details={
                "message_count": message_count,
                "instruction_preview": instruction_preview
            },
            participant_id=participant_id
        )
        self.events.append(event)
        self.logger.info(f"Instruction reinforcement added for participant {participant_id} at message {message_count}")
    
    def log_config_change(self, participant_id: str, old_preset: str, new_preset: str):
        """Log when instruction configuration changes"""
        event = InstructionEvent(
            timestamp=datetime.now().isoformat(),
            event_type="config_changed",
            details={
                "old_preset": old_preset,
                "new_preset": new_preset
            },
            participant_id=participant_id
        )
        self.events.append(event)
        self.logger.info(f"Instruction preset changed from {old_preset} to {new_preset} for participant {participant_id}")
    
    def log_session_start(self, participant_id: str, preset: str, instructions_preview: str):
        """Log when a new session starts with specific instructions"""
        event = InstructionEvent(
            timestamp=datetime.now().isoformat(),
            event_type="session_started",
            details={
                "preset": preset,
                "instructions_preview": instructions_preview
            },
            participant_id=participant_id
        )
        self.events.append(event)
        self.logger.info(f"Session started for participant {participant_id} with preset {preset}")
    
    def get_statistics(self) -> Dict:
        """Get statistics about instruction adherence"""
        stats = {
            "total_events": len(self.events),
            "events_by_type": {},
            "sessions_by_preset": {},
            "reinforcements_per_session": {}
        }
        
        for event in self.events:
            # Count events by type
            event_type = event.event_type
            stats["events_by_type"][event_type] = stats["events_by_type"].get(event_type, 0) + 1
            
            # Count sessions by preset
            if event_type == "session_started":
                preset = event.details.get("preset", "unknown")
                stats["sessions_by_preset"][preset] = stats["sessions_by_preset"].get(preset, 0) + 1
            
            # Count reinforcements per participant
            if event_type == "reinforcement_added" and event.participant_id:
                participant_id = event.participant_id
                stats["reinforcements_per_session"][participant_id] = stats["reinforcements_per_session"].get(participant_id, 0) + 1
        
        return stats
    
    def save_events_to_file(self, filename: str = None):
        """Save all events to a JSON file"""
        filename = filename or f"instruction_events_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        events_data = [asdict(event) for event in self.events]
        
        with open(filename, 'w') as f:
            json.dump({
                "events": events_data,
                "statistics": self.get_statistics(),
                "export_timestamp": datetime.now().isoformat()
            }, f, indent=2)
        
        self.logger.info(f"Events exported to {filename}")

# Global monitor instance
instruction_monitor = InstructionMonitor()

def test_instruction_configuration():
    """Test utility to validate instruction configurations"""
    
    try:
        from custom_instructions import INSTRUCTION_PRESETS, get_enhanced_instructions, get_preset_instructions
        
        print("Testing Custom Instructions Configuration")
        print("=" * 50)
        
        # Test default enhanced instructions
        try:
            default_instructions = get_enhanced_instructions()
            print(f"✓ Default enhanced instructions loaded ({len(default_instructions)} characters)")
        except Exception as e:
            print(f"✗ Error loading default instructions: {e}")
        
        # Test all presets
        print(f"\nTesting {len(INSTRUCTION_PRESETS)} presets:")
        for preset_name in INSTRUCTION_PRESETS:
            try:
                preset_instructions = get_preset_instructions(preset_name)
                print(f"✓ {preset_name}: {len(preset_instructions)} characters")
            except Exception as e:
                print(f"✗ {preset_name}: Error - {e}")
        
        # Test configuration validation
        print("\nConfiguration Validation:")
        required_fields = ["instructions", "context", "constraints"]
        
        for preset_name, preset_config in INSTRUCTION_PRESETS.items():
            missing_fields = [field for field in required_fields if field not in preset_config]
            if missing_fields:
                print(f"⚠ {preset_name}: Missing fields - {missing_fields}")
            else:
                print(f"✓ {preset_name}: All required fields present")
        
        print("\n" + "=" * 50)
        print("Configuration test completed!")
        
    except ImportError:
        print("✗ Could not import custom_instructions module")
        print("Make sure custom_instructions.py is in the same directory")

if __name__ == "__main__":
    test_instruction_configuration()
