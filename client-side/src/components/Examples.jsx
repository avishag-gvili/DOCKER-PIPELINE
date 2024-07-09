import MyButton from './MyButton';

export default function Example(){
    return(
        <>
            <MyButton className="secondary" size="small" label="secondary1"></MyButton>
            <MyButton className="secondary" disabled={true} size="medium" label="secondary2"></MyButton>
            <MyButton className="secondary" size="large" label="secondary3"></MyButton>
            <MyButton className="primary" size="small" label="primary1"></MyButton>
            <MyButton className="primary" disabled={true} size="medium" label="primary2"></MyButton>
            <MyButton className="primary" size="large" label="primary3"></MyButton>
        </>
    )
}