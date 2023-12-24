import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Divider,
} from '@material-ui/core';

interface Receipt {
  ID?: number;
  Username: string;
  Total: number;
  ItemIdList: number[];
  QuantityList: string[];

}

interface Item {
  ID?: number;
  Name: string;
  Price: string;
  Quantity: string;
  ImageUrl: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '1rem',
    padding: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '8px',
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
  listItem: {
    borderBottom: '1px solid #ccc',
  },
}));

const ReceiptShowcase = (props: { username: string; items: Item[] }) => {
  const classes = useStyles();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchReceipts() {
        try {

            const response = await fetch('http://localhost:3002/getReceipts', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const responseBody = await response.text(); // Get the response text
        
                const jsonItems = JSON.parse((responseBody.toString()));

                setReceipts(jsonItems.items);
                //alert(responseBody.toString());
            }
        } catch (error) {
            console.error('Error fetching Receipts:', error);
        }

    }

    fetchReceipts();

}, [props.username]);
useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('http://localhost:3002/getItems', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const responseBody = await response.text();
          const jsonItems = JSON.parse(responseBody.toString());
          setItems(jsonItems.items);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, []);

 return (
  <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop:"5rem" }}>
    {receipts.length > 0 ? (
      receipts
        .filter((receipt) => receipt.Username.includes(props.username))
        .map((receipt, index) => (
          <Card key={index} className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Receipt ID: {receipt.ID}
              </Typography>
              <List>
                {receipt.ItemIdList.map((itemId, itemIndex) => {
                  const foundItem = items.find((item) => item.ID === itemId);
                  const quantity = receipt.QuantityList[(itemIndex)]
                  if (foundItem) {
                    return (
                      <React.Fragment key={foundItem.ID}>
                        <ListItemText
                              primary={foundItem.Name}
                              secondary={
                                <>
                                  <Typography variant="body2">
                                    Price: ${foundItem.Price}
                                  </Typography>
                                  <Typography variant="body2">
                                    Quantity: {quantity}
                                  </Typography>
                                </>
                              }
                            />
                        {itemIndex !== receipt.ItemIdList.length - 1 && (
                          <Divider />
                        )}
                      </React.Fragment>
                    );
                  }
                  return null; // If item with given ID is not found
                })}
              </List>
              <Typography variant="h6">
                  Total: ${receipt.Total.toFixed(2)} {/* Display receipt total */}
                </Typography>
            </CardContent>
          </Card>
        ))
    ) : (
      <div>
        <p>No receipts</p>
      </div>
    )}
  </div>
);
};

export default ReceiptShowcase;