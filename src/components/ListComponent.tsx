import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function ListComponent(props: { address: string | undefined }) {

    const todos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 34, 5]

    function displayCard(todo: any) {
        return (
            <Card sx={{ minWidth: "30%", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 23, fontWeight: 600, textAlign: "justify" }} color="black" gutterBottom>
                        Todo Title
                    </Typography>
                    <Typography sx={{ fontSize: 14, textAlign: "justify" }} color="text.secondary" gutterBottom>
                        Today i have {todo} things to do
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    if (props.address) {
        return (
            <div className="list-container">
                {todos.map((todo: any) => {
                    return displayCard(todo)
                })}
            </div>
        );
    }
    else return null
}