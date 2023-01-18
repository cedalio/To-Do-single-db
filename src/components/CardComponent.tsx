import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useMutation, gql } from '@apollo/client';
import { Draggable } from "react-beautiful-dnd"
import { Troubleshoot } from '@mui/icons-material';

const UPDATE_TODO = gql`
  mutation UpdateTodo($id:UUID!, $status:String){
    updateTodo(id: $id, fields:{status: $status} ){
        id
        title
        description
        priority
        owner
        tags
        status
    }
  }
`;

type Todo = {
    title: string,
    description?: string,
    tags: Array<string>,
    priority: number,
    id: string,
    owner: string,
    status: string
}

type Update = {
    todoId: String
    update: String
}

export default function CardComponent(props: { setState: React.Dispatch<React.SetStateAction<any>>, todo: Todo, ownerAddress: String, index: any, updateState: Update | undefined, onUpdateTodo: Function }) {
    const [updateTodo, { data, loading, error }] = useMutation(UPDATE_TODO);

    React.useEffect(() => {
        if (data) {
            props.onUpdateTodo(data.updateTodo.id)
        }
    }, [data])


    React.useEffect(() => {
        if (props.updateState !== undefined) {
            if (props.updateState.todoId === props.todo.id) {
                if (props.updateState.update === "delete") {
                    updateTodo({ variables: { id: props.todo.id, status: "delete" } })
                }
                else if (props.updateState.update === "done") {
                    updateTodo({ variables: { id: props.todo.id, status: "done" } })
                }
            }
        }
    }, [props.updateState])

    if (error) return <h1>Submission error! {error.message}</h1>;
    if (loading) return <></>;


    if (props.todo.owner === props.ownerAddress) {
        return (
            <Draggable draggableId={props.todo.id} index={props.index} >
                {(provided) => (
                    <div draggable {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <Card draggable sx={{ minWidth: "500px", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
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
                                        {props.todo.tags.map((tag: any) => {
                                            return <Chip label={tag} key={tag} color="success" sx={{ fontWeight: "600", backgroundColor: "hsl(138deg 76% 97%)", color: "hsl(142deg 61% 42%)" }} />
                                        })}
                                    </Stack>
                                </Stack>
                            </CardContent>
                            <Button variant="contained" onClick={(e) => {

                            }}>Delete</Button>
                            <Button variant="outlined" onClick={(e) => {
                                updateTodo({ variables: { id: props.todo.id, status: "done" } })
                            }}>Done</Button>
                        </Card>
                    </div>
                )}
            </Draggable>
        )
    }
    else {
        return <></>
    }
}