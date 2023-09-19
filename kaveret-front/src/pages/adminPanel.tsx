import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface User {
  ID?: number;
  Username: string;
  Password: string;
  Email: string;
  Permission: string;

}

const UserPanel = (props: {searchWord: string}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>();

  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const [Email, setEmail] = useState("")
  const [Permission, setPermission] = useState("")

  const [isAdmin, setIsAdmin] = useState(false);
  const [err, setErr] = useState('');

  
  async function checkAdmin() {
    try {
      const response = await fetch('http://localhost:3002/isAdmin', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        setIsAdmin(true)
      }
    } 
    catch(error)
    {
        setErr('Error');
    }
  }
  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:3002/getUsers', {
            method: 'GET',
            credentials: 'include',
          });
  
          if (response.ok) {
            const responseBody = await response.text(); // Get the response text
            
            const jsonItems = JSON.parse((responseBody.toString()));

            setUsers(jsonItems.items);
          } else {
            // Handle the case where the API request is not successful
          }
        } catch (error) {
          // Handle any other errors that may occur during the API request
        }
      }
    )();
  }, []);

  // const data = await response.json();
  //setItems(data);
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteClick = async (user: User) => {
    try {
      const response = await fetch('http://localhost:3002/deleteUser', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            Name: user.Username,
            Price: user.Password,
            ID: user.ID,
         }),
      });

      if (!response.ok) {
          alert('מחיקת המשתמש לא צלחה :(');
          throw new Error(`Error! status: ${response.status}`);
        
      }
      else {
      
          alert('המשתמש נמחק!');
          window.location.reload();
      }

      const result = await response.json();
    } 
    catch(error)
    {
    }
  
  setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
        const response = await fetch('http://localhost:3002/register', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              Username: Username,
              Password: Password,
              Email: Email,
              Permission: Permission,

           }),
        });
  
        if (!response.ok) {
            alert('שמירת המשתמש לא צלחה :(');

          throw new Error(`Error! status: ${response.status}`);
          
        }
        else {
            alert('המשתמש נשמר!');
            window.location.reload();


        }
  
        const result = await response.json();
      } 
      catch(error)
      {
      }
    
    setOpenDialog(false);
  };

  const handleEdit = async (user: User) => {
    try {
        const response = await fetch('http://localhost:3002/EditUser', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
              Username: Username,
              Password: Password,
              Email: Email,
              Permission: Permission,
              ID: user.ID,
           }),
        });
  
        if (!response.ok) {
            alert('עדכון המשתמש לא צלחה :(');

          throw new Error(`Error! status: ${response.status}`);
          
        }
        else {
            alert('המשתמש עודכן!');
            window.location.reload();

        }
  
        const result = await response.json();
      } 
      catch(error)
      {
      }
    
    setOpenDialog(false);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setPermission(event.target.value as string);
  };

  checkAdmin();

  if (isAdmin)
  {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Userame</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Permission</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {users.filter(user => user.Username.includes(props.searchWord)).map((user, index) => (
              <TableRow key={user.ID}>
                <TableCell>{user.Username}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Permission}</TableCell>


                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {handleEditClick(user)}}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {handleDeleteClick(user)}}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the User.
          </DialogContentText>
          <TextField
            label="Username"
            onChange={e => setUsername(e.target.value)}            
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            onChange={e => setPassword(e.target.value)}            
            
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            onChange={e => setEmail(e.target.value)}            
    
            fullWidth
            margin="normal"
          />

          <InputLabel id="simple-select-label">Permission</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={Permission}
              label="Permission"
              onChange={handleSelect}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"client"}>Client</MenuItem>
            </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the item.
          </DialogContentText>
          <TextField
            label={"Current Username: "+selectedUser?.Username}
            onChange={e => setUsername(e.target.value)}   
         
            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Password: "+selectedUser?.Password}
            onChange={e => setPassword(e.target.value)}            

            fullWidth
            margin="normal"
          />
          <TextField
            label={"Current Email: "+selectedUser?.Email}
            onChange={e => setEmail(e.target.value)}            
            fullWidth
            margin="normal"
          />

        <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button  onClick={() => {
                if (selectedUser) 
                {
                  handleEdit(selectedUser);
                }
          }} color="primary">
            Save
          </Button>
        </DialogContent>
        
      </Dialog>

    </div>
  );
            }
            else {
              return (
                <div>
                    {isAdmin ? 'Hi Admin User' : 'You are not Admin'}
                </div>
            );
            }
};

export default UserPanel;