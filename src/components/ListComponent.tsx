import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

type Todo = {
    title: string,
    description?: string,
    tags: Array<string>,
    priority: number
}



export default function ListComponent(props: { address: string | undefined }) {
    const defaultTodo = {
        title: "This Is Your First ToDo Card!",
        description: "Buy some food for my dog and change their water",
        tags: ["healt", "rutine"],
        priority: 1
    }

    const todos:Array<Todo> | Array<null> = [
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 1
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 2
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 3
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 1
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 2
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 3
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 1
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 2
    //     },
    //     {
    //         title: "Go to the gym",
    //         description: "I have to go to the gym the monday at 3pm",
    //         tags: ["healt", "rutine"],
    //         priority: 3
    //     }
    ]
    console.log(todos.length)
    function displayCard(todo: Todo) {
        return (
            <Card sx={{ minWidth: "30%", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 23, fontWeight: 600, textAlign: "justify" }} color="black" gutterBottom>
                        {todo.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14, textAlign: "justify" }} color="text.secondary" gutterBottom>
                        {todo.description}
                    </Typography>
                    <Stack spacing={1} alignItems="left">
                        <Stack direction="row" spacing={1}>
                            <Chip color="error" label={`P${todo.priority}`} sx={{ fontWeight: "600", backgroundColor: "hsl(0deg 86% 97%)", color: "hsl(347deg 77% 56%)" }}></Chip>
                            {todo.tags.map((tag) => {
                                return <Chip label={tag} color="success" sx={{ fontWeight: "600", backgroundColor: "hsl(138deg 76% 97%)", color: "hsl(142deg 61% 42%)" }} />
                            })}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        )
    }

    if (props.address) {
        return (
            <div className="list-container">
                {todos.length > 0 ? todos.map((todo:any) => {
                    return displayCard(todo)
                }) : displayCard(defaultTodo)}
            </div>
        );
    }
    else return null
}