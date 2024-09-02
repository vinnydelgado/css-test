import React, { useState } from 'react';
import { Flex, Text, TextArea as RadixTextArea, Button } from '@radix-ui/themes';

interface TextAreaProps {
  id: string;
  field: string;
  rows?: number;
  width?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearField: (field: string) => void;
  customLabels: { [key: string]: string };
}

const TextArea: React.FC<TextAreaProps> = ({
    id,
    field,
    rows = 1,
    width = '100%',
    value,
    onChange,
    onClearField,
    customLabels
  }) => {
    const [flashState, setFlashState] = useState<'off' | 'firstFlash' | 'secondFlash'>('off');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [flickerState, setFlickerState] = useState<'off' | 'on1' | 'off2' | 'on2'>('off');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleFocus = () => {
    setIsFocused(true);
    
    setTimeout(() => {
      setFlickerState('on1');
      setTimeout(() => {
        setFlickerState('off2');
        setTimeout(() => {
          setFlickerState('on2');
        }, 100);
      }, 250);
    }, 0);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setFlickerState('off');
  };

  const getTextAreaStyle = () => {
    const baseStyle: React.CSSProperties = {
      width: '100%',
      border: '2px solid rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      padding: '10px',
      transition: 'all 0.05s ease-in-out',
      outline: 'none',
      WebkitTapHighlightColor: 'transparent',
      fontFamily: "'Courier', monospace",
      boxShadow: 'none',
    };

    const orangeColor = '#FF8C00';
    const orangeShadow = `0 0 10px ${orangeColor}40, 0 0 20px ${orangeColor}20, 0 0 30px ${orangeColor}10`;

    if (isHovered || isFocused) {
      const { x, y } = mousePosition;
      const width = 300;
      const height = 150;
      
      const distanceX = Math.max(0, width - x);
      const distanceY = Math.max(0, height - y);
      
      const angle = Math.atan2(distanceY, distanceX);
      
      const shadowDistance = Math.min(Math.sqrt(distanceX * distanceX + distanceY * distanceY), 20);
      const shadowX = Math.cos(angle) * shadowDistance;
      const shadowY = Math.sin(angle) * shadowDistance;

      baseStyle.boxShadow = `
        ${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 0.1),
        ${shadowX * 1.5}px ${shadowY * 1.5}px 20px rgba(0, 0, 0, 0.05),
        ${shadowX * 2}px ${shadowY * 2}px 30px rgba(0, 0, 0, 0.025)
      `;
    }

    if (isFocused) {
      switch (flickerState) {
        case 'on1':
          baseStyle.border = `2px solid ${orangeColor}`;
          baseStyle.boxShadow = 'none';
          break;
        case 'off2':
          baseStyle.border = `2px solid transparent`;
          baseStyle.boxShadow = 'none';
          break;
        case 'on2':
          baseStyle.border = `2px solid ${orangeColor}`;
          baseStyle.boxShadow = orangeShadow;
          break;
        default:
          // Keep the default border
      }
    }

    return baseStyle;
  };

  return (
    <Flex direction="row" className="text-area-container" style={{ width }}>
      <Flex direction="column" className="text-area" style={{ flex: 1 }}>
        <Text as="label" htmlFor={id} style={{ fontFamily: "'Courier', monospace" }}>
          {field.startsWith('S') ? customLabels[field] : 
           (field === 'G' ? 'Genre' : 
            field === 'T' ? 'Theme' : 
            field === 'M' ? 'Mood' : 
            field === 'CQ' ? 'Core Question' : 
            field === 'SUM' ? 'Summary' : 
            field)}
        </Text>
        <RadixTextArea
          id={id}
          name={field}
          rows={rows}
          value={value}
          onChange={onChange}
          style={getTextAreaStyle()}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Flex>
      <Button type="button" variant="solid" className="clear-button" onClick={() => onClearField(field)}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
        </svg>
      </Button>
    </Flex>
  );
};

export default TextArea;