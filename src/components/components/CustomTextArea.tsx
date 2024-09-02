import React, { useState } from 'react';
import { Flex, Text, TextArea, Button } from '@radix-ui/themes';

interface CustomTextAreaProps {
  field: string;
  rows?: number;
  width?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearField: (field: string) => void;
  customLabels: { [key: string]: string };
  textAreaStyle: React.CSSProperties;
  semiTransparentButtonStyle: React.CSSProperties;
  hoveredTextArea: string | null;
  focusedTextArea: string | null;
  mousePosition: { x: number; y: number };
  flickerState: 'off' | 'on1' | 'off2' | 'on2';
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  field,
  rows = 1,
  width = '100%',
  value,
  onChange,
  onClearField,
  customLabels,
  textAreaStyle,
  semiTransparentButtonStyle,
  hoveredTextArea,
  focusedTextArea,
  mousePosition,
  flickerState
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTextAreaStyle = (baseStyle: React.CSSProperties, id: string) => {
    const isHovered = hoveredTextArea === id;
    const isFocused = focusedTextArea === id;
  
    let style = { ...baseStyle };
  
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
  
      const dynamicShadow = `
        ${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 0.1),
        ${shadowX * 1.5}px ${shadowY * 1.5}px 20px rgba(0, 0, 0, 0.05),
        ${shadowX * 2}px ${shadowY * 2}px 30px rgba(0, 0, 0, 0.025)
      `;
  
      style.boxShadow = dynamicShadow;
    }
  
    if (isFocused) {
      switch (flickerState) {
        case 'on1':
          style.border = `2px solid ${orangeColor}`;
          break;
        case 'off2':
          style.border = `2px solid ${orangeColor}00`;
          style.boxShadow = 'none';
          break;
        case 'on2':
          style.border = `2px solid ${orangeColor}`;
          style.boxShadow = `${style.boxShadow}, ${orangeShadow}`;
          break;
        default:
          style.border = '2px solid rgba(0, 0, 0, 0.2)';
      }
    } else {
      style.border = '2px solid rgba(0, 0, 0, 0.2)';
    }
  
    style.fontFamily = "'Courier', monospace";
    style.transition = 'border-color 0.05s ease-in-out, box-shadow 0.05s ease-in-out';
    style.outline = 'none';
    style.WebkitTapHighlightColor = 'transparent';
  
    return style;
  };

  return (
    <Flex direction="row" className="text-area-container" style={{ width }}>
      <Flex direction="column" className="text-area" style={{ flex: 1 }}>
        <Text as="label" htmlFor={field} style={{ fontFamily: "'Courier', monospace" }}>
          {field.startsWith('S') ? customLabels[field] : 
           (field === 'G' ? 'Genre' : 
            field === 'T' ? 'Theme' : 
            field === 'M' ? 'Mood' : 
            field === 'CQ' ? 'Core Question' : 
            field === 'SUM' ? 'Summary' : 
            field)}
        </Text>
        <TextArea
          id={field}
          name={field}
          rows={rows}
          value={value}
          onChange={onChange}
          style={getTextAreaStyle(textAreaStyle, field)}
          onMouseMove={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Flex>
      <Button type="button" variant="solid" className="clear-button" onClick={() => onClearField(field)} style={semiTransparentButtonStyle}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Flex>
  );
};

export default CustomTextArea;