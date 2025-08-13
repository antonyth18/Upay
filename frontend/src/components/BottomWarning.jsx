import { Link } from 'react-router-dom'

const BottomWarning = ({
    label,
    buttonText,
    to
}) => {
    return <div className='text-sm flex justify-center pb-2'>
        <div>
            {label}
        </div>

        <Link className= 'pointer underline pl-1 hover:font-bold' to = {to}>
            {buttonText}
        </Link>
    </div>
}

export default BottomWarning;