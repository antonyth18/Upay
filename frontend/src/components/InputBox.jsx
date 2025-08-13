
const InputBox = ({
    label,
    placeholder,
    onChange
}) => {
    return <div className="pt-4">
        <label htmlFor={label} className="block mb-2 font-bold text-gray-900">{label}</label>
        <input onChange = {onChange} type="text" id="first_name" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}

export default InputBox