import React, { useState, useEffect, useRef, CSSProperties } from 'react';
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
import orangeUnderlay from './Orange-test-2.png';
import whiteOverlay from './Head-color with text.png';


Amplify.configure(config);


interface FloatingBoxProps {
  expanded: boolean;
  onClearAllFields: () => void;
  semiTransparentButtonStyle: React.CSSProperties;
  onToggle: () => void;
  isScrolled: boolean;
  wrapperWidth: number;
}

const FloatingBox: React.FC<FloatingBoxProps> = ({ 
  expanded, 
  onClearAllFields, 
  semiTransparentButtonStyle,
  onToggle,
  isScrolled,
  wrapperWidth
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isScrolled);

  useEffect(() => {
    if (isScrolled) {
      setIsExpanded(false);
      setIsTransitioning(true);
    } else {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsExpanded(true);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isScrolled]);

  const boxStyle: React.CSSProperties = {
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '24px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'absolute',
    zIndex: 1,
    ...(isScrolled
      ? {
          top: '15px',
          left: '102%',
          width: 'auto',
        }
      : {
          top: expanded ? '0' : '-170%',
          left: '5%',
          width: isExpanded ? '90%' : 'auto',
        }),
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    width: isScrolled ? (isHovered ? '180px' : '40px') : (isExpanded ? '180px' : '40px'),
    height: '40px',
    borderRadius: '20px',
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    color: 'black',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  const svgContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    border: '1px solid rgba(0, 0, 0, 0.2)',
  };

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    left: '40px',
    top: '50%',
    transform: isScrolled 
      ? `translateY(-50%) ${isHovered ? 'translateX(0)' : 'translateX(-100%)'}`
      : 'translateY(-50%)',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: isScrolled ? (isHovered ? 1 : 0) : (isExpanded ? 1 : 0),
    paddingLeft: '10px',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  return (
    <Box style={boxStyle}>
      <Flex 
        direction={isScrolled ? "column" : "row"} 
        justify={isScrolled ? "start" : "between"} 
        align={isScrolled ? "start" : "center"}
        gap={isScrolled ? "2" : "0"}
      >
        <button 
          onClick={onClearAllFields} 
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span style={svgContainerStyle}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                fill="rgba(0, 0, 0, 0.6)"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span style={textStyle}>Clear All Fields</span>
        </button>
        <button 
          style={{...buttonStyle, marginLeft: isScrolled ? '0' : '10px'}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span style={svgContainerStyle}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill="rgba(0, 0, 0, 0.6)" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </span>
          <span style={textStyle}>Settings</span>
        </button>
      </Flex>
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
  const [hasScrolled, setHasScrolled] = useState(false);


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


  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [drawerExpanded, setDrawerExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setHasScrolled(window.scrollY > rect.top);
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

    // Initial call to set dimensions
    updateWrapperDimensions();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateWrapperDimensions);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerExpanded(!drawerExpanded);
  };

  const gradientStyle: CSSProperties = {
    background: 'linear-gradient(90deg, #fea57e 0%,#fea57e 20%, #fad496 55%, #fe854f 100%)',
    minHeight: '100vh',
    width: '100%',
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
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
      <style>{customStyles}</style>
      <Theme>
        <div className="app-container">
        <div style={gradientStyle}></div>
          <Header />
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  padding: '32px',
                  paddingTop: '40px', // Adjust based on how much of the drawer you want to show
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  width: '100%',
                  margin: '25px 0',
                  position: 'relative',
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
                    semiTransparentButtonStyle={semiTransparentButtonStyle}
                    onToggle={toggleDrawer}
                    isScrolled={hasScrolled && expanded}
                    wrapperWidth={wrapperWidth}
                  />
                </Box>
                <Box 
                  style={{ 
                    position: 'relative', 
                    zIndex: 2,
                    marginTop: '-10px', // Negative margin to offset the peeking drawer
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
            </Box> 
            </Flex>
           </Flex> 
           </Flex> 
          </Flex>
        </div>
        <Button type="button" variant="solid" onClick={signOut} style={semiTransparentButtonStyle}>Sign out</Button>
      </Theme>
    </>
  );
}

export default withAuthenticator(Home);
