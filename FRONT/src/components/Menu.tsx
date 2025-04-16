type MenuProps = {
    setAbas: (value: { aba: string }) => void;
}

const style = {
    bgGradiente: "bg-linear-to-bl from-violet-800 to-fuchsia-800"
}

export default function Menu({setAbas}: MenuProps) {
    return (
        <div
            className={
                style.bgGradiente +
                "w-full lg:w-1/3 m-auto rounded-2xl lg:mt-10 mt-5 grid grid-cols-2"
            }
        >
            <button
                className={
                    "flex justify-center items-center border-r-1 p-3 cursor-pointer hover:bg-black/40 transition duration-300 ease-in-out rounded-bl-2xl rounded-tl-2xl"
                }
                onClick={() => setAbas({aba:"cadastrar"})}
            >
                <h1 className="text-white font-bold lg:text-2xl text-lg">
                    Cadastrar
                </h1>
            </button>
            <button
                className={
                    "flex justify-center items-center border-r-1 p-3 cursor-pointer hover:bg-black/40 transition duration-300 ease-in-out rounded-br-2xl rounded-tr-2xl"
                }
                onClick={() => setAbas({aba:"listar"})}
            >
                <h1 className="text-white font-bold lg:text-2xl text-lg">
                    Listar
                </h1>
            </button>
        </div>
    );
}
