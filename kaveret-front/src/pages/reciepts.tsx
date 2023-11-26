import React, { useEffect, useState } from 'react';


interface Receipt {
    ID?: number;
    Username: string;
    Total: number;
    ItemIdList: number[];
}

interface Item {
    ID?: number;
    Name: string;
    Price: string;
    Quantity: string;
    ImageUrl: string;
  }

const ReceiptShowcase = (props: {username: string, items: Item[]}) => {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [continueFilter, setContinueFilter] = useState(false);
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
                    alert(responseBody.toString());
                }
            } catch (error) {
                console.error('Error fetching Receipts:', error);
            }

        }

        fetchReceipts();
    }, [props.username]);

    if (continueFilter) {
        return (
            <div>
                
                    <div>
                        {receipts != null && receipts.filter(receipt =>  receipt.Username.includes(props.username)).map((receipt, index) => (
                            <div key={receipt.ID}>
                                <h3>Receipt ID: {receipt.ID}</h3>
                                <p>Total Paid: ${receipt.Total}</p>
                                <ul>
                                {receipt.ItemIdList.map(itemId => {
                                const foundItem = items.find(item => item.ID === itemId);
                                if (foundItem) {
                                return (
                                    <li key={foundItem.ID}>
                                    <p>Name: {foundItem.Name}</p>
                                    <p>Price: ${foundItem.Price}</p>
                                    <p>Quantity: {foundItem.Quantity}</p>
                                    </li>
                                );
                                }
                                return null; // If item with given ID is not found
                            })}
                                </ul>
                            </div>
                        ))}
                    </div>
            </div>
                                    
        );
                                    }
                                    else {
                                        return (
                                        <div>
                                            <p>
                                                no reciepts
                                            </p>
                                        </div>);
                                    }
   
    
};

export default ReceiptShowcase;
