import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import DynamicBreadcrumbs from '../components/layout/Breadcrumb';
import bannerImage from '../assets/upp.png';
import Layout from '../components/layout/Layout';

const UPPOLICE_INFO = () => {
  return (
    <Layout title="About" description="Welcome to the Uttar Pradesh Police website">

    <Container maxWidth="lg" style={{ marginTop: '5rem', textAlign: 'center' }}>
      <DynamicBreadcrumbs />

      <Typography variant="h2" gutterBottom>
        Uttar Pradesh Police
      </Typography>
      <Typography variant="h4" gutterBottom>
        उत्तर प्रदेश पुलिस
      </Typography>

      <Box
        component="img"
        src={bannerImage}
        alt="UP Police Banner"
        sx={{
          width: '90%',
          height: 400,
          marginBottom: '2rem',
        }}
      />


      <Typography variant="h5" color="textSecondary" paragraph>
        The Uttar Pradesh Police is the law enforcement agency for the state of Uttar Pradesh, India.
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        उत्तर प्रदेश पुलिस, भारत के उत्तर प्रदेश राज्य की कानून प्रवर्तन एजेंसी है।
      </Typography>

      <Typography variant="h5" color="textSecondary" paragraph>
        Established in 1861, it is one of the largest police forces in the world, responsible for maintaining law and order and ensuring the safety of the citizens of Uttar Pradesh.
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        1861 में स्थापित, यह दुनिया के सबसे बड़े पुलिस बलों में से एक है, जो कानून और व्यवस्था बनाए रखने और उत्तर प्रदेश के नागरिकों की सुरक्षा सुनिश्चित करने के लिए जिम्मेदार है।
      </Typography>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Mission
        </Typography>
        <Typography variant="h5" gutterBottom>
          मिशन
        </Typography>

        <Typography variant="h6" color="textSecondary" paragraph>
          Our mission is to ensure the safety and security of all citizens in Uttar Pradesh by providing efficient and effective law enforcement services, fostering community trust, and enhancing public safety.
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          हमारा मिशन उत्तर प्रदेश में सभी नागरिकों की सुरक्षा सुनिश्चित करना है, कुशल और प्रभावी कानून प्रवर्तन सेवाएं प्रदान करना, सामुदायिक विश्वास को बढ़ावा देना और सार्वजनिक सुरक्षा को बढ़ाना।
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Services
        </Typography>
        <Typography variant="h5" gutterBottom>
          सेवाएं
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Crime Reporting</Typography>
              <Typography variant="h6">अपराध की रिपोर्टिंग</Typography>
              <Typography color="textSecondary" paragraph>
                Citizens can report crimes online, making the process quick and convenient. Our officers are trained to handle all reports professionally and promptly.
              </Typography>
              <Typography color="textSecondary" paragraph>
                नागरिक अपराधों की ऑनलाइन रिपोर्ट कर सकते हैं, जिससे प्रक्रिया त्वरित और सुविधाजनक हो जाती है। हमारे अधिकारी सभी रिपोर्टों को पेशेवर और शीघ्रता से संभालने के लिए प्रशिक्षित हैं।
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Public Safety</Typography>
              <Typography variant="h6">सार्वजनिक सुरक्षा</Typography>
              <Typography color="textSecondary" paragraph>
                The UP Police actively work to maintain public order and safety through patrolling, community engagement, and crime prevention initiatives.
              </Typography>
              <Typography color="textSecondary" paragraph>
                यूपी पुलिस गश्त, सामुदायिक जुड़ाव और अपराध रोकथाम पहलों के माध्यम से सार्वजनिक व्यवस्था और सुरक्षा बनाए रखने के लिए सक्रिय रूप से काम करती है।
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Investigation Services</Typography>
              <Typography variant="h6">जांच सेवाएं</Typography>
              <Typography color="textSecondary" paragraph>
                Our dedicated investigation teams ensure thorough and fair investigations of all reported crimes, bringing perpetrators to justice swiftly.
              </Typography>
              <Typography color="textSecondary" paragraph>
                हमारी समर्पित जांच टीमों द्वारा रिपोर्ट किए गए सभी अपराधों की व्यापक और निष्पक्ष जांच सुनिश्चित की जाती है, जिससे अपराधियों को शीघ्रता से न्याय दिलाया जाता है।
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          About Our Web Application
        </Typography>
        <Typography variant="h5" gutterBottom>
          हमारी वेब एप्लिकेशन के बारे में
        </Typography>

        <Typography variant="h6" color="textSecondary" paragraph>
          The UP Police Crime Records Portal is designed to provide the public and police personnel with easy access to crime records and related services. This web application allows users to:
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          यूपी पुलिस अपराध रिकॉर्ड पोर्टल जनता और पुलिस कर्मियों को अपराध रिकॉर्ड और संबंधित सेवाओं तक आसान पहुँच प्रदान करने के लिए डिज़ाइन किया गया है। यह वेब एप्लिकेशन उपयोगकर्ताओं को अनुमति देता है:
        </Typography>

        <ul>
          <li>
            <Typography variant="body1">Search for available crime records by district, tehsil, or police station.</Typography>
            <Typography variant="body2">जिला, तहसील या पुलिस स्टेशन के अनुसार उपलब्ध अपराध रिकॉर्ड की खोज करें।</Typography>
          </li>
          <li>
            <Typography variant="body1">Access and manage crime records securely for authorized police personnel.</Typography>
            <Typography variant="body2">अधिकृत पुलिस कर्मियों के लिए अपराध रिकॉर्ड को सुरक्षित रूप से एक्सेस और प्रबंधित करें।</Typography>
          </li>
          <li>
            <Typography variant="body1">Report crimes and provide important information to the police online.</Typography>
            <Typography variant="body2">अपराधों की रिपोर्ट करें और पुलिस को ऑनलाइन महत्वपूर्ण जानकारी प्रदान करें।</Typography>
          </li>
          <li>
            <Typography variant="body1">Enhance public awareness and engagement in community safety efforts.</Typography>
            <Typography variant="body2">सामुदायिक सुरक्षा प्रयासों में सार्वजनिक जागरूकता और जुड़ाव बढ़ाएं।</Typography>
          </li>
        </ul>
      </Box>

      <Box my={4}>
        <Typography variant="h5" color="textSecondary">
          Together, we can build a safer Uttar Pradesh for everyone!
        </Typography>
        <Typography variant="h6" color="textSecondary">
          एक साथ मिलकर हम सभी के लिए एक सुरक्षित उत्तर प्रदेश बना सकते हैं!
        </Typography>
      </Box>
    </Container>
    </Layout>
  );
};

export default UPPOLICE_INFO;
