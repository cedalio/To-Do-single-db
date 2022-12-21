export default function ListComponent(props: {address: string | undefined}) {
    if (props.address) {
        return (
            <h1>Connected</h1>
        )
    }
    else return null
}