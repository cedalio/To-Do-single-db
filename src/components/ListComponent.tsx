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
import { useQuery, gql } from '@apollo/client';


type Todo = {
    title: string,
    description?: string,
    tags: Array<string>,
    priority: number,
    id: string
}

// const todosTest: Array<Todo> = [
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 1,
//         id: "asdasdasd1"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 2,
//         id: "asdasdasd2"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 3,
//         id: "asdasdasd3"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 1,
//         id: "asdasdasd5"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 2,
//         id: "asdasdasd5"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 3,
//         id: "asdasdasd6"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 1,
//         id: "asdasdasd7"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 2,
//         id: "asdasdasd8"
//     },
//     {
//         title: "Go to the gym",
//         description: "I have to go to the gym the monday at 3pm",
//         tags: ["healt", "rutine"],
//         priority: 3,
//         id: "asdasdasd8"
//     }
// ]

const GET_TODOS = gql`
  query GetTodos{
        allTodos {
            id
            title
            description
            priority
        }
  }
`;

export default function ListComponent(props: { address: string | undefined }) {
    const [priority, setPriority] = React.useState("");
    const [todos, setTodos] = React.useState<Todo[]>([]);

    const priorities = [1, 2, 3, 4]
    
    const defaultTodo = {
        title: "This Is Your First ToDo Card!",
        description: "Buy some food for my dog and change their water",
        tags: ["healt", "rutine"],
        priority: 1,
        id: "abcdefg12345"
    }

    function DisplayCard(props: { todo: Todo }) {
        return (
            <Card sx={{ minWidth: "30%", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 23, fontWeight: 600, textAlign: "justify" }} color="black" gutterBottom>
                        {props.todo.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14, textAlign: "justify" }} color="text.secondary" gutterBottom>
                        {props.todo.description}
                    </Typography>
                    <Stack spacing={1} alignItems="left">
                        <Stack direction="row" spacing={1}>
                            <Chip color="error" label={`P${props.todo.priority}`} sx={{ fontWeight: "600", backgroundColor: "hsl(0deg 86% 97%)", color: "hsl(347deg 77% 56%)" }}></Chip>
                            {/* {props.todo.tags.map((tag) => {
                                return <Chip label={tag} key={tag} color="success" sx={{ fontWeight: "600", backgroundColor: "hsl(138deg 76% 97%)", color: "hsl(142deg 61% 42%)" }} />
                            })} */}
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        )
    }

    const { loading, error, data } = useQuery(GET_TODOS);

    React.useEffect(() => {
        if (data) setTodos(data.allTodos);
      }, [data]);
    
      if (loading) return <p>Loading...</p>;
      if (error) {
          return <p>Error : {error.message}</p>;
      }
      
    const displayTodos = () => {
        if (todos.length < 1) {
            return <DisplayCard key="default" todo={defaultTodo} />;
        }
        else {
            return (
                todos.map((todo: Todo) => (
                    <DisplayCard key={todo.id} todo={todo} />
                ))
            )
        }
    }

    const handleChange = (event: React.MouseEvent<HTMLElement>, priority: string) => {
        setPriority(priority);
    };
    if (props.address) {
        return (
            <div className="list-container">
                {displayTodos()}
                <Card key="input-card" sx={{ minWidth: "30%", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
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
                                sx={{ justifyContent: "space-between", width: "200px" }}
                            >
                                {priorities.map((priority) => {
                                    return (
                                        <ToggleButton key={String(priority)} value={priority} sx={{ height: "40px", width: "40px", border: "1px solid #0000003b!important" }}>
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