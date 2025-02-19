import React, { useState, useRef, useEffect } from 'react';
import '../styles/Upload.css';

interface Caption {
  start: string;
  end: string;
  text: string;
}

const Upload = () => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [captionStyle, setCaptionStyle] = useState({
    fontSize: '24px',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'bottom',
    fontWeight: 'normal',
    fontStyle: 'normal',
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle Video Upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoURL(URL.createObjectURL(file));
    }
  };

  // Handle SRT Upload & Parse
  const handleSRTUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        parseSRT(text);
      };
      reader.readAsText(file);
    }
  };

  // SRT Parser
  const parseSRT = (srtText: string) => {
    const lines = srtText.split('\n');
    const parsedCaptions: Caption[] = [];
    let index = 0;

    while (index < lines.length) {
      const number = lines[index].trim();
      if (!number) {
        index++;
        continue;
      }
      index++;
      const time = lines[index].trim();
      const [start, end] = time.split(' --> ');
      index++;

      let text = '';
      while (index < lines.length && lines[index].trim() !== '') {
        text += lines[index] + ' ';
        index++;
      }

      parsedCaptions.push({ start, end, text: text.trim() });
      index++;
    }

    setCaptions(parsedCaptions);
  };

  // Handle Caption Edit
  const handleCaptionEdit = (index: number, field: keyof Caption, value: string) => {
    const updatedCaptions = [...captions];
    updatedCaptions[index][field] = value;
    setCaptions(updatedCaptions);
  };

  // Update Current Caption Based on Video Time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateCaption = () => {
      const currentTime = video.currentTime;
      const currentCaption = captions.find((caption) => {
        const startSeconds = timeToSeconds(caption.start);
        const endSeconds = timeToSeconds(caption.end);
        return currentTime >= startSeconds && currentTime <= endSeconds;
      });
      setCurrentCaption(currentCaption?.text || '');
    };

    video.addEventListener('timeupdate', updateCaption);
    return () => video.removeEventListener('timeupdate', updateCaption);
  }, [captions]);

  // Convert SRT time to seconds
  const timeToSeconds = (time: string) => {
    const [hours, minutes, rest] = time.split(':');
    const [seconds] = rest.split(',');
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseFloat(seconds)
    );
  };

  // Handle Style Changes
  const handleStyleChange = (field: keyof typeof captionStyle, value: string) => {
    setCaptionStyle({ ...captionStyle, [field]: value });
  };

  return (
    <div className="upload-container">
      {/* Video & SRT Upload */}
      <div className="upload-input">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="upload-input"
        />
        <input
          type="file"
          accept=".srt"
          onChange={handleSRTUpload}
          className="upload-input"
        />
      </div>

      {/* Video Player */}
      {videoURL && (
        <div className="video-container">
          <video ref={videoRef} controls className="w-full rounded-lg">
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Caption Overlay */}
          <div className="video-caption">
            <p
              style={{
                fontSize: captionStyle.fontSize,
                color: captionStyle.color,
                backgroundColor: captionStyle.backgroundColor,
                fontWeight: captionStyle.fontWeight as 'normal' | 'bold',
                fontStyle: ['italic', 'oblique'].includes(captionStyle.fontStyle) ? captionStyle.fontStyle : 'normal',
                fontFamily:
                  captionStyle.fontStyle === 'monospace'
                    ? 'monospace'
                    : captionStyle.fontStyle === 'cursive'
                    ? 'cursive'
                    : 'Arial, sans-serif', // ✅ Use a default font that supports oblique
              }}
            >
              {currentCaption}
            </p>
          </div>
        </div>
      )}

      {/* Caption Style Controls */}
      <div className="style-controls">
        <div>
          <label>Font Size</label>
          <input
            type="range"
            min="16"
            max="48"
            value={parseInt(captionStyle.fontSize)}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
          />
        </div>
        <div>
          <label>Font Color</label>
          <input
            type="color"
            value={captionStyle.color}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>
        <div>
          <label>Background Color</label>
          <input
            type="color"
            value={captionStyle.backgroundColor}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
        </div>
        <div>
          <label>Font Weight</label>
          <select
            value={captionStyle.fontWeight}
            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>
        <div>
          <label>Position</label>
          <select
            value={captionStyle.position}
            onChange={(e) => handleStyleChange('position', e.target.value)}
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
        <div>
        <label>Font Style</label>
        <select
              value={captionStyle.fontStyle}
              onChange={(e) => handleStyleChange('fontStyle', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="oblique">Oblique</option>
              <option value="cursive">Cursive</option>
              <option value="monospace">Monospace</option>
            </select>
        </div>
      </div>

      {/* Editable Captions */}
      <div className="caption-editor">
        {captions.map((caption, idx) => (
          <div key={idx} className="caption-item">
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={caption.start}
                onChange={(e) => handleCaptionEdit(idx, 'start', e.target.value)}
                className="caption-input"
              />
              <span>→</span>
              <input
                type="text"
                value={caption.end}
                onChange={(e) => handleCaptionEdit(idx, 'end', e.target.value)}
                className="caption-input"
              />
            </div>

            {/* Text Editing */}
            <textarea
              value={caption.text}
              onChange={(e) => handleCaptionEdit(idx, 'text', e.target.value)}
              className="caption-input"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
