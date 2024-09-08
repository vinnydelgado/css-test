import React, { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import { Amplify } from 'aws-amplify';
import { useForm } from "react-hook-form";
import { BrowserRouter as Router } from 'react-router-dom';
import { useMutation } from "react-query";
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports';
import { Theme, Flex, Text, Button, Grid, Box, Container } from '@radix-ui/themes';
import axios from 'axios';
import '@radix-ui/themes/styles.css';
import './home.css';
import FloatingBox from './FloatingBox';
import whiteOverlay from './Head-color with text.png';
import TextArea from './TextArea';


Amplify.configure(config);

const GlassesIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 6.625C1.01675 6.625 0.625 7.01675 0.625 7.5C0.625 7.98325 1.01675 8.375 1.5 8.375C1.98325 8.375 2.375 7.98325 2.375 7.5C2.375 7.01675 1.98325 6.625 1.5 6.625ZM13.5 6.625C13.0168 6.625 12.625 7.01675 12.625 7.5C12.625 7.98325 13.0168 8.375 13.5 8.375C13.9832 8.375 14.375 7.98325 14.375 7.5C14.375 7.01675 13.9832 6.625 13.5 6.625ZM3.125 7.5C3.125 6.2574 4.13235 5.25 5.375 5.25C6.61765 5.25 7.625 6.2574 7.625 7.5C7.625 8.7426 6.61765 9.75 5.375 9.75C4.13235 9.75 3.125 8.7426 3.125 7.5ZM9.625 7.5C9.625 6.2574 10.6324 5.25 11.875 5.25C13.1176 5.25 14.125 6.2574 14.125 7.5C14.125 8.7426 13.1176 9.75 11.875 9.75C10.6324 9.75 9.625 8.7426 9.625 7.5ZM5.375 6C4.5462 6 3.875 6.67125 3.875 7.5C3.875 8.32875 4.5462 9 5.375 9C6.2038 9 6.875 8.32875 6.875 7.5C6.875 6.67125 6.2038 6 5.375 6ZM11.875 6C11.0462 6 10.375 6.67125 10.375 7.5C10.375 8.32875 11.0462 9 11.875 9C12.7038 9 13.375 8.32875 13.375 7.5C13.375 6.67125 12.7038 6 11.875 6ZM1.75 7.5C1.75 7.43788 1.75675 7.37725 1.76925 7.31875L7.31875 5.01925C7.37 5.00675 7.42275 5 7.47575 5H7.52425C7.57725 5 7.63 5.00675 7.68125 5.01925L13.2308 7.31875C13.2433 7.37725 13.25 7.43788 13.25 7.5C13.25 7.56212 13.2433 7.62275 13.2308 7.68125L7.68125 9.98075C7.63 9.99325 7.57725 10 7.52425 10H7.47575C7.42275 10 7.37 9.99325 7.31875 9.98075L1.76925 7.68125C1.75675 7.62275 1.75 7.56212 1.75 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
  </svg>
);

const SummaryIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);


const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};


