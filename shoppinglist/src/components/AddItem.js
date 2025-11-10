import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function AddItem({ addItem }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    if (product.trim()) {
      addItem({ product: product.trim(), amount: amount.trim() || '1' });
      setProduct('');
      setAmount('');
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Item</Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product"
            fullWidth
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
