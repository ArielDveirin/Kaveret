import React, { useEffect, useState } from 'react';

interface Item {
    ID?: number;
    Name: string;
    Price: string;
    Quantity: string;
    ImageUrl: string;
}

interface Receipt {
    ID?: number;
    Username: string;
    Total: number;
    ItemList: Item[];
}

interface ReceiptShowcaseProps {
    username: string;
}

const ReceiptShowcase = (props: {username: string}) => {
    const [receipts, setReceipts] = useState<Receipt[]>([]);

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
                }
            } catch (error) {
                console.error('Error fetching Receipts:', error);
            }

        }

        fetchReceipts();
    }, [props.username]);


        return (
            <div>
                
                    <div>
                        {receipts.filter(receipt =>  receipt.Username.includes(props.username)).map((receipt, index) => (
                            <div key={receipt.ID}>
                                <h3>Receipt ID: {receipt.ID}</h3>
                                <p>Total Paid: ${receipt.Total}</p>
                                <ul>
                                    {receipt.ItemList.map((item) => (
                                        <li key={item.ID}>
                                            <p>Name: {item.Name}</p>
                                            <p>Price: ${item.Price}</p>
                                            <p>Quantity: {item.Quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
            </div>
                                    
        );
    
};

export default ReceiptShowcase;
