import * as React from 'react';
import CardComponent from './CardComponent';
import { useQuery, gql } from '@apollo/client';
import TodoInputComponent from "./TodoInputComponent"
import { DragDropContext, Droppable } from "react-beautiful-dnd"


type Todo = {
    title: string,
    description?: string,
    tags: Array<string>,
    priority: number,
    id: string,
    owner: string,
    status: string
}


const GET_TODOS = gql`
  query GetTodos{
        allTodos {
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
        owner: "abcdefg123",
        status: "ready"
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
            return <CardComponent key="default" todo={defaultTodo} ownerAddress={defaultTodo.owner} setState={setTodos} index={1}/>;
        }
        else {
            return (
                todos.map((todo: Todo, index) => (
                    <CardComponent key={todo.id} todo={todo} ownerAddress={ownerAddress} setState={setTodos} index={index}/>
                ))
            )
        }
    }

    function onDragEnd(result: any) {
        console.log(result)
    }

    if (props.address) {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='ready'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="list-container">
                            {displayTodos()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <TodoInputComponent setState={setNewTodo} address={ownerAddress} />
            </DragDropContext>
        );
    }
    else return null
}