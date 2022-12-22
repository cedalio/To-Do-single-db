import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type Todo = {
    title: string,
    description?: string,
    tags: Array<string>,
    priority: number
}

export default function ListComponent(props: { address: string | undefined }) {
    const [priority, setPriority] = React.useState("");

    const priorities = [1, 2, 3, 4]

    const defaultTodo = {
        title: "This Is Your First ToDo Card!",
        description: "Buy some food for my dog and change their water",
        tags: ["healt", "rutine"],
        priority: 1
    }

    const todos: Array<Todo> | Array<null> = [
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 1
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 2
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 3
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 1
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 2
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 3
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 1
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 2
        // },
        // {
        //     title: "Go to the gym",
        //     description: "I have to go to the gym the monday at 3pm",
        //     tags: ["healt", "rutine"],
        //     priority: 3
        // }
    ]
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
    const handleChange = (event: React.MouseEvent<HTMLElement>, priority: string) => {
        setPriority(priority);
    };
    if (props.address) {
        return (
            <div className="list-container">
                {todos.length > 0 ? todos.map((todo: any) => {
                    return displayCard(todo)
                }) : displayCard(defaultTodo)}
                <Card sx={{ minWidth: "30%", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            id="title"
                            label="Title"
                            placeholder={defaultTodo.title}
                            // value={name}
                            // onChange={handleChange}
                            sx={{ marginBottom: "1em", }}
                        />
                        <TextField
                            sx={{ marginBottom: "1em" }}
                            id="description"
                            label="Description"
                            placeholder={defaultTodo.description}
                            // value={name}
                            // onChange={handleChange}
                            multiline={true}
                            rows={3}
                            inputProps={{
                                style: {
                                    height: "10em"
                                }
                            }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <ToggleButtonGroup
                                value={priority}
                                exclusive
                                onChange={handleChange}
                                aria-label="text alignment"
                                sx={{justifyContent:"space-between", width:"200px"}}
                            >
                                {priorities.map((priority) => {
                                    return (
                                        <ToggleButton value={priority} sx={{ height: "40px", width: "40px", border:"1px solid #0000003b!important" }}>
                                            {priority}
                                        </ToggleButton>
                                    )
                                })}
                            </ToggleButtonGroup>
                        </Box>

                    </CardContent>
                </Card>
            </div>
        );
    }
    else return null
}