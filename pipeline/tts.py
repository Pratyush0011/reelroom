"""Text to speech with word timings, using Microsoft Edge's neural voices (free, no API key).

Usage: python tts.py <voice> <rate> <text_file> <out_mp3> <out_words_json>
Writes the audio and a JSON list of {text, startMs, endMs} for every spoken word.
"""
import asyncio
import json
import sys

import edge_tts


async def main(voice: str, rate: str, text_file: str, out_mp3: str, out_json: str) -> None:
    text = open(text_file, encoding="utf-8").read().strip()
    communicate = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary")
    words = []
    with open(out_mp3, "wb") as audio:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                start = chunk["offset"] / 10_000  # 100-ns ticks -> ms
                words.append({"text": chunk["text"], "startMs": round(start), "endMs": round(start + chunk["duration"] / 10_000)})
    if not words:
        raise SystemExit("No word timings returned; the voice service may have changed.")
    json.dump(words, open(out_json, "w", encoding="utf-8"), ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(main(*sys.argv[1:6]))
