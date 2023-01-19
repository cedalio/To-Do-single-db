import * as React from 'react';
import CardComponent from './CardComponent';
import { useQuery, gql } from '@apollo/client';
import TodoInputComponent from "./TodoInputComponent"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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

const dragColors = {
    initialColor: "#63636324",
    dragStartColor: "#636363",
    doneColor: "#6ab05a",
    deleteColor: "#ea3b3b"
}

export default function ListComponent(props: { address: string | undefined }) {
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [newTodo, setNewTodo] = React.useState<Todo>();
    const [update, setUpdate] = React.useState<Update>();
    const ownerAddress: string = String(props.address)
    const [open, setOpen] = React.useState(false);
    const [doneIconColor, setDoneIconColor] = React.useState(dragColors.initialColor);
    const [deleteIconColor, setDeleteIconColor] = React.useState(dragColors.initialColor);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setOpen(false);
            return;
        }

        setOpen(false);
    };

    function onUpdateTodo(todoId: String) {
        setOpen(true)
        setTodos((current: any) =>
            current.filter((todo: any) => todo.id !== todoId))
    }

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
            return <CardComponent key="default" todo={defaultTodo} ownerAddress={defaultTodo.owner} setState={setTodos} index={1} updateState={update} onUpdateTodo={onUpdateTodo} />;
        }
        else {
            return (
                todos.filter((todo) => todo.status === "ready").map((todo: Todo, index) => (
                    <CardComponent key={todo.id} todo={todo} ownerAddress={ownerAddress} setState={setTodos} index={index} updateState={update} onUpdateTodo={onUpdateTodo} />
                ))
            )
        }
    }

    function onDragEnd(result: any) {
        setDeleteIconColor(dragColors.initialColor)
        setDoneIconColor(dragColors.initialColor)
        setUpdate({ update: result.destination.droppableId, todoId: result.draggableId })
    }

    function onDragStart(result: any) {
        setDeleteIconColor(dragColors.dragStartColor)
        setDoneIconColor(dragColors.dragStartColor)
    }
    function onDragUpdate(result: any) {
        console.log(result.destination.droppableId)
        if (result.destination.droppableId === "delete") {
            setDeleteIconColor(dragColors.deleteColor)
        } else if (result.destination.droppableId === "done") {
            setDoneIconColor(dragColors.doneColor)
        } else {
            setDeleteIconColor(dragColors.dragStartColor)
            setDoneIconColor(dragColors.dragStartColor)
        }
    }

    if (props.address) {
        return (
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
                <div className="container">
                    <Droppable droppableId='delete'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="delete-container">
                                <HighlightOffIcon fontSize="large" sx={{ height: "200px", width: "200px", color: deleteIconColor }} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId='ready'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="list-container">
                                {displayTodos()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId='done'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="done-container">
                                <CheckCircleOutlineIcon fontSize="large" sx={{ height: "200px", width: "200px", color: doneIconColor }} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <TodoInputComponent setState={setNewTodo} address={ownerAddress} />
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        The operation was successfull
                    </Alert>
                </Snackbar>
            </DragDropContext>
        );
    }
    else return null
}

