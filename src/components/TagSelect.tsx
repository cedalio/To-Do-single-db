import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useQuery, gql } from '@apollo/client';

type Tag = {
    name: string,
    id: string,
}

const GET_TAGS = gql`
  query GetTAGS{
        allTags {
            id
            name
        }
  }
`;

export default function TagSelect(props: {
    setState: React.Dispatch<React.SetStateAction<any>>
}) {
    const [tag, setTag] = React.useState<string[]>([]);
    const [tags, setTags] = React.useState<Tag[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setTag(value);
        props.setState(value.map(name => tags.find(tag => tag.name === name)?.id || ""));
    };

    const { loading, error, data } = useQuery(GET_TAGS);

    React.useEffect(() => {
        if (data) setTags(data.allTags);
    }, [data]);

    if (loading) return <></>;
    
    if (error) {
        return <p>Error : {error.message}</p>;
    }

    return (
        <div>
            <FormControl sx={{ width: 170, marginLeft: "50px" }}>
                <InputLabel id="tags-label">Tags</InputLabel>
                <Select
                    labelId="tags-label"
                    id="tags"
                    multiple
                    value={tag}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tags" />}
                >
                    {tags.map((tag: Tag) => (
                        <MenuItem
                            key={tag.id}
                            value={tag.name}
                        >
                            {tag.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}