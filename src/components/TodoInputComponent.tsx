import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Fab from '@mui/material/Fab';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useMutation, gql } from '@apollo/client';



const CREATE_TODO = gql`
  mutation CreateTodo($title:String!, $description:String, $priority:Int!){
    createTodo(todo: {title: $title, description:$description, priority:$priority }){
        id
        title
    }
  }
`;

const defaultTodo = {
    title: "This Is Your First ToDo Card!",
    description: "Buy some food for my dog and change their water",
    tags: ["healt", "rutine"],
    priority: 1,
    id: "abcdefg12345"
}



export default function TodoInputComponent() {
    const [priority, setPriority] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    const priorities = [1, 2, 3, 4]

    const [createTodo, { data, loading, error }] = useMutation(CREATE_TODO);

    if (loading) return <h1>Submitting...</h1>;
    if (error) return <h1>Submission error! {error.message}</h1>;

    const handleChange = (event: React.MouseEvent<HTMLElement>, priority: string) => {
        setPriority(priority);
    };

    return (
        <div className="list-container">
            <Card key="input-card" sx={{ minWidth: "30%", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        id="title"
                        label="Title"
                        placeholder={defaultTodo.title}
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        sx={{ marginBottom: "1em", }}
                    />
                    <TextField
                        sx={{ marginBottom: "1em" }}
                        id="description"
                        label="Description"
                        placeholder={defaultTodo.description}
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        multiline={true}
                        rows={3}
                        inputProps={{
                            style: {
                                height: "10em"
                            }
                        }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row", minWidth: "800px" }}>
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
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", minWidth: "200px", marginBottom: "2em" }}>
                <Fab onClick={(e) => {
                    setTitle("")
                    setDescription("")
                }} sx={{ backgroundColor: "#0000003d" }} aria-label="add">
                    <ClearIcon />
                </Fab>
                <Fab onClick={(e) => {
                    createTodo({ variables: { title: title, description: description, priority: priority } })
                }} sx={{ backgroundColor: "#0000003d" }} aria-label="add">
                    <CheckIcon />
                </Fab>
            </Box>
        </div>
    );
}