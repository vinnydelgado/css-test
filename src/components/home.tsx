import React, { useState, useEffect, useRef } from 'react';
import { Amplify } from 'aws-amplify';
import Header from './header';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports';
import { Theme, Flex, Text, Button, Grid, TextArea, Box, Container } from '@radix-ui/themes';
import axios from 'axios';
import '@radix-ui/themes/styles.css';
import './home.css';

Amplify.configure(config);

interface FloatingBoxProps {
  expanded: boolean;
  onClearAllFields: () => void;
  semiTransparentButtonStyle: React.CSSProperties;
  wrapperTopPosition: number;
}

const FloatingBox: React.FC<FloatingBoxProps> = ({ 
  expanded, 
  onClearAllFields, 
  semiTransparentButtonStyle, 
  wrapperTopPosition 
}) => {
  const [position, setPosition] = useState<'top' | 'side'>('top');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / document.documentElement.scrollHeight) * 100;
      if (expanded && scrollPercentage > 5) {
        setPosition('side');
      } else {
        setPosition('top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expanded]);

  const boxStyle: React.CSSProperties = {
    
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    ...(position === 'top'
      ? {
          position: 'absolute',
          top: `${wrapperTopPosition - 100}px`, // Position it 70px above the wrapper
          left: '50%',
          transform: 'translateX(-50%)',
        }
      : {
          position: 'fixed',
          top: '18%',
          left: '18%',
          transform: 'translateY(-5%)',
        }),
  };

  return (
    <Box style={boxStyle}>
      <Button type="button" variant="solid" onClick={onClearAllFields} style={semiTransparentButtonStyle}>
        Clear All Fields
      </Button>
    </Box>
  );
};




const customStyles = `

textarea, input, button {
  font-family: 'Courier', monospace;

  textarea::selection {
    background-color: rgba(255, 140, 0, 0.3); /* Light orange background */
    color: inherit; /* Keep the text color */
  }
  
  textarea::-moz-selection {
    background-color: rgba(255, 140, 0, 0.3);
    color: inherit;
  }

  }
`;


export function Home({ signOut, user }: WithAuthenticatorProps) {
  const [data, setData] = useState({
    G: '',
    T: '',
    M: '',
    CQ: '',
    SUM: '',
    S1: '',
    S2: '',
    S3: '',
    S4: '',
    S5: '',
    S6: '',
    S7: '',
    S8: '',
    S9: '',
  });

  const summary = async (formData: any) => {
    return await axios.post('https://8y8kvy7r77.execute-api.us-east-1.amazonaws.com/alpha/summary', {
      "event": "summary",
      "M": data.M,
      "T": data.T,
      "G": data.G,
      "CQ": data.CQ,
      "SUM": data.SUM,
    });
  }

  const story = async (formData: any) => {
    return await axios.post('https://8y8kvy7r77.execute-api.us-east-1.amazonaws.com/alpha/summary', {
      "event": "story",
      "M": data.M,
      "T": data.T,
      "G": data.G,
      "CQ": data.CQ,
      "SUM": data.SUM,
      "S1": data.S1,
      "S2": data.S2,
      "S3": data.S3,
      "S4": data.S4,
      "S5": data.S5,
      "S6": data.S6,
      "S7": data.S7,
      "S8": data.S8,
      "S9": data.S9
    });
  }

  const mutateSummary = useMutation({
    mutationFn: (formData: any) => summary(formData),
    onSuccess: (res: any) => {
      console.log(res.data);
      handleChange(res);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const mutateStory = useMutation({
    mutationFn: (formData: any) => story(formData),
    onSuccess: (res: any) => {
      console.log(res.data);
      handleChange(res);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleSummary = (e: any) => {
    console.log(data.SUM);
    console.log(e);

    const formData = new FormData(e.target);

    mutateSummary.mutate(formData);
  }

  const handleStory = (e: any) => {
    console.log(e);

    const formData = new FormData(e.target);

    mutateStory.mutate(formData);
  }

  const handleChange = (res: any) => {
    try {
      if (res.data.event === "summary") {
        setData((data) => ({ ...data, SUM: res.data.SUM }));
      } else {
        setData((data) => ({
          ...data,
          M: res.data.M,
          T: res.data.T,
          G: res.data.G,
          CQ: res.data.CQ,
          SUM: res.data.SUM,
          S1: res.data.S1,
          S2: res.data.S2,
          S3: res.data.S3,
          S4: res.data.S4,
          S5: res.data.S5,
          S6: res.data.S6,
          S7: res.data.S7,
          S8: res.data.S8,
          S9: res.data.S9,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [wrapperTopPosition, setWrapperTopPosition] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWrapperPosition = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setWrapperTopPosition(rect.top + window.scrollY);
      }
    };

    updateWrapperPosition();
    window.addEventListener('resize', updateWrapperPosition);
    return () => window.removeEventListener('resize', updateWrapperPosition);
  }, []);


  const clearField = (segmentId: string) => {
    console.log("clear field " + segmentId);
    setData((data) => ({ ...data, [segmentId]: "" }));
  };


  const [expanded, setExpanded] = useState(false);
  const [hoveredTextArea, setHoveredTextArea] = useState<string | null>(null);
  const [focusedTextArea, setFocusedTextArea] = useState<string | null>(null);
  const [flickerState, setFlickerState] = useState<'off' | 'on1' | 'off2' | 'on2'>('off');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { register, handleSubmit } = useForm();

  const semiTransparentButtonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#333',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(5px)',
    boxShadow: 'none', // Remove any shadow from the button itself
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      border: '1px solid rgba(0, 0, 0, 0.3)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    },
  };

  const textAreaStyle = {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    padding: '10px',
    transition: 'box-shadow 0.2s ease-in-out',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
  };

  const whiteContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px',
  };

  const widerWhiteContainerStyle = {
    ...whiteContainerStyle,
    width: '100%',
    maxWidth: '1800px', // Adjust this value as needed
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
    setHoveredTextArea(event.currentTarget.id);
  };

  const handleMouseLeave = () => {
    setHoveredTextArea(null);
  };

  const flickerTiming = {
    initialDelay: 0,    // Delay before the first color change
    firstFlash: 250,     // Duration of the first color (on1)
    blackOut: 100,       // Duration of the black color (off2)
    finalColor: 100,    // When the final color appears after focus
  };

  const handleFocus = (id: string) => {
    setFocusedTextArea(id);
    
    // Initial color change
    setTimeout(() => {
      setFlickerState('on1');
      
      // Change to black
      setTimeout(() => {
        setFlickerState('off2');
        
        // Change to final color
        setTimeout(() => {
          setFlickerState('on2');
        }, flickerTiming.blackOut);
        
      }, flickerTiming.firstFlash);
      
    }, flickerTiming.initialDelay);
  };

  const handleBlur = () => {
    setFocusedTextArea(null);
    setFlickerState('off');
  };

  const [customLabels, setCustomLabels] = useState({
    SUM: 'Summary',
    S1: 'Introduction and Stasis',
    S2: 'Inciting Incident',
    S3: 'Comittment',
    S4: 'First Pinch Point',
    S5: 'Midpoint',
    S6: 'Second Pinch Point',
    S7: 'Second Plot Point',
    S8: 'Climax',
    S9: 'Resolution'
  });


  const getTextAreaStyle = (baseStyle: React.CSSProperties, id: string) => {
    const isHovered = hoveredTextArea === id;
    const isFocused = focusedTextArea === id;
  
    let style = { ...baseStyle };
  
    const orangeColor = '#FF8C00';
    const orangeShadow = `0 0 10px ${orangeColor}40, 0 0 20px ${orangeColor}20, 0 0 30px ${orangeColor}10`; // Added a third, more spread out shadow
  
    if (isHovered || isFocused) {
      const { x, y } = mousePosition;
      const width = 300; // Adjust based on your text area's actual width
      const height = 150; // Adjust based on your text area's actual height
      
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
          // No orange shadow during initial flash
          break;
        case 'off2':
          style.border = `2px solid ${orangeColor}00`; // Fully transparent
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
  

  const clearAllFields = () => {
    console.log("clear all fields");
    setData((data) => ({
      ...data,
      M: "",
      T: "",
      G: "",
      CQ: "",
      SUM: "",
      S1: "",
      S2: "",
      S3: "",
      S4: "",
      S5: "",
      S6: "",
      S7: "",
      S8: "",
      S9: "",
    }));


  };

  const renderTextArea = (field: string, rows: number = 1, width: string = '100%') => (
    <Flex direction="row" className="text-area-container" style={{ width }}>
      <Flex direction="column" className="text-area" style={{ flex: 1 }}>
        <Text as="label" htmlFor={field} style={{ fontFamily: "'Courier', monospace" }}>
          {field.startsWith('S') ? customLabels[field as keyof typeof customLabels] : 
           (field === 'G' ? 'Genre' : 
            field === 'T' ? 'Theme' : 
            field === 'M' ? 'Mood' : 
            field === 'CQ' ? 'Core Question' : 
            field === 'SUM' ? 'Summary' : 
            field)}
        </Text>
        <TextArea
          {...register(field)}
          id={field}
          name={field}
          rows={rows}
          value={data[field as keyof typeof data]}
          onChange={(event) => setData((data) => ({ ...data, [field]: event.target.value }))}
          style={{
            ...getTextAreaStyle(textAreaStyle, field),
            width: '100%',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={() => handleFocus(field)}
          onBlur={handleBlur}
        />
      </Flex>
      <Button type="button" variant="solid" className="clear-button" onClick={() => clearField(field)} style={semiTransparentButtonStyle}>
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

  return (
    <>
      <style>{customStyles}</style>
      <Theme>
        <div className="app-container">
          <Header />
          <Flex direction="column" justify="center" align="center" style={{ flexGrow: 1 }}>
            <div style={{ width: '100%' }}>
              <img src={require("./banner_full_text.png")} alt="FilmAssistant AI Logo" style={{ width: '100%', height: 'auto' }} />
            </div>
            {/* Add space here */}
            <div style={{ height: '100px' }}></div>
            <FloatingBox 
              expanded={expanded} 
              onClearAllFields={clearAllFields}
              semiTransparentButtonStyle={semiTransparentButtonStyle}
              wrapperTopPosition={wrapperTopPosition}
            />
            <Flex direction="column" width="100%" align="center" className="text-areas-background" ref={wrapperRef}>
              <Box
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  padding: '32px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  width: '90%',
                  maxWidth: '1200px',
                  margin: '20px 0',
                }}
              >
                <form>
                  <Container size="3" align="center">
                    <Box style={whiteContainerStyle}>
                      <Flex direction="column" align="center" style={{ width: '100%' }}>
                        <Grid columns="2" justify="center" gap="4">
                          {renderTextArea('G', 1, '100%')}
                          {renderTextArea('T', 1, '100%')}
                          {renderTextArea('M', 3, '100%')}
                          {renderTextArea('CQ', 3, '100%')}
                        </Grid>
                      </Flex>
                    </Box>
                  </Container>
                <Container size="3" align="center">
                <Box style={whiteContainerStyle}>
                  {renderTextArea('SUM', 3, '100%')}
            </Box>
                  </Container>
                  <Container size="4" align="center">
                    <Box style={widerWhiteContainerStyle}>
                      {!expanded && (
                        <Flex justify="center" py="9">
                          <Button type="button" variant="solid" radius="full" style={{ ...semiTransparentButtonStyle, padding: '2rem 1rem' }} onClick={() => setExpanded(true)}>
                            <svg
                              width="30"
                              height="30"
                              viewBox="-2 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginRight: '0.5rem' }}
                            >
                              <path
                                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Expand Story Segments
                          </Button>
                        </Flex>
                      )}
                      {expanded && (
                        <>
                          {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => renderTextArea(`S${i}`, 4, '100%'))}
                        </>
                      )}
                    </Box>
                  </Container>
                  <Flex justify="end">
                    <Button onClick={(e) => { handleSubmit(handleStory)(e) }} name="generate_story" variant="solid" style={semiTransparentButtonStyle}>
                      Generate Story
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Flex>
          </Flex>
        </div>
        <Button type="button" variant="solid" onClick={signOut} style={semiTransparentButtonStyle}>Sign out</Button>
      </Theme>
    </>
  );
}

export default withAuthenticator(Home);
