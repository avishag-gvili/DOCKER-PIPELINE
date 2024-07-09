import GenericButton from './GenericButton';


function func1(){
    console.log("hello1")
}

function func2(){
    console.log("hello2")
}

function func3(){
    console.log("hello3")
}
export default function Example(){
    return(
        <>
            <GenericButton onClick={func1} className="secondary" size="small" label="secondary1"></GenericButton>
            <GenericButton onClick={func2} className="secondary" disabled={true} label="secondary2"></GenericButton>
            <GenericButton onClick={func3} className="secondary" size="large" label="secondary3"></GenericButton>
            <GenericButton onClick={func1} className="primary" size="small" label="primary1"></GenericButton>
            <GenericButton onClick={func2} className="primary" disabled={true} label="primary2"></GenericButton>
            <GenericButton onClick={func3} className="primary" size="large" label="primary3"></GenericButton>
        </>
    )
}