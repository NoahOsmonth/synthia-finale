"""
Live Transcription using Google Cloud Speech-to-Text V2 API with Chirp 3
Supports Taglish (Filipino-English) real-time transcription from microphone.

Prerequisites:
1. Install dependencies: pip install google-cloud-speech pyaudio
2. Set up Google Cloud credentials:
   - Create a service account with Speech-to-Text permissions
   - Download the JSON key file
   - Set environment variable: GOOGLE_APPLICATION_CREDENTIALS=path/to/your-key.json
3. Set your Google Cloud project ID:
   - Set environment variable: GOOGLE_CLOUD_PROJECT=your-project-id
4. Enable the Speech-to-Text API in your Google Cloud Console
"""

import os
import sys
import queue
import threading
from google.cloud.speech_v2 import SpeechClient
from google.cloud.speech_v2.types import cloud_speech
from google.api_core.client_options import ClientOptions

# Audio recording parameters
SAMPLE_RATE = 16000  # Chirp 3 works best with 16kHz
CHUNK_SIZE = int(SAMPLE_RATE / 10)  # 100ms chunks
CHANNELS = 1  # Mono audio

# Google Cloud configuration
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "synthia-app-478712")
# Use asia-southeast1 for better latency in Asia/Philippines
# Options: "us", "eu", "asia-southeast1", "asia-northeast1"
REGION = os.getenv("GOOGLE_CLOUD_REGION", "asia-southeast1")

# Language codes for Taglish (Filipino-English)
# fil-PH = Filipino (Philippines)
# en-US = English (United States)
# en-PH = English (Philippines)
LANGUAGE_CODES = ["fil-PH", "en-US"]


class MicrophoneStream:
    """Opens a recording stream as a generator yielding the audio chunks."""
    
    def __init__(self, rate: int = SAMPLE_RATE, chunk: int = CHUNK_SIZE):
        self._rate = rate
        self._chunk = chunk
        self._buff = queue.Queue()
        self._closed = True
        self._audio_interface = None
        self._audio_stream = None

    def __enter__(self):
        import pyaudio
        
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            channels=CHANNELS,
            rate=self._rate,
            input=True,
            frames_per_buffer=self._chunk,
            stream_callback=self._fill_buffer,
        )
        self._closed = False
        return self

    def __exit__(self, type, value, traceback):
        self._closed = True
        self._buff.put(None)
        if self._audio_stream:
            self._audio_stream.stop_stream()
            self._audio_stream.close()
        if self._audio_interface:
            self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        """Continuously collect data from the audio stream into the buffer."""
        import pyaudio
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        """Generates audio chunks from the stream."""
        while not self._closed:
            chunk = self._buff.get()
            if chunk is None:
                return
            yield chunk


def create_streaming_requests(audio_generator):
    """Creates streaming requests from audio chunks."""
    for chunk in audio_generator:
        yield cloud_speech.StreamingRecognizeRequest(audio=chunk)


def live_transcribe():
    """Performs live transcription using Google Cloud Speech-to-Text V2 with Chirp 3."""
    
    if not PROJECT_ID:
        print("❌ Error: GOOGLE_CLOUD_PROJECT environment variable is not set.")
        print("   Set it using: set GOOGLE_CLOUD_PROJECT=your-project-id")
        sys.exit(1)
    
    # Check for credentials
    if not os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
        print("⚠️  Warning: GOOGLE_APPLICATION_CREDENTIALS not set.")
        print("   Make sure you have authenticated with Google Cloud.")
    
    print("=" * 60)
    print("🎤 LIVE TRANSCRIPTION - Google Cloud Speech-to-Text V2")
    print("   Model: Chirp 3 (chirp_3)")
    print(f"   Languages: {', '.join(LANGUAGE_CODES)} (Taglish)")
    print(f"   Region: {REGION}")
    print(f"   Project: {PROJECT_ID}")
    print("=" * 60)
    print("\n🔊 Speak into your microphone...")
    print("   Press Ctrl+C to stop.\n")
    
    # Create the Speech client with regional endpoint
    client = SpeechClient(
        client_options=ClientOptions(
            api_endpoint=f"{REGION}-speech.googleapis.com",
        )
    )
    
    # Configure recognition settings for Chirp 3
    recognition_config = cloud_speech.RecognitionConfig(
        # Auto-detect audio encoding (works for most cases)
        explicit_decoding_config=cloud_speech.ExplicitDecodingConfig(
            encoding=cloud_speech.ExplicitDecodingConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=SAMPLE_RATE,
            audio_channel_count=CHANNELS,
        ),
        # Taglish language codes (Filipino + English)
        language_codes=LANGUAGE_CODES,
        # Use Chirp 3 model
        model="chirp_3",
        # Additional features
        features=cloud_speech.RecognitionFeatures(
            enable_automatic_punctuation=True,
        ),
    )
    
    # Streaming configuration
    streaming_config = cloud_speech.StreamingRecognitionConfig(
        config=recognition_config,
        streaming_features=cloud_speech.StreamingRecognitionFeatures(
            interim_results=True,  # Get partial results while speaking
        ),
    )
    
    # Initial config request
    config_request = cloud_speech.StreamingRecognizeRequest(
        recognizer=f"projects/{PROJECT_ID}/locations/{REGION}/recognizers/_",
        streaming_config=streaming_config,
    )
    
    def request_generator(config_request, audio_requests):
        """Yields config first, then audio chunks."""
        yield config_request
        yield from audio_requests
    
    try:
        with MicrophoneStream() as stream:
            audio_generator = stream.generator()
            audio_requests = create_streaming_requests(audio_generator)
            
            # Start streaming recognition
            responses = client.streaming_recognize(
                requests=request_generator(config_request, audio_requests)
            )
            
            # Process responses
            for response in responses:
                for result in response.results:
                    if result.alternatives:
                        transcript = result.alternatives[0].transcript
                        
                        # Check if this is a final result
                        if result.is_final:
                            # Print final result with a checkmark
                            print(f"✅ {transcript}")
                        else:
                            # Print interim result (overwrite line)
                            print(f"🔄 {transcript}", end="\r")
                            
    except KeyboardInterrupt:
        print("\n\n👋 Transcription stopped by user.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        if "Could not find PyAudio" in str(e) or "No module named 'pyaudio'" in str(e):
            print("\n💡 To install PyAudio on Windows:")
            print("   pip install pyaudio")
            print("   Or: pip install pipwin && pipwin install pyaudio")
        raise


if __name__ == "__main__":
    live_transcribe()