type DataState = {
  G: string;
  T: string;
  M: string;
  CQ: string;
  SUM: string;
  S1: string;
  S2: string;
  S3: string;
  S4: string;
  S5: string;
  S6: string;
  S7: string;
  S8: string;
  S9: string;
};

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

  const [lastGeneratedGenre, setLastGeneratedGenre] = useState<string | null>(null);

  const [apiError, setApiError] = useState<string | null>(null);

  const summary = async (formData: any) => {
    console.log("Sending summary request:", formData);
    try {
      const response = await axios.post('https://8y8kvy7r77.execute-api.us-east-1.amazonaws.com/alpha/summary', {
        "event": "summary",
        ...formData
      });
      console.log("Summary response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Summary request error:", error);
      throw error;
    }
  }

  const story = async (formData: any) => {
    console.log("Sending story request:", formData);
    try {
      const response = await axios.post('https://8y8kvy7r77.execute-api.us-east-1.amazonaws.com/alpha/summary', {
        "event": "story",
        ...formData
      });
      console.log("Story response:", response.data);
      return response;
    } catch (error) {
      console.error("Story request error:", error);
      throw error;
    }
  }


  const mutateStory = useMutation({
    mutationFn: story,
    onSuccess: (res: any) => {
      console.log("Story mutation success:", res);
      setData((data) => ({ ...data,
        M:res.data.M,
        T:res.data.T,
        G:res.data.G,
        CQ:res.data.CQ,
        SUM:res.data.SUM,
        S1:res.data.S1,
        S2:res.data.S2,
        S3:res.data.S3,
        S4:res.data.S4,
        S5:res.data.S5,
        S6:res.data.S6,
        S7:res.data.S7,
        S8:res.data.S8,
        S9:res.data.S9
      }));
      setApiError(null);
    },
    onError: (error: any) => {
      console.error("Story mutation error:", error);
      setApiError("Failed to generate story. Please try again.");
    },
  });
  const isFieldBlank = (value: string): boolean => {
    return value.trim() === '';
  };

  const getCurrentTextAreaValues = (): DataState => {
    const newData: DataState = {} as DataState;
    Object.keys(data).forEach(key => {
      const element = document.getElementById(key) as HTMLTextAreaElement;
      newData[key as keyof DataState] = element ? element.value : '';
    });
    return newData;
  };

  const isAllBlank = (): boolean => {
    const currentData = getCurrentTextAreaValues();
    return Object.entries(currentData).every(([key, value]) => {
      const isEmpty = isFieldBlank(value);
      console.log(`Field ${key} is ${isEmpty ? 'empty' : 'not empty'}. Value: "${value}"`);
      return isEmpty;
    });
  };

  const getRandomGenre = () => {
    const genres = [
      "Drama/Comedy",
      "Drama/Thriller",
      "Drama/War",
      "Drama/Mystery",
      "Drama/Arthouse"
    ];
    return genres[Math.floor(Math.random() * genres.length)];
  };

  const handleSummary = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    let summaryData = getCurrentTextAreaValues();

    console.log("Current data:", summaryData);

    // Check if all fields are blank
    const allFieldsBlank = isAllBlank();

    console.log("Are all fields blank?", allFieldsBlank);

    // If all fields are blank, set G to a random genre
    if (allFieldsBlank) {
      const randomGenre = getRandomGenre();
      console.log("Assigning random genre:", randomGenre);
      summaryData = { ...summaryData, G: randomGenre };
    } else {
      console.log("Not all fields are blank. Using existing data.");
    }

    console.log("Final data to be sent:", summaryData);

    mutateSummary.mutate({
      ...summaryData,
      event: "summary"
    });
  };

  const clearAllFields = () => {
    const clearedData: DataState = Object.fromEntries(
      Object.keys(data).map(key => [key, ''])
    ) as DataState;
    
    setData(clearedData);
    
    // Clear all text areas in the UI
    Object.keys(data).forEach(key => {
      const element = document.getElementById(key) as HTMLTextAreaElement;
      if (element) {
        element.value = '';
      }
    });

    console.log("All fields cleared:", clearedData);
  };

  const mutateSummary = useMutation({
    mutationFn: summary,
    onSuccess: (responseData: any) => {
      console.log("Summary mutation success:", responseData);
      handleApiResponse(responseData);
      setApiError(null);
    },
    onError: (error: any) => {
      console.error("Summary mutation error:", error);
      setApiError("Failed to generate summary. Please try again.");
    },
  });

  const handleApiResponse = (response: any) => {
    console.log("Handling API response:", response);
    setData(prevData => {
      const newData: DataState = { ...prevData, ...response };
      console.log("Updated data after API response:", newData);
      return newData;
    });
  };

  const handleStory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Handling story request with current data:", data);
    mutateStory.mutate({
      ...data,
      event: "story"
    });
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setData(prevData => {
      const newData = { ...prevData, [name]: value };
      console.log("Updated data:", newData);
      return newData;
    });
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
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollPosition, setMaxScrollPosition] = useState(0);

  const handleScroll = useCallback(
    debounce(() => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const newScrollPosition = Math.max(0, window.scrollY - rect.top);
        setHasScrolled(window.scrollY > rect.top);
        setScrollPosition(newScrollPosition);
      }
    }, 10), // 10ms debounce time
    []
  );


  const { register, handleSubmit } = useForm();





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


  const renderTextArea = (field: string, rows: number = 1, width: string = '100%') => (
    <TextArea
      id={field}
      field={field}
      rows={rows}
      width={width}
      value={data[field as keyof typeof data]}
      onChange={handleInputChange}
      onClearField={clearField}
      customLabels={customLabels}
    />
  );

  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [drawerExpanded, setDrawerExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const newScrollPosition = Math.max(0, window.scrollY - rect.top);
        setHasScrolled(window.scrollY > rect.top);
        setScrollPosition(newScrollPosition);

        // Calculate the maximum scroll position with 15% buffer
        const parentHeight = wrapperRef.current.clientHeight;
        const floatingBoxHeight = 200; // Adjust this value based on your FloatingBox height
        const bufferHeight = parentHeight * 0.15; // 15% of parent height
        const newMaxScrollPosition = parentHeight - floatingBoxHeight - bufferHeight;
        setMaxScrollPosition(newMaxScrollPosition);
      }
    };

    const updateWrapperDimensions = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setWrapperWidth(rect.width);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateWrapperDimensions);

    // Initial call to set dimensions and scroll position
    updateWrapperDimensions();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateWrapperDimensions);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerExpanded(!drawerExpanded);
  };


  const bannerContainerStyle = {
    width: '100%', 
    position: 'relative' as const, // Type assertion to avoid TypeScript error
    overflow: 'hidden',
    height: '150px', // Adjust this value as needed
  };
  const orangeShapeStyle = {
    content: '""',
    //background: 'linear-gradient(140deg, #fea57e 0%,#fea57e 35%, #FFFFFF 100%)',
    position: 'absolute' as const, // Type assertion
    top: 'auto',
    left: 'auto',
    width: '150%',
    height: '150px',
    //backgroundColor: '#FFFFFF', // Light orange color
    borderRadius: '0 0 0% 0%',
    zIndex: -1,
  };

  return (
    <>
      <Theme>
        <div className="app-container">
        <div className="gradient-background"></div>
          <Flex direction="column" justify="center" align="center" style={{ flexGrow: 1, position: 'relative' }}>
          <div style={bannerContainerStyle}>
  {/* CSS Shape (Orange Underlay) */}
            <div style={orangeShapeStyle}></div>

              {/* White Overlay (Image 2) */}
              <img 
                src={whiteOverlay} 
                alt="White overlay" 
                style={{
                  width: 'auto',
                  height: '200px',
                  position: 'absolute',
                  top: 'auto',
                  left: '25%',
                  opacity: 1, // Adjust this value to control the overlay intensity
                }}
              />

            </div>
            <Flex style={{ width: '100%', justifyContent: 'center', position: 'relative', paddingTop: '50px' }}>
              <Flex style={{ width: '100%', justifyContent: 'center', position: 'relative' }}>
              <Flex direction="column" width="90%" maxWidth="1200px" align="center" className="text-areas-background" ref={wrapperRef}>
              <Box
                  style={{
                    position: 'relative',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '24px',
                    padding: '32px',
                    paddingTop: '40px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    width: '100%',
                    margin: '25px 0',
                    zIndex: 2,
                  }}
>
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '40px', // This should match the amount of drawer peeking out
                    overflow: 'visible',
                    zIndex: 3,
                    justifyContent: 'center',
                  }}
                >
                <FloatingBox 
                  expanded={drawerExpanded} 
                  onClearAllFields={clearAllFields}
                  onToggle={toggleDrawer}
                  isScrolled={hasScrolled && expanded}
                  wrapperWidth={wrapperWidth}
                  scrollPosition={scrollPosition}
                  maxScrollPosition={maxScrollPosition}
                />
                                
                </Box>
                <Box 
                  style={{ 
                    position: 'relative', 
                    zIndex: 2,
                    marginTop: '-10px', // Negative margin to offset the peeking drawer
                  }}
                >
                 <form onSubmit={handleStory}>
                  <Container size="3" align="center">
                    <Box className="white-container">
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
                <Box className="white-container">
                  {renderTextArea('SUM', 3, '100%')}
                  <Button 
                onClick={handleSummary} 
                type="button" 
                name="generate_summary" 
                variant="solid" 
                className="semi-transparent-button"
                disabled={mutateSummary.isLoading}
              >
                <SummaryIcon />
                {mutateSummary.isLoading ? 'Generating...' : 'Generate Summary'}
              </Button>
            </Box>
                  </Container>
                  <Container size="4" align="center">
                    <Box className="wider-white-container">
                      {!expanded && (
                        <Flex justify="center" py="9">
                          <Button type="button" variant="solid" radius="full" className="semi-transparent-button" onClick={() => setExpanded(true)}>
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
                  <Button 
              type="submit" 
              name="generate_story" 
              variant="solid" 
              className="semi-transparent-button"
              disabled={mutateStory.isLoading}
            >
              {mutateStory.isLoading ? 'Generating...' : 'Generate Story'}
            </Button>
                  </Flex>
                </form>
              </Box>
            </Box> 
            </Flex>
           </Flex> 
           </Flex> 
          </Flex>
        </div>
        <Button type="button" variant="solid" onClick={signOut} className="semi-transparent-button">Sign out</Button>
      </Theme>
    </>
  );
}

export default withAuthenticator(Home);
