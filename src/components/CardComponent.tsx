import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

type Todo = {
    title: string,
    description?: string,
    tags: Array<string>,
    priority: number,
    id: string,
    owner: string,
}

export default function CardComponent(props: { todo: Todo, ownerAddress: String }) {

    if (props.todo.owner === props.ownerAddress) {
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
                            {props.todo.tags.map((tag: any) => {
                                return <Chip label={tag} key={tag} color="success" sx={{ fontWeight: "600", backgroundColor: "hsl(138deg 76% 97%)", color: "hsl(142deg 61% 42%)" }} />
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