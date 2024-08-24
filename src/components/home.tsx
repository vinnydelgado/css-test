import React, { useState, useEffect } from 'react';
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(0, 0, 0, 0.3)',
    },
    '&:active': {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    firstFlash: 150,     // Duration of the first color (on1)
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



  const getTextAreaStyle = (baseStyle: React.CSSProperties, id: string) => {
    const isHovered = hoveredTextArea === id;
    const isFocused = focusedTextArea === id;

    let style = { ...baseStyle };

    if (isHovered || isFocused) {
      const { x, y } = mousePosition;
      const centerX = x - 150;
      const centerY = y - 75;
      const angle = Math.atan2(centerY, centerX);
      const distance = Math.min(Math.sqrt(centerX * centerX + centerY * centerY), 150);
      const shadowX = Math.cos(angle) * distance * 0.1;
      const shadowY = Math.sin(angle) * distance * 0.1;

      style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1), 
                         ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2), 
                         ${-shadowX}px ${-shadowY}px 30px rgba(255, 255, 255, 0.4)`;
    }

    if (isFocused) {
      switch (flickerState) {
        case 'on1':
          style.border = '2px solid rgba(0, 255, 255, 1)';
          // No additional glow for the first flash
          break;
        case 'off2':
          style.border = '2px solid rgba(0, 255, 255, 0)';
          break;
        case 'on2':
          style.border = '2px solid rgba(0, 255, 255, 1)';
          style.boxShadow += ', 0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5)';
          break;
        default:
          style.border = '2px solid rgba(0, 0, 0, 0.2)';
      }
    } else {
      style.border = '2px solid rgba(0, 0, 0, 0.2)';
    }

    style.transition = 'border-color 0.05s ease-in-out';

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

  return (
    <>
      <Theme>
        <div className="app-container">
          <Header />
          <Flex direction="column" justify="center" align="center" style={{ flexGrow: 1 }}>
            <div style={{ width: '100%' }}>
              <img src={require("./banner_full_text.png")} alt="FilmAssistant AI Logo" style={{ width: '100%', height: 'auto' }} />
            </div>
            <Flex direction="column" width="100%" align="center" className="text-areas-background">
              <Box width="2500px" px="835px">
                {/* Header has been moved above */}
              </Box>
              {/* New div for the overlay image */}
              <div className="overlay-image"></div>
              <Box
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
                  borderRadius: '24px',
                  padding: '32px',
                  backdropFilter: 'blur(10px)', // This creates a frosted glass effect
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  width: '90%', // Adjust as needed
                  maxWidth: '1200px', // Adjust as needed
                  margin: '20px 0',
                }}
              >
              <form>
                <Flex justify="end" bottom="4" align="center">
                  <Button type="button" variant="solid" onClick={clearAllFields} style={semiTransparentButtonStyle}>
                    Clear All Fields
                  </Button>
                </Flex>
                <Container size="3" align="center">
                  <Box style={whiteContainerStyle}>
                    <Flex direction="column" align="center" style={{ width: '100%' }}>
                      <Grid columns="2" justify="center">
                        {['G', 'T', 'M', 'CQ'].map((field) => (
                          <Flex key={field} direction="row" className="text-area-container" maxWidth="500px">
                            <Flex direction="column" className="text-area" style={{ flex: 1 }}>
                              <Text as="label" htmlFor={field}>
                                {field === 'G' ? 'Genre' : field === 'T' ? 'Theme' : field === 'M' ? 'Mood' : 'Core Question'}
                              </Text>
                              <TextArea
                                {...register(field)}
                                id={field}
                                name={field}
                                rows={field === 'M' || field === 'CQ' ? 3 : 1}
                                value={data[field as keyof typeof data]}
                                onChange={(event) => setData((data) => ({ ...data, [field]: event.target.value }))}
                                style={getTextAreaStyle(textAreaStyle, field)}
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
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </Button>
                          </Flex>
                        ))}
                      </Grid>
                    </Flex>
                  </Box>
                </Container>
                <Container size="3" align="center">
                    <Box
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        marginBottom: '24px',
                      }}
                    >
                      <Flex direction="row" className="text-area-container" maxWidth="100%">
                        <Flex direction="column" className="text-area" style={{ flex: 1 }}>
                          <Text as="label" htmlFor="SUM">Summary:</Text>
                          <TextArea 
                      
                      {...register("SUM")} 
                      id="SUM" 
                      name="SUM" 
                      rows={3} 
                      value={data.SUM} 
                      onChange={(event) => setData((data) => ({ ...data, SUM: event.target.value }))} 
                      style={getTextAreaStyle(textAreaStyle, "SUM")}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                            
                          />
                        </Flex>
                        <Flex direction="column" className="button-container">
                          <Button type="button" variant="solid" className="clear-button" onClick={() => clearField("SUM")} style={semiTransparentButtonStyle}>
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
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </Button>
                          <Button type="submit" onClick={(e) => { handleSubmit(handleSummary)(e) }} name="generate_summary" style={semiTransparentButtonStyle}>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>
                  </Container>
                  <Container size="3" align="center">
                    <Box style={whiteContainerStyle}>
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
                            Expand S1-S9
                          </Button>
                        </Flex>
                      )}
                      {expanded && (
                        <>
                          {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
                            <Flex key={`S${i}`} direction="column" gap="2" bottom="4">
                              <Text as="label" htmlFor={`S${i}`}>S{i}:</Text>
                              <Flex direction="row" align="center" gap="2">
                                <Box style={{ flex: 1 }}>
                                  <TextArea
                            {...register(`S${i}`)}
                            id={`S${i}`}
                            name={`S${i}`}
                            rows={5}
                            value={data[`S${i}` as keyof typeof data]}
                            onChange={(event) => setData((data) => ({ ...data, [`S${i}`]: event.target.value }))} 
                            style={getTextAreaStyle(textAreaStyle, `S${i}`)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                                  />
                                </Box>
                                <Button 
                                  type="button" 
                                  variant="solid" 
                                  onClick={() => clearField(`S${i}`)}
                                  style={{ ...semiTransparentButtonStyle, alignSelf: 'flex-start', marginTop: '4px' }}
                                >
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
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </Button>
                              </Flex>
                            </Flex>
                          ))}
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
