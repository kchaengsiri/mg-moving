import json
import asyncio
from typing import Dict, Any, List
from pathlib import Path

# Docker mount puts internal files at /app/app/data
DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

class JsonDB:
    """Safely manages file-based JSON IO operations with asyncio thread locking."""
    
    def __init__(self, filename: str):
        self.filepath = DATA_DIR / filename
        self._lock = asyncio.Lock()
        
        # Initialize if doesn't exist
        if not self.filepath.exists():
            with open(self.filepath, 'w', encoding='utf-8') as f:
                json.dump([], f)
                
    async def read_all(self) -> List[Dict[str, Any]]:
        async with self._lock:
            try:
                with open(self.filepath, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except (FileNotFoundError, json.JSONDecodeError):
                return []

    async def rewrite_all(self, data: List[Dict[str, Any]]) -> None:
        async with self._lock:
            with open(self.filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
                
    async def append(self, item: Dict[str, Any]) -> None:
        async with self._lock:
            try:
                with open(self.filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            except (FileNotFoundError, json.JSONDecodeError):
                data = []
            
            data.append(item)
            
            with open(self.filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
