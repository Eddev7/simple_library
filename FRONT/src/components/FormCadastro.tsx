import Input from "./Input";
import { IoBookOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { CiBarcode } from "react-icons/ci";
import { useState } from "react";
import { createBook } from "../services/api";
import { Book } from "../types/book";

const style = {
    bgGradiente: "bg-linear-to-bl from-violet-800 to-fuchsia-800",
    h1: "",
};

type FormProps = {
    notify?: (message: string) => void;
    setAbas: (value: { aba: string }) => void;
};

export default function FormCadastro({ setAbas, notify }: FormProps) {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [ano, setAno] = useState("");
    const [disponivel, setDisponivel] = useState(false);
    const [codigo, setCodigo] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!titulo || !autor || !ano || !codigo) {
            notify?.("Preencha todos os campos");
            return;
        }

        const livro: Omit<Book, "id"> = {
            titulo,
            autor,
            anoPublicacao: Number(ano),
            disponibilidade: disponivel,
            codigo: codigo,
        };
        await createBook(livro);

        setAbas({aba:"listar"});
    };

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className={
                "flex flex-col items-center justify-center lg:mt-10 mt-5 lg:w-1/3 w-full m-auto rounded-2xl p-3 lg:gap-6 gap-4" +
                " " +
                style.bgGradiente
            }
        >
            <h2 className="text-white font-bold lg:text-2xl text-lg">
                Cadastrar Livro
            </h2>
            <Input
                icon={IoBookOutline}
                placeholder="Digite o titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)} // Pass the new value
            />
            <Input
                icon={FaRegUser}
                placeholder="Digite o autor"
                type="text"
                value={autor} // Bind the state value
                onChange={(e) => setAutor(e.target.value)} // Pass the new value
            />
            <Input
                icon={BsCalendarDate}
                placeholder="Digite o ano da publicação"
                type="number"
                value={ano} // Bind the state value
                onChange={(e) => {
                    const value = e.target.value;
                    if (Number(value) >= 0 && value.length <= 4) {
                        setAno(value);
                    }
                }} // Pass the new value
            />
            <Input
                icon={CiBarcode}
                placeholder="Digite codigo"
                type="number"
                value={codigo} // Bind the state value
                onChange={(e) => setCodigo(e.target.value)} // Pass the new value
            />
            <div className="flex items-center justify-center gap-2">
                <label className="text-white font-bold lg:text-base text-sm">
                    Disponivel ?
                </label>
                <input
                    type="checkbox"
                    className="cursor-pointer min-w-5 min-h-5  rounded-2xl"
                    checked={disponivel} // Bind the state value
                    onChange={(e) => {
                        const value = e.target.checked;
                        setDisponivel(value);
                    }}
                />
            </div>
            <button
                type="submit"
                className="bg-white text-violet-800 font-bold py-2 px-4 lg:w-3/4 w-full cursor-pointer rounded-full hover:bg-gray-200 transition duration-300 ease-in-out"
            >
                Cadastrar
            </button>
        </form>
    );
}
