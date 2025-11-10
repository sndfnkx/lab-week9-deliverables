import React, { useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddItem from './components/AddItem';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Shopping List</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Stack alignItems="center" sx={{ mb: 2 }}>
          <AddItem addItem={addItem} />
        </Stack>
        <List>
          {items.map((it, idx) => (
            <ListItem key={idx} divider>
              <ListItemText primary={it.product} secondary={`Amount: ${it.amount}`} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
