const Loading = ({ message } : { message : string }) => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#F0F8FF] gap-6">
            <div className="flex justify-center items-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-transparent border-gray-300"/>
            </div>
            <p className="font-sans">{message}</p>
        </div>
    )
}

export default Loading