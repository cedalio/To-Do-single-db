import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useQuery, gql } from '@apollo/client';
import TodoInputComponent from "./TodoInputComponent"


type Todo = {
    title: string,
    description?: string,
    tags: Array<string>,
    priority: number,
    id: string,
    owner: string
}


const GET_TODOS = gql`
  query GetTodos{
        allTodos {
            id
            title
            description
            priority
            owner
            tags{
                id
                name
            }
        }
  }
`;

export default function ListComponent(props: { address: string | undefined }) {
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [newTodo, setNewTodo] = React.useState<Todo>();

    const ownerAddress: string = String(props.address)

    const defaultTodo = {
        title: "This Is Your First ToDo Card!",
        description: "Buy some food for my dog and change their water",
        tags: ["healt", "rutine"],
        priority: 1,
        id: "abcdefg12345",
        owner: "abcdefg123"
    }

    function DisplayCard(props: { todo: Todo }) {

        if (props.todo.owner === ownerAddress || props.todo.owner === defaultTodo.owner) {
            return (
                <Card sx={{ minWidth: "500px", maxWidth: "60%", mb: 3, borderRadius: "11px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 0%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 3%)" }}>
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
                                {props.todo.tags.map((tag:any) => {
                                    return <Chip label={tag.name} key={tag.id} color="success" sx={{ fontWeight: "600", backgroundColor: "hsl(138deg 76% 97%)", color: "hsl(142deg 61% 42%)" }} />
                                })}
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            )
        }
        else {
            return <></>
        }
    }

    const { loading, error, data } = useQuery(GET_TODOS);

    React.useEffect(() => {
        if (data) setTodos(data.allTodos);
    }, [data]);

    React.useEffect(() => {
        if (newTodo) {
            setTodos(n => [...n, newTodo])
        }
    }, [newTodo])

    if (loading) return <p>Loading...</p>;
    if (error) {
        return <p>Error : {error.message}</p>;
    }

    const displayTodos = () => {
        if (todos.length === 0) {
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

    if (props.address) {
        return (
            <div className="list-container">
                {displayTodos()}
                <TodoInputComponent setState={setNewTodo} address={ownerAddress} />
            </div>
        );
    }
    else return null
}