import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import DynamicBreadcrumbs from '../components/layout/Breadcrumb';
import Layout from '../components/layout/Layout';

const Documentation = () => {
  return (
    <Layout title="Documentations" description="Welcome to the Uttar Pradesh Police website">
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, p: 3 }}>
      <DynamicBreadcrumbs />
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        One Person, One Crime Number System Documentation
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
        एक व्यक्ति, एक अपराध संख्या प्रणाली दस्तावेज़ीकरण
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 2, lineHeight: 1.6 }}>
        This document outlines the workflow, logic, and benefits of the One Person, One Crime Number System.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        यह दस्तावेज़ एक व्यक्ति, एक अपराध संख्या प्रणाली के कार्यप्रवाह, तर्क और लाभों को बताता है।
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Workflow
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          कार्यप्रवाह
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Offense Registration" />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            प्रत्येक अपराध को पुलिस द्वारा अपराधी के विवरण के साथ पंजीकृत किया जाता है।
          </Typography>

          <ListItem>
            <ListItemText primary="2. Unique Crime Number Assignment" secondary="If the offender has no existing crime number, a new one is generated and assigned." />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            यदि अपराधी के पास पहले से कोई अपराध संख्या नहीं है, तो एक नई संख्या उत्पन्न की जाती है और सौंप दी जाती है।
          </Typography>

          <ListItem>
            <ListItemText primary="3. Record Linkage" secondary="All subsequent offenses by the offender are linked to this unique crime number." />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            अपराधी द्वारा किए गए सभी बाद के अपराध इस अद्वितीय अपराध संख्या से जुड़े होते हैं।
          </Typography>

          <ListItem>
            <ListItemText primary="4. Retrieval and Search" secondary="Police and administrative officials can retrieve all related crime records using the unique crime number." />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            पुलिस और प्रशासनिक अधिकारी इस अद्वितीय अपराध संख्या का उपयोग करके सभी संबंधित अपराध रिकॉर्ड पुनः प्राप्त कर सकते हैं।
          </Typography>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Benefits of One Person, One Crime Number
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          एक व्यक्ति, एक अपराध संख्या के लाभ
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Simplified Record Management" secondary="Allows for streamlined storage and tracking of crime records." />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            अपराध रिकॉर्ड के व्यवस्थित भंडारण और ट्रैकिंग की अनुमति देता है।
          </Typography>

          <ListItem>
            <ListItemText primary="Efficient Data Retrieval" secondary="Police can easily access complete offense history for any individual." />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            पुलिस किसी भी व्यक्ति के लिए पूरी अपराध इतिहास को आसानी से एक्सेस कर सकती है।
          </Typography>

          <ListItem>
            <ListItemText primary="Reduced Data Duplication" secondary="Minimizes redundant data entry, making the system more efficient." />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            अनावश्यक डेटा प्रविष्टि को कम करता है, जिससे सिस्टम अधिक कुशल हो जाता है।
          </Typography>

          <ListItem>
            <ListItemText primary="Improved Investigative Efficiency" secondary="Facilitates quick background checks and helps in pattern analysis for criminal activities." />
          </ListItem>
          <Typography variant="body2" color="textSecondary" paragraph>
            त्वरित पृष्ठभूमि जांच में सहायक और आपराधिक गतिविधियों के पैटर्न विश्लेषण में मदद करता है।
          </Typography>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" color="textSecondary" align="center">
        For more information, please refer to the full documentation file or contact the system administrator.
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        अधिक जानकारी के लिए, कृपया पूर्ण दस्तावेज़ीकरण फ़ाइल देखें या सिस्टम प्रशासक से संपर्क करें।
      </Typography>
    </Container>
    </Layout>
  );
};

export default Documentation;
