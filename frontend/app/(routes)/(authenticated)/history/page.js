'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ResponsiveAppBar from "@/app/_components/Appbar_auth";
import { Box, Container, Slider } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const bcImages = [
  '/database_images/bar_chart_1.png',
  '/database_images/bar_chart_2.png',
  '/database_images/bar_chart_3.png',
  '/database_images/bar_chart_4.png',
  '/database_images/bar_chart_5.png'
];

const wmImages = [
  '/database_images/world_map_1.png',
  '/database_images/world_map_2.png',
  '/database_images/world_map_3.png',
  '/database_images/world_map_4.png',
  '/database_images/world_map_5.png'
];

const pImages = [
  '/database_images/pie_chart_1.png',
  '/database_images/pie_chart_2.png',
  '/database_images/pie_chart_3.png',
  '/database_images/pie_chart_4.png',
  '/database_images/pie_chart_5.png'
]

const ProcessDataButton = () => {
  const allowedRoles = ['SOC Analyst', 'Security Auditor', 'System Administrator','IT Manager']; 
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBarChartIndex, setCurrentBarChartIndex] = useState(0); // Separate state for the bar chart slider
  const [currentPieChartIndex, setCurrentPieChartIndex] = useState(0);
  const [currentWorldMapIndex, setCurrentWorldMapIndex] = useState(0); // State for the world map slider
  const [isExporting, setIsExporting] = useState(false);

  const processData = () => {
    setIsLoading(true);
    axios
      //.post('http://localhost:5000/process_data')
      .post('http://159.223.47.93:5000/process_data')
      .then((response) => {
        const responseData = response.data;
        setResult(responseData.message || responseData.error);
        setHighestCountIpInfo(responseData.highest_count_ip_info || { source_ip: '', location: {} });
      })
      .catch((error) => {
        console.error('Error:', error);
        setResult('An error occurred during data processing.');
      })
      .finally(() => {
        setIsLoading(false);
        if (result !==' '){
          window.location.reload();
        }
      });
  };

  const handleSliderChange = (event, newValue, sliderType) => {
    if (sliderType === 'image') {
      setCurrentImageIndex(newValue);
    } else if (sliderType === 'barChart') {
      setCurrentBarChartIndex(newValue);
    } else if (sliderType === 'pieChart') {
      setCurrentPieChartIndex(newValue);
    } else if (sliderType === 'worldMap') {
      setCurrentWorldMapIndex(newValue);
    }
  };

  const handleSaveImages = () => {
    //fetch(`http://localhost:5000/serve_zip/images.zip`, {
    fetch(`http://159.223.47.93:5000/serve_zip/images.zip`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          console.error('Error:', response.statusText);
        }
      })
      .then((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'images.zip'; // Set the desired file name
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error('Error downloading images:', error);
      });
  };
  
  const handleExportCSV = () => {
    // Replace the following URL with the appropriate endpoint for exporting CSV
    //const exportCSVURL = 'http://localhost:5000/export_csv';
    const exportCSVURL = 'http://159.223.47.93:5000/export_csv';
    setIsExporting(true);

    axios({
      url: exportCSVURL,
      method: 'POST',
      responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/zip' }); // Change MIME type to 'application/zip'
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_data.zip'; // Change the file name to 'exported_data.zip'
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error, e.g., show an error message
      })
      .finally(() => {
        // Set the exporting state to false when the export is finished
        setIsExporting(false);
      });
  };

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
 
    if (status === 'loading') {
      return; 
    }
  
    if (!session) {
      //router.push('/login');
      router.push('/');
      return;
    }
    
    if (!allowedRoles.includes(session.user.role)) {
      router.push('/dashboard'); 
    }
  }, [session, status, router]);

  if (session && allowedRoles.includes(session.user.role)) {
    return (
      <Box component="main" height="100vh" overflow="auto">
        <ResponsiveAppBar />
    
        <Container maxWidth="lg" sx={{ mt: 8 }}>
        <div>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around', // Use 'space-around' to evenly space the buttons
              alignItems: 'center',
            }}
          >
            {/* Centered button with increased width and height */}
            <button
              onClick={processData}
              disabled={isLoading}
              style={{ width: '250px', height: '50px', fontSize: '1.2rem' }} // Adjust width and height as needed
              variant="contained"
              color="primary"
            >
              {isLoading ? 'Processing...' : 'Fetch most recent data'}
            </button>
            <button
              style={{ width: '250px', height: '50px', fontSize: '1.2rem' }}
              variant="contained"
              color="primary"
              onClick={() => handleSaveImages(currentWorldMapIndex)}
            >
              Save Images
            </button>
            <button
              style={{ width: '250px', height: '50px', fontSize: '1.2rem' }}
              variant="contained"
              color="primary"
              onClick={handleExportCSV}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
          </div>
            <br></br>
            <br></br>
            <div>{result}</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px' }}>
                <Image
                  unoptimized
                  src={bcImages[currentBarChartIndex]}
                  alt="Bar Chart"
                  width={500}
                  height={375}
                />
                <Slider
                  value={4 - currentBarChartIndex}
                  min={0}
                  max={4}
                  onChange={(event, newValue) => handleSliderChange(event, 4 - newValue, 'barChart')}
                  style={{ width: '80%', margin: '1rem auto' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px' }}>
                <Image
                  unoptimized
                  src={pImages[currentPieChartIndex]}
                  alt="Pie Chart"
                  width={500}
                  height={375}
                />
                <Slider
                  value={4 - currentPieChartIndex}
                  min={0}
                  max={4}
                  onChange={(event, newValue) => handleSliderChange(event, 4 - newValue, 'pieChart')}
                  style={{ width: '80%', margin: '1rem auto' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #ccc', padding: '32px', borderRadius: '5px', margin: '10px' }}>
            <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  unoptimized
                  src={wmImages[currentWorldMapIndex]}
                  alt="World Map"
                  width={1000}
                  height={750}
                />
              </div>
              <Slider
                value={4 - currentWorldMapIndex}
                min={0}
                max={4}
                onChange={(event, newValue) => handleSliderChange(event, 4 - newValue, 'worldMap')}
              />
            </div>
          </div>
          </div>
        </Container>
      </Box>
    );
  }

  return null; 
};

export default ProcessDataButton;
